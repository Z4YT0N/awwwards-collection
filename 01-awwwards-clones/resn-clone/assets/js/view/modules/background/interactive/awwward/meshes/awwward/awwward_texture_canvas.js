define([

    'jquery',
    'backbone',
    'underscore',
    'config',
    'three',
    'TweenMax',

    'model/app_model',
    'view/modules/background/interactive/awwward/controller/audio_controller',

    'view/common/base_view',
    'view/modules/background/interactive/awwward/meshes/awwward/burn_item',

    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/basic_vertex.shader',
    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/basic_fragment.shader',

    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/buffer_vertex.shader',
    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/buffer_fragment.shader'

], function(

    $,
    Backbone,
    _,
    Config,
    THREE,
    TweenMax,

    AppModel,
    AudioController,

    BaseView,
    BurnItemView,

    basicVertexShader,
    basicFragmentShader,

    bufferVertexShader,
    bufferFragmentShader

) {
    'use strict';

    return BaseView.extend({

        tW: 256, // 1024
        tH: 256, // 1024

        _burnTexturePt: null,

        _timer: 0,
        _indexOut: 0,

        _burnPlanes: [],
        _burnZoneNumber: 6,

        _maxPlanesBurn: 50,

        isPhysicCalled: false,

        initialize: function(opts) {

            _.bindAll(this, 'onDelayedReadPixels');

            this.assets = opts.assets;

            this.init(opts);
        },

        init: function(opts) {

            this.setup(opts);
        },

        setup: function(opts) {

            this._setupWebgl(opts);
            this._setupFBO();
        },

        _setupWebgl: function(opts) {

            this._burnTexturePt = new THREE.Vector2();

            this._cameraPos = new THREE.Vector3( 0, 0, 0 );

            this._renderer = opts.renderer;
            this._mainTexture = opts.texture;

            this._bufferScene = new THREE.Scene();

            this._camera = new THREE.OrthographicCamera(
                this.tW / -2,
                this.tW / 2,
                this.tH / 2,
                this.tH / -2,
                -10000,
                10000
            );

            this._camera.position.copy(this._cameraPos);
        },

        _setupFBO: function() {

            var params = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                transparent: true
            };

            this._FBO_1 = new THREE.WebGLRenderTarget(this.tW, this.tH, params);
            this._FBO_2 = new THREE.WebGLRenderTarget(this.tW, this.tH, params);

            this._planeBufferGeometry = new THREE.PlaneGeometry(this.tW, this.tH, 1, 1);

            this._planeBufferUniforms = {
                u_diffuse: { type: 't', value: this._FBO_1.texture },
                u_resolution: { type: 'v', value: new THREE.Vector2(1 / this.tW, 1 / this.tH) }
            };

            var matBuffer = new THREE.ShaderMaterial({
                uniforms: this._planeBufferUniforms,
                transparent: true,
                fragmentShader: bufferFragmentShader,
                vertexShader: bufferVertexShader
            });

            var matOutput = new THREE.ShaderMaterial({
                uniforms: this._planeBufferUniforms,
                transparent: true,
                fragmentShader: basicFragmentShader,
                vertexShader: basicVertexShader
            });

            this._planeBufferMesh = new THREE.Mesh(this._planeBufferGeometry, matBuffer);
            this._planeOutputMesh = new THREE.Mesh(this._planeBufferGeometry, matOutput);

            this._bufferScene.add(this._planeBufferMesh);

            /**
             * FOR TESTING
             */

            /*$(window).on('click', function() {
                this._renderer.clearTarget(this._FBO_1);
                this._renderer.clearTarget(this._FBO_2);
            }.bind(this));*/
        },

        // state ---------------------------------------------------------------

        _setCanvasDrawPosition: function(x, y) {

            var newPoint = new THREE.Vector2(x * this.tW - this.tW * 0.5, (y * this.tH - this.tH * 0.5) * -1);

            this._burnTexturePt.copy(newPoint);

            if (!this._hasPlayedFirstSound) {
                this._hasPlayedFirstSound = true;
                AudioController.play('aw-first-burn', { volume: AudioController.Levels.sfx });
                AppModel.set('awww-brngLoop', AudioController.play('aw-burning-loop', { volume: AudioController.Levels.sfx, loop: true }));
            }
        },

        start: function() {

            if (this._started) { return; }
            this._started = true;

            this.isRenderable = true;

            this.onDelayedReadPixels();
        },

        stop: function() {

            if (!this._started) { return; }
            this._started = false;

            this.isRenderable = false;

            this._clearItems();

            TweenMax.killDelayedCallsTo(this.onDelayedReadPixels);
        },

        _clearItems: function() {

            for (var i = 0; i < this._burnPlanes.length; i++) {
                var mesh = this._burnPlanes[i].getMesh();
                this._bufferScene.remove(mesh);
            }

            this._burnPlanes = [];
        },

        _callPhysic: function() {

            if (!this.isPhysicCalled) {

                Backbone.trigger('AWWWARD:TEXTURE_CLEAR');

                this.isPhysicCalled = true;
            }
        },

        // pixels ---------------------------------------------------------------

        readFBOPixels: function() {

            var pixelBuffer = new Uint8Array(this.tW * this.tH * 4);

            var blockSize = 20;
            var red = 0;
            var i = -4;
            var length = pixelBuffer.length;
            var count = 0;

            this._renderer.readRenderTargetPixels(this._FBO_2, 0, 0, this.tW, this.tH, pixelBuffer);

            while ((i += blockSize * 4) < length) {
                ++count;
                red += pixelBuffer[i];
            }

            // ~~ used to floor values
            red = ~~(red / count);

            return red;
        },

        // getters ---------------------------------------------------------------

        getFBOTexture: function() {

            return this._FBO_2.texture;
        },

        // handlers ---------------------------------------------------------------

        onIntersect: function(x, y) {

            this._setCanvasDrawPosition(x, y);
        },

        onDelayedReadPixels: function() {

            var pixelVal = this.readFBOPixels();


            if (pixelVal > 118) {
                this._callPhysic();
            }

            if (pixelVal > 196 && AppModel.has('awww-brngLoop')) {
                var brngLoop = AppModel.get('awww-brngLoop');
                brngLoop.fadeOut(2);
                AppModel.unset('awww-brngLoop');
                // AudioController.play('aw-buildup-and-impact-p1', { volume: AudioController.Levels.sfx });
            }

            if (pixelVal > 200) {

                Backbone.trigger('AWWWARD:TEXTURE_CLEAR_ALMOST');

            }

            if (pixelVal >= 254) {
                this.stop();
                Backbone.trigger('AWWWARD:TEXTURE_CLEAR_COMPLETE');
            } else {
                if (AppModel.has('awww-voiceLoop')) {
                    var voiceLoop = AppModel.get('awww-voiceLoop');
                    voiceLoop.fadeIn(0.5, 0.5 + 0.5 * pixelVal / 255);
                }
                TweenMax.delayedCall(0.2, this.onDelayedReadPixels);
            }
        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            this.stop();

            this._bufferScene.remove(this._planeBufferMesh);
            this._bufferScene.remove(this._planeOutputMesh);

            this._planeBufferMesh.geometry.dispose();
            this._planeOutputMesh.geometry.dispose();

            this._planeBufferMesh.material.dispose();
            this._planeOutputMesh.material.dispose();

            this._bufferScene = null;
            this._camera = null;

            this._renderer.clearTarget(this._FBO_1);
            this._renderer.clearTarget(this._FBO_2);

            this._FBO_1.dispose();
            this._FBO_2.dispose();
        },

        // update ---------------------------------------------------------------

        _draw: function() {

            this._timer++;

            // if (this._burnPlanes.length <= this._maxPlanesBurn) {
            // if (this._burnPlanes.length <= this._maxPlanesBurn && this._timer > 4) {
            if (this._burnPlanes.length <= this._maxPlanesBurn && this._timer > 6) {

                var texture = this.assets['AWWWARD_BURN_TEXTURE'].texture;

                var size = this.tW * 0.4 * Math.random() + this.tW * 0.3;
                // var scale = Math.random() * 0.5 + 0.4;
                var scale = 0.9;
                var speed = 1.0 + Math.random() * 1.5;
                var angle = Math.random() * (2 * Math.PI);

                var x = this._burnTexturePt.x;
                var y = this._burnTexturePt.y;

                var burnItem = new BurnItemView({
                    center: { x: x, y: y },
                    size: size,
                    scale: scale,
                    radius: 0,
                    angle: angle,
                    easeValue: 0,
                    opacity: 0.06, // 0.00003
                    speed: speed,
                    assets: this.assets
                });

                var burnMesh = burnItem.getMesh();

                this._burnPlanes.push(burnItem);

                this._bufferScene.add(burnMesh);

                burnItem.animateBurn();

                this._timer = 0;
            }
        },

        update: function() {

            if (!this._started) { return; }

            var baseSize =  this.tW * 0.03;

            if (this.isRenderable) {

                this._timer += 1;

                this._draw();
            }

            this._updateBurn();

            this._renderer.render(this._bufferScene, this._camera, this._FBO_2, true);

            var t = this._FBO_1;
            this._FBO_1 = this._FBO_2;
            this._FBO_2 = t;

            this._planeOutputMesh.material.uniforms.u_diffuse.value = this._FBO_2.texture;
            this._planeBufferMesh.material.uniforms.u_diffuse.value = this._FBO_1.texture;
        },

        _updateBurn: function() {

            var length = this._burnPlanes.length;

            for (var i = 0; i < length; i++) {

                var burnItem = this._burnPlanes[i];

                if (burnItem.toRemove) {

                    var mesh = burnItem.getMesh();

                    this._bufferScene.remove( burnItem.getMesh() );
                    this._burnPlanes.splice(i, 1);

                    length--;

                    this._indexOut--;

                    continue;
                }

                burnItem.update();
            }
        },

        // resize ---------------------------------------------------------------

        resize: function( w, h ) {}

    });

});
