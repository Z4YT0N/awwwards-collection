define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'route/router',
    'events/app_events',
    'model/app_model',
    'view/common/base_view'

], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    AppEvents,
    AppModel,
    BaseView

) { 'use strict';

    return BaseView.extend({

        ctx: null,

        screenW: 0,
        screenH: 0,

        img: null,
        imgEye:null,
        imgTg: null,
        sparks: null,

        precision: 100,

        assetSize: 10,

        currentLXs: 0,
        currentLYs: 0,
        currentRXs: 0,
        currentRYs: 0,

        index: 0,
        itteration: 0,

        sc: 1,

        initialize: function(options) {
            this.$window = $(window);
            if(Config.MOBILE){
                this.sc = 0.5;
            }
            this.ctx = options.ctx;
            this.img = options.img;
            this.imgEye = options.img_eye;
            this.imgTg = options.imgTg;
            this.sparks = options.sparks;
        },

        drawTg:function(tg, burnData){
            if(Config.MOBILE){
                return;
            }
            if(this.itteration % 3 === 0){

                this.ctx.save();
                if(this.index + 1 < 5){
                    this.index++;
                }else{
                    this.index = 0;
                }
            }
             this.ctx.drawImage(
                        this.sparks[this.index],
                        0,
                        0,
                        80,
                        80,
                        tg[0][0] - 40*this.sc ,
                        tg[0][1] - 40*this.sc ,
                        80*this.sc ,
                        80*this.sc 
                    );
             this.ctx.drawImage(
                        this.sparks[this.index],
                        0,
                        0,
                        80,
                        80,
                        tg[1][0] - 40*this.sc ,
                        tg[1][1] - 40*this.sc ,
                        80*this.sc ,
                        80*this.sc 
                    );
                this.ctx.restore();
            this.itteration++;
        },

        update:function(origin, target){
            this.drawFromTo(origin[0],target[0]);
            this.drawFromTo(origin[1],target[1]);
        },

        drawFromTo:function(from, to){
            
            //this.ctx.save();
            //this.ctx.globalCompositeOperation = 'overlay';
            if(!Config.MOBILE){
                var dist = this.getDist(to, from, 1);
                var deltaX = to[0] - from[0];
                var deltaY = to[1] - from[1];
                this.precision = parseInt(dist/8,10);
                var step = 1/this.precision ;
                var tg = [];
                for (var i = 0; i < this.precision; i++) {
                    var nexSx = (this.assetSize  * Math.random() + this.assetSize/2 ) * 2;
                    var nexSy = (this.assetSize  * Math.random() + this.assetSize/2 ) * 2;
                    tg = [from[0] + (i*step*deltaX)-nexSx/2, from[1] + (i*step*deltaY)-nexSy/2];
                    this.ctx.drawImage(this.img, 0 , 0, 10, 10 , tg[0], tg[1], nexSx, nexSy);
                }
            
                this.ctx.save();
                this.ctx.globalAlpha = 0.5;
                this.ctx.globalCompositeOperation = "overlay";
                this.ctx.beginPath();
                this.ctx.moveTo(from[0],from[1]);
                this.ctx.lineTo(to[0],to[1]);
                this.ctx.lineWidth = Math.random()*3+2;
                this.ctx.strokeStyle = '#12dda7';
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.restore();
                this.ctx.save();
                this.ctx.globalAlpha = 0.6;
                this.ctx.moveTo(from[0],from[1]);
                this.ctx.lineTo(to[0],to[1]);
                this.ctx.lineWidth = Math.random()*2+1;
                this.ctx.strokeStyle = '#12dda7';
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.restore();
                this.ctx.save();
                this.ctx.globalAlpha = 1;
                this.ctx.moveTo(from[0],from[1]);
                this.ctx.lineTo(to[0],to[1]);
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = '#12dda7';
                this.ctx.stroke();
                this.ctx.restore();
            }

            //this.ctx.restore();
        },

        onResize: function(pixelRatio) {
            this.pixelRatio = pixelRatio;
            this.screenW = this.$window.width();
            this.screenH = this.$window.height();
        },

        getDist:function(target, current, size){
            var deltaX = Math.abs(target[0] * size - current[0] * size);
            var deltaY = Math.abs(target[1] * size - current[1] * size);
            var rt = Math.sqrt((deltaX * deltaX)+(deltaY*deltaY));
            
            return rt;
        },

        destroy: function() {
            
        }
    });
});
