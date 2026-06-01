define([

    'jquery',
    'underscore',
    'config',
    'three',
    'TweenMax',

    'model/loader_collection',

    'util/math_utils',

    'view/common/base_view'

], function(

    $,
    _,
    Config,
    THREE,
    TweenMax,

    LoaderCollection,

    MathUtils,

    BaseView

) {
    'use strict';

    var View = BaseView.extend({

        initialize: function(opts) {

            this.init(opts);
        },

        init: function(opts) {

            this.setup(opts);
        },

        setup: function(opts) {

            this.assets = opts.assets;

            this._camera = opts.camera;
            this._object = new THREE.Object3D();

            var loader = new THREE.OBJLoader();
            var object = loader.parse(LoaderCollection.getResult('AWWWARD_BACKBONE_OBJECT'));
            
            this._geometry = object.children[0].geometry;

            this._material = new THREE.MeshBasicMaterial({map: this.assets['AWWWARD_BACKBONE'].texture, side: THREE.DoubleSide});
            this._mesh = new THREE.Mesh( this._geometry, this._material );
            this._mesh.scale.set( 10, 10, 10);

            this._object.add(this._mesh);
        },


        // getters / setters ---------------------------------------------------------------

        getObject: function() {
            return this._object;
        },

        // destroy ---------------------------------------------------------------
            
        destroy: function() {
            
            this._mesh.geometry.dispose();
            this._mesh.material.dispose();
        },


        // resize ---------------------------------------------------------------

        resize: function(w, h) {
            this.wW = w;
            this.wH = h;
        }

    });

    return View;

});
