define([

    'jquery',
    'underscore',
    'config',
    'three',
    'TweenMax',

    'three/shaders/BurnShader',

    'model/app_model',

    'util/math_utils',

    'view/common/base_view',
    'view/modules/background/interactive/awwward/reveal/reveal_view'

], function(

    $,
    _,
    Config,
    THREE,
    TweenMax,

    BurnShader,

    AppModel,

    MathUtils,

    BaseView,
    RevealView

) {

    'use strict';

    var View = BaseView.extend({

        cW: 256,
        cH: 256,

        initialize: function(opts) {

            this.init(opts);
        },

        init: function(opts) {

            this.$window = $(window);

            this.setup(opts);
        },

        setup: function(opts) {

            this.wW = window.innerWidth;
            this.wH = window.innerHeight;

            this.assets = opts.assets;

            this.setupScene();
            this.setupReveal();

            this.resize(this.wW, this.wH);

            this.setupCamera();
            this.setupQuad();
        },

        setupScene: function() {

            this._sceneBg = new THREE.Scene();
        },

        setupReveal: function() {

            this._reveal = new RevealView({
                'assets': this.assets
            });

            this._texReveal = this._reveal.getTexture();
        },

        setupCamera: function() {

            var w = this.wW;
            var h = this.wH;

            this._camera = new THREE.OrthographicCamera(w * -0.5, w * 0.5, h * 0.5, h * -0.5, 1, 1000);
            this._camera.position.z = 5;
        },

        setupQuad: function() {

            var w = this.wW;
            var h = this.wH;

            var shader = THREE.BurnShader;

            var cW = this.cW;
            var cH = this.cH;

            this._geo = new THREE.PlaneBufferGeometry(cW, cH);
            
            this._tex = this.assets['AWWWARD_BG'].texture;

            this._mat = new THREE.ShaderMaterial({
                uniforms: {
                    tDiffuse: { type: "t", value: this._tex },
                    u_burn: { type: "t", value: this._texReveal },
                    u_offset_tex: { type: "v2", value: new THREE.Vector2(0, 0) }
                },
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader
            });

            this._mesh = new THREE.Mesh(this._geo, this._mat);

            this._sceneBg.add(this._mesh);
        },

        // handlers ---------------------------------------------------------------
        handleMove: function(coords) {
//             this._reveal.handleMove(coords);
        },

        // start ---------------------------------------------------------------
        start: function(d_) {

            if (this._started){ return; }
            this._started = true;

            var d = d_ || 0;
            this._reveal.start(d);
        },

        // offset ---------------------------------------------------------------

        offsetUV: function(x, y) {
            this._mat.uniforms.u_offset_tex.value.y = 0.05 * y;
        },

        // getters / setters ---------------------------------------------------------------

        getScene: function() {
            return this._sceneBg;
        },

        getCamera: function() {
            return this._camera;
        },

        // update ---------------------------------------------------------------

        update: function() {
            this._reveal.update();
        },

        // destroy ---------------------------------------------------------------
            
        destroy: function() {

            this._sceneBg.remove(this._mesh);

            this._mesh.geometry.dispose();
            this._mesh.material.dispose();

            this._camera = null;
            this._sceneBg = null;

            this._texReveal.dispose();
        },

        // resize ---------------------------------------------------------------

        resize: function(w, h) {

            this.wW = w;
            this.wH = h;

            if (this._camera) {

                this._camera.left = w * -0.5;
                this._camera.right = w * 0.5;
                this._camera.top = h * 0.5;
                this._camera.bottom = h * -0.5;

                this._camera.updateProjectionMatrix();
            }

            var rW = this.wW / this.cW;
            var rH = this.wH / this.cH;

            var r = rW < rH ? rH : rW;

            if (this._mesh) {
                this._mesh.scale.set(r, r, 1);
            }
        }
    });

    return View;

});
