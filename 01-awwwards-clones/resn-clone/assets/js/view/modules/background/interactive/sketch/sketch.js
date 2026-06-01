define([

    'jquery',
    'underscore',
    'backbone',
    'config',
    'howler',
    'route/router',
    'events/app_events',
    'model/app_model',
    "util/anim_frame",
    "model/loader_collection",
    'model/sound_model',
    'three',
    'view/modules/background/interactive/base_interactive_view',
    'view/modules/background/interactive/sketch/image',
    'view/modules/background/interactive/sketch/bottle',
    'templates/templates',
    'text!view/modules/background/interactive/sketch/sketch_vertex.shader',
    'text!view/modules/background/interactive/sketch/sketch_fragment.shader',
    'text!view/modules/background/interactive/sketch/sketch_bottle_vertex.shader',
    'text!view/modules/background/interactive/sketch/sketch_bottle_fragment.shader'

], function (

    $,
    _,
    Backbone,
    Config,
    Howler,
    Router,
    AppEvents,
    AppModel,
    AnimFrame,
    LoaderCollection,
    SoundModel,
    THREE,
    BaseInteractiveView,
    DrawImage,
    Bottle,
    Templates,
    SketchVertexShader,
    SketchFragmentShader,
    SketchBottleVertexShader,
    SketchBottleFragmentShader

) { 'use strict';

    return BaseInteractiveView.extend({

        $window    : null,
        pixelRatio : 1,

        renderer   : null,
        scene      : null,

        wrap       : null,

        camera     : null,

        currentImage: null,

        currrentIndex: -1,
        loadedImages: null,
        imageCount: -1,

        startTime: null,

        currentH: -1,
        deltaX: 0,
        deltaY: 0,

        deltaMX: 0,
        targetDeltaX: 0,

        lastX: 0,
        mX: 0,
        mY: 0,
        rotatedMX: 0,
        rotatedMY: 0,

        mXStart: 0,
        mYStart: 0,

        rotationZ: 0,
        startRotationZ: 0,

        time: 0,

        bottle: null,
        bottleMesh: null,
        bottleMeshWrap: null,

        activePlanes: null,

        startUp: false,

        textureSize: 512,

        maxImages: 100,
        outSpeed: 0.01,

        sounds : null,
        soundIndex : 0,

        lastImageTime : -1,

        imagesLoaded: false,
        waitingForImage: false,



        // SETUP ---------------------------------------------------------------

        initialize: function(options) {

            _.bindAll(this, 'onTextureLoaded' , 'onMouseMove', 'onBottleLoaded');

            this.compileAndAppendTemplate(_.partial(Templates.r, 'sketch'), {});

            this.$window    = $(window);
            this.pixelRatio = window.devicePixelRatio;

            this.startTime = Date.now();

            if (Config.MOBILE) {
                this.textureSize = 256;
                this.maxImages = 50;
                this.outSpeed = 0.05;
            }
            else if (Config.TABLET) {
                this.textureSize = 256;
                this.maxImages = 70;
                this.outSpeed = 0.015;
            }

            if(this.model.get("sounds")){
                var sounds = this.model.get("sounds");
                this.sounds = [];
                sounds.forEach(function(sound){
                    this.sounds.push(new Howler.Howl({
                        urls : [Config.CDN + sound.src],
                        volume : 0.4
                    }));
                }, this);
            }
            this.setup();
        },

        setup: function() {

            var width = window.innerWidth;
            var height = window.innerHeight;

            this.renderer = new THREE.WebGLRenderer({ 'antialias': true });

            this.renderer.setPixelRatio( this.pixelRatio );
            this.renderer.setClearColor( 0x000000, 1.0 );
            this.renderer.setSize( width, height );

            this.$node.append( this.renderer.domElement );

            this.scene = new THREE.Scene();

            this.wrap = new THREE.Object3D();
            this.scene.add(this.wrap);

            this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
            this.camera.position.z = 1;

            this.loadTextures();

            this.activePlanes = [];

            // this.onResize();
        },

        loadTextures: function() {
            this.imageCount = this.model.get('textures').length;
            this.loadedImages = [];

            var textures = this.model.get('textures');

            // randomize assets
            textures = _.shuffle(textures);

            for ( var i = 0; i < this.imageCount; i++ ) {
                // console.log('a', textures[i].src );
                if (textures[i].src.indexOf('resndine.png') === -1) {
                    var newImage = new Image();
                    newImage.crossOrigin = '';
                    newImage.onload = this.onTextureLoaded;
                    newImage.src = Config.CDN + textures[i].src;
                }
                else {
                    this.bottleImg = new Image();
                    this.bottleImg.crossOrigin = '';
                    this.bottleImg.onload = this.onBottleLoaded;
                    this.bottleImg.src = Config.CDN + textures[i].src;
                }
            }
        },

        onBottleLoaded: function() {
            var image = this.bottleImg;

            var ratio = image.naturalWidth/image.naturalHeight;
            var width = this.width * 0.05;
            if (width > 70) {
                width = 70;
            }
            else if (width < 40) {
                width = 40;
            }

            var height = width/ratio;

            //temp canvas
            var cImage = document.createElement('canvas');
            var ctxImage = cImage.getContext('2d');

            cImage.width = this.textureSize;
            cImage.height = this.textureSize;

            ctxImage.drawImage(image, 0, 0, cImage.width, cImage.height);

            var x = 0;
            var y = 0;
            var z = 0;

            var sinOffset = Math.random()*5;

            var geo = new THREE.PlaneGeometry(width, height, 10, 30);

            var texture = new THREE.Texture(cImage);
            texture.needsUpdate = true;


            var uniforms = {
              texture:    { type: "t", value: texture },
              tSize:    { type: "2f", value: [width, height]},
              tPos:    { type: "2f", value: [x, y]},
              wSize:   { type: "2f", value: [window.innerWidth, window.innerHeight]},
              time:           { type: "f", value: 1.0 },
              mouse:           { type: "2f", value: [1.0, 1.0]},
              amount:          { type: "f", value: this.width*0.017/10 },
              spawnVal:        { type: "f", value: 0.5},
              colorSpeed:       { type: 'f', value: 0}
            };

            var material = new THREE.ShaderMaterial({
              uniforms: uniforms,
              vertexShader: SketchBottleVertexShader,
              fragmentShader: SketchBottleFragmentShader,
              transparent: true,
              wireframe: false
            });
            material.needsUpdate = true;

            var mesh = new THREE.Mesh(geo, material);
            mesh.rotation.z = 180 * Math.PI/180;

            var meshWrap = new THREE.Object3D();
            meshWrap.add(mesh);

            var drawImage = new Bottle();

            drawImage.init(
                geo,
                material,
                mesh,
                meshWrap,
                cImage,
                x,
                y,
                z,
                width,
                height
            );



            meshWrap.position.x = -window.innerWidth/2;
            meshWrap.position.y = window.innerHeight/2;

            this.wrap.add(meshWrap);

            this.bottleMeshWrap = meshWrap;
            this.bottleMeshWrap.position.z = 0;

            this.bottleMesh = mesh;

            this.bottle = drawImage;
        },

        onTextureLoaded: function(e) {
            // console.log('loaded');

            if (this.waitingForImage) {
                this.waitingForImage = false;
                this.newImage();
            }

            this.loadedImages.push(e.target);

            if (!this.imagesLoaded) {
                this.imagesLoaded = true;
            }
        },

        newImage: function() {

            // console.log('NEW IMAGE');

            if (this.imagesLoaded) {
                if (this.currrentIndex + 1 < this.loadedImages.length) {
                    this.currrentIndex += 1;
                }
                else {
                    this.currrentIndex = 0;
                }

                // var multi = 0.5;

                var multi = this.width*0.03/100;

                if (multi > 0.5) {
                    multi = 0.5;
                }else if (multi < 0.25) {
                    multi = 0.25;
                }

                // if (Config.TABLET) {
                //     multi = 0.3;
                // }
                // else if (Config.MOBILE) {
                //     multi = 0.3;
                // }

                var image = this.loadedImages[this.currrentIndex];

                var ratio = image.naturalWidth/image.naturalHeight;
                var width = image.naturalWidth*multi;
                var height = width/ratio;

                //temp canvas
                var cImage = document.createElement('canvas');
                var ctxImage = cImage.getContext('2d');

                cImage.width = this.textureSize;
                cImage.height = this.textureSize;

                ctxImage.drawImage(image, 0, 0, cImage.width, cImage.height);


                var x = this.mXStart;
                var y = this.mYStart;
                var z = 0;

                var sinOffset = Math.random()*5;

                var geo = new THREE.PlaneGeometry(width, height, 20, 20);
                var material = this.newShaderMaterial(cImage, x, y, width, height, sinOffset);
                var mesh = new THREE.Mesh(geo, material);

                var meshWrap = new THREE.Object3D();
                meshWrap.add(mesh);

                mesh.position.x = width/2;
                // mesh.position.y = height/2;

                var drawImage = new DrawImage();

                drawImage.init(
                    geo,
                    material,
                    mesh,
                    meshWrap,
                    cImage,
                    x,
                    y,
                    z,
                    width,
                    height
                );

                meshWrap.position.x = x-window.innerWidth/2;
                meshWrap.position.y = -y+window.innerHeight/2;
                meshWrap.position.z = -2;

                meshWrap.rotation.z = -this.startRotationZ;

                this.wrap.add(meshWrap);

                this.currentPlane = drawImage;
            }
            else {
                // console.log('else!');
                this.waitingForImage = true;
            }
        },

        newShaderMaterial: function(image, x, y, width, height, sinOffset) {
              var texture = new THREE.Texture(image);
              texture.needsUpdate = true;


            var uniforms = {
              texture:    { type: "t", value: texture },
              tSize:    { type: "2f", value: [width, height]},
              tPos:    { type: "2f", value: [x, y]},
              wSize:   { type: "2f", value: [window.innerWidth, window.innerHeight]},
              time:           { type: "f", value: 1.0 },
              mouse:           { type: "2f", value: [1.0, 1.0]},
              deltaM:         {type: '2f', value: [0.0, 0.0]},
              sinOffset:      {type: "f", value: sinOffset},
              progress:      {type: "f", value: 0},
              colorProgress: {type: "f", value: 1},
              positionZ:      {type: "f", value: 1.0}

            };

            var material = new THREE.ShaderMaterial({
              uniforms: uniforms,
              vertexShader: SketchVertexShader,
              fragmentShader: SketchFragmentShader,
              transparent: true,
              wireframe: false
            });

            material.needsUpdate = true;

            return material;
        },

        onResize: function() {

            this.width  = this.$window.width();
            this.height = this.$window.height();

            this.pixelRatio = window.devicePixelRatio;

            if (this.renderer) {
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();

                this.renderer.setPixelRatio( this.pixelRatio );
                this.renderer.setSize( this.width, this.height );
            }

            if (this.bottle) {
                this.bottle.mesh.material.uniforms.amount.value = this.width*0.017/10;
            }
        },

        setMousePos: function(pos) {
            this.initialMx = pos[0];
            this.initialMy = pos[1];

            this.mXStart = this.initialMx;
            this.mYStart = this.initialMy;

            this.mX = this.initialMx;
            this.mY = this.initialMy;

            this.newImage();
        },

        onActivate: function() {

            this.startUp = true;

            this.addEvents();

            // this.on();
        },

        onDeactivate: function() {

            // console.log('DE ACTIVATE');

            this.removeEvents();

            for (var i = 0; i < this.activePlanes.length; i++) {
                this.activePlanes[i].off('out', this.onImageOut, this);
            }

            if(this.sounds){
                this.sounds.forEach(function(sound){
                    sound.unload();
                });
            }

            this.activePlanes = null;

            this.currentPlane = null;

            $(this.renderer.domElement).remove();


            this.renderer = null;
            this.scene = null;
            this.camera = null;

            BaseInteractiveView.prototype.hide.call(this);
        },

        addEvents:function(){

            // AnimFrame.on('anim_frame', this.loop, this);

            this.$window.on('mousemove', this.onMouseMove);
            this.$window.on('touchmove', this.onMouseMove);
        },

        removeEvents:function(){

            // AnimFrame.off('anim_frame', this.loop, this);

            this.$window.off('mousemove', this.onMouseMove);
            this.$window.off('touchmove', this.onMouseMove);
        },

        onMouseMove: function(e) {

            if (Config.TABLET || Config.MOBILE) {
                // console.log('a', e.originalEvent.targetTouches[0].screenX, e.originalEvent.targetTouches[0]);
                this.mX = e.originalEvent.targetTouches[0].clientX;
                this.mY = e.originalEvent.targetTouches[0].clientY;
            }
            else {
                this.mX = e.pageX;
                this.mY = e.pageY;
            }


            // if (this.startUp) {
            //     this.startUp = false;

            //     this.mXStart = this.mX;
            //     this.mYStart = this.mY;

            //     this.newImage();
            // }


            this.deltaY = this.mY - this.mYStart;
            this.deltaX = this.mX - this.mXStart;


            this.rotationZ = Math.atan2(this.deltaY, this.deltaX);

            if (this.currentPlane) {
                var h = Math.sqrt( this.deltaX*this.deltaX + this.deltaY*this.deltaY);
                this.currentH = h  / (this.currentPlane.width);
            }


            this.newX = Math.cos(-this.rotationZ) * (this.deltaX) - Math.sin(-this.rotationZ) * (this.deltaY) + this.mXStart;
            this.newY = Math.sin(-this.rotationZ) * (this.deltaX) + Math.cos(-this.rotationZ) * (this.deltaY) + this.mYStart;
        },

        onAnimFrame: function () {

            this.time = Date.now() - this.startTime;


            this.deltaMX = this.mX - this.lastX;
            this.deltaMX = Math.max(-2, Math.min(2, this.deltaMX));

            // console.log('a', this.deltaMX);

            this.targetDeltaX += (this.deltaMX - this.targetDeltaX) * 0.09;
            // console.log('d', this.targetDeltaX);

            // current element

            if (this.currentPlane) {
                this.currentPlane.wrap.rotation.z = -this.rotationZ;

                this.currentPlane.material.uniforms.mouse.value = [this.newX, this.newY];
                this.currentPlane.material.uniforms.deltaM.value = [this.currentH, 0];
                this.currentPlane.material.uniforms.time.value = this.time;
                this.currentPlane.material.uniforms.sinOffset.value = Math.sin(this.time) ;
            }

            if (this.currentH >= 1.2 && this.currentPlane){
                this.mXStart = this.mX;
                this.mYStart = this.mY;
                this.startRotationZ = this.rotationZ;

                this.currentH = 0;


                //remove one
                for (var i = 0; i < this.activePlanes.length; i++) {
                  var plane3 = this.activePlanes[i];

                  if (plane3.positionZ - this.outSpeed > 0.15) {
                    plane3.setPositionZ(plane3.positionZ - this.outSpeed);
                  }
                  else {
                    //remove

                    if (!plane3.fadingOut) {
                        plane3.on('out', this.onImageOut, this);
                        plane3.animateOut();
                    }
                  }
                }
                this.currentH = 0;
                this.activePlanes.push(this.currentPlane);
                this.currentPlane.out();

                if ( !SoundModel.muted ) {

                    this.triggerSound();
                }


                this.currentPlane = null;
                this.newImage();

                this.bottle.spawn();
            }

            // bottle

            if ( this.bottle ) {
                this.bottle.onAnimFrame();

                this.bottle.setRotationZ();

                this.bottleMesh.material.uniforms.mouse.value = [this.bottle.width/2, this.bottle.height/2];
                this.bottle.wrap.position.x = this.mX - this.width/2;
                this.bottle.wrap.position.y = -this.mY + this.height/2;
                this.bottle.wrap.rotation.z = this.targetDeltaX * 25 * Math.PI/180;

                this.bottle.mesh.material.uniforms.spawnVal.value = this.bottle.tweenObj2.spawnVal * 3;
                this.bottle.mesh.material.uniforms.time.value = this.time;
                this.bottle.mesh.material.uniforms.colorSpeed.value = this.targetDeltaX*20;

            }

            // other elemetns

            for (var k = 0; k < this.activePlanes.length; k++) {
                var plane2 = this.activePlanes[k];

                plane2.onAnimFrame();

                plane2.material.uniforms.time.value = this.time*0.1;
                plane2.material.uniforms.progress.value = plane2.tweenObj.animationOut;
                plane2.material.uniforms.colorProgress.value = plane2.tweenObj2.color;
                plane2.material.uniforms.colorProgress.value = plane2.tweenObj2.color;
                plane2.material.uniforms.positionZ.value = plane2.targetZ;
                plane2.material.uniforms.colorProgress.value = plane2.tweenObj2.color;
            }


            this.lastX = this.mX;

            this.renderer.render(this.scene, this.camera);
        },


        triggerSound : function(){

            if(this.sounds){
                var nextSound = this.sounds[this.soundIndex ++ % this.sounds.length];

                //we'll fade out the sounds the closer together they get played
                // (it's too annoying otherwise!)
                var elapsed = this.time - this.lastImageTime;
                var minInterval = 1000;
                var volume = Math.min(1.0, Math.pow(elapsed / minInterval, 2) * 0.9 + 0.1);
                nextSound.volume(volume);
                nextSound.play();
            }

            this.lastImageTime = this.time;
        },

        show : function(){

            BaseInteractiveView.prototype.show.call(this);

            Backbone.trigger(AppEvents.Audio.Play, {
                "id" : "shapes",
                "type" : "track",
                "priority" : 1
            });
        },


        hide : function(){

            BaseInteractiveView.prototype.hide.call(this);

            Backbone.trigger(AppEvents.Audio.Stop, {
                "id" : "shapes",
                "type" : "track",
                "fade" : true
            });

        },

        onImageOut: function(el) {
            el.off('out', this.onImageOut, this);

            var index = this.activePlanes.indexOf(el);
            this.activePlanes.splice(index, 1);

            this.wrap.remove(el.wrap);

            el = null;


        }
    });
});
