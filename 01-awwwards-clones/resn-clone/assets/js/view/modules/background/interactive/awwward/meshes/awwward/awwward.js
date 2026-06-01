define([

    'jquery',
    'underscore',
    'config',
    'three',
    'TweenMax',

    'model/loader_collection',

    'view/common/base_view',
    'view/modules/background/interactive/awwward/meshes/awwward/awwward_texture_canvas',

    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/awwward_vertex.shader',
    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/awwward_fragment.shader',

    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/item_vertex.shader',
    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/item_fragment.shader'

], function(

    $,
    _,
    Config,
    THREE,
    TweenMax,

    LoaderCollection,

    BaseView,
    AwwwardTextureCanvas,

    vertexShader,
    fragmentShader,

    vertexShaderBasic,
    fragmentShaderBasic

) {
    'use strict';

    return BaseView.extend({

        _FBOTexture: null,
        _matrixApply: null,
        // _timerLaunched: false,

        initialize: function(opts) {

            _.bindAll(this, 'onStartDelayed');

            this.assets = opts.assets;

            this._tweenObj = { 'prHue': 0 };

            this.init(opts);
        },

        init: function(opts) {

            this.setup(opts);
        },

        setup: function(opts) {

            this._setupCanvas(opts);
            this._setupGeometry();
            this._setupMaterial();
            this._setupMesh();
            this._setupTime();
        },

        _setupCanvas: function(opts) {

            this._awwwardTexture = new AwwwardTextureCanvas({
                texture: this.assets['AWWWARD_MAIN_TEXTURE'].texture,
                renderer: opts.renderer,
                width: opts.width,
                height: opts.height,
                assets: this.assets
            });
        },

        _setupGeometry: function() {

            this._geometry = null;

            var loader = new THREE.OBJLoader();
            var object = loader.parse(LoaderCollection.getResult('AWWWARD_MAIN_OBJECT'));
            var geo = object.children[0].geometry;

            this._geometry = geo.clone();

            // mirroring geometry
            var matrix = (new THREE.Matrix4()).identity();
            //set -1 to the corresponding axis
            matrix.elements[0] = -1;

            this._geometry.applyMatrix(matrix);

            this._matrixApply = true;
        },

        _setupMaterial: function() {

            this._FBOTexture = this._awwwardTexture.getFBOTexture();
            this._FBOTexture.minFilter = THREE.LinearFilter;
            this._FBOTexture.magFilter = THREE.LinearFilter;
            // this._FBOTexture.wrapS = THREE.RepeatWrapping;
            this._FBOTexture.wrapT = THREE.RepeatWrapping;

            var mapDefault = this.assets['AWWWARD_MAIN_TEXTURE'].texture;
            var mapDefaultMask = this.assets['AWWWARD_MAIN_TEXTURE_MASK'].texture;
            var mapDefaultMaskS = this.assets['AWWWARD_MAIN_TEXTURE_MASK_S'].texture;

            this._uniforms = {
                u_defaultMap: { type: 't', value: mapDefault },
                u_maskMap: { type: 't', value: mapDefaultMask },
                u_maskMapS: { type: 't', value: mapDefaultMaskS },
                u_burnMap: { type: 't', value: this._FBOTexture },
                u_globalTime: { type: 'f', value: 0 },
                u_pr_hue: { type: 'f', value: 0 }
            };

            this._backMaterial = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                side: THREE.FrontSide,
                depthTest: true
            });

            this._frontMaterial = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                side: THREE.BackSide,
                depthTest: true
            });
        },

        _setupMesh: function() {

            var materialTest = new THREE.MeshBasicMaterial({
              color: new THREE.Color('red'),
            });

            this._backMesh = new THREE.Mesh(this._geometry, this._backMaterial);
            this._frontMesh = new THREE.Mesh(this._geometry.clone(), this._frontMaterial);

            this._box3 = new THREE.Box3().setFromObject(this._backMesh);

            this._backMesh.scale.set(10, 10, 10);
            this._frontMesh.scale.set(10, 10, 10);

            this._object = new THREE.Object3D();

            this._object.add(this._backMesh);
            this._object.add(this._frontMesh);


            /**
             * FOR TESTING
             */

            /*var matBasic = new THREE.MeshBasicMaterial({
                'map': this._FBOTexture,
                'side': THREE.BackSide
            });
            this._testMesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), matBasic);
            this._testMesh.position.set(100, 0, -100);

            window.scene.add(this._testMesh);*/
        },

        _setupTime: function() {

            this.time = new THREE.Clock();
        },

        // start ---------------------------------------------------------------

        start: function(d_) {

            if (this._started){ return; }
            this._started = true;

            var d = d_ || 0;
            TweenMax.delayedCall(d, this.onStartDelayed);
        },

        stop: function() {

            if (!this._started){ return; }
            this._started = false;

            this._awwwardTexture.stop();
        },

        // state ---------------------------------------------------------------

        _setCanvasMousePosition: function( x, y ) {

            this._awwwardTexture.onIntersect(x, y);
        },

        // hue ---------------------------------------------------------------

        activateHue: function() {

            TweenMax.killTweensOf(this._tweenObj);
            TweenMax.to(this._tweenObj, 2.45, { 'prHue': 1, 'ease': 'Sine.easeInOut' });
        },

        // getters ---------------------------------------------------------------

        getObject: function() {

            return this._object;
        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            this.stop();

            this._awwwardTexture.destroy();

            this._object.remove(this._frontMesh);
            this._object.remove(this._backMesh);
            this._object = null;

            this._frontMesh.geometry.dispose();
            this._frontMesh.material.dispose();

            this._backMesh.geometry.dispose();
            this._backMesh.material.dispose();
        },

        // events ---------------------------------------------------------------

        checkIntersect: function(intersects) {

            if (!this._started) { return; }

            if (intersects.length > 0 && intersects[0].uv && this._awwwardTexture._started) {

                var uv = intersects[0].uv;
                intersects[0].object.material.uniforms.u_defaultMap.value.transformUv(uv);

                this._awwwardTexture.isRenderable = true;
                this._awwwardTexture.onIntersect(uv.x, uv.y);

            } else {

                this._awwwardTexture.isRenderable = false;
            }

        },

        onStartDelayed: function() {

            this.isRenderable = true;

            this._awwwardTexture.start();
        },

        // destroy ---------------------------------------------------------------

        // update ---------------------------------------------------------------

        update: function() {

            var prHue = this._tweenObj['prHue'];

            this.timeDelta = this.time.getDelta();

            this._backMaterial.uniforms['u_globalTime'].value += this.timeDelta;
            this._frontMaterial.uniforms['u_globalTime'].value += this.timeDelta;

            this._backMaterial.uniforms['u_pr_hue'].value = prHue;
            this._frontMaterial.uniforms['u_pr_hue'].value = prHue;

            if (this._FBOTexture && this.isRenderable && this._awwwardTexture._started) {

                this._awwwardTexture.update();
            }
        },

        // resize ---------------------------------------------------------------

        resize: function( w, h ) {

            this._awwwardTexture.resize( w, h );
        }

    });

});
