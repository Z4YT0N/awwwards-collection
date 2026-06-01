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

        img: null,
        ctx: null,

        prevData: null,

        glAlpha: 0.01,

        initialize: function(options) {
            this.$window = $(window);
            this.img = options.img;
            this.ctx = options.ctx;
            
        },

        update:function(burnData){
            if(burnData){

                this.ctx.save();
                //this.ctx.globalCompositeOperation = 'hard-light';
                this.ctx.globalAlpha = Math.random() * 0.3+0.5;
                this.ctx.drawImage(
                    this.img,
                    0,
                    0,
                    1000,
                    1000,
                    burnData[0][0],
                    burnData[0][1],
                    burnData[0][2],
                    burnData[0][3]
                );
                this.ctx.drawImage(
                    this.img,
                    0,
                    0,
                    1000,
                    1000,
                    burnData[1][0],
                    burnData[1][1],
                    burnData[1][2],
                    burnData[1][3]
                );
                this.ctx.restore();
                this.ctx.save();
                this.ctx.globalCompositeOperation = 'multiply';
                this.ctx.beginPath();
                this.ctx.rect(0,0,this.screenW,this.screenH);
                this.ctx.globalAlpha = this.glAlpha;
                this.ctx.fillStyle = "black";
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.restore();

                this.prevData = burnData;
            }
        },

        getDist:function(target, current, size){
            var deltaX = Math.abs(target[0] * size - current[0] * size);
            var deltaY = Math.abs(target[1] * size - current[1] * size);
            var rt = Math.sqrt((deltaX * deltaX)+(deltaY*deltaY));
            
            return rt;
        },

        onResize: function(pixelRatio) {
            this.pixelRatio = pixelRatio;
            this.screenW = this.$window.width()*this.pixelRatio;
            this.screenH = this.$window.height()*this.pixelRatio;
        },

        destroy: function() {
            
        }
    });
});
