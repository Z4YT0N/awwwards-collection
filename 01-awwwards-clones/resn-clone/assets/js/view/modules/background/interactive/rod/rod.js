define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'route/router',
    'events/app_events',
    'model/app_model',
    'util/anim_frame',
    'model/loader_collection',
    'view/modules/background/interactive/base_interactive_view',
    'templates/templates',

    'three',

    'view/modules/background/interactive/rod/rod_wand',
    'view/modules/background/interactive/rod/rod_mallet',

], function (

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

    THREE,

    RodWand,
    RodMallet

) { 'use strict';

    return BaseInteractiveView.extend({

        SMOOTHING_DESKTOP : 0.13,
        SMOOTHING_TOUCH   : 0.25,
        currentInputTouch : false,

        invalidated  : false,

        $window      : null,
        $document    : null,
        pixelRatio   : 1,

        mouseVectors : null,
        width        : 0,
        height       : 0,

        renderer     : null,
        scene        : null,
        camera       : null,
        raycaster    : null,

        wand         : null,
        mallet       : null,


        // SETUP ---------------------------------------------------------------

        initialize: function(options) {

            _.bindAll( this,
                'onMouseMove',
                'onTouchMove'
            );

            //console.log( this.model);

            this.compileAndAppendTemplate(_.partial(Templates.r, 'rod'), {});

            this.$window    = $(window);
            this.$document  = $(document);
            this.pixelRatio = window.devicePixelRatio;

            this.setup();
        },

        setup: function() {

            this.mouseVectors = {
                pos            : new THREE.Vector2(),
                offsetPos      : new THREE.Vector2(),
                ratioPos       : new THREE.Vector2(),
                ratioPosTarget : new THREE.Vector2(0.24, 0.32),
                ratioPosSmooth : new THREE.Vector2(0.24, 0.32)
            };

            this.renderer = new THREE.WebGLRenderer({ antialias: true, 'alpha': true });

            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setClearColor( 0x000000 );
            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.$node.append( this.renderer.domElement );

            // Not currently working as rootNode is above background
            // this.renderer.domElement.style.cursor = 'none';

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
            this.camera.position.z = 150;

            this.raycaster = new THREE.Raycaster();

            this.wand = _.create( RodWand );
            this.wand.init({
                'model': this.model,
                'mouseVectors': this.mouseVectors
            });

            this.mallet = _.create( RodMallet );
            this.mallet.init({
                'model': this.model,
                'mouseVectors': this.mouseVectors
            });

            this.addActors();

            this.invalidated = true;

            // this.onResize()
        },

        destroy: function () {

            this.wand.destroy();
            this.mallet.destroy();

            this.mouseVectors = null;
            this.renderer = null;
            this.scene = null;
            this.camera = null;
            this.raycaster = null;

            BaseInteractiveView.prototype.destroy.call(this);
        },

        addActors: function () {

            var wandActors = this.wand.getActors();
            var malletActors = this.mallet.getActors();

            this.actors = [];
            this.actors = this.actors.concat( wandActors );
            this.actors = this.actors.concat( malletActors );

            for ( var i = 0; i < this.actors.length; i++ ) {

                this.scene.add(this.actors[i]);
            }
        },

        onResize: function() {

            this.width  = this.$window.width();
            this.height = this.$window.height();

            this.pixelRatio = window.devicePixelRatio;

            if ( this.camera ) {

                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
            }

            if ( this.renderer ) {

                this.renderer.setPixelRatio( window.devicePixelRatio );
                this.renderer.setSize( this.width, this.height );
            }

            var windowRatio = this.width / this.height;

            if ( this.wand ) {

                this.wand.resize( this.width, this.height, windowRatio );
            }

            if ( this.mallet ) {

                this.mallet.resize( this.width, this.height, windowRatio );
            }
        },

        onMouseMove: function (e, touchInput) {

            if ( !this.mouseVectors ) { return; }

            if ( !touchInput ) { this.currentInputTouch = false; }

            var x = e.clientX;// || e.originalEvent.touches[0].clientX;
            var y = e.clientY;// || e.originalEvent.touches[0].clientY;

            this.mouseVectors.pos.set(x, y);

            this.mouseVectors.offsetPos.set(
                x - this.width * 0.5,
                y - this.height * 0.5
            );

            this.mouseVectors.ratioPos.set(
                ( x / this.width ) * 2 - 1,
                ( y / this.height ) * -2 + 1 // We're using THREE's coordinate system, so the Y ratio should be positive above the center of the screen
            );

            this.mouseVectors.ratioPosTarget.copy( this.mouseVectors.ratioPos );
        },

        onTouchMove: function (e) {

            e.preventDefault();
            e.stopPropagation();

            e.clientX = e.originalEvent.touches[0].clientX;
            e.clientY = e.originalEvent.touches[0].clientY;

            this.currentInputTouch = true;

            this.onMouseMove(e, this.currentInputTouch);
        },

        runRayPicking: function () {

            // Cast ray from mouse position
            this.raycaster.setFromCamera( this.mouseVectors.ratioPosSmooth, this.camera );

            // Relay to children
            this.wand.checkMouseCollision( this.raycaster );
        },

        hide: function () {

            this.wand.hide();

            this.$document.off('mousemove', this.onMouseMove);
            this.$document.off('touchmove', this.onTouchMove);

            BaseInteractiveView.prototype.hide.call(this);
        },

        onActivate: function() {

            // console.log('ON ROD ACTIVATE');

            this.$document.on('mousemove', this.onMouseMove);
            this.$document.on('touchmove', this.onTouchMove);
        },

        onDeactivate: function() {

            // console.log('ON ROD DEACTIVATE');
        },

        onAnimFrame: function () {

            var smoothing = this.currentInputTouch ? this.SMOOTHING_TOUCH : this.SMOOTHING_DESKTOP;

            this.mouseVectors.ratioPosSmooth.x += ( this.mouseVectors.ratioPosTarget.x - this.mouseVectors.ratioPosSmooth.x ) * smoothing;
            this.mouseVectors.ratioPosSmooth.y += ( this.mouseVectors.ratioPosTarget.y - this.mouseVectors.ratioPosSmooth.y ) * smoothing;

            this.draw();
        },

        draw: function() {

            if ( !this.invalidated ) { return; }

            this.runRayPicking();

            // Relay draw calls
            this.wand.draw();
            this.mallet.draw();

            // Render
            this.renderer.render( this.scene, this.camera );
        }

    });
});