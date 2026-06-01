define([

    'underscore',
    'jquery',
    'config',
    'three',
    'TweenMax',
    'howler',
    'model/sound_model'

], function(

    _,
    $,
    Config,
    THREE,
    TweenMax,
    Howler,
    SoundModel

) { 'use strict';

    return {


        INDEX       : 0,
        RING_RADIUS : 0,
        RING_LENGTH : 0,
        Y_POS       : 0,

        actors      : null,

        geometry    : null,
        material    : null,
        mesh        : null,

        tweenObj    : null,

        sound       : null,

        muted       : false,


        init: function (options) {

            this.model = options.model;
            this.mouseVectors = options.mouseVectors;

            this.setup(options);
        },

        setup: function (options) {

            this.actors = [];
            this.tweenObj = { progress: 0 };

            this.INDEX = options.index;
            this.RING_RADIUS = options.radius + 0.1;
            this.RING_LENGTH = options.length;
            this.Y_POS = options.yPos;

            this.geometry = new THREE.CylinderGeometry( this.RING_RADIUS, this.RING_RADIUS, this.RING_LENGTH, 50, 50 );
            this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true });
            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.mesh.material.opacity = 0;

            this.actors.push(this.mesh);

            if(!Config.MOBILE){

                var soundUrl = Config.CDN + this.model.get('sounds')[this.INDEX].src;

                this.sound = new Howler.Howl(
                {
                    urls: [soundUrl],
                    volume: 0.2
                });

                if ( SoundModel.muted === true ) {

                    this.sound.volume( 0 );
                    this.muted = true;
                }
            }
        },

        destroy: function () {

            this.geometry.dispose();
            this.material.dispose();

            this.mesh = null;
        },

        hide: function () {

            if(!Config.MOBILE){
                this.sound.unload();
            }
        },

        checkCollision: function (yPos, intensity) {

            var halfLength = this.RING_LENGTH * 0.5;

            if ( yPos >= this.Y_POS - halfLength &&
                 yPos < this.Y_POS + halfLength ) {

                this.collide(intensity);
            }
        },

        collide: function (intensity) {

            TweenMax.fromTo( this.tweenObj, 1, {
                progress: 1
            }, {
                progress: 0,
                ease: 'Sine.easeIn'
            });

            if ( !this.muted && !Config.MOBILE) {

                var volume = intensity;
                this.sound.volume(volume);
                this.sound.play();
            }
        },

        resize: function () {

        },

        mouseMove: function () {

        },

        draw: function () {

            // Show highlight
            this.mesh.material.opacity = this.tweenObj.progress * 0.5;
        },

        getActors: function () {

            return this.actors;
        },

        degToRad: function (degrees) {

            return degrees * ( Math.PI / 180 );
        }

    };

});
