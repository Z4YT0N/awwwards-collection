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
    'model/sound_model',

    'howler',
    'three',

    'view/modules/background/interactive/cubes/cubes_item'

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
    SoundModel,

    Howler,
    THREE,

    CubesItem

) { 'use strict';

    return BaseInteractiveView.extend({

        TEXTURES_COUNT : 0,
        loadedTextures : null,

        CAMERA_FOV     : 75,
        CAMERA_Z       : 200,

        isReady        : false,

        $window        : null,
        $document      : null,

        windowSizing   : null,
        mouseVectors   : null,

        width          : 0,
        height         : 0,

        renderer       : null,
        scene          : null,
        camera         : null,
        raycaster      : null,

        SPAWN_DELAY    : 1000,
        ITEM_COUNT     : Config.MOBILE ? 15 : 30,
        items          : null,
        running        : 4,
        spawnTimer     : null,

        collisions     : 0,
        COLLIDE_COUNT  : 10,
        bgSwapped      : false,

        lightSound     : null,
        darkSound      : null,
        hitSoundA      : null,
        hitSoundB      : null,
        hitSoundC      : null,
        hitSoundD      : null,
        hitSounds      : null,

        muted          : false,


        // SETUP ---------------------------------------------------------------

        initialize: function(options) {

            _.bindAll( this,
                'onMouseMove',
                'onTouchMove',
                'increaseCount',
                'onTextureLoaded',
                'afterTexturesLoaded'
            );

            //console.log( this.model);

            this.compileAndAppendTemplate(_.partial(Templates.r, 'cubes'), {});

            this.$window    = $(window);
            this.$document  = $(document);

            this.setup();
        },

        setup: function() {

            this.windowSizing = {
                width: 0,
                height: 0,
                ratio: 0,
                pixelRatio: window.devicePixelRatio
            };

            this.mouseVectors = {
                pos            : new THREE.Vector2(),
                offsetPos      : new THREE.Vector2(),
                ratioPos       : new THREE.Vector2(),
                ratioPosTarget : new THREE.Vector2(),
                ratioPosSmooth : new THREE.Vector2(),
                prevPos        : new THREE.Vector2(),
                speed          : new THREE.Vector2()
            };

            if(!Config.MOBILE){
                this.setupSounds();
            }

            this.renderer = new THREE.WebGLRenderer({ 'antialias': true, 'alpha': true });

            this.renderer.setPixelRatio( this.windowSizing.pixelRatio );
            this.renderer.setClearColor( 0x000000 );
            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.$node.append( this.renderer.domElement );

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera( this.CAMERA_FOV, window.innerWidth / window.innerHeight, 1, 2000 );
            this.camera.position.z = this.CAMERA_Z;

            this.raycaster = new THREE.Raycaster();

            this.loadTextures();
        },

        setupSounds: function () {

            this.hitSounds = [];

            this.lightSound = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[0].src ],
                volume: 1,
                loop: true
            });

            this.darkSound = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[1].src ],
                volume: 1,
                loop: true
            });

            this.hitSoundA = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[2].src ],
                volume: 0.7
            });

            this.hitSoundB = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[3].src ],
                volume: 0.7
            });

            this.hitSoundC = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[4].src ],
                volume: 0.7
            });

            this.hitSoundD = new Howler.Howl(
            {
                urls: [ Config.CDN + this.model.get('sounds')[5].src ],
                volume: 0.7
            });

            this.hitSounds.push(this.hitSoundA);
            this.hitSounds.push(this.hitSoundB);
            this.hitSounds.push(this.hitSoundC);
            this.hitSounds.push(this.hitSoundD);

            if ( SoundModel.muted === true ) {

                this.lightSound.volume( 0 );
                this.darkSound.volume( 0 );
                this.hitSoundA.volume( 0 );
                this.hitSoundB.volume( 0 );
                this.hitSoundC.volume( 0 );
                this.hitSoundD.volume( 0 );

                this.muted = true;
            }
        },

        loadTextures: function () {

            this.TEXTURES_COUNT = this.model.get('textures').length;
            this.loadedTextures = [];

            this.afterTexturesLoaded = _.after( this.TEXTURES_COUNT, this.afterTexturesLoaded );

            for ( var i = 0; i < this.TEXTURES_COUNT; i++ ) {

                var textureLoader = new THREE.TextureLoader();
                textureLoader.crossOrigin = '';
                textureLoader.load(
                    Config.CDN + this.model.get('textures')[i].src,
                    this.onTextureLoaded
                );
            }
        },

        onTextureLoaded: function (texture) {

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            // texture.anisotropy = this.renderer.getMaxAnisotropy();

            this.loadedTextures.push( texture );

            this.afterTexturesLoaded();
        },

        // Bound with _.after to only fire once called this.TEXTURES_COUNT amount of times
        afterTexturesLoaded: function () {

            this.createItems();

            this.addEvents();

            this.isReady = true;
        },

        createItems: function () {

            this.items = [];

            for ( var i = 0; i < this.ITEM_COUNT; i++ ) {

                var item = _.create( CubesItem );

                var textureIndex = i % this.TEXTURES_COUNT;

                item.init({
                    'index'         : i,
                    'count'         : this.ITEM_COUNT,
                    'windowSizing'  : this.windowSizing,
                    'mouseVectors'  : this.mouseVectors,
                    'parent'        : this,
                    'texture'       : this.loadedTextures[ textureIndex ],
                    'textureIndex'  : textureIndex,
                    'cameraFov'     : this.CAMERA_FOV,
                    'cameraZ'       : this.CAMERA_Z
                });

                this.items.push( item );

                this.scene.add( item.getOrigin() );

                item.on('collision', this.onItemCollision, this);
            }
        },

        destroy: function () {

            clearInterval( this.spawnTimer );

            for ( var i = 0; i < this.ITEM_COUNT; i++ ){

                this.items[i].off('collision', this.onItemCollision, this);
                this.items[i].destroy();
            }

            this.windowSizing = null;
            this.mouseVectors = null;
            this.renderer = null;
            this.scene = null;
            this.camera = null;
            this.raycaster = null;
            this.loadedTextures = null;
            this.items = null;

            BaseInteractiveView.prototype.destroy.call(this);
        },

        increaseCount: function () {

            // console.log('increase');
            this.running += 1;
            this.items[this.running].reset();

            //console.log('Running items: ' + this.running );
        },

        onResize: function() {

            this.windowSizing.width = this.$window.width();
            this.windowSizing.height = this.$window.height();
            this.windowSizing.ratio = this.windowSizing.width / this.windowSizing.height;

            this.windowSizing.pixelRatio = window.devicePixelRatio;

            this.camera.aspect = this.windowSizing.width / this.windowSizing.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setPixelRatio( this.windowSizing.pixelRatio );
            this.renderer.setSize( this.windowSizing.width, this.windowSizing.height );

            if ( this.isReady ) {

                for ( var i = 0; i < this.ITEM_COUNT; i++ ) {

                    this.items[i].resize();
                }
            }
        },

        onMouseMove: function (e) {

            if ( !this.isReady ) { return; }

            if ( !this.mouseVectors ) { return; }

            this.mouseVectors.pos.set( e.clientX, e.clientY );

            var offsetX = this.mouseVectors.pos.x - ( this.windowSizing.width * 0.5 );
            var offsetY = this.mouseVectors.pos.y - ( this.windowSizing.height * 0.5 );
            this.mouseVectors.offsetPos.set(offsetX, offsetY);

            var ratioX = ( this.mouseVectors.pos.x / this.windowSizing.width ) * 2 - 1;
            var ratioY = ( this.mouseVectors.pos.y / this.windowSizing.height ) * 2 - 1;
            // We're using THREE's coordinate system, so the Y ratio should be positive above the center of the screen
            this.mouseVectors.ratioPos.set(ratioX, ratioY * -1);

            this.mouseVectors.ratioPosTarget.copy( this.mouseVectors.ratioPos );
        },

        onTouchMove: function (e) {

            e.preventDefault();
            e.stopPropagation();

            e.clientX = e.originalEvent.touches[0].clientX;
            e.clientY = e.originalEvent.touches[0].clientY;

            this.onMouseMove(e);
        },

        onItemCollision: function () {

            if(!Config.MOBILE){
                var hitSound = this.hitSounds[ parseInt( Math.random() * 4, 10 ) ];
                hitSound.play();
            }

            if ( this.collisions >= this.COLLIDE_COUNT ) {

                this.collisions = 0;

                if ( this.bgSwapped ) {

                    this.renderer.setClearColor( 0x000000 );

                    if(!Config.MOBILE){
                        this.lightSound.fade(1, 0, 200);
                        this.darkSound.fade(0, 0.5, 200);
                    }

                    this.bgSwapped = false;
                }
                else {

                    this.renderer.setClearColor( 0xffffff );

                    if(!Config.MOBILE){
                        this.lightSound.fade(0, 0.5, 200);
                        this.darkSound.fade(1, 0, 200);
                    }

                    this.bgSwapped = true;
                }

                for ( var i = 0; i < this.ITEM_COUNT; i++ ) {

                    this.items[i].resetTexture( this.bgSwapped );
                }
            }
            else {

                this.collisions += 1;
            }

            // console.log('colide!', this.collisions);
        },

        hide: function () {

            if(!Config.MOBILE){
                this.lightSound.unload();
                this.darkSound.unload();
                this.hitSoundA.unload();
                this.hitSoundB.unload();
                this.hitSoundC.unload();
                this.hitSoundD.unload();
            }

            this.$document.off('mousemove', this.onMouseMove);
            this.$document.off('touchmove', this.onTouchMove);

            BaseInteractiveView.prototype.hide.call(this);
        },

        onActivate: function() {

            // console.log('ON ROD ACTIVATE');

            this.$document.on('mousemove', this.onMouseMove);
            this.$document.on('touchmove', this.onTouchMove);

            this.increaseCount = _.before( this.ITEM_COUNT - this.running, this.increaseCount );
            this.spawnTimer = setInterval( this.increaseCount, this.SPAWN_DELAY );

            if ( !this.muted && !Config.MOBILE) {

                this.lightSound.volume(0);
                this.darkSound.fade(0, 0.5, 1000);

                this.lightSound.play();
                this.darkSound.play();
            }
        },

        onDeactivate: function() {

            // console.log('ON ROD DEACTIVATE');
        },

        onAnimFrame: function () {

            var time = Date.now();

            this.draw(time);
        },

        draw: function(time) {

            if ( !this.isReady ) { return; }

            this.mouseVectors.ratioPosSmooth.x += ( this.mouseVectors.ratioPosTarget.x - this.mouseVectors.ratioPosSmooth.x ) * 0.3;
            this.mouseVectors.ratioPosSmooth.y += ( this.mouseVectors.ratioPosTarget.y - this.mouseVectors.ratioPosSmooth.y ) * 0.3;

            this.mouseVectors.speed.set(
                this.mouseVectors.ratioPosSmooth.x - this.mouseVectors.prevPos.x,
                this.mouseVectors.ratioPosSmooth.y - this.mouseVectors.prevPos.y
            );
            this.mouseVectors.prevPos.copy( this.mouseVectors.ratioPosSmooth );

            this.raycaster.setFromCamera( this.mouseVectors.ratioPosSmooth, this.camera );

            for ( var i = 0; i < this.ITEM_COUNT; i++ ) {

                this.items[i].checkRaycaster( this.raycaster );
                this.items[i].draw(time);
            }

            // Render
            this.renderer.render( this.scene, this.camera );
        },


    });
});
