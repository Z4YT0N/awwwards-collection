define([

    'underscore',
    'jquery',
    'three'

], function(

    _,
    $,
    THREE

) { 'use strict';

    return {


        handleGeo    : null,
        geometry     : null,
        material     : null,
        mesh         : null,

        origin       : null,

        actors       : null,

        width        : 0,
        height       : 0,
        windowRatio  : 0,
        mouseVectors : null,

        rWidth       : 0,
        rHeight      : 0,

        CAMERA_FOV   : 45,  // To be updated if camera changes
        CAMERA_Z     : 150, // To be updated if camera changes
        MALLET_Z     : 100,


        init: function (options) {

            this.mouseVectors = options.mouseVectors;

            this.setup(options);
        },

        setup: function () {

            this.actors = [];

            this.origin = new THREE.Object3D();
            this.actors.push( this.origin );

            this.geometry = new THREE.SphereGeometry( 2, 24, 24 );
            this.material = new THREE.MeshNormalMaterial({ wireframe: false });

            this.mesh = new THREE.Mesh( this.geometry, this.material );

            this.origin.add( this.mesh );
        },

        destroy: function () {

            this.origin = null;
            this.mesh = null;

            this.geometry.dispose();
            this.material.dispose();
        },

        resize: function ( width, height, windowRatio ) {

            this.width = width;
            this.height = height;
            this.windowRatio = windowRatio;

            this.calcRenderedDimensions();
        },

        calcRenderedDimensions: function () {

            var vFov = this.CAMERA_FOV * Math.PI / 180;
            this.rHeight = 2 * Math.tan( vFov / 2 ) * ( this.CAMERA_Z - this.MALLET_Z );
            this.rWidth = this.rHeight * this.windowRatio;
        },

        draw: function () {

            var malletX = this.mouseVectors.ratioPosSmooth.x * ( this.rWidth * 0.5 );
            var malletY = this.mouseVectors.ratioPosSmooth.y * ( this.rHeight * 0.5 );

            this.origin.position.set(malletX, malletY, this.MALLET_Z);
        },

        getActors: function () {

            return this.actors;
        },

        degToRad: function (degrees) {

            return degrees * ( Math.PI / 180 );
        }

    };

});