define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'three',
    'TweenMax',

    'view/modules/background/interactive/awwward/controller/audio_controller',
    'model/loader_collection',
    'model/app_model',

    'util/spritesheet/sprite_animation_texture',
    'util/math_utils',

    'view/common/base_view',

    'view/modules/background/interactive/awwward/lighter/lighter_texture_canvas',

    'text!view/modules/background/interactive/awwward/lighter/shaders/flame_vs.glsl',
    'text!view/modules/background/interactive/awwward/lighter/shaders/flame_fs.glsl',

    'text!view/modules/background/interactive/awwward/lighter/shaders/haze_vs.glsl',
    'text!view/modules/background/interactive/awwward/lighter/shaders/haze_fs.glsl',

    'text!view/modules/background/interactive/awwward/lighter/shaders/burn_vs.glsl',
    'text!view/modules/background/interactive/awwward/lighter/shaders/burn_fs.glsl'

], function(

    $,
    _,
    Backbone,
    Config,
    THREE,
    TweenMax,

    AudioController,
    LoaderCollection,
    AppModel,

    SpriteAnimation,
    MathUtils,

    BaseView,

    LighterTextureCanvas,

    vs,
    fs,

    hazeVs,
    hazeFs,

    burnVs,
    burnFs

) {
    'use strict';

    var View = BaseView.extend({

        initialize: function(opts) {

            _.bindAll(this,
                'onAnimPlay',
                'onAnimEnd',
                'onAnimRenderFrame',
                'onStartDelayed',
                'onTextureCleared',
                'onTextureAlmostCleared',
                'onTextureLighterCleared'
            );

            this.init(opts);
        },

        init: function(opts) {

            this.setup(opts);
        },

        setup: function(opts) {

            var initCoords = [0.75, 0.80];

            var initCoordsMapped = [
                initCoords[0] * 2 - 1, 
                initCoords[1] * 2 - 1
            ];

            this.mCoords = [initCoordsMapped[0], initCoordsMapped[1]];
            this.mCoordsTg = [initCoordsMapped[0], initCoordsMapped[1]];

            this.rCoords = [0, 0];
            this.rCoordsTg = [0, 0];

            this.distortOffset = [0, 0];
            this.distortOffsetDest = [0, 0];
            this.distortOffsetVel = [0, 0];

            this.velCoordsDirection = [0, 0];

            this.assets = opts.assets;

            this._camera = opts.camera;
            this._object = new THREE.Object3D();

            this._started = null;
            this._activated = null;

            this.assets = opts.assets;

            this._setupLighterMesh(opts);
            this._setupFlameMesh(opts);
            this._setupFlameAnims(opts);
            this._setupHaze(opts);

            this.addEvents();
        },

        addEvents: function() {

            Backbone.once('AWWWARD:TEXTURE_CLEAR_ALMOST', this.onTextureAlmostCleared);
            Backbone.once('AWWWARD:LIGHTER:TEXTURE_CLEAR_COMPLETE', this.onTextureLighterCleared);
        },

        _setupLighterMesh: function(opts) {

            this._lighterTex = new LighterTextureCanvas({
                texture: this.assets['AWWWARD_MAIN_TEXTURE'].texture,
                renderer: opts.renderer,
                assets: this.assets
            });

            var loader = new THREE.OBJLoader();
            var object = loader.parse(LoaderCollection.getResult('AWWWARD_LIGHTER_OBJECT'));
            var geo = object.children[0].geometry;
            var tex = this.assets['AWWWARD_MAP_LIGHTER'].texture;

            this._FBOBurnTexture = this._lighterTex.getFBOTexture();
            this._FBOBurnTexture.minFilter = THREE.LinearFilter;
            this._FBOBurnTexture.magFilter = THREE.LinearFilter;

            var mat = new THREE.ShaderMaterial({
                uniforms: {
                    u_defaultMap: { type: 't', value: tex },
                    u_burnMap: { type: 't', value: this._FBOBurnTexture }
                },
                side: THREE.DoubleSide,
                transparent: true,
                vertexShader: burnVs,
                fragmentShader: burnFs
            });

            this.meshLighter = new THREE.Mesh(geo, mat);
            this.meshLighter.position.y = -98;
            this.meshLighter.position.x = 4;

            this._object.add(this.meshLighter);
        },

        _setupFlameMesh: function(opts) {

            var params = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                transparent: true
            };

            var tW = 128 * 0.14;
            var tH = 512 * 0.14;

            var sW = 1;
            var sH = 40; // 20

            var geo = new THREE.PlaneBufferGeometry(tW, tH, sW, sH);

            this.vecFrame = new THREE.Vector4();
            this.vecDistort = new THREE.Vector2(0, 0);

            var mat = new THREE.ShaderMaterial({
                uniforms: {
                    iChannel0: { type: "t", value: null },
                    u_frame: { type: "v4", value: this.vecFrame },
                    u_vecDistort: { type: 'v2', value: this.vecDistort }
                },
                blending: THREE.AdditiveBlending,
                transparent: true,
                fragmentShader: fs,
                vertexShader: vs,
                side: THREE.BackSide
            });

            this.meshFlame = new THREE.Mesh(geo, mat);
            this.meshFlame.position.z = 8; // 10 // 12

            this._object.position.z = -10; // 0 // 10 // TEMP
            this._object.add(this.meshFlame);
        },

        _setupFlameAnims: function(opts) {

            var assets = this.assets;

            this.anims = _.map(FRAME_DATAS, function(data) {

                data.assets = assets;

                return new SpriteAnimation(null, data);
            });

            this.setAnimation('flame_intro');
        },

        // haze ---------------------------------------------------------------

        _setupHaze: function(opts) {

            this.initHazeGeo();
            this.initHazeInstances();
            this.initHazeMesh();
        },

        initHazeGeo: function() {

            var NUM_HAZE_PLANES = this.NUM_HAZE_PLANES = 4;

            this.geoHaze = new THREE.InstancedBufferGeometry();
            this.geoHaze.maxInstancedCount = NUM_HAZE_PLANES;

            var geo = new THREE.PlaneBufferGeometry(42, 42);
            var geoAttr = geo.attributes;

            this.geoHaze.addAttribute('position', new THREE.BufferAttribute(new Float32Array(geoAttr.position.array), 3));
            this.geoHaze.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(geoAttr.uv.array), 2));
            this.geoHaze.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(geoAttr.normal.array), 3));
            this.geoHaze.setIndex(new THREE.BufferAttribute(new Uint16Array(geo.index.array), 1));

            geo.dispose();
        },

        initHazeInstances: function() {

            var num = this.NUM_HAZE_PLANES;

            var a_base        = new THREE.InstancedBufferAttribute(new Float32Array(num * 3), 3);
            var a_offset      = new THREE.InstancedBufferAttribute(new Float32Array(num * 3), 3);
            var a_orientation = new THREE.InstancedBufferAttribute(new Float32Array(num * 4), 4);
            var a_scale       = new THREE.InstancedBufferAttribute(new Float32Array(num * 2), 2);
            var a_rotation    = new THREE.InstancedBufferAttribute(new Float32Array(num), 1);
            var a_life        = new THREE.InstancedBufferAttribute(new Float32Array(num), 1);

            for (var i = 0; i < num; i++) {
                a_life.setX(i, i / num + 1);
            }

            this._z = new THREE.Vector3(0, 0, 1);

            this.geoHaze.addAttribute('a_base', a_base);
            this.geoHaze.addAttribute('a_offset', a_offset);
            this.geoHaze.addAttribute('a_orientation', a_orientation);
            this.geoHaze.addAttribute('a_scale', a_scale);
            this.geoHaze.addAttribute('a_rotation', a_rotation);
            this.geoHaze.addAttribute('a_life', a_life);
        },

        initHazeMesh: function() {

            var map = this.assets['AWWWARD_HAZE_MASK'].texture;

            var dpr = window.pixelRatioApp;

            var uniforms = {
                uMap: { type: 't', value: null },
                uMask: { type: 't', value: map },
                uResolution: { type: 'v2', value: new THREE.Vector2(this.wW * dpr, this.wH * dpr) },
            };

            var mat = this.matHaze = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: hazeVs,
                fragmentShader: hazeFs,
                side: THREE.BackSide,
                transparent: true,
                depthTest: false
            });

            this.quatHaze = new THREE.Quaternion();

            this.meshHaze = new THREE.Mesh(this.geoHaze, this.matHaze);
            this.meshHaze.visible = false;
            this.meshHaze.frustumCulled = false;
        },

        // states toggle ---------------------------------------------------------------

        start: function(d_) {

            if (this._started){ return; }
            this._started = true;

            var d = d_ || 0;
            TweenMax.delayedCall(d, this.onStartDelayed);

            this.activate();
        },

        stop: function() {

            if (!this._started){ return; }
            this._started = false;

            this._lighterTex.start();

            this.playAnimation('flame_outro');

            if (AppModel.has('awww-bgMusic')) {
                var currBGM = AppModel.get('awww-bgMusic');
                currBGM.fadeOut(2);
            }
            var bgMusic = AudioController.play('aw-music-p2', { loop: true, volume: 0 });
            bgMusic.fadeIn(2, AudioController.Levels.bgm);
            AppModel.set('awww-bgMusic', bgMusic);
        },

        activate: function() {

            if (this._activated){ return; }
            this._activated = true;

            $('html body .home-page').css('cursor', 'none');
        },

        deactivate: function() {

            if (!this._activated){ return; }
            this._activated = false;

            this._object.visible = false;
            this.meshHaze.visible = false;

            $('html body').css('cursor', 'auto');
            
            if (Config.IS_OPERA || Config.IS_SAFARI || Config.IS_CHROME) {
                $('.home-page').css('cursor', '-webkit-grab');
            } else {
                $('.home-page').css('cursor', 'auto');
            }
        },

        // animations ---------------------------------------------------------------

        setAnimation: function(name) {

            if (this.anim) {
                this.anim.off('play', this.onAnimPlay);
                this.anim.off('end', this.onAnimEnd);
                this.anim.off('renderFrame', this.onAnimRenderFrame);
            }

            this.anim = this.getAnimationByName(name);
            this.anim.show();
            this.anim.enableRender();

            this.anim.on('play', this.onAnimPlay);
            this.anim.on('end', this.onAnimEnd);
            this.anim.on('renderFrame', this.onAnimRenderFrame);

            this.anim.setFrame(0);
        },

        playAnimation: function(name) {

            this.setAnimation(name);

            this.anim.playSequence('default');
        },

        getAnimationByName: function(name) {
            return _.findWhere(this.anims, { 'name': name });
        },

        // getters / setters ---------------------------------------------------------------

        getObject: function() {
            return this._object;
        },

        getObjectHaze: function() {

            return this.meshHaze;
        },

        getWorldCoordinates: function(coords, vecTarget) {

            var vec = new THREE.Vector3();
            vec.set(
                coords[0] * 2 - 1,
                -coords[1] * 2 + 1,
                0.5
            );
            vec.unproject(this._camera);

            var dir = vec.sub(this._camera.position).normalize();
            var dist = (vecTarget.z - this._camera.position.z) / dir.z;
            var pos = this._camera.position.clone().add(dir.multiplyScalar(dist));

            return pos;
        },

        setFBOScene: function(tex) {

            this._FBOScene = tex;

            this.meshHaze.material.uniforms['uMap'].value = this._FBOScene.texture;
        },

        getVelDirection: function() {

            return this.velCoordsDirection;
        },

        getVelDelta: function() {

            var dX = this._activated ? this.deltaX * 100 || 0 : 0;
            var dY = this._activated ? this.deltaY * 100 || 0 : 0;

            return [
                (dX.toFixed(2)) / 1,
                (dY.toFixed(2)) / 1
            ];
        },

        // handle ---------------------------------------------------------------

        handleLeave: function() {

            this.distortOffsetDest = [0, 0];
        },

        handleMove: function(coords) {

            var coordsMapped = [];

            this.velCoordsDirection = [
                coords[0] - this.mCoords[0] > 0 ? 1 : -1,
                coords[1] - this.mCoords[1] > 0 ? 1 : -1
            ];

            coordsMapped[0] = coords[0] * 2 - 1;
            coordsMapped[1] = coords[1] * 2 - 1;

            coordsMapped[0] = MathUtils.clamp(MathUtils.map(coordsMapped[0], -0.28, 0.28, -1, 1), -1, 1);
            coordsMapped[1] = MathUtils.clamp(MathUtils.map(coordsMapped[1], -0.28, 0.28, -1, 1), -1, 1);

            this.mCoordsTg = coords;
            this.rCoordsTg = coordsMapped;
        },

        // handlers ---------------------------------------------------------------

        onIntersect: function( intersects ) {
        },

        onStartDelayed: function() {

            this.playAnimation('flame_intro');
            var lighter = AudioController.play('aw-lighter-lighting', { volume: AudioController.Levels.sfx });
            AppModel.set('awww-lighter', lighter);
            // if (AppModel.has('awww-bgMusic')) {
            //     var currBGM = AppModel.get('awww-bgMusic');
            //     currBGM.fadeOut(2);
            // }

            TweenMax.delayedCall(0.58, function() {

                this.meshHaze.visible = true;

            }.bind(this));
        },

        onAnimPlay: function() {

            this.currAnim = this.anim.name;
        },

        onAnimEnd: function() {

            if (this.currAnim === 'flame_intro') {
                this.playAnimation('flame_idle');
            }

            if (this._started && this.currAnim === 'flame_idle') {
                this.playAnimation('flame_idle');
            }

            if (this.currAnim === 'flame_outro') {
                this.meshHaze.visible = false;
            }
        },

        onAnimRenderFrame: function(f, output) {

            this.frame = f;
            this.flameTex = output;

            this.meshFlame.material.uniforms['iChannel0'].value = this.flameTex;
        },

        onTextureCleared: function() {

        },

        onTextureLighterCleared: function() {

            this._object.visible = false;
            
            this.deactivate();
        },

        onTextureAlmostCleared: function() {

            this.stop();
        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            this.deactivate();

            this._lighterTex.destroy();

            this.meshLighter.geometry.dispose();
            this.meshLighter.material.dispose();

            this.meshFlame.geometry.dispose();
            this.meshFlame.material.dispose();

            this.meshHaze.geometry.dispose();
            this.meshHaze.material.dispose();

            this.quatHaze = null;
        },

        // update ---------------------------------------------------------------

        update: function() {

            if (!this._activated) { return; }

            this.updateFlameCoords();
            this.updateFlameFrame();
            this.updateFlameDistort();
            this.updateHazeEffect();
            this.updateBurnEffect();
        },

        updateBurnEffect: function() {

            if (this._FBOBurnTexture && this._lighterTex._started) {
                this._lighterTex.update();
            }
        },

        updateFlameCoords: function() {

            this.mCoords[0] += (this.mCoordsTg[0] - this.mCoords[0]) * 0.16;
            this.mCoords[1] += (this.mCoordsTg[1] - this.mCoords[1]) * 0.16;

            this.rCoords[0] += (this.rCoordsTg[0] - this.rCoords[0]) * 0.09;
            this.rCoords[1] += (this.rCoordsTg[1] - this.rCoords[1]) * 0.09;

            var vecPos = this.getWorldCoordinates(this.mCoords, this._object.position.clone());

            var mNormX = this.mCoords[0] * 2 - 1;
            var mNormY = this.mCoords[1] * 2 - 1;

            var deltaX = this.deltaX = this.mNormX - mNormX || 0;
            var deltaY = this.deltaY = this.mNormY - mNormY || 0;

            deltaX *= 1.8;
            deltaY *= 1.8;

            this.distortOffsetDest[0] = MathUtils.map(deltaX, -1, 1, -32, 32);
            this.distortOffsetDest[1] = MathUtils.map(deltaY, -1, 1, -32, 32);

            this._object.rotation.y = this.rCoords[0] * Math.PI * 0.16;
            this._object.rotation.z = -this.rCoords[0] * Math.PI * 0.14;

            this.meshFlame.scale.x = 1.0 + Math.abs(this.rCoords[0]) * 0.5;

            if (this._started){
                this._object.position.copy(vecPos);
            }

            this.mNormX = mNormX;
            this.mNormY = mNormY;
        },

        updateFlameDistort: function() {

            var s = -0.07; // 0.07 // 0.14 // stiffle
            var d = -0.38; // 0.38 // 0.42 // dampling

            this.distortOffsetVel[0] += MathUtils.spring(this.distortOffset[0], this.distortOffsetDest[0], this.distortOffsetVel[0], s, d);
            this.distortOffsetVel[1] += MathUtils.spring(this.distortOffset[1], this.distortOffsetDest[1], this.distortOffsetVel[1], s, d);

            this.distortOffset[0] += this.distortOffsetVel[0];
            this.distortOffset[0] = MathUtils.clamp(this.distortOffset[0], -1.2, 1.2);

            this.distortOffset[1] += this.distortOffsetVel[1];
            this.distortOffset[1] = MathUtils.clamp(this.distortOffset[1], -1.2, 1.2);

            this.vecDistort.set(this.distortOffset[0], this.distortOffset[1]);
        },

        updateFlameFrame: function() {

            if (this.anim) {

                this.anim.update();

                var f = this.frame;

                this.vecFrame.set(f.x, f.y, f.width, f.height);
            }
        },

        updateHazeEffect: function() {

            var geo = this.geoHaze;

            var a_life = geo.attributes.a_life;
            var a_base = geo.attributes.a_base;
            var a_offset = geo.attributes.a_offset;
            var a_scale = geo.attributes.a_scale;
            var a_orientation = geo.attributes.a_orientation;
            var a_rotation = geo.attributes.a_rotation;

            for (var i = 0; i < this.NUM_HAZE_PLANES; i++) {

                var l = a_life.array[i];
                l += 0.012;

                if (l > 1) {

                    l -= 1;

                    a_rotation.setX(
                        i,
                        MathUtils.random(0, 3.14, 3)
                    );

                    a_base.setXYZ(
                        i,
                        this._object.position.x,
                        this._object.position.y + 4,
                        this._object.position.z
                    );

                    a_offset.setXYZ(
                        i,
                        MathUtils.random(-0.2, 0.2, 3),
                        MathUtils.random(2.5, 3.0, 3) * 18,
                        0
                    );

                    a_scale.setXY(
                        i,
                        MathUtils.random(0.6, 1.2, 3),
                        MathUtils.random(0.6, 1.2, 3)
                    );

                }

                this.quatHaze.setFromAxisAngle(this._z, a_rotation.array[i]);

                a_orientation.setXYZW(i, this.quatHaze.x, this.quatHaze.y, this.quatHaze.z, this.quatHaze.w);

                a_life.setX(i, l);
            }

            a_life.needsUpdate = true;
            a_base.needsUpdate = true;
            a_offset.needsUpdate = true;
            a_scale.needsUpdate = true;
            a_orientation.needsUpdate = true;
        },

        // resize ---------------------------------------------------------------

        resize: function(w, h) {

            this.wW = w;
            this.wH = h;

            var dpr = window.pixelRatioApp;

            if (this.geoHaze) {
                this.meshHaze.material.uniforms['uResolution'].value.set(this.wW * dpr, this.wH * dpr);
            }
        }

    });

    var FRAME_DATAS = [{
        name: 'flame_intro',
        fps: 30, // 11
        framesTotal: 17,
        frameWidth: 128,
        frameHeight: 512,
        spritesheets: [
            { id: 'AWWWARD_FLAME_ANIM_INTRO_0', framesTotal: 17 },
        ],
        sequences: [
            { name: 'default', loops: 1, startFrame: 0, endFrame: 16 }
        ]
    }, {
        name: 'flame_idle',
        fps: 30, // 11
        framesTotal: 91,
        frameWidth: 128,
        frameHeight: 512,
        spritesheets: [
            { id: 'AWWWARD_FLAME_ANIM_0', framesTotal: 64 },
            { id: 'AWWWARD_FLAME_ANIM_1', framesTotal: 27 }
        ],
        sequences: [
            { name: 'default', loops: 1, startFrame: 0, endFrame: 90 }
        ]
    }, {
        name: 'flame_outro',
        fps: 30,
        framesTotal: 9,
        frameWidth: 128,
        frameHeight: 512,
        spritesheets: [
            { id: 'AWWWARD_FLAME_ANIM_OUTRO_0', framesTotal: 9 },
        ],
        sequences: [
            { name: 'default', loops: 1, startFrame: 0, endFrame: 8 }
        ]
    }];

    return View;

});
