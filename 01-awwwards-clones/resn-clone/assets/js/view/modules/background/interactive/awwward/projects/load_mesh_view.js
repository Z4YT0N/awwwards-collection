define([

    'jquery',
    'backbone',
    'underscore',
    'config',
    'three',

    'model/loader_collection',

    'view/common/base_view',

    'text!view/modules/background/interactive/awwward/projects/shaders/vs.glsl',
    'text!view/modules/background/interactive/awwward/projects/shaders/fs.glsl',

    'objLoader'

], function(

    $,
    Backbone,
    _,
    Config,
    THREE,

    LoaderCollection,

    BaseView,

    vs,
    fs

) {
    'use strict';

    return BaseView.extend({

        initialize: function(camera) {

            this.meshes = [];

            this.maps = [];

            this.nbProject = 0;

            this._group = new THREE.Group();

            this.init();
        },

        init: function() {
            this._setupMesh();
        },

        _setupGeometry: function(geometry) {

            this._geometry = geometry;
        },

        _setupMesh: function() {

            this.test = new THREE.Group();
            this.loadSea3D = new THREE.SEA3D({
                autoPlay: true,
                container: this.test
            });
            this.loadSea3D.onComplete = function(e) {

                var bat = this.loadSea3D.getMesh("batty_jones.1");
                var can = this.loadSea3D.getMesh("can");
                var cup = this.loadSea3D.getMesh("cup");
                var cone = this.loadSea3D.getMesh("Cone.1");
                var drop = this.loadSea3D.getMesh("drop");
                var durries = this.loadSea3D.getMesh("Durries.1");
                var fire_hydrant = this.loadSea3D.getMesh("fire_hydrant.1");
                var joystick = this.loadSea3D.getMesh("joystick.2");
                var octo = this.loadSea3D.getMesh("octo.1");
                var paintbrush = this.loadSea3D.getMesh("paintbrush");
                var palmtree = this.loadSea3D.getMesh("palmtree.1");
                var panana = this.loadSea3D.getMesh("panana");
                var racket = this.loadSea3D.getMesh("racket");
                var shoe = this.loadSea3D.getMesh("shoe");
                var sword = this.loadSea3D.getMesh("sword.1");
                var wine = this.loadSea3D.getMesh("wine");

                this._group.add(bat, can, cup, cone, drop, durries, fire_hydrant, joystick, octo, paintbrush, palmtree, panana, racket, shoe, sword, wine);
                this.meshes.push(bat, can, cup, cone, drop, durries, fire_hydrant, joystick, octo, paintbrush, palmtree, panana, racket, shoe, sword, wine);

                for (var i = 0; i < this.meshes.length; i++) {

                    this.maps.push(this.meshes[i].material.map);

                    this.nbProject += 1;
                }

                Backbone.trigger('MESHES:LOADED');
                // console.log('LoadMesh onComplete');

                this.reattributeMaterial();

                // this.dropMaterial();

            }.bind(this);

            var buf = LoaderCollection.getResult('AWWWARD_OBJECTS');
            var blob = new Blob([buf], { type: 'text/plain' });
            this.loadSea3D.load(window.URL.createObjectURL(blob));
        },

        reattributeMaterial: function() {

            for (var i = 0; i < this.meshes.length; i++) {

                // this.meshes[i].material = new THREE.MeshPhongMaterial({
                //     map: this.maps[i],
                //     shininess: 0,
                //     specular: 0x6400AD
                // });

                this.meshes[i].material = new THREE.ShaderMaterial( {
                    uniforms: {
                        texture1: { type: "t", value: this.maps[i] },
                        u_mix: { type: "f", value: 0 },
                        b_mix: { type: "f", value: 0 }
                    },
                    fragmentShader: fs,
                    vertexShader: vs
                });
            }
        },

        dropMaterial: function() {

            this.meshes[4].material = new THREE.MeshPhongMaterial({
                map: this.maps[4],
                shininess: 30,
                specular: 0x6400AD
            });
        },

        // getters -------------------------------------------------------------
        getObject: function() {
            return this._group;
        },

        getMeshNumber: function() {
            return this.nbProject;
        },

        getMeshes: function() {
            return this.meshes;
        },

        getGroup: function() {
            return this._group;
        },

        // update --------------------------------------------------------------
        update: function() {},

        // resize ---------------------------------------------------------------

        resize: function() {}

    });

});
