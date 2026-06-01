define([

    'underscore',
    'backbone',
    'three',

    'model/app_model',
    
    'util/class',
    'util/spritesheet/frame_sequence',
    'util/spritesheet/spritesheet',
    'util/spritesheet/rectangle'

], function(
    
    _,
    Backbone,
    THREE,

    AppModel,
    
    Class,
    FrameSequence,
    SpriteSheet,
    Rectangle

) {

    'use strict';

    var SpriteAnimation = Class.extend({

        data: undefined,
        name: undefined,
        sequence: undefined,
        frame: undefined,

        view: undefined,

        isRenderingEnabled: true,
        isFinished: false, // unused

        renderedFrame: undefined,
        textures: null,

        initialize: function(ctx, data) {

            _.bindAll(this, 
                'onFrame', 
                'onEnd'
            );

            this.data = data;

            this.assets = data.assets;

            this.name = data.name;

            this.fW = data.frameWidth;
            this.fH = data.frameHeight;

            this.textures = [];
            this.cframes = [];

            _.each(this.data.spritesheets, function(spritesheet) {
                
                var tex = this.assets[spritesheet.id].texture;
                tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                tex.needsUpdate = true;
                
                this.textures[spritesheet.id] = tex;
            
            }.bind(this));

            var imgW = this.textures[data.spritesheets[0].id].image.width; //tex.width;
            var imgH = this.textures[data.spritesheets[0].id].image.height; //tex.height;

            this.spritesheet = new SpriteSheet(data.framesTotal, imgW, imgH, this.fW, this.fH);
            this.sequence = new FrameSequence(data.framesTotal, data.fps, this.onFrame, this.onEnd);
        },

        show: function() {
            this.visible = true;
        },

        hide: function() {
            this.visible = false;
            this.sequence.pause();
        },

        destroy: function() {
            this.textures = null;
            this.off();
            this.sequence.pause();
        },

        enableRender: function() {

            if (!this.isRenderingEnabled) {
                this.isRenderingEnabled = true;
                this.render(this.frame);
            }
        },

        disableRender: function() {

            if (this.isRenderingEnabled) {
                this.isRenderingEnabled = false;
            }
        },

        // state ---------------------------------------------------------------

        playSequence: function(name) {

            var data = _.findWhere(this.data.sequences, { 'name': name });
            var autoReverse = data.autoReverse !== undefined ? data.autoReverse : false;
            var direction = data.direction !== undefined ? data.direction : 1;

            this.sequence.play(
                data.loops,
                data.startFrame,
                data.endFrame,
                autoReverse,
                direction
            );

            this.currentSequence = name;

            this.trigger('play');
        },

        reverse: function() {
            this.sequence.reverse();
        },

        setFrame: function(frame_) {
            this.render(frame_);
        },

        // getters / setters ---------------------------------------------------------------

        getFrameData: function(frame) {

            var data = this.spritesheet.getDataByFrame(frame);

            if (data === undefined) {
                throw new Error('Couldn\'t find data., frame: ' + frame);
            }

            return data;
        },

        getCurrentSequence: function() {
            return this.currentSequence;
        },

        // handlers ---------------------------------------------------------------

        onFrame: function(frame) {

            var absoluteFrame = frame;

            this.frame = frame;

            if (this.isRenderingEnabled) {
                this.render(frame);
            }

            this.trigger('frame', absoluteFrame);
        },

        onEnd: function() {
            this.trigger('end');
        },

        // update ---------------------------------------------------------------

        update: function() {
            this.sequence.update();
        },

        render: function(frame_) {

            if (this.renderedFrame === frame_ && frame_ !== undefined && this.currentSequence === this.prevSequence) {
                return;
            }

            this.renderedFrame = frame_;

            var frameData = this.getFrameData(this.renderedFrame);
            var frame = frameData.frame;

            var spritesheetData = this.data.spritesheets[frameData.index];
            var tex = this.textures[spritesheetData.id];

            var f = Rectangle.create(frameData.x, frameData.y, this.fW, this.fH);

            this.trigger('renderFrame', f, tex);
        },

        // util ---------------------------------------------------------------
            
        createCanvas: function(w, h) {

            var c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            
            return c;
        }
    });

    _.extend(SpriteAnimation.prototype, Backbone.Events);

    return SpriteAnimation;
});