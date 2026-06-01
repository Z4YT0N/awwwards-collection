define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'route/router',
    'events/app_events',
    'model/app_model',
    'util/anim_frame',
    'util/resn/math',
    'model/loader_collection',
    'view/modules/background/interactive/base_interactive_view',
    'view/modules/background/interactive/shapeshifter/point',
    'view/modules/background/interactive/shapeshifter/circle',
    'view/modules/background/interactive/shapeshifter/center',
    'templates/templates'

], function(

    $,
    _,
    Backbone,
    Config,
    Router,
    AppEvents,
    AppModel,
    AnimFrame,
    MathUtils,
    LoaderCollection,
    BaseInteractiveView,
    Point,
    Circle,
    Center,
    Templates

) {
    'use strict';

    return BaseInteractiveView.extend({

        $window: null,
        pixelRatio: 1,

        canvas: null,
        context: null,

        bg: null,


        // SETUP ---------------------------------------------------------------

        initialize: function(options) {

            _.bindAll(this,
                'onMouseMove',
                'onTouchMove'
            );

            this.compileAndAppendTemplate(_.partial(Templates.r, 'shapeshifter'), {});

            this.$window = $(window);
            this.pixelRatio = window.devicePixelRatio;

            this.setup();
        },

        show : function(){

            BaseInteractiveView.prototype.show.call(this);

            Backbone.trigger(AppEvents.Audio.Play, {
                "id" : "shapeshifter",
                "type" : "track",
                "priority" : 1
            });
        },

        hide : function(){

            BaseInteractiveView.prototype.hide.call(this);

            Backbone.trigger(AppEvents.Audio.Stop, {
                "id" : "shapeshifter",
                "type" : "track",
                "fade" : true
            });
        },

        setup: function() {

            this.cnv = document.createElement('canvas');
            this.$cnv = $(this.cnv);

            this.ctx = this.cnv.getContext('2d');
            this.ctx.imageSmoothingEnabled = true;

            this.$node.append(this.cnv);

            this.createSymCanvas();
            this.createShapes();

            this.onResize();
        },

        createSymCanvas: function() {

            this.cnvSec = document.createElement('canvas');
            this.$cnvSec = $(this.cnvSec);

            this.ctxSec = this.cnvSec.getContext('2d');
            this.ctxSec.imageSmoothingEnabled = true;

            this.$node.append(this.$cnvSec);
        },

        createShapes: function() {

            this.shapes = [];

            this.shapes.push(this.createShape('center'));
            this.shapes.push(this.createShape('circle'));
            for (var i = 0; i < 10; i++) {
                this.shapes.push(this.createShape('point'));
            }
        },

        createShape: function(type, ctx_) {

            var shape;

            var wW = window.innerWidth * 0.5;
            var wH = window.innerHeight;

            var ctx = ctx_ ? ctx_ : this.ctx;

            var rndX = MathUtils.randomInRange(0, wW);
            var rndY = MathUtils.randomInRange(0, wH);

            switch (type) {
                case 'point':
                    shape = new Point({ 'ctx': ctx, 'x': rndX, 'y': rndY, 'ease': Math.random() * 0.09, 'img': LoaderCollection.getResult('SF_APPLE') });
                    break;
                case 'circle':
                    shape = new Circle({ 'ctx': ctx, 'x': wW, 'y': wH * 0.5, 'ease': 0.03, 'img': LoaderCollection.getResult('SF_MOON1') });
                    break;
                case 'center':
                    shape = new Center({ 'ctx': ctx, 'x': rndX, 'y': rndY, 'ease': 0.09, 'img': LoaderCollection.getResult('SF_MOON2') });
                    break;
                default:
                    break;
            }

            return shape;
        },

        addEvents: function() {
            $(window).on('mousemove', this.onMouseMove);
            $(window).on('touchmove', this.onTouchMove);
            //AnimFrame.on('anim_frame', this.loop, this);
        },

        removeEvents: function() {
            $(window).off('mousemove', this.onMouseMove);
            $(window).off('touchmove', this.onTouchMove);
            //AnimFrame.off('anim_frame', this.loop, this);
        },

        draw: function() {

            this.ctx.save();

            this.ctx.fillStyle = 'rgba(0, 0, 0, .025)';
            this.ctx.fillRect(0, 0, this.w, this.h);

            this.ctx.restore();

            this.drawSymCanvas();
        },

        drawSymCanvas: function() {
            this.ctxSec.clearRect(0, 0, this.cnv.width, this.cnv.height);
            this.ctxSec.drawImage(this.cnv, 0, 0, this.w, this.h);
        },

        /**
         * OVERRIDE!
         */
        onAnimFrame: function() {
            for (var i = 0; i < this.shapes.length; i++) {
                this.shapes[i].update();
            }
            this.draw();
        },

        reflowShapes: function() {
            for (var i = 0; i < this.shapes.length; i++) {
                this.shapes[i].setSize(this.w, this.h);
            }
        },

        // handlers ---------------------------------------------------------------

        onMouseMove: function(e) {

            var x;
            var y;

            if(!Config.MOBILE){
                x = e.clientX;
                y = e.clientY;
            } else {
                x = e.clientY;
                y = e.clientX;
            }

            for (var i = 0; i < this.shapes.length; i++) {
                this.shapes[i].setMouseCoords(x, y);
            }
        },

        onTouchMove: function (e) {

            e.preventDefault();
            e.stopPropagation();

            e.clientX = e.originalEvent.touches[0].clientX;
            e.clientY = e.originalEvent.touches[0].clientY;

            this.onMouseMove(e);
        },

        onActivate: function() {
            this.addEvents();
        },

        onDeactivate: function() {
            this.removeEvents();
        },

        onResize: function() {

            var pixelRatio = this.pixelRatio = window.devicePixelRatio >= 2 ? 1.5 : 1;

            var baseW = window.innerWidth * 0.5;
            var baseH = window.innerHeight;

            this.baseW = baseW;
            this.baseH = baseH;

            this.w = baseW;
            this.h = baseH;

            this.cnv.width = this.cnvSec.width = pixelRatio * this.w;
            this.cnv.height = this.cnvSec.height = pixelRatio * this.h;

            this.ctx.scale(pixelRatio, pixelRatio);
            this.ctxSec.scale(pixelRatio, pixelRatio);

            this.ctx.fillStyle = '#222';
            this.ctx.fillRect( 0, 0, this.w, this.h );

            // CW - added 1 pixel offset for the mirrored canvas to prevent a little seam bug (on Safari) from happening
            this.$cnv.css({ 'position': 'absolute', 'left': 0, 'top': 0, 'width': baseW, 'height': baseH });
            this.$cnvSec.css({ 'position': 'absolute', 'left': baseW - 1, 'top': 0, 'width': baseW + 2, 'height': baseH, 'transform': 'scaleX(-1)' });

            this.reflowShapes();
        }
    });
});