define([

    'jquery',
    'backbone',
    'underscore',
    'config',
    'three',
    'TweenMax',
    'util/math_utils',

    'view/modules/background/interactive/awwward/controller/audio_controller',

    'cannon',

    'model/app_model',

    'view/common/base_view',
    'view/modules/background/interactive/awwward/projects/load_mesh_view',

    'objLoader'

], function(

    $,
    Backbone,
    _,
    Config,
    THREE,
    TweenMax,
    MathUtils,

    AudioController,

    CANNON,

    AppModel,

    BaseView,
    LoadMeshView

) {
    'use strict';

    return BaseView.extend({

        _trigger: 0,

        _sounds: {
            "batty_jones.1": "aw-bat-new",
            "can": "aw-can-new",
            "cup": "aw-lol",
            "Cone.1": "aw-vlc-new",
            "drop": "aw-madeinresn",
            "Durries.1": "aw-ashtray-05",
            "fire_hydrant.1": "aw-fire-hydrant-siren",
            "joystick.2": "aw-joystick",
            "octo.1": "aw-squad",
            "paintbrush": "aw-paintbrush-short",
            "palmtree.1": "aw-palm-tree-new",
            "panana": "aw-balloon-new",
            "racket": "aw-racket-applause",
            "shoe": "aw-converse",
            "sword.1": "aw-sword-1",
            "wine": "aw-wine-bot",

        },

        initialize: function(camera) {

            _.bindAll(this, 'init', 'rayTest', 'screenXY', 'removeContainer');

            this.loadMeshes = new LoadMeshView();

            this.bodies = [];

            this.params = {
                container : true,
                friction: 0.3,
                restitution: 0.2,
                contactEquationRelaxation: 8000,
                mass: 5
            };

            this._colliderShape = {
                x: 10,
                y: 10,
                z: 10
            };

            this._boxContainerPos = {
                back: 150,
                front: 50,
                right: 170,
                left: 170
            };

            if (Config.MOBILE) {
                this._boxContainerPos = {
                    back: 120,
                    front: 60,
                    right: 80,
                    left: 80
                };
            }

            this._camera = camera;

            this._world = new CANNON.World();

            this.objCont = new THREE.Object3D();

            this._ray = new THREE.Raycaster();
            this._mouse = new THREE.Vector2();

            // Backbone.on('AWWWARD:TEXTURE_CLEAR', this.removeContainer);
            Backbone.on('AWWWARD:TEXTURE_CLEAR_ALMOST', this.removeContainer);

            Backbone.on('MESHES:LOADED', this.init);
        },

        init: function() {

            this.getMeshInfos();
            this.setupWorld();
            this._setupEnvironment();
        },

        rayTest: function(e) {

            if (this._explode) {
                this._mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
                this._mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

                this._colliderBody.position = new CANNON.Vec3(this.screenXY(e).x, this.screenXY(e).y - 60, 0);

                this._ray.setFromCamera( this._mouse, this._camera );
                var intersects = this._ray.intersectObjects( this.meshes, true );
                if ( intersects.length) {
                    this._colliderBody.position = new CANNON.Vec3(intersects[0].object.position.x, intersects[0].object.position.y, intersects[0].object.position.z);
                    var objectName = intersects[0].object.name;
                    if (
                        (!AppModel.has('awww-currentSFX-'+objectName) ||
                        !AppModel.get('awww-currentSFX-'+objectName).playing())
                    ) {
                        var random = Math.floor(Math.random() * 7) + 1;
                        // console.log("Play sound " + random + " for object: '" + intersects[0].object.name + "'");
                        AppModel.set('awww-currentSFX-'+objectName, AudioController.play('aw-bounce-0' + random, { volume: AudioController.Levels.sfx }));
                        if ((this._trigger % 4) === 0 &&
                        (!AppModel.has('awww-realSFX') ||
                        !AppModel.get('awww-realSFX').playing())
                        ) {
                            // console.log('MADE IN RESN');

                            intersects[0].object.material.needsUpdate = true;

                            var map = intersects[0].object.material.map;

                            TweenMax.to(intersects[0].object.material.uniforms.b_mix, 1.6, {value: 0.2, ease: 'Sine.easeOut'});
                            TweenMax.to(intersects[0].object.material.uniforms.b_mix, 0.4, {delay: 1.6, value: 0, ease: 'Sine.easeOut'});

                            TweenMax.to(intersects[0].object.material.uniforms.u_mix, 2, { value: 1, ease: 'Sine.easeOut', onComplete: function(){
                                TweenMax.to(intersects[0].object.material.uniforms.u_mix, 0, {value: 0, ease: 'Sine.easeOut'});
                            }.bind(this)});

                            AppModel.set(
                                'awww-realSFX',
                                AudioController.play(
                                    this._sounds[objectName] || 'aw-bounce-07',
                                    {
                                        volume: AudioController.Levels.sfx
                                    }
                                )
                            );
                        }
                        this._trigger++;
                    }
                }
            }
        },

        setupWorld: function(){

            this._world.gravity.set(0, -9.8, 0);
            this._world.broadphase = new CANNON.NaiveBroadphase();
            this._world.solver.iterations = 1;

            var stone = new CANNON.Material('stone');
            this.stone_stone = new CANNON.ContactMaterial(stone, stone, {
              friction: this.params.friction,
              restitution: this.params.restitution,
              contactEquationRelaxation: this.params.contactEquationRelaxation,
              contactEquationStiffness: '1e100'
            });

            this._world.addContactMaterial(this.stone_stone);
            this._world.allowSleep = true;

            for (var i = 0; i < this.meshes.length; i++) {

                var box3 = new THREE.Box3().setFromObject( this.meshes[i] );
                var height = box3.max.z - box3.min.z;
                var width = box3.max.x - box3.min.x;
                var depth = box3.max.y - box3.min.y;

                var bodyContainer = new CANNON.Box(new CANNON.Vec3(box3.getSize().x / 2, box3.getSize().y / 2, box3.getSize().z / 2));

                this._meshBody = new CANNON.Body({ mass: this.params.mass, material: stone });

                this._meshBody.addShape(bodyContainer);

                this._meshBody.position.copy(this.meshes[i].position);
                this._meshBody.quaternion.copy(this.meshes[i].quaternion);

                this._world.addBody(this._meshBody);

                this.bodies.push(this._meshBody);
            }

            // setTimeout(function () {
            //     for (var i = 0; i < this.meshes.length; i++) {
            //         this.bodies[i].sleep();
            //     }
            // }.bind(this), 800);

            this._groundBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(0,-100,0)});
            this._groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            this._world.addBody(this._groundBody);

            this._rightBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(50,0,0)});
            this._rightBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),-Math.PI/2);
            this._world.addBody(this._rightBody);

            this._leftBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(-50,0,0)});
            this._leftBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),Math.PI/2);
            this._world.addBody(this._leftBody);

            this._frontBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(0,0,50)});
            this._frontBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI);
            this._world.addBody(this._frontBody);

            this._backBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(0,0,-50)});
            this._world.addBody(this._backBody);

            this._topBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(0,95,0)});
            this._topBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI/2);
            this._world.addBody(this._topBody);

            this._colliderBody = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(this._colliderShape.x, this._colliderShape.y, this._colliderShape.z)), position: new CANNON.Vec3(0,0,0), material: stone});
            this._world.addBody(this._colliderBody);

            this._wwwBody = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(40, 125, 2)), position: new CANNON.Vec3(0, -23,-40)});
            this._world.addBody(this._wwwBody);
        },

        screenXY: function(event){

            var vector = new THREE.Vector3();

            vector.set(
                ( event.clientX / window.innerWidth ) * 2 - 1,
                - ( event.clientY / window.innerHeight ) * 2 + 1,
                0.5
            );

            vector.unproject( this._camera );
            var dir = vector.sub( this._camera.position ).normalize();
            var distance = - this._camera.position.z / dir.z;
            var pos = this._camera.position.clone().add( dir.multiplyScalar( distance ) );

            return pos;
        },

        _setupEnvironment: function() {

            var geometry = new THREE.PlaneBufferGeometry( 500, 500, 1 );
            var material = new THREE.MeshBasicMaterial( {
                color: 0xacacac,
                side: THREE.DoubleSide,
                wireframe: true,
                visible: false
            });

            this._floor = new THREE.Mesh( geometry, material );
            var plane = new THREE.PlaneBufferGeometry( 100, 200, 0, 0 );
            this._planeRight = new THREE.Mesh( plane, material );
            this._planeLeft = new THREE.Mesh( plane, material );
            this._planeBack = new THREE.Mesh( plane, material );
            this._planeFront = new THREE.Mesh( plane, material );
            this._planeTop = new THREE.Mesh( plane, material );

            var boxGeometry = new THREE.BoxGeometry(this._colliderShape.x, this._colliderShape.y, this._colliderShape.z);
            var boxMaterial = new THREE.MeshBasicMaterial({visible: false});
            this._collider = new THREE.Mesh(boxGeometry, boxMaterial);

            var wwwGeometry = new THREE.BoxGeometry(40, 125, 2);
            var wwwMaterial = new THREE.MeshBasicMaterial({visible: false});
            this._www = new THREE.Mesh(wwwGeometry, wwwMaterial);

            this._group.add( this._floor, this._planeTop, this._www);

            this._box = new THREE.Object3D();
            this._box.add(this._planeRight, this._planeLeft, this._planeFront, this._planeBack);
        },

        // getters -------------------------------------------------------------

        getWorld: function() {
            return this._world;
        },

        getObject: function() {
            return this._group;
        },

        getCollider: function() {
            return this._collider;
        },

        getBox: function() {
            return this._box;
        },

        getMeshInfos: function(){

            this.nbProject = this.loadMeshes.getMeshNumber();
            this.meshes = this.loadMeshes.getMeshes();
            this._group = this.loadMeshes.getGroup();
        },

        removeContainer: function(){
            this.params.container = false;

            for (var i = 0; i < this.meshes.length; i++) {

                this.bodies[i].wakeUp();
            }

            if (!this._done) {
                TweenMax.to(this.params, 0, {delay: 3.1, contactEquationRelaxation: 3, onComplete: function(){
                    TweenMax.to(this.params, 1, {delay: 2, contactEquationRelaxation: 12});
                    this._explode = true;
                }.bind(this)});
                TweenMax.to(this._world.gravity, 0, {delay: 3.1, y: 0});
            }

            this._done = true;
        },

        // destroy ---------------------------------------------------------------

        destroy: function() {

            if (this._group) {
                for (var i = 0; i < this._group.children.length; i++) {
                    this.clearScene(this._group.children[i]);
                }
            }

            if (this._box) {
                for (var j = 0; j < this._box.children.length; j++) {
                    this.clearScene(this._box.children[j]);
                }
            }

            if (this.meshes) {
                for (var k = 0; k < this.meshes.length; k++) {
                    this.clearScene(this.meshes[k]);
                }
            }

            if (this._collider) {
                this.clearScene(this._collider);
            }

        },

        clearScene: function (obj) {
            if (obj instanceof THREE.Mesh) {
                obj.geometry.dispose();
                obj.material.dispose();
            }
        },

        // update --------------------------------------------------------------

        update: function() {

            this._floor.position.copy(this._groundBody.position);
            this._floor.quaternion.copy(this._groundBody.quaternion);

            this._planeTop.position.copy(this._topBody.position);
            this._planeTop.quaternion.copy(this._topBody.quaternion);

            this._planeLeft.position.copy(this._leftBody.position);
            this._planeLeft.quaternion.copy(this._leftBody.quaternion);

            this._planeRight.position.copy(this._rightBody.position);
            this._planeRight.quaternion.copy(this._rightBody.quaternion);

            this._planeBack.position.copy(this._backBody.position);
            this._planeBack.quaternion.copy(this._backBody.quaternion);

            this._planeFront.position.copy(this._frontBody.position);
            this._planeFront.quaternion.copy(this._frontBody.quaternion);

            this._collider.position.copy(this._colliderBody.position);
            this._collider.quaternion.copy(this._colliderBody.quaternion);

            this._www.position.copy(this._wwwBody.position);
            this._www.quaternion.copy(this._wwwBody.quaternion);

            for (var i = 0; i < this.meshes.length; i++) {

                this.meshes[i].position.copy(this.bodies[i].position);
                this.meshes[i].quaternion.copy(this.bodies[i].quaternion);
            }

            if (!this.params.container) {

                this._rightBody.position.x = this._boxContainerPos.right;
                this._leftBody.position.x = -this._boxContainerPos.left;
                this._backBody.position.z = -this._boxContainerPos.back;
                this._frontBody.position.z = this._boxContainerPos.front;

            } else {

                this._rightBody.position.x = 32;
                this._leftBody.position.x = -32;
                this._backBody.position.z = -32;
                this._frontBody.position.z = 32;
            }

            this.stone_stone.contactEquationRelaxation = this.params.contactEquationRelaxation;
        },

        // resize ---------------------------------------------------------------

        resize: function() {}
    });
});
