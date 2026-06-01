define([

    'jquery',
    'underscore',
    'config',
    'three',
    'TweenMax',

    // 'util/math_utils',

    'model/app_model',

    'view/common/base_view',

    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/item_vertex.shader',
    'text!view/modules/background/interactive/awwward/meshes/awwward/shaders/item_fragment.shader'
], function(

    $,
    _,
    Config,
    THREE,
    TweenMax,

    // MathUtils,

    AppModel,

    BaseView,
    itemVertexShader,
    itemFragmentShader

) {
    'use strict';

    return BaseView.extend({

        _z: 100,

        initialize: function(opts) {

            this.init(opts);
        },

        init: function(opts) {

            this.setup(opts);
        },

        setup: function(opts) {

            this._setupMesh(opts);
        },

        _setupMesh: function(opts) {

            this.toRemove = false;

            this.assets = opts.assets;

            this._burning = false;
            this._easeValue = opts.easeValue;
            this._easeOutValue = 1;
            this._center = opts.center;
            this._size = opts.size;
            this._radius = opts.radius;
            this._baseScale = opts.baseScale;
            this._scale = opts.scale;
            this._angle = opts.angle;
            this._speed = opts.speed;
            this._direction = Math.random() > 0.5 ? -1 : 1;
            this._minScale = 0.001;

            this._opacity = 0;
            this._opacityTg = opts.opacity;
                        
            var texture = this.assets['AWWWARD_BURN_TEXTURE'].texture;
            texture.needsUpdate = true;
            texture.minFilter = THREE.LinearFilter;
            
            var x = this._center.x;
            var y = this._center.y;

            this._burnGeometry = new THREE.PlaneBufferGeometry(this._size * 0.5, this._size, 1, 1);
            
            this._burnMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    u_map: { type: 't', value: texture },
                    u_opacity: { type: 'f', value: opts.opacity },
                    u_scale: { type: 'f', value: 0.0001 },
                },
                transparent: true,
                vertexShader: itemVertexShader,
                fragmentShader: itemFragmentShader
            });
            
            this._burnMesh = new THREE.Mesh(this._burnGeometry, this._burnMaterial);
            this._burnMesh.position.set(x, y, this._z);
            this._burnMesh.scale.set(1, 1, 1);
            
            // this._burnMesh.scale.set( this._minScale, this._minScale, this._minScale );
        },

        // state ---------------------------------------------------------------

        _destroy: function() {

            this.toRemove = true;
            // this._burnMesh.parent.remove( this._burnMesh );
        },

        // getters ---------------------------------------------------------------

        getMesh: function() {

            return this._burnMesh;
        },

        // events ---------------------------------------------------------------

        // update ---------------------------------------------------------------

        animateBurn: function() {

            if ( !this._burning ) {

                this._easeValueTg = 1;

                this._burning = true;
            }
        },

        animateOut: function() {

            TweenMax.killTweensOf(this);

            var easeValue = this._easeValue;

            // TweenMax.to(
            //     this,
            //     0.5, {
            //         _easeValue: easeValue + 0.01,
            //         ease: 'Power4.easeOut',
            //         onComplete: this._destroy.bind(this)
            //     }
            // );
        },

        update: function() {

            this._easeValue += 0.001;

            if(this._easeValue > 1){
                this._destroy();
            }

            this._opacity += (this._opacityTg - this._opacity) * 0.004;
            this._easeValue += (this._easeValueTg - this._easeValue) * 0.02;

            this._burnMaterial.uniforms.u_opacity.value = this._opacity;
            this._burnMaterial.uniforms.u_scale.value = this._scale * this._easeValue;

            var x = this._center.x + (this._radius * this._easeValue) * Math.cos(this._angle + (20 * Math.PI * this._easeValue * this._direction));
            var y = this._center.y + (this._radius * this._easeValue) * Math.sin(this._angle + (20 * Math.PI * this._easeValue * this._direction));
        },

        // resize ---------------------------------------------------------------

        resize: function( w, h ) {
        }

    });

});
