define([

    'underscore',
    'jquery',
    'backbone',
    'config',
    'three',

    'view/modules/background/interactive/cubes/geometry_types',

    'text!view/modules/background/interactive/cubes/cubes_vertex.shader',
    'text!view/modules/background/interactive/cubes/cubes_fragment.shader'


], function(

    _,
    $,
    Backbone,
    Config,
    THREE,

    GeometryTypes,

    VertexShader,
    FragmentShader

) { 'use strict';

    return _.extend({


        INDEX           : -1,
        COUNT           : 0,

        PARENT          : null,
        RENDERER        : null,
        SCENE           : null,

        CAMERA_FOV      : 0,
        CAMREA_Z        : 0,

        COLORIZE_CHANCE : 0.18, // 18%

        bounds          : null,
        bgSwapped       : false,

        isReady         : false,

        windowSizing    : null,
        mouseVectors    : null,

        physics         : null,

        geoSize         : 0,

        origin          : null,

        geometryConfig  : null,
        geometry        : null,
        material        : null,
        mesh            : null,

        texture              : null,
        textureIndex         : -1,
        textureRotation      : 0,

        actors          : null,

        startingX       : 0,
        startingY       : 0,

        speeds          : null,


        init: function (options) {

            _.bindAll( this, 'resetTexture' );

            this.INDEX = options.index;
            this.COUNT = options.count;

            this.PARENT = options.parent;

            this.CAMERA_FOV = options.cameraFov;
            this.CAMREA_Z = options.cameraZ;

            this.windowSizing = options.windowSizing;
            this.mouseVectors = options.mouseVectors;

            this.texture = options.texture;
            this.textureIndex = options.textureIndex;

            this.geoSize = Config.MOBILE ? 25 + parseInt( Math.random() * 26, 10 ) : 15 + parseInt( Math.random() * 26, 10 );

            var maxGeoSize = Config.MOBILE ? 50 : 40;

            // console.log( this.INDEX, this.geoSize, ( 1 - ( this.geoSize / 40 ) ) );

            this.physics = {
                GRAVITY       : -0.0002 + -0.0008 * ( 1 - ( this.geoSize / maxGeoSize ) ),
                FRICTION      : 0.018,
                TERMINAL      : 2.7 + 0.5 * ( this.geoSize / 40 ),
                MAX_ACCEL     : 0.4,
                accelerationX : 0,
                accelerationY : 0,
                velocityX     : 0,
                velocityY     : 0
            };

            this.bounds = {
                x: 0,
                y: 0,
                rW: 0,
                rH: 0
            };

            this.collide = _.debounce( this.collide, 500, { 'leading' : true, 'trailing' : false });

            this.setup(options);
        },

        setup: function (options) {

            this.origin = new THREE.Object3D();

            this.geometryConfig = this.getGeometry();

            this.material = new THREE.ShaderMaterial({
                depthTest: false,
                depthWrite: false,
                side: THREE.DoubleSide,
                uniforms: {
                    resolution: { type: "v2", value: new THREE.Vector2( this.windowSizing.width * this.windowSizing.pixelRatio, this.windowSizing.height * this.windowSizing.pixelRatio ) },
                    texture: { type: "t", value: this.texture },
                    time: { type: "f", value: 1.0 },
                    rotation: { type: "f", value: 0.0 },
                    swapped: { type: "f", value: 0.0 },
                    coloured: { type: "f", value: 0.0 }
                },
                vertexShader: VertexShader,
                fragmentShader: FragmentShader
            });

            // var materialR = new THREE.MeshBasicMaterial({ color: 0x990000 });
            // var materialG = new THREE.MeshBasicMaterial({ color: 0x009900 });
            // var materialB = new THREE.MeshBasicMaterial({ color: 0x000099 });

            var materialBlank = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });
            //
            // var mats = [
            //     this.material,
            //     materialBlank,
            //     this.material,
            //     materialBlank,
            //     this.material,
            //     materialBlank
            // ];

            var mats = [];

            for (var i = 0; i < 100; i++) {
                var mat = this.geometryConfig.faceMap[i] === 1 ? this.material : materialBlank;
                mats.push( mat );
            }

            // for ( var i = 0, length = this.geometryConfig.faceMap.length; i < length; i++ ) {
            //
            //     var mat = this.geometryConfig.faceMap[i] === 1 ? this.material : materialBlank;
            //
            //     mats.push( mat );
            // }

            this.mesh = new THREE.Mesh( this.geometryConfig.geo, new THREE.MultiMaterial(mats) );

            this.origin.add(this.mesh);

            // Initial positioning
            this.reset();

            this.speeds = {
                rotX: Math.random() * 0.8 + 0.2,
                rotY: Math.random() * 0.8 + 0.2,
                rotZ: Math.random() * 0.8 + 0.2,
                posX: Math.random() * 0.8 + 0.2,
                posY: Math.random() * 0.8 + 0.2,
                posZ: Math.random() * 2 - 1
            };

            this.origin.rotation.x = Math.random() * Math.PI * 2;
            this.origin.rotation.y = Math.random() * Math.PI * 2;
            this.origin.rotation.z = Math.random() * Math.PI * 2;

            this.isReady = true;
        },

        getGeometry: function () {

            var geoIndex = parseInt( Math.random() * GeometryTypes.COUNT, 10 );

            var geoConfig;

            switch ( geoIndex ) {
                case 0:
                    geoConfig = GeometryTypes.getCube( this.geoSize );
                    break;
                case 1:
                    geoConfig = GeometryTypes.getPrism( this.geoSize );
                    break;
                case 2:
                    geoConfig = GeometryTypes.getTube( this.geoSize );
                    break;
                // case 3:
                //     geoConfig = GeometryTypes.getSphere( this.geoSize );
                //     break;
                // case 3:
                //     geoConfig = GeometryTypes.getDiamond( this.geoSize );
                //     break;
            }

            return geoConfig;
        },

        getOrigin: function () {

            return this.origin;
        },

        destroy: function () {

            this.geometryConfig.geo.dispose();
            this.material.dispose();

            this.geometryConfig = null;
            this.texture = null;
            this.physics = null;
            this.origin = null;
            this.mesh = null;
            this.speeds = null;
        },

        updateBounds: function () {

            var renderedDimensions = this.calcFovRenderedUnits(
                this.CAMERA_FOV,
                this.CAMREA_Z,
                this.origin.position.z,
                this.windowSizing.ratio
            );

            this.bounds.rW = renderedDimensions.rW;
            this.bounds.rH = renderedDimensions.rH;

            var geoSize = this.geometryConfig.name === "TUBE" ? this.geoSize * this.geometryConfig.length : this.geoSize;

            this.bounds.x = renderedDimensions.rW * 0.5 + geoSize * 1.5;
            this.bounds.y = renderedDimensions.rH * 0.5 + geoSize * 1.5;
        },

        resize: function () {

            if ( this.isReady ) {

                var resolution = new THREE.Vector2( this.windowSizing.width * this.windowSizing.pixelRatio, this.windowSizing.height * this.windowSizing.pixelRatio );
                this.material.uniforms.resolution.value = resolution;
            }

            this.updateBounds();
        },

        checkRaycaster: function (raycaster) {

            var intersects = raycaster.intersectObject( this.mesh );

            if ( intersects.length ) {

                this.collide();
            }
        },

        // Debounced to only fire on the leading edge
        collide: function () {

            this.physics.accelerationX += this.mouseVectors.speed.x * 0.3;
            this.physics.velocityX += this.mouseVectors.speed.x * 80;

            this.physics.accelerationY += this.mouseVectors.speed.y * -1;
            this.physics.velocityY += this.mouseVectors.speed.y * -1 * 300;

            // Clamp to max acceleration
            this.physics.accelerationX = Math.max( Math.min( this.physics.accelerationX, this.physics.MAX_ACCEL ), this.physics.MAX_ACCEL * -1 );
            this.physics.accelerationY = Math.max( Math.min( this.physics.accelerationY, this.physics.MAX_ACCEL ), this.physics.MAX_ACCEL * -1 );

            this.trigger('collision');

            this.updateTexture();
        },

        updateTexture: function () {

            this.material.uniforms.swapped.value = this.material.uniforms.swapped.value === 0.0 ? 1.0 : 0.0;

            if ( Math.random() < this.COLORIZE_CHANCE ) {
                this.material.uniforms.coloured.value = this.bgSwapped ? 1.0 : 2.0;
            }
            else {
                this.material.uniforms.coloured.value = 0.0;
            }
        },

        resetTexture: function (bgSwapped) {

            this.bgSwapped = bgSwapped;

            this.material.uniforms.coloured.value = 0.0;
        },

        reset: function () {

            // console.log('reset');
            this.updateBounds();

            this.startingX = Math.random() * this.bounds.rW - this.bounds.rW * 0.5;

            // Initial positioning of first 5 items
            if ( this.INDEX === 0 ) {

                this.startingY = this.bounds.rH * 0.5 * 0.3;
            }
            else if ( this.INDEX === 1 ) {

                this.startingY = this.bounds.rH * 0.5 * 0.1;
            }
            else if ( this.INDEX === 2 ) {

                this.startingY = this.bounds.rH * 0.5 * -0.2;
            }
            else if ( this.INDEX === 3 ) {

                this.startingY = this.bounds.rH * 0.5 * -0.5;
            }
            else if ( this.INDEX === 4 ) {

                this.startingY = this.bounds.rH * 0.5 * -0.8;
            }
            else {

                this.startingY = this.bounds.y * -1;
            }


            this.origin.position.set(
                this.startingX,
                this.startingY,
                0
            );

            this.physics.accelerationX = 0;
            this.physics.accelerationY = 0;

            this.physics.velocityX = 0;
            this.physics.velocityY = ( 0.5 + Math.random() * 0.5 ) * -1;
        },

        draw: function (time) {

            if ( !this.isReady ) { return; }

            if ( this.PARENT.running < this.INDEX ) { return; }

            // PHYSICS
            // -------

            var resistance = 1 - this.physics.FRICTION;

            this.physics.accelerationX *= resistance;
            this.physics.velocityX *= resistance;

            this.physics.accelerationY *= resistance;
            this.physics.velocityY *= resistance;

            this.physics.accelerationY += this.physics.GRAVITY;
            this.physics.velocityY += this.physics.accelerationY;

            // Clamp to terminal velocity
            this.physics.velocityX = Math.max( Math.min( this.physics.velocityX, this.physics.TERMINAL ), this.physics.TERMINAL * -1 );
            this.physics.velocityY = Math.max( Math.min( this.physics.velocityY, this.physics.TERMINAL ), this.physics.TERMINAL * -1 );


            // TEXTURE
            // -------

            this.material.uniforms.time.value = time;

            this.textureRotation += this.degToRad( 0.08 );
            this.material.uniforms.rotation.value = this.textureRotation;

            // ROTATION
            // --------

            var tR = time * 0.0002;

            this.origin.rotation.x += Math.sin(tR) * 0.02 * this.speeds.rotX;
            this.origin.rotation.y += Math.cos(tR) * 0.02 * this.speeds.rotY;
            this.origin.rotation.z += 0.02 * this.speeds.rotZ;

            // POSITION
            // --------

            // Off bottom of screen
            if ( this.origin.position.y < this.bounds.y * -1 ) {

                this.origin.position.x = Math.random() * this.bounds.rW - this.bounds.rW * 0.5;
                this.origin.position.y = this.bounds.y;
            }
            // Off top of screen
            else if ( this.origin.position.y > this.bounds.y ) {

                this.origin.position.x = Math.random() * this.bounds.rW - this.bounds.rW * 0.5;
                this.origin.position.y = this.bounds.y * -1;
            }

            // Off left of screen
            if ( this.origin.position.x < this.bounds.x * -1 ) {

                this.origin.position.x = this.bounds.x;

                this.physics.accelerationX *= 2;
                this.physics.velocityX *= 2;
            }
            // Off right of screen
            else if ( this.origin.position.x > this.bounds.x ) {

                this.origin.position.x = this.bounds.x * -1;

                this.physics.accelerationX *= 2;
                this.physics.velocityX *= 2;
            }

            var tP = time * 0.0005;

            this.origin.position.x += this.physics.velocityX;
            this.origin.position.y += this.physics.velocityY * -1 * 0.5;

            this.origin.position.x *= 0.999;

            // this.origin.position.z = ( Math.sin(tP) + Math.cos(tP) ) * this.speeds.posZ * 50;
        },

        // Utilities

        calcFovRenderedUnits: function (cameraFov, cameraZ, objectZ, wRatio) {

            var vFov = cameraFov * Math.PI / 180;
            var rHeight = 2 * Math.tan( vFov / 2 ) * ( cameraZ - objectZ );
            var rWidth = rHeight * wRatio;

            return { rW: rWidth, rH: rHeight };
        },

        degToRad: function (degrees) {

            return degrees * ( Math.PI / 180 );
        },

        radToDeg: function (rad) {

            return rad * ( 180 / Math.PI );
        }

    }, Backbone.Events );

});
