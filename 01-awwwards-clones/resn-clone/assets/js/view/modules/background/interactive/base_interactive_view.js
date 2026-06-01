define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'TweenMax',
    'util/anim_frame',
    'route/router',
    'events/app_events',
    'model/app_model',
    'view/common/base_view'

], function (

    $,
    _,
    Backbone,
    Config,
    TweenMax,
    AnimFrame,
    Router,
    AppEvents,
    AppModel,
    BaseView

) { 'use strict';

    return BaseView.extend({

        // SETUP ---------------------------------------------------------------

        isActivated: false,
        animFrameRunning: false,

        initialMx: 0,
        initialMy: 0,

        initialize: function(options) {

            // _.bindAll(this, '');
            this.setup();
        },

        setup: function () {

        },

        startAnimFrame: function () {

            if ( !this.animFrameRunning ) {
                AnimFrame.on('anim_frame', this.onAnimFrame, this);
                this.animFrameRunning = true;
            }
        },

        stopAnimFrame: function () {

            AnimFrame.off('anim_frame', this.onAnimFrame, this);
            this.animFrameRunning = false;
        },

        show: function () {

            TweenMax.set(this.$el,{'opacity':0, scaleX:0.9, scaleY:0.9, scaleZ:0.9 });

            TweenMax.to(this.$el, 0.48,{ scaleX:1, scaleY:1, scaleZ:1, delay:0, force3D: true, ease:'Expo.easeOut'});
            TweenMax.to(this.$el, 0.58,{'opacity':1, delay:0, ease:'Sine.easeInOut'});

            this.startAnimFrame();
        },

        hide: function () {

            this.stopAnimFrame();
        },

        activate: function () {

            if (this.isActivated) {
                return;
            }

            this.isActivated = true;
            this.onActivate();
        },

        onActivate: function () {},

        deactivate: function () {

            if (!this.isActivated) {
                return;
            }

            this.isActivated = false;
            this.onDeactivate();
        },

        onDeactivate: function () {},

        onResize: function(width, height) {
        },

        onAnimFrame: function () {
        },

        addEvents: function () {
        },

        removeEvents: function () {
        },

        setMousePos: function(pos) {

            pos = pos || [0, 0];

            this.initialMx = pos[0];
            this.initialMy = pos[1];
        },

        destroy: function () {

            this.stopAnimFrame();
            this.removeEvents();
            if ( this.$node ) {
                this.$node.remove();
                this.$node[0].innerHTML = "";
                this.$node = null;
            }
        }
    });
});
