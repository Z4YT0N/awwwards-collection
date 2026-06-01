/**
 * Created by kev on 16-04-19.
 */
define(['view/common/createjs_animation',
        'view/animations/createjs_animations/batouija','modernizr'],

    function (CreateJSAnimation,
        FlashExportAnimation,Modernizr) {

        "use strict";

        var TRANSFORM_PREFIX = Modernizr.prefixed("transform");

        return CreateJSAnimation.extend({

            width : -1,
            height : -1,
            batPos : null,
            batPosList : null,
            scale:1,

            initialize : function(){

                CreateJSAnimation.prototype.initialize.call(this, FlashExportAnimation);

                //todo get dimensions from arguments?
                this.width = this.el.width;
                this.height = this.el.height;

                //set transform origin...
                this.$el.addClass("bat_ouija");

                this.batPos = [];
                this.batPosList = [[0.3,0.5],[0.5,0.3],[0.6,0.4],[0.4,0.8]];
            },

            onResize : function(width, height){

                width = window.innerWidth;
                height = window.innerHeight;

                this.centerX = window.innerWidth >> 1;
                this.centerY = window.innerHeight >> 1;

                this.batBodyH = height * 0.22;

                var scale = this.batBodyH/this.height;
                this.scale = scale;
                this.batBodyW = this.width * scale;

                this.el.style[TRANSFORM_PREFIX] = "scale3d(" + scale + "," + scale + ",1)";

                //position canvas
                var x = (width - this.batBodyW) >> 1;
                var y = (height - this.batBodyH);
                this.el.style.left = x + "px";
                this.el.style.top = y + "px";

                this.batPos[0] = x;
                this.batPos[1] = y;
            },

            getEyes:function(){
                return [[ this.centerX - (150 * this.scale), this.batPos[1] + 50*this.scale ], [ this.centerX + (140 * this.scale), this.batPos[1] + 50*this.scale ]];
            },

            update : function(){
            }

        });


    }
);