define([


    'jquery',
    'backbone',
    'underscore',
    'config',
    'howler2',
    'TweenMax',

    'three',
    'three/postprocessing/EffectComposer',
    'three/postprocessing/ClearPass',
    'three/postprocessing/RenderPass',
    'three/postprocessing/ShaderPass',

    'three/shaders/CopyShader',
    'three/shaders/BurnShader',
    'three/shaders/FXAAShader',
    'three/shaders/AdditiveBlendShader',

    'sea3d',
    'sea3dLoader',
    'sea3dLZMA',

    'view/modules/background/interactive/awwward/model/audio_collection',
    'view/modules/background/interactive/awwward/controller/audio_controller',

    'model/loader_collection',
    'model/app_model',

    'util/math_utils',

    'templates/templates',

    'view/modules/background/interactive/base_interactive_view',
    'view/modules/background/interactive/awwward/reveal/reveal_view',
    'view/modules/background/interactive/awwward/meshes/awwward/awwward',
    'view/modules/background/interactive/awwward/projects/projects_view',
    'view/modules/background/interactive/awwward/lighter/lighter_view',
    'view/modules/background/interactive/awwward/backbone/backbone_view',
    'view/modules/background/interactive/awwward/bg/background',
    'view/modules/background/interactive/awwward/thanks/thanks_view'

], function (

    $,
    Backbone,
    _,
    Config,
    Howler,
    TweenMax,

    THREE,
    EffectComposer,
    ClearPass,
    RenderPass,
    ShaderPass,

    CopyShader,
    BurnShader,
    FXAAShader,
    AdditiveBlendShader,

    SEA3D,
    SEA3DLoader,
    SEA3DLZMA,

    AudioCollection,
    AudioController,

    LoaderCollection,
    AppModel,

    MathUtils,

    Templates,

    BaseInteractiveView,
    RevealView,
    Awwward,
    ProjectView,
    LighterView,
    BackboneView,
    BackgroundView,
    ThanksView

) {

    'use strict';

    return BaseInteractiveView.extend({

        cW: null,
        cH: null,

        initialize: function() {

            _.bindAll(this,
                '_onMouseMove',
                '_onMouseLeave',
                '_onStartDelayed',
                'onTextureAlmostCleared',
                'startPhysics',
                'startRaycast'
            );
            var sounds = _.map(this.model.get('sounds'), function(item){

                var sound = new Howler.Howl({ src: [Config.CDN + item.src], sprite: item.sprite });

                // sound.once('load', onSoundLoaded);

                return {
                    id: item.id,
                    src: item.src,
                    sound: sound
                };
            });

            // console.info('Awwward.initialize');

            this.compileAndAppendTemplate(_.partial(Templates.r, 'awwward'), {});

            AudioCollection.add(sounds.filter(function (sound) { return sound; }), { merge: true });

            this.setup();
        },

        setup: function() {

            this.cW = window.innerWidth;
            this.cH = window.innerHeight;

            this.rotYPending = 0;

            this.mCoords = [0, 0];
            this.mCoordsTg = [0, 0];

            this.velDirTg = -1;
            this.velDir = -1;

            this._mOffsetY = (Config.MOBILE || Config.TABLET) ? 100 : 120;

            this._tweenObj = {
                'prReveal': 0,
                'prRevealRot': 0.38,
                'prEaseRot': 1,
                'prCameraZoom': 0
            };

            this.startPhy = false;
            this.textureClear = false;

            // setup

            this._setupTextures();
            this._setupGL();
            this._setupComposers();
            this._setupAwwward();
            this._setupPasses();

            Backbone.on('MESHES:LOADED', this.startPhysics);

            this.render();
        },

        _setupTextures: function() {

            var texturesRawData = [

                { "id": "AWWWARD_MAIN_TEXTURE", "src": "/img/home/awwward/trophie_texture.jpg" },
                { "id": "AWWWARD_MAIN_TEXTURE_MASK", "src": "/img/home/awwward/trophie_texture_mask.jpg" },
                { "id": "AWWWARD_MAIN_TEXTURE_MASK_S", "src": "/img/home/awwward/trophie_texture_mask_s.jpg" },

                { "id": "AWWWARD_BURN_TEXTURE", "src": "/img/home/awwward/burn_white_alpha.png" },

                { "id": "AWWWARD_FLAME_ANIM_INTRO_0", "src": "/img/home/awwward/light_anim_intro_0.png" },
                { "id": "AWWWARD_FLAME_ANIM_0", "src": "/img/home/awwward/light_anim_0.png" },
                { "id": "AWWWARD_FLAME_ANIM_1", "src": "/img/home/awwward/light_anim_1.png" },
                { "id": "AWWWARD_FLAME_ANIM_OUTRO_0", "src": "/img/home/awwward/light_anim_outro_0.png" },

                { "id": "AWWWARD_BACKBONE", "src": "/img/home/awwward/backbone_texture.jpg" },

                { "id": "AWWWARD_MAP_LIGHTER", "src": "/img/home/awwward/map_lighter.jpg" },
                { "id": "AWWWARD_HAZE_MASK", "src": "/img/home/awwward/map_haze_mask.png" },
                { "id": "AWWWARD_BG", "src": "/img/home/awwward/bg.jpg" },

                { "id": "AWWWARD_THANKS_NR", "src": "/img/home/awwward/thankyouNR.png" }
            ];

            this.loadedTextures = {};

            _.map(texturesRawData, function(obj, key, list){

                var img = LoaderCollection.getResult(obj.id);

                this.loadedTextures[obj.id] = {};
                this.loadedTextures[obj.id].image = img;
                this.loadedTextures[obj.id].texture = new THREE.Texture(img);
                this.loadedTextures[obj.id].texture.needsUpdate = true;

            }.bind(this));
        },

        _setupComposers: function() {

            var params = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                transparent: true
            };

            this._composerAwwward = new THREE.EffectComposer(
                this._renderer,
                new THREE.WebGLRenderTarget(this.cW, this.cH, params)
            );

            this._composerLighter = new THREE.EffectComposer(
                this._renderer,
                new THREE.WebGLRenderTarget(this.cW, this.cH, params)
            );
        },

        _setupPasses: function() {

            // passes creation
            this._passClear = new THREE.ClearPass();

            this._passRenderBg = new THREE.RenderPass(this._bg.getScene(), this._bg.getCamera());

            this._passRenderAwwward = new THREE.RenderPass(this._sceneAwwward, this._camera);
            this._passRenderAwwward.clear = false;
            this._passRenderAwwward.clearDepth = true;

            this._passRenderLighter = new THREE.RenderPass(this._sceneLighter, this._camera);

            this._passShaderBurn = new THREE.ShaderPass(THREE.BurnShader);
            this._passShaderBurn.uniforms.u_burn.value = this._reveal.getTexture();
            this._passShaderBurn.uniforms.u_offset_tex.value = new THREE.Vector2(0, 0);

            this._passBlend = new THREE.ShaderPass(THREE.AdditiveBlendShader);
            this._passBlend.uniforms.tAdd.value = this._composerAwwward.renderTarget2.texture;

            this._passShaderOutput0 = new THREE.ShaderPass(THREE.CopyShader);

            this._passShaderOutput1 = new THREE.ShaderPass(THREE.CopyShader);
            this._passShaderOutput1.renderToScreen = true;

            this._passShaderFXAA = new THREE.ShaderPass(THREE.FXAAShader);

            this._passRenderText = new THREE.RenderPass(this._thanks.getScene(), this._thanks.getCamera());

            this._passBlend2 = new THREE.ShaderPass(THREE.AdditiveBlendShader);
            this._passBlend2.uniforms.tAdd.value = this._composerLighter.renderTarget2.texture;
            // this._passBlend2.renderToScreen = true;

            // -- composer awwwards
            this._composerAwwward.addPass(this._passRenderBg);
            this._composerAwwward.addPass(this._passRenderAwwward);
            this._composerAwwward.addPass(this._passShaderBurn);
            this._composerAwwward.addPass(this._passShaderOutput0);


            // -- composer lighter
            this._composerLighter.addPass(this._passRenderLighter);
            this._composerLighter.addPass(this._passBlend);
            this._composerLighter.addPass(this._passShaderFXAA);
            this._composerLighter.addPass(this._passShaderOutput1);

            // -- text
            this._composerLighter.addPass(this._passRenderText);
            this._composerLighter.addPass(this._passBlend2);
            this._passRenderText.enabled = false;
            this._passBlend2.enabled = false;
        },

        _setupGL: function() {

            this._raycaster = new THREE.Raycaster();
            this._onClickPosition = new THREE.Vector2();
            this._mousePosition = new THREE.Vector2();

            this._cameraPos = new THREE.Vector3(0, 0, -400);
            this._cameraTarget = new THREE.Vector3(0, 0, 0);

            this._time = new THREE.Clock();

            this._sceneAwwward = new THREE.Scene();
            this._sceneLighter = new THREE.Scene();

            var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

            var pointLight = new THREE.PointLight(0xffffff, 0.2, 500);
            pointLight.position.set(0, 150, 0);

            var hlight = new THREE.HemisphereLight(0xab01aa, 0x000030, 0.5);

            this._sceneAwwward.add(ambientLight);
            this._sceneAwwward.add(pointLight);
            this._sceneAwwward.add(hlight);

            this._camera = new THREE.PerspectiveCamera(50, this.cW / this.cH, 0.1, 10000);
            this._camera.position.copy(this._cameraPos);
            this._camera.lookAt(this._cameraTarget);

            // renderer
            var maxDpr = Config.MOBILE ? 1.5 : 1.5;
            var dpr = window.devicePixelRatio >= 2 ? maxDpr : 1;

            this._renderer = new THREE.WebGLRenderer({
                antialias: false,
                alpha: true,
                autoClear: false
            });
            this._renderer.setSize(this.cW, this.cH);
            this._renderer.setPixelRatio(dpr);

            this.$node[0].appendChild(this._renderer.domElement);

            // /*
            // FOR TESTING
            //  */
            // window.scene = this._sceneAwwward;
            // window.THREE = THREE;
        },

        _setupAwwward: function() {

            this._containerMain = new THREE.Object3D();

            // awwwards
            this._bg       = this._createBg();
            this._awwward  = this._createAwwward();
            this._project  = this._createProject();
            this._lighter  = this._createLighter();
            this._backbone = this._createBackbone();
            this._reveal   = this._createReveal();
            this._thanks   = this._createThanks();

            this._world    = this._project.getWorld();

            this._addView(this._bg);
            this._addView(this._awwward);
            this._addView(this._project);
            this._addView(this._lighter);
            this._addView(this._backbone);
            this._addView(this._reveal);
            this._addView(this._thanks);

            this._containerMain.add(this._backbone.getObject());
            this._containerMain.add(this._awwward.getObject());

            this._sceneLighter.add(this._lighter.getObject());

            this._sceneAwwward.add(this._containerMain);
            this._sceneAwwward.add(this._lighter.getObjectHaze());
        },

        _createProject: function() {

            var view = new ProjectView(this._camera, this._scene);
            return view;
        },

        _createLighter: function() {

            var view = new LighterView({
                renderer: this._renderer,
                camera: this._camera,
                assets: this.loadedTextures,
                cW: this.cW,
                cH: this.cH
            });
            view.setFBOScene(this._composerLighter.renderTarget2);
            return view;
        },

        _createAwwward: function() {

            var view = new Awwward({
                renderer: this._renderer,
                height: this.cH,
                width: this.cW,
                assets: this.loadedTextures
            });
            return view;
        },

        _createBackbone: function(){

            var view = new BackboneView({
                renderer: this._renderer,
                camera: this._camera,
                assets: this.loadedTextures
            });
            return view;
        },

        _createBg: function(){

            var view = new BackgroundView({
                'assets': this.loadedTextures
            });
            return view;
        },

        _createReveal: function() {

            var view = new RevealView({
                'assets': this.loadedTextures
            });
            return view;
        },

        _createThanks: function() {

            var view = new ThanksView({
                width: this.cW,
                height: this.cH,
                assets: this.loadedTextures
            });
            return view;
        },

        // events ---------------------------------------------------------------

        addEvents: function() {

            Backbone.once('AWWWARD:TEXTURE_CLEAR', this.startRaycast);
            Backbone.once('AWWWARD:TEXTURE_CLEAR_ALMOST', this.onTextureAlmostCleared);

            if (Config.MOBILE || Config.TABLET) {
                window.addEventListener('touchmove', this._onMouseMove);
                window.addEventListener('touchend', this._onMouseLeave);
                window.addEventListener('touchstart', this._onMouseLeave);
            } else {
                window.addEventListener('mousemove', this._onMouseMove);
                window.addEventListener('mouseleave', this._onMouseLeave);
                window.addEventListener('mouseenter', this._onMouseLeave);
            }
        },

        removeEvents: function() {

            Backbone.off('MESHES:LOADED', this.startPhysics);
            Backbone.off('AWWWARD:TEXTURE_CLEAR', this.startRaycast);
            Backbone.off('AWWWARD:TEXTURE_CLEAR_ALMOST', this.onTextureAlmostCleared);

            if (Config.MOBILE || Config.TABLET) {
                window.removeEventListener('touchmove', this._onMouseMove);
                window.removeEventListener('touchend', this._onMouseLeave);
                window.removeEventListener('touchstart', this._onMouseLeave);
            } else {
                window.removeEventListener('mousemove', this._onMouseMove);
                window.removeEventListener('mouseleave', this._onMouseLeave);
                window.removeEventListener('mouseenter', this._onMouseLeave);
            }
        },

        // stuff ---------------------------------------------------------------

        _addView: function(view){

            if(this._views === null || this._views === undefined){
                this._views = [];
            }

            this._views.push(view);

            return view;
        },

        // start ---------------------------------------------------------------

        start: function() {

            TweenMax.to(this._tweenObj, 3.2, { 'prReveal': 1, 'ease': 'Circ.easeOut', 'delay': 0.3 });

            var tMult = 1.8;

            this._deltaTime = 0;

            this._reveal.start(0.3, 0.76);
            this._awwward.start(2.4 * tMult);
            this._lighter.start(2.4 * tMult);
            this._bg.start(2.12 * tMult);

            TweenMax.delayedCall(2.28 * tMult, this._onStartDelayed);
        },

        stop: function() {

        },

        startRaycast: function(){

            this._passShaderOutput1.renderToScreen = false;
            this._passBlend2.enabled = true;
            this._passBlend2.renderToScreen = true;
            this._passRenderText.enabled = true;

            this._thanks.show();
            this._textureClear = true;
        },

        // state ---------------------------------------------------------------
        //
        // show: function() {
        //
        //     console.log('Awwward.show');
        //
        //     // this.onResize();
        //     // this.onActivate();
        // },

        hide: function() {

            // console.log('Awwward.hide');
            AudioController.Master.fadeOut(0.1);
            this._removeSound();

            TweenMax.killTweensOf(this._tweenObj);

            $('html body').css('cursor', 'auto');

            if (Config.IS_OPERA || Config.IS_SAFARI || Config.IS_CHROME) {
                $('.home-page').css('cursor', '-webkit-grab');
            } else {
                $('.home-page').css('cursor', 'auto');
            }
        },

        _removeSound: function () {

            var brngLoop = AppModel.get('awww-brngLoop');
            var ambience = AppModel.get('awww-ambience');
            var bgMusic = AppModel.get('awww-bgMusic');
            var lighter = AppModel.get('awww-lighter');

            if (brngLoop) {
                brngLoop.fadeOut(0.1);
            }
            if (ambience) {
                ambience.fadeOut(0.1);
            }
            if (bgMusic) {
                bgMusic.fadeOut(0.1);
            }
            if (lighter) {
                lighter.fadeOut(0.1);
            }

            AppModel.unset('awww-brngLoop');
            AppModel.unset('awww-ambience');
            AppModel.unset('awww-bgMusic');
            AppModel.unset('awww-lighter');
        },
        onActivate: function() {

            if (this._activated) { return; }
            AudioController.Master.fadeIn(0.1);
            this._activated = true;

            // console.log('Awwward.onActivate');

            this.start();
            this.addEvents();
            if (Config.IOS && Config.MOBILE) {
                AudioController.Master.mute();

            }
            var ambience = AudioController.play('aw-bg-ambience', { loop: true, volume: 0 });
            ambience.fadeIn(2, AudioController.Levels.bgm);
            AppModel.set('awww-ambience', ambience);
            // console.log('onActivate', AppModel.has('awww-bgMusic'));
            if (!AppModel.has('awww-bgMusic')) {
                var bgMusic = AudioController.play('aw-music-p1', { loop: true, volume: 0 });
                bgMusic.fadeIn(2, AudioController.Levels.bgm);
                AppModel.set('awww-bgMusic', bgMusic);
            }

        },

        onDeactivate: function() {

            if (!this._activated) { return; }
            this._activated = false;

            // console.log('Awwward.onDeactivate');

            this.stop();
            this.removeEvents();
            this._removeSound();
            if (Config.IOS && Config.MOBILE) {
                AudioController.Master.mute();
            }
        },

        // getters / setters ---------------------------------------------------------------

        _getMousePosition: function(container, x, y) {

            var rect = {};

            rect.left = 0;
            rect.right = this.cW;

            rect.top = 0;
            rect.bottom = this.cH;

            rect.width = this.cW;
            rect.height = this.cH;

            return [
                (x - rect.left) / rect.width,
                (y - rect.top) / rect.height
            ];
        },

        _getIntersects: function( point, objects ) {

            this._mousePosition.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
            this._raycaster.setFromCamera( this._mousePosition, this._camera );

            return this._raycaster.intersectObjects( objects );
        },

       // handlers ---------------------------------------------------------------

        _onMouseMove: function(e) {

            e.preventDefault();

            var coord = e;
            if (Config.MOBILE || Config.TABLET) {
                coord = e.touches[0];
            }

            var coordNew = [0, 0];
            coordNew[0] = coord.clientX;
            coordNew[1] = coord.clientY - this._mOffsetY;

            var obj = {
                'clientX': coordNew[0],
                'clientY': coordNew[1] + this._mOffsetY
            };

            if (this._textureClear) {
                this._project.rayTest(obj);
            }

            var mPos = this._getMousePosition(null, coordNew[0], coordNew[1]);

            this._lighter.handleMove(mPos);

            this._bg.handleMove(mPos);

            this.handleMove(coordNew[0], coordNew[1]);
        },

        _onMouseLeave: function() {

            this._lighter.handleLeave();
        },

        onTextureAlmostCleared: function() {

            this._thanks.hide();

            // this._lighter.stop();

            this._textureClear = true;

            AudioController.play('aw-buildup-and-impact-p1', { volume: AudioController.Levels.sfx });

            TweenMax.to(this._tweenObj, 2.45, {
                'prCameraZoom': 1,
                'delay': 1,
                'ease': 'Sine.easeInOut',

                onStart: function() {
                    this._awwward.activateHue();
                }.bind(this),

                onComplete: function() {

                    this._passRenderText.enabled = false;
                    // this._passShaderOutput1.renderToScreen = true;
                    this._passBlend2.enabled = false;
                    this._passBlend2.renderToScreen = false;

                    // this._passShaderOutput1.renderToScreen = false;
                    this._passShaderOutput0.renderToScreen = true;

                    if (!this._stopLighter) {
                        this._composerAwwward.insertPass(this._passShaderFXAA, 2);
                    }

                    this._stopLighter = true;

                }.bind(this)
            });

            TweenMax.to(this._tweenObj, 2.45, { 'prEaseRot': 0.38, 'delay': 1, 'ease': 'Sine.easeInOut' });
        },

        _onStartDelayed: function() {

            this._reveal.tweenTo(0, 1);

            TweenMax.to(this._tweenObj, 3, { 'prRevealRot': 1, 'ease': 'Sine.easeInOut', onComplete: function(){
                this._passShaderBurn.enabled = false;
            }.bind(this) });
        },

        // handler update ---------------------------------------------------------------

        onAnimFrame: function(){

            this.update();

//             console.log('Awwward.onAnimFrame');
        },

        // handle ---------------------------------------------------------------

        handleMove: function(x, y) {

            this.mCoordsTg = [x, y];
        },

        startPhysics: function() {
            // console.log('START PHYSICS');
            this._containerMain.add(this._project.getObject());
            this._sceneAwwward.add(this._project.getCollider());
            this._sceneAwwward.add(this._project.getBox());
            this._startPhy = true;
        },

        // update ---------------------------------------------------------------

        update: function() {

            if (!this._activated) { return; }

            this.render();
        },

        render: function() {

            this.updateReveal();
            this.updateUVCoords();
            this.updateRotation();
            this.updateMotion();
            this.updateCameraZ();

            this._world.step(1/60);

            // views
            this._reveal.update();
            this._awwward.update();
            this._lighter.update();
            this._bg.update();

            if (this._startPhy) {
                this._project.update();
            }

            this._thanks.update();

            // composer
            this._composerAwwward.render(this._deltaTime);
            if (!this._stopLighter) {
                this._composerLighter.render(this._deltaTime);
            }
        },

        updateCameraZ: function() {

            var prCameraZoom = this._tweenObj.prCameraZoom;
            var z = -400 + 116 * prCameraZoom;

            this._camera.position.setZ(z);
        },

        updateReveal: function() {

            var obj = this._containerMain;
            var pr = this._tweenObj.prReveal;

            obj.position.z = 180 - (pr * 180);
        },

        updateUVCoords: function () {

            var array = this._getMousePosition(this._renderer.domElement, this.mCoordsTg[0], this.mCoordsTg[1]);
            this._onClickPosition.fromArray(array);

            var intersects = this._getIntersects(this._onClickPosition, this._awwward.getObject().children);
            this._awwward.checkIntersect(intersects);
        },

        updateRotation: function() {

            this._deltaTime = this._time.getDelta();

            var prRevealRot = this._tweenObj.prRevealRot;
            var prEaseRot = this._tweenObj.prEaseRot;

            var velDeltaLighter = this._lighter.getVelDelta();
            var velDelta = velDeltaLighter ? velDeltaLighter[0] : 0;

            var deltaRounded = ~~Math.abs(velDelta);

            var mNormX = (this.mCoords[0] / this.cW) * 2 - 1;
            var dir = mNormX < 0 ? -1 : 1;

//             console.log('deltaRounded', deltaRounded)

//             console.log('velDelta', velDelta)

//             if (deltaRounded < 4) {
//             if (deltaRounded < 2) {

                this.rotYPending += this._deltaTime * 0.98 * prEaseRot * prRevealRot * this.velDir;
                this.velDirTg = MathUtils.clamp(MathUtils.map(Math.abs(mNormX), 0.14, 0.5, 0.6, 1), 0.6, 1) * -dir;

//             } else {

//                 this.velDirTg = 0;
//             }

            this.velDir += (this.velDirTg - this.velDir) * 0.096;
        },

        updateMotion: function() {

            var prEaseRot = this._tweenObj.prEaseRot;

            this.mCoords[0] += (this.mCoordsTg[0] - this.mCoords[0]) * 0.072;
            this.mCoords[1] += (this.mCoordsTg[1] - this.mCoords[1]) * 0.072;

            var mNormX = (this.mCoords[0] / this.cW) * 2 - 1;
            var mNormY = (this.mCoords[1] / this.cH) * 2 - 1;

            var mNormUnmappedY = this.mCoords[1] / this.cH;

            var motionAngleX = MathUtils.map(-mNormY, -1, 1, 0, -Math.PI * 0.18);
            var motionAngleY = -mNormX * Math.PI * 0.16;

            var pendingRot = this._deltaTime;

            this.rotYStart = Math.PI * 0.08;

            this._containerMain.rotation.x = motionAngleX * prEaseRot;
            this._containerMain.rotation.y = this.rotYStart + (this.rotYPending + motionAngleY * prEaseRot);

            this._bg.offsetUV(mNormX, mNormY);
        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            if(this._views !== null){
                _.invoke(this._views, 'destroy');
            }
            this._views = null;

            _.each(this.loadedTextures, function(obj, key){
                obj.texture.dispose();
                obj = null;
            });
            this.loadedTextures = null;

            var m, i;
            for (i = 0; i < this._sceneAwwward.children.length; i++) {
                m = this._sceneAwwward.children[i];
                this._sceneAwwward.remove(m);
            }
            for (i = 0; i < this._sceneLighter.children.length; i++) {
                m = this._sceneLighter.children[i];
                this._sceneLighter.remove(m);
            }

            this.$node[0].removeChild(this._renderer.domElement);

            this._raycaster = null;
            this._onClickPosition = null;
            this._mousePosition = null;

            this._cameraPos = null;
            this._cameraTarget = null;

            this._time = null;

            this._sceneLighter = null;
            this._sceneAwwward = null;

            this._camera = null;
            this._renderer = null;

            this._composerAwwward.reset();
            this._composerLighter.reset();

            this._composerAwwward = null;
            this._composerLighter = null;

            BaseInteractiveView.prototype.destroy.call(this);
        },

        // resize ---------------------------------------------------------------

        onResize: function() {

            // console.log('Awwward.onResize');

            var w = this.cW = window.innerWidth;
            var h = this.cH = window.innerHeight;

            var pixelRatio = this._renderer.getPixelRatio();

            window.pixelRatioApp = pixelRatio;

            var newWidth = Math.floor(w * pixelRatio) || 1;
            var newHeight = Math.floor(h * pixelRatio) || 1;

            this._camera.aspect = this.cW / this.cH;
            this._camera.updateProjectionMatrix();

            this._renderer.setSize(this.cW, this.cH);

            this._composerAwwward.setSize(newWidth, newHeight);
            this._composerLighter.setSize(newWidth, newHeight);

            this._passShaderFXAA.uniforms['resolution'].value.set(
                1 / (newWidth),
                1 / (newHeight)
            );

            this._awwward.resize(this.cW, this.cH);
            this._lighter.resize(this.cW, this.cH);
            this._bg.resize(this.cW, this.cH);
            this._thanks.resize(this.cW, this.cH);
        }
    });
});
