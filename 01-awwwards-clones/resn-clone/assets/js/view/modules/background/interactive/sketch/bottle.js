define([

    'jquery',
    'underscore',
    'backbone',
    'TweenMax',
    'config',
    'route/router',
    'model/app_model',
    'view/common/base_view'

], function (

    $,
    _,
    Backbone,
    TweenMax,
    Config,
    Router,
    AppModel,
    BaseView

) { 'use strict';

    return BaseView.extend({

        geo: null,
        material: null,
        mesh: null,

        wrap: null,

        image: null,

        originalX: 0,
        originalY: 0,
        originalZ: 0,

        width: 0,
        height: 0,

        tweenObj: 0,
        tweenObj2: 0,
        animatingOut: false,
        animatedOut: false,

        positionZ: 1,
        targetZ: 1,

        fadingOut: false,

        ease: 0.01,

        rotationZ: 0,
        targetRotationZ: 0,

        // SETUP ---------------------------------------------------------------

        initialize: function(options) {
            // _.bindAll(this);

        },

        init: function(geo, material, mesh, wrap, image, x, y, z, w, h) {
            this.geo = geo;
            this.material = material;
            this.mesh = mesh;

            this.wrap = wrap;

            this.image = image;

            this.originalX = x;
            this.originalY = y;
            this.originalZ = z;

            this.width = w;
            this.height = h;

            this.tweenObj = {'animationOut': 0};
            this.tweenObj2 = {'spawnVal': 0.1};
        },

        out: function() {
            if (!this.animatingOut) {
              this.animatingOut = true;

              TweenMax.killTweensOf(this.tweenObj);
              TweenMax.to(this.tweenObj, 1, {'animationOut': 1, ease: Elastic.easeOut.config(Math.random()*2+1), onCompleteScope: this, onComplete: this.onComplete});

              // TweenMax.killTweensOf(this.tweenObj2);
              // TweenMax.to(this.tweenObj2, 5, {'color': 0, ease: 'Sine.easeInOut'});
            }
        },

        animateOut: function() {
            if (!this.fadingOut) {
                this.fadingOut = true;
                this.ease = 0.08;

                this.positionZ = 0;
            }
        },

        spawn: function() {
            TweenMax.killTweensOf(this.tweenObj2);
            TweenMax.to(this.tweenObj2, 0, {'spawnVal': 1, ease: 'Sine.easeIn', delay: 0.3});
            TweenMax.to(this.tweenObj2, 0.3, {'spawnVal': 0.1, ease: 'Sine.easeIn', delay: 0.3});
        },

        setRotationZ: function(rz) {
            this.rotationZ = rz;
        },

        onAnimFrame: function() {
            this.targetRotationZ += (this.rotationZ - this.targetRotationZ) * this.ease;
        },

        onComplete: function() {
            this.animatedOut = true;
        },

        getPosition: function() {
            return [this.originalX, this.originalY, this.originalZ];
        },

        getMaterial: function() {
            return this.material;
        }
    });
});
