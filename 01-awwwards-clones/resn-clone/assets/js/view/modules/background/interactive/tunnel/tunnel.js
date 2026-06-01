define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'route/router',
    'events/app_events',
    'model/app_model',
    "util/anim_frame",
    "model/loader_collection",
    'view/modules/background/interactive/base_interactive_view',
    'templates/templates',
    'view/modules/background/interactive/tunnel/shape_factory',
    'view/modules/background/interactive/tunnel/utils',
    'view/modules/common/looping_player_view',
    'model/sound_model'


],function (
    $,
    _,
    Backbone,
    Config,
    Router,
    AppEvents,
    AppModel,
    AnimFrame,
    LoaderCollection,
    BaseInteractiveView,
    Templates,
    ShapeFactory,
    Utils,
    LoopingPlayerView,
    SoundModel
) {

    'use strict';

    var MAX_DEPTH = 1000;
    var COLORS;
    var NUM_COLORS = 0;
    $.getJSON(Config.CDN + '/data/interactives/tunnel_colors.json',function (data) {
        COLORS = data;
        NUM_COLORS = data.length;
    });
    var NUM_PLANES = (Config.TABLET || Config.MOBILE) ? 15 : 30;

    return BaseInteractiveView.extend({

        $window   :null,
        pixelRatio:1,

        index       :0,
        shapeFactory:null,
        loaded      :false,
        buffer      :null,
        mousePos    :null,
        colors      :null,
        numColors   :0,
        colorIndex  :35,

        audioTimer:null,

        loopPlayer:null,

        // SETUP ---------------------------------------------------------------

        initialize:function (options) {
            _.bindAll(this,
                'onMouseMove',
                'onTouchMove',
                'onMouseDown',
                'onMouseUp'
            );

            this.$window = $(window);

            this.buffer = Utils.CreateBuffer();
            this.$node = $(this.buffer.canvas);

            this.buffer.ctx.strokeWeight = 1;

            this.el.appendChild(this.buffer.canvas);

            var self = this;
            this.shapeFactory = new ShapeFactory();
            this.shapeFactory.initialize(NUM_PLANES).then(function () {
                self.createPlanes();
                self.loaded = true;
                self.onResize(self.buffer.width,self.buffer.height);
            });

            this.buffer.canvas.style.transform = "scale3d(1.7,1.7,1)";

            if ( !SoundModel.muted ) {
                this.loopPlayer = new LoopingPlayerView({
                    src     :Config.CDN + "/audio/tunnel.mp3",
                    interval:16000
                });
            }
        },

        createPlanes:function () {
            this.planes = [];
            for (var i = 0; i < NUM_PLANES; i++) {
                this.planes.push({
                    pos  :{
                        x:0,
                        y:0,
                        z:(i / NUM_PLANES) * MAX_DEPTH
                    },
                    shape:null,
                    // color:Utils.Color.Random(),
                    color:this.getNextColor()
                });
            }
        },

        getNextColor:function () {
            var color = COLORS[this.colorIndex];
            this.colorIndex = (++this.colorIndex) % NUM_COLORS;
            return Utils.Color.HexToRgb(color);
        },

        onResize:function () {

            var w = window.innerWidth;
            var h = window.innerHeight;

            this.buffer.resize(w,h);
            this.mousePos = {
                x:w >> 1,
                y:h >> 1
            };

            if (!this.loaded) {
                return;
            }

            this.shapeFactory.resize(w >> 1,h >> 1);

            for (var i = 0; i < NUM_PLANES; i++) {
                this.planes[i].pos = {
                    x:this.mousePos.x,
                    y:this.mousePos.y,
                    z:(i / NUM_PLANES) * (200)
                };
            }

            this.updatePlaneList();
        },

        /**
         * OVERRIDE
         * @param time
         */
        onAnimFrame:function (time) {

            if (!this.loaded) {
                return;
            }

            var pos = {
                x:this.mousePos.x,
                y:this.mousePos.y
            };

            this.updatePlanes(pos);

            this.drawPlanes();
        },

        updatePlanes:function (pos) {

            this.planes[0].pos.x = pos.x;
            this.planes[0].pos.y = pos.y;

            var listInvalidated = false;

            for (var i = 0; i < NUM_PLANES; i++) {
                var plane = this.planes[i];
                plane.pos.x += (pos.x - plane.pos.x) * 0.2;
                plane.pos.y += (pos.y - plane.pos.y) * 0.2;

                plane.pos.z = plane.pos.z + 1.5;

                if (plane.pos.z > 200) {
                    plane.pos.z = plane.pos.z % 200;
                    plane.shape = null;
                    listInvalidated = true;
                }

                pos = plane.pos;
            }

            if (listInvalidated) {
                this.updatePlaneList();

            }
        },

        updatePlaneList:function () {

            this.index++;
            //sort by z index
            this.planes = this.planes.sort(function (planeA,planeB) {
                return planeA.pos.z - planeB.pos.z;
            });

            //get shapes in descending order
            var i = NUM_PLANES;
            while (i--) {
                if (!this.planes[i].shape) {
                    // this.planes[i].color = Utils.Color.Random();
                    this.planes[i].color = this.getNextColor();
                    this.planes[i].shape = this.shapeFactory.getNextShape();
                }
            }
        },

        drawPlanes:function (pos,shapes) {

            var z,plane,previous,shape;

            var lastColor = "#000";
            if (this.index > NUM_PLANES) {
                lastColor = this.planes[NUM_PLANES - 1].color.toRGBString();
            }

            this.buffer.fill(lastColor);
            for (var i = 0; i < NUM_PLANES; i++) {

                plane = this.planes[i];
                if (plane.shape) {

                    pos = plane.pos;
                    z = Math.pow(plane.pos.z / 200,4);
                    shape = plane.shape.clone();
                    shape.translate(-pos.x,-pos.y);
                    shape.scale(z);
                    shape.translate(pos.x,pos.y);

                    //draw composited shape
                    if (i < this.index && previous) {
                        this.drawClippedShape(shape,previous,plane.color.toRGBString());
                    }

                    previous = shape;
                }
            }

        },

        drawClippedShape:function (outer,inner,color) {

            var buffer = this.buffer;

            buffer.ctx.fillStyle = color;
            buffer.ctx.strokeStyle = color;

            //draw outer
            buffer.ctx.save();
            buffer.ctx.beginPath();

            this.drawShape(buffer,outer,1);
            buffer.ctx.clip();

            this.drawShape(buffer,inner,-1);
            buffer.ctx.closePath();
            buffer.ctx.fill();
            buffer.ctx.stroke();

            buffer.ctx.restore();
        },

        drawShape:function (buffer,shape,direction) {

            var i,segment,start = true;
            var segmentCollection = shape.segmentCollection;

            if (direction > 0) {
                for (i = 0; i < segmentCollection.length; i++) {
                    segment = segmentCollection[i];

                    if (start) {
                        start = false;
                        buffer.ctx.moveTo(segment.pt1.x,segment.pt1.y);
                    }

                    buffer.ctx.bezierCurveTo(segment.ctrl1.x,segment.ctrl1.y,
                        segment.ctrl2.x,segment.ctrl2.y,
                        segment.pt2.x,segment.pt2.y);
                }
            } else {
                for (i = segmentCollection.length - 1; i >= 0; i--) {
                    segment = segmentCollection[i];

                    if (start) {
                        start = false;
                        buffer.ctx.moveTo(segment.pt2.x,segment.pt2.y);
                    }

                    buffer.ctx.bezierCurveTo(segment.ctrl2.x,segment.ctrl2.y,
                        segment.ctrl1.x,segment.ctrl1.y,
                        segment.pt1.x,segment.pt1.y);
                }
            }

        },

        onActivate:function () {
            this.addEvents();
            this.onAnimFrame(); // in loop
        },

        onDeactivate:function () {
            this.removeEvents();
        },

        addEvents:function () {

            //AnimFrame.on('anim_frame',this.draw,this);

            this.$window.on('touchmove',this.onTouchMove);

            this.$window.on('mousemove',this.onMouseMove);
            this.$window.on('mousedown',this.onMouseDown);
            this.$window.on('mouseup',this.onMouseUp);
        },

        removeEvents:function () {

            //AnimFrame.off('anim_frame',this.draw,this);

            this.$window.off('touchmove',this.onTouchMove);

            this.$window.off('mousemove',this.onMouseMove);
            this.$window.off('mousedown',this.onMouseDown);
            this.$window.off('mouseup',this.onMouseUp);
        },

        onMouseMove:function (e) {
            this.mousePos = {
                x:e.clientX,
                y:e.clientY
            };
        },

        onTouchMove:function (e) {

            if (e.originalEvent.touches.length) {
                var touch = e.originalEvent.touches[0];
                this.mousePos = {
                    x:touch.clientX,
                    y:touch.clientY
                };
            }

        },

        onMouseDown:function () {
            this.isMouseDown = true;
        },

        onMouseUp:function () {
            this.isMouseDown = false;
        },

        destroy:function () {
            BaseInteractiveView.prototype.destroy.call(this);

            while (this.el.childNodes.length) {
                this.el.removeChild(this.el.childNodes[0]);
            }
        },

        show:function () {
            BaseInteractiveView.prototype.show.call(this);
            if ( this.loopPlayer ) {
                this.loopPlayer.show();
            }
        },

        hide:function () {
            BaseInteractiveView.prototype.hide.call(this);
            if ( this.loopPlayer ) {
                this.loopPlayer.hide();
            }
        }
    });
});