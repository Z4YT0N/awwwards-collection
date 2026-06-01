define([

    'jquery',
    'backbone',
    'underscore',
    'config',
    'three',

	'TweenMax',

    'model/app_model',

    'view/common/base_view',

], function(

    $,
    Backbone,
    _,
    Config,
    THREE,

	TweenMax,

    AppModel,

    BaseView

) {
    'use strict';

    return BaseView.extend({

        initialize: function(opts) {

			this._w = opts.width;
			this._h = opts.height;

			this.assets = opts.assets;

            this.setupScene();
            this.setupCamera();

            this.setupQuad();
        },

        setupScene: function() {

            this._sceneText = new THREE.Scene();
        },

        setupCamera: function() {

            var w = this._w;
            var h = this._h;

            this._camera = new THREE.OrthographicCamera(w * -0.5, w * 0.5, h * 0.5, h * -0.5, 1, 1000);
            this._camera.position.z = 5;
        },

        setupQuad: function() {

			var w = this._w * 0.2;
            // var geometry = new THREE.PlaneBufferGeometry( 256, 128, 1 );
			var geometry = new THREE.PlaneBufferGeometry( 160, 80, 1 );

			var tex = this.assets['AWWWARD_THANKS_NR'].texture;
			tex.minFilter = THREE.LinearFilter;
			tex.magFilter = THREE.LinearFilter;
			tex.transparent = true;

			var material = new THREE.MeshBasicMaterial({
				map: tex,
				transparent: true,
				premultipliedAlpha: true,
                opacity: 0
			});

			this._plane = new THREE.Mesh( geometry, material );
			this._plane.position.set(0, this._h * 0.5 - 80, 0);

            this._sceneText.add(this._plane);
        },

		// state -------------------------------------------------------------
		show: function(){
			TweenMax.to(this._plane.material, 0.92, {opacity: 1});
		},

		hide: function(){
            TweenMax.to(this._plane.material, 1.25, { opacity: 0, 'ease': 'Sine.easeInOut'});
			TweenMax.to(this._plane.scale, 1.25, { x: 1.1, y:1.1, opacity: 0, 'ease': 'Sine.easeInOut'});
		},

        // getters -------------------------------------------------------------

        getPlane: function() {
            return this._plane;
        },

        getScene: function() {
            return this._sceneText;
        },

        getCamera: function() {
            return this._camera;
        },

        // update --------------------------------------------------------------

        update: function() {

        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            this._sceneText.remove(this._plane);

            this._plane.geometry.dispose();
            this._plane.material.dispose();

            this._camera = null;
            this._sceneText = null;
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

            var rW = this.wW / this._w;
            var rH = this.wH / this._h;

            var r = rW < rH ? rH : rW;

            if (r > 1) {
                r = 1;
            }

            if (this._plane) {
                this._plane.scale.set(r, r, 1);
                this._plane.position.set(0, h * 0.5 - (h / 10), 0);
            }

        }

    });

});
