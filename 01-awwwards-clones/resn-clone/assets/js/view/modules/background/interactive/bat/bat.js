define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'route/router',
    'events/app_events',
    'model/app_model',
    "util/anim_frame",
    "model/loader_collection",
    'view/modules/background/interactive/base_interactive_view',
    //'view/modules/background/interactive/bat/bat_body',
    'view/modules/background/interactive/bat/batouija_animation',
    'view/modules/background/interactive/bat/bat_lazer',
    'view/modules/background/interactive/bat/bat_burn_view',
    'templates/templates'

], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    AppEvents,
    AppModel,
    AnimFrame,
    LoaderCollection,
    BaseInteractiveView,
    BatBodyView,
    BatLazerView,
    BatBurnView,
    Templates

) { 'use strict';

    return BaseInteractiveView.extend({

        canvas: null,
        canvas2: null,
        canvasMask: null,
        canvasBurn: null,
        originCanvas: null,
        batCanvas: null,
        ctx: null,
        ctx2: null,
        ctxMask: null,
        ctxBurn: null,
        ctxOrigin: null,
        ctxBat: null,
        pixelRatio: 1,

        imgBgList: null,
        imgBgIndex: -1,
        startIndex: 0,

        videlem: null,

        batBodyView: null,
        batLazerView: null,
        batBurnView: null,

        $window:null,

        originalW:1280,
        originalH:720,
        windowW:0,
        windowH:0,

        tgMousePosition: null,
        tgMousePositionPrev: null,

        lazerTarget0: null,
        lazerTarget1: null,

        lazerRange: 200,

        lazerScale0: 0,
        lazerScale1: 0,
        dist: 1.3,

        brushSize: 100,

        delayToStart: 0,
        timerInst: null,

        lazerTgEaseX: 0,
        lazerTgEaseY: 0,


        // SETUP ---------------------------------------------------------------

        initialize: function(options) {
            _.bindAll(this,'onMouseMove','triggerBgChange');
            if(Config.MOBILE){
                this.originalW = 400;
                this.originalH = 700;
            }
            this.compileAndAppendTemplate(_.partial(Templates.r, 'bat'), {});
            this.$window = $(window);
            this.pixelRatio = window.devicePixelRatio;
            this.tgMousePosition = {'x':this.$window.width()/2 * this.pixelRatio, 'y':this.$window.height()/2 * this.pixelRatio};
            this.tgMousePositionPrev = {'x':this.$window.width()/2 * this.pixelRatio, 'y':this.$window.height()/2 * this.pixelRatio};
            this.lazerTarget0 = {'x':this.$window.width()/2 * this.pixelRatio, 'y':this.$window.height()/2 * this.pixelRatio};
            this.lazerTarget1 = {'x':this.$window.width()/2 * this.pixelRatio, 'y':this.$window.height()/2 * this.pixelRatio};
            this.createEffects(); // replaces onLoaderComplete
        },

        start: function() {
        },

        createEffects: function() {
            this.imgBgList = [
                LoaderCollection.getResult('BAT_BG1'),
                LoaderCollection.getResult('BAT_BG2'),
                LoaderCollection.getResult('BAT_BG3'),
                LoaderCollection.getResult('BAT_BG4'),
                LoaderCollection.getResult('BAT_BG5'),
                LoaderCollection.getResult('BAT_BG6')
            ];

            this.imgBrush = LoaderCollection.getResult('BAT_BRUSH');
            this.imgBurn  = LoaderCollection.getResult('BAT_BURN');
            this.create();
        },

        createTimer:function(){
            this.killTimer();
            this.timerInst = setInterval(this.triggerBgChange, 6500);
        },

        killTimer:function(){
            if(this.timerInst){
                clearInterval(this.timerInst);
                this.timerInst = null;
            }
        },

        triggerBgChange:function(){
            this.imgBgIndex = this.getNextIndex();
            /*this.lazerScale0 = 0.8;
            this.lazerScale1 = 0.8;*/
            //this.dist = 0.8;
            this.batBurnView.glAlpha += 0.0001;
            this.createDrawTopCanvas(this.imgBgList[this.imgBgIndex], this.imgBgList[this.getNextIndex()], this.imgBgList[this.getPrevIndex()], this.canvas);

            this.startIndex = 1; // black BG only first time
        },

        getNextIndex: function() {
            return Math.max(this.startIndex, (this.imgBgIndex + 1) % this.imgBgList.length);
        },

        getPrevIndex: function() {
            return Math.max(this.startIndex, (this.imgBgIndex > 0) ? this.imgBgIndex - 1 : this.imgBgList.length - 1);
        },

        create:function(){

            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas2 = document.createElement('canvas');
            this.ctx2 = this.canvas2.getContext('2d');
            this.canvasMask = document.createElement('canvas');
            this.ctxMask = this.canvasMask.getContext('2d');
            this.canvasBurn = document.createElement('canvas');
            this.ctxBurn = this.canvasBurn.getContext('2d');
            this.originCanvas = document.createElement('canvas');
            this.ctxOrigin = this.originCanvas.getContext('2d');
            this.batCanvas = document.createElement('canvas');
            this.ctxBat = this.batCanvas.getContext('2d');
            this.$node.append(this.canvas2);
            this.$node.append(this.canvas);
            this.$node.append(this.batCanvas);

            //batouija_animation creates separate canvas
            this.batBodyView = new BatBodyView({
                //ctx: this.ctxBat,
                bat: LoaderCollection.getResult('BAT')
            });
            //append canvas
            //todo may be better to render bat in this ctx?
            this.el.appendChild(this.batBodyView.el);

            this.batBurnView = new BatBurnView({
                ctx: this.ctxBurn,
                img: this.imgBurn
            });

            this.batLazerView = new BatLazerView({
                ctx: this.ctxBat,
                img: LoaderCollection.getResult('BAT_LAZER'),
                img_eye: LoaderCollection.getResult('BAT_EYEOVER'),
                imgTg: LoaderCollection.getResult('BAT_BURN'),
                sparks:[LoaderCollection.getResult('BAT_SPARK1'),LoaderCollection.getResult('BAT_SPARK2'),LoaderCollection.getResult('BAT_SPARK3'),LoaderCollection.getResult('BAT_SPARK4'),LoaderCollection.getResult('BAT_SPARK5')]
            });

            this.onResize();
        },

        onResize: function() {
            this.pixelRatio = 1;

            var width = this.$window.width();
            var height = this.$window.height();

            if(Config.MOBILE){
                this.brushSize = width * 0.44;
                this.lazerRange = width * 0.12;
            }else if(Config.TABLET){
                this.brushSize = width * 0.44;
                this.lazerRange = width * 0.12;
            }else{
                this.brushSize = width * 0.22;
                this.lazerRange = width * 0.08;
            }

            if(this.canvas){
                this.canvas.width = width * this.pixelRatio;
                this.canvas.height = height * this.pixelRatio;
                this.windowW = width;
                this.windowH = height;
                $(this.canvas).css({
                    'position':'absolute',
                    'top':0,
                    'left':0,
                    'width':width,
                    'height':height
                });
            }
            if(this.canvas2){
                this.canvas2.width = width * this.pixelRatio;
                this.canvas2.height = height * this.pixelRatio;
                $(this.canvas2).css({
                    'position':'absolute',
                    'top':0,
                    'left':0,
                    'width':width,
                    'height':height
                });
            }
            if(this.batCanvas){
                this.batCanvas.width = width * this.pixelRatio;
                this.batCanvas.height = height * this.pixelRatio;
                $(this.batCanvas).css({
                    'position':'absolute',
                    'top':0,
                    'left':0,
                    'width':width,
                    'height':height
                });
            }
            if(this.canvasMask){
                this.canvasMask.width = width * this.pixelRatio;
                this.canvasMask.height = height * this.pixelRatio;
            }
            if(this.canvasBurn){
                this.canvasBurn.width = width * this.pixelRatio;
                this.canvasBurn.height = height * this.pixelRatio;
            }
            if(this.originCanvas){
                this.originCanvas.width = width * this.pixelRatio;
                this.originCanvas.height = height * this.pixelRatio;
            }
            if(this.batBodyView){
                this.batBodyView.onResize(this.pixelRatio);
            }
            if(this.batLazerView){
                this.batLazerView.onResize(this.pixelRatio);
            }
            if(this.batBurnView){
                this.batBurnView.onResize(this.pixelRatio);
            }
        },

        onActivate: function() {
            this.addEvents();
            this.triggerBgChange();
        },

        onDeactivate: function() {
            this.removeEvents();
        },

        addEvents:function(){
            this.createTimer();
            //AnimFrame.on('anim_frame', this.loop, this);
            this.$window.on('mousemove', this.onMouseMove);
            this.$window.on('touchmove', this.onMouseMove);
            /*if(this.videlem){
                this.videlem.play();
            }*/
        },

        removeEvents:function(){
            this.killTimer();
            //AnimFrame.off('anim_frame', this.loop, this);
            LoaderCollection.off('complete' , this.onLoaderComplete , this);
            this.$window.off('mousemove', this.onMouseMove);
            this.$window.off('touchmove', this.onMouseMove);
            /*if(this.videlem){
                this.videlem.pause();
            }*/
        },

        onMouseMove:function(e){
            if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
                e = e.originalEvent.touches[0];
            }
            this.tgMousePosition = {'x':e.pageX * this.pixelRatio, 'y':e.pageY * this.pixelRatio};
        },

        onAnimFrame:function(){
            if(this.isActivated){
                this.draw();
            }
        },

        draw:function(){
            var burnData = null;
            this.delayToStart += 1;
            if(this.ctxMask && this.delayToStart > 10){
                burnData = this.updateMask();
            }
            if(this.ctx){

                this.ctx.save();
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.ctx.drawImage(this.originCanvas, 0, 0);
                if(this.batBurnView){
                    this.batBurnView.update(burnData);
                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.globalCompositeOperation = 'hard-light';
                    this.ctx.drawImage(this.canvasBurn, 0, 0);
                    this.ctx.restore();
                }
                this.ctx.globalCompositeOperation = 'destination-out';
                this.ctx.drawImage(this.canvasMask, 0, 0);
                this.ctx.restore();
            }
            this.ctxBat.clearRect(0,0,this.canvas.width,this.canvas.height);
            if(this.batLazerView && this.delayToStart > 10){
                this.batLazerView.drawTg([[this.lazerTarget0.x, this.lazerTarget0.y],[this.lazerTarget1.x, this.lazerTarget1.y]],burnData);
            }

            if(this.batLazerView && this.delayToStart > 10){
                this.batLazerView.update(this.batBodyView.getEyes(), [[this.lazerTarget0.x,this.lazerTarget0.y],[this.lazerTarget1.x,this.lazerTarget1.y]]);
            }
            if(this.batBodyView){
                this.batBodyView.update();
            }
            this.tgMousePositionPrev = this.tgMousePosition;
        },

        updateMask:function(){
            this.lazerRangey = 0;
            //this.lazerRangey = Math.random() * -800 +400;
            this.lazerTarget0.x += ((this.tgMousePosition.x - this.lazerRange) - this.lazerTarget0.x)*0.1;
            //this.lazerTarget0.x += ((this.tgMousePosition.x - Math.random() * 0 - this.lazerRange) - this.lazerTarget0.x)*0.1;
            this.lazerTarget0.y += ((this.tgMousePosition.y + this.lazerRangey) - this.lazerTarget0.y)*0.1;

            this.lazerTarget1.x += ((this.tgMousePosition.x + this.lazerRange) - this.lazerTarget1.x)*0.1;
            //this.lazerTarget1.x += ((this.tgMousePosition.x + Math.random() * 0 + this.lazerRange) - this.lazerTarget1.x)*0.1;
            this.lazerTarget1.y += ((this.tgMousePosition.y + this.lazerRangey) - this.lazerTarget1.y)*0.1;

            this.dist += 0.0005;

            this.lazerScale0 += ((this.dist*this.pixelRatio* Math.random()) - this.lazerScale0)*0.07;
            this.lazerScale1 += ((this.dist*this.pixelRatio* Math.random()) - this.lazerScale1)*0.07;

            var lazer0Size = this.lazerScale0 * this.brushSize/2;
            var lazer1Size = this.lazerScale1 * this.brushSize/2;

            var drawLSx = (this.lazerScale0 + Math.random() * 0.05) * this.brushSize;
            var drawLSy = (this.lazerScale0 + Math.random() * 0.05) * this.brushSize;

            var drawRSx = (this.lazerScale1 + Math.random() * 0.05) * this.brushSize;
            var drawRSy = (this.lazerScale1 + Math.random() * 0.05) * this.brushSize;

            //if(dist > 0.02){
                this.ctxMask.save();
                this.ctxMask.globalAlpha = 0.2 + Math.random() * 0.1;
                this.ctxMask.drawImage(
                    this.imgBrush,
                    0,
                    0,
                    500,
                    500,
                    this.lazerTarget0.x - lazer0Size,
                    this.lazerTarget0.y - lazer0Size,
                    drawLSx,
                    drawLSy
                );
                this.ctxMask.drawImage(
                    this.imgBrush,
                    0,
                    0,
                    500,
                    500,
                    this.lazerTarget1.x - lazer1Size,
                    this.lazerTarget1.y - lazer1Size,
                    drawRSx,
                    drawRSy
                );
                this.ctxMask.restore();
            //}
            return [[this.lazerTarget0.x - lazer0Size, this.lazerTarget0.y - lazer0Size, drawLSx, drawLSy],[this.lazerTarget1.x - lazer1Size, this.lazerTarget1.y - lazer1Size, drawRSx, drawRSy]];
        },

        createDrawTopCanvas:function(img, imgBg, prevImg, canv){
            
            if(!img){
                //console.log("bat bg not loaded!");
                return;
            }
            
            var sz = this.getImageSized();
            this.ctxOrigin.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.ctxOrigin.drawImage(
                img,
                0,
                0,
                this.originalW,
                this.originalH,
                (this.canvas.width - sz.newW)*0.5,
                (this.canvas.height - sz.newH)*0.5,
                sz.newW,
                sz.newH
            );

            this.ctxOrigin.drawImage(this.canvas, 0, 0);

            this.ctxMask.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctxBurn.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.drawBg(sz, imgBg);
        },

        drawBg:function(sz, img){
            if(this.ctx2){
                this.ctx2.clearRect(0,0,this.canvas2.width,this.canvas2.height);
                this.ctx2.drawImage(
                    img,
                    0,
                    0,
                    this.originalW,
                    this.originalH,
                    (this.canvas.width - sz.newW)*0.5,
                    (this.canvas.height - sz.newH)*0.5,
                    sz.newW,
                    sz.newH
                );
            }
        },

        getImageSized:function(){
            var sc = this.windowW / this.originalW ;
            var newH = sc * this.originalH;
            var newW = this.windowW;
            if(newH < this.windowH){
                sc = this.windowH / this.originalH;
                newW = this.originalW * sc;
                newH = this.windowH;
            }
            return {newW:newW * this.pixelRatio, newH:newH * this.pixelRatio};
        },

        getDist:function(target, current, size){
            var deltaX = Math.abs(target[0] * size - current[0] * size);
            var deltaY = Math.abs(target[1] * size - current[1] * size);
            var rt = Math.sqrt((deltaX * deltaX)+(deltaY*deltaY));

            return rt;
        },

        show : function(){

          BaseInteractiveView.prototype.show.call(this);

            Backbone.trigger(AppEvents.Audio.Play, {
                "type" : "track",
                "id" : "bat_saw",
                "priority" : 1
            });
        },


        hide : function(){
            
            BaseInteractiveView.prototype.hide.call(this);

            Backbone.trigger(AppEvents.Audio.Stop, {
                "id" : "bat_saw",
                "type" : "track",
                "fade" : true
            });

        },


        update: function() {

        },

        destroy : function(){
            BaseInteractiveView.prototype.destroy.call(this);
            //remove bat view
            this.batBodyView.destroy();
        }
    });
});