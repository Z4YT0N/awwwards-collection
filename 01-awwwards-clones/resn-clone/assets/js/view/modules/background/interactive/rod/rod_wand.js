define([

    'underscore',
    'jquery',
    'three',
    'config',

    'view/modules/background/interactive/rod/rod_ring',

], function(

    _,
    $,
    THREE,
    Config,

    RodRing

) { 'use strict';

    return {


        ROD_RADIUS        : 5,
        ROD_LENGTH        : 100,

        FRICTION          : 0.005,
        ACCELERATION_MIN  : 0.05,
        ACCELERATION_MAX  : 3.4,
        ACCELERATION_INC  : 2,
        COLLIDE_MIN_SPEED : Config.MOBILE ? 0.007 : 0.014,
        COLLIDE_THROTTLE  : 500,//150, // ms

        RING_COUNT        : 6,
        rings             : null,

        origin            : null,

        geometry          : null,
        material          : null,
        mesh              : null,

        actors            : null,

        width             : 0,
        height            : 0,
        windowRatio       : 0,
        mouseVectors      : null,

        prevMouseX        : 0,
        prevMouseY        : 0,
        speedX            : 0,
        speedY            : 0,

        rotateStartPoint  : null,
        rotateEndPoint    : null,
        currentQuaternion : null,

        rotateTargetX     : 0.02,
        rotateTargetY     : -0.005,
        rotateTargetZ     : 0.005,

        acceleration      : 0,


        init: function (options) {

            this.model = options.model;
            this.mouseVectors = options.mouseVectors;

            this.setup(options);
        },

        setup: function (options) {

            this.actors = [];

            this.origin = new THREE.Object3D();
            this.actors.push( this.origin );

            this.geometry = new THREE.CylinderGeometry( this.ROD_RADIUS, this.ROD_RADIUS, this.ROD_LENGTH, 50, 50 );
            this.material = new THREE.MeshNormalMaterial({ wireframe: false });

            this.mesh = new THREE.Mesh( this.geometry, this.material );

            this.origin.add(this.mesh);

            this.createRings();

            this.rotateStartPoint = new THREE.Vector3(0, 0, 1);
            this.rotateEndPoint = new THREE.Vector3(0, 0, 1);

            // Set starting rotation for wand, (0, 0, 0) is upright
            this.mesh.rotation.x = this.degToRad(40);
            this.mesh.rotation.y = this.degToRad(-45);
            this.mesh.rotation.z = this.degToRad(100);

            this.collide = _.throttle( this.collide, this.COLLIDE_THROTTLE, { 'trailing': false });
        },

        destroy: function () {

            for ( var i = 0; i < this.RING_COUNT; i++ ) {

                this.rings[i].destroy();
            }

            this.mesh = null;
            this.origin = null;

            this.geometry.dispose();
            this.material.dispose();

            this.rotateStartPoint = null;
            this.rotateEndPoint = null;
        },

        hide: function () {

            for ( var i = 0; i < this.RING_COUNT; i++ ) {

                this.rings[i].hide();
            }
        },

        createRings: function () {

            this.rings = [];

            for ( var i = 0; i < this.RING_COUNT; i++ ) {

                var rodLength = this.ROD_LENGTH + 0.2; // add 0.2 to extend slightly beyond the ends

                var ringLength = rodLength / this.RING_COUNT;
                var ringYPos = ( rodLength - ringLength ) * -0.5 + ringLength * i;
                var ringItem = _.create( RodRing );
                ringItem.init({
                    'model': this.model,
                    'mouseVectors': this.mouseVectors,
                    'index': i,
                    'radius': this.ROD_RADIUS,
                    'length': ringLength,
                    'yPos': ringYPos
                });

                this.rings.push(ringItem);

                var ringMesh = ringItem.getActors()[0];
                ringMesh.position.y = ringYPos;

                this.mesh.add( ringMesh );
            }
        },

        checkMouseCollision: function ( raycaster ) {

            // Check if the wand mesh is intersected
            var intersects = raycaster.intersectObject( this.mesh );

            if ( intersects.length ) {

                // console.log(intersects[0]);

                this.collide( intersects[0] );
            }
        },

        collide: function ( intersectedObject ) {

            // console.log(intersectedObject);

            var absPosX = Math.abs( this.mouseVectors.ratioPosSmooth.x );
            var absPosY = Math.abs( this.mouseVectors.ratioPosSmooth.y );
            var absSpeedX = Math.abs( this.speedX );
            var absSpeedY = Math.abs( this.speedY );

            // Don't collide if speed on both axes is below minimum for a collision
            if ( absSpeedX < this.COLLIDE_MIN_SPEED && absSpeedY < this.COLLIDE_MIN_SPEED ) { return; }

            // Apply X and Y targets based on 2D mouse position, multiply by the current speed (in either direction)
            var higherSpeed = Math.max( absSpeedX, absSpeedY );
            this.rotateTargetX = this.mouseVectors.ratioPosSmooth.x * higherSpeed;
            this.rotateTargetY = this.mouseVectors.ratioPosSmooth.y * higherSpeed;

            // Find the Z target from the speed direction
            // Y axis
            if ( absSpeedY >= absSpeedX ) {

                // Set rotation direction
                this.rotateTargetZ = this.rotateTargetX > 0 ? this.speedY : this.speedY * -1;
                // Scale to the absolute X ratio (so more force closer to the ends of the rod)
                this.rotateTargetZ *= absPosX;
            }
            // X axis
            else {

                // Set rotation direction
                this.rotateTargetZ = this.rotateTargetY > 0 ? this.speedX * -1 : this.speedX;
                // Scale to the absolute Y ratio (so more force closer to the ends of the rod)
                this.rotateTargetZ *= absPosY;
            }

            // Increase Z rotation strength
            this.rotateTargetZ *= 2;

            // Add acceleration
            this.acceleration += this.ACCELERATION_INC;

            // Convert the collision point back to local coordinates on mesh
            var collisionPoint = intersectedObject.point.clone();
            var collisionPointOnMesh = collisionPoint.applyMatrix4( this.mesh.matrix.clone().getInverse( this.mesh.matrix ) );

            var intensity = Math.max( Math.min( ( absSpeedX + absSpeedY ) * 4, 1 ), 0.2 );

            this.checkRingCollisions( collisionPointOnMesh.y, intensity );

            // $(window).trigger('wand-collision');
        },

        checkRingCollisions: function (yPos, intensity) {

            for ( var i = 0; i < this.RING_COUNT; i++ ) {

                this.rings[i].checkCollision( yPos, intensity );
            }
        },

        resize: function ( width, height, windowRatio ) {

            this.width = width;
            this.height = height;
            this.windowRatio = windowRatio;
        },

        draw: function () {

            // Update speed values
            this.speedX = ( this.mouseVectors.ratioPosSmooth.x - this.prevMouseX );
            this.speedY = ( this.mouseVectors.ratioPosSmooth.y - this.prevMouseY );

            this.prevMouseX = this.mouseVectors.ratioPosSmooth.x;
            this.prevMouseY = this.mouseVectors.ratioPosSmooth.y;

            // Apply rotation
            this.rotateStartPoint = this.rotateEndPoint = this.projectOnTrackball( 0, 0 );
            this.handleRotation();

            // Apply Friction
            var resistance = 1 - this.FRICTION;
            this.acceleration = Math.min( Math.max( this.acceleration * resistance, this.ACCELERATION_MIN ), this.ACCELERATION_MAX );

            // Relay to rings
            for ( var i = 0; i < this.RING_COUNT; i++ ) {

                this.rings[i].draw();
            }
        },

        handleRotation: function () {

            this.rotateEndPoint = this.projectOnTrackball( this.rotateTargetX, this.rotateTargetY );

            var rotateQuaternion = this.rotateMatrix( this.rotateStartPoint, this.rotateEndPoint );

            this.currentQuaternion = this.mesh.quaternion;

            this.currentQuaternion.multiplyQuaternions( rotateQuaternion, this.currentQuaternion );
            this.currentQuaternion.normalize();

            this.mesh.setRotationFromQuaternion( this.currentQuaternion );

            this.rotateEndPoint = this.rotateStartPoint;
        },


        // Helpers

        projectOnTrackball: function (ratioX, ratioY) {

            var mouseOnBall = new THREE.Vector3(ratioX, ratioY, 0);

            var length = mouseOnBall.length();

            if ( length > 1 ) {

                mouseOnBall.normalize();
            }
            else {

                mouseOnBall.z = Math.sqrt(1 - length * length);
            }

            return mouseOnBall;
        },

        rotateMatrix: function (rotateStart, rotateEnd) {

            var axis = new THREE.Vector3();
            var quaternion = new THREE.Quaternion();

            var angle = Math.acos( rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length() );

            if ( angle ) {

                axis.crossVectors( rotateStart, rotateEnd );
                axis.z = this.rotateTargetZ;
                axis.normalize();
                angle *= this.acceleration;
                quaternion.setFromAxisAngle(axis, angle);
            }

            return quaternion;
        },


        // Accessors

        getActors: function () {

            return this.actors;
        },


        // Utilities

        degToRad: function (degrees) {

            return degrees * ( Math.PI / 180 );
        },

        radToDeg: function (rad) {

            return rad * ( 180 / Math.PI );
        }

    };

});