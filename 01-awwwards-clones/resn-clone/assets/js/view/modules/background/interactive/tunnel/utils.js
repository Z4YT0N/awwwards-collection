/**
 * Created by kev on 16-04-07.
 */

define([''], function(){

    return {
        Color:(function () {
            function Color(r,g,b,a) {
                this.r = r !== undefined ? r : 255;
                this.g = g !== undefined ? g : 255;
                this.b = b !== undefined ? b : 255;
                this.a = a !== undefined ? a : 255;
            }

            Color.prototype.toRGBString = function () {
                return 'rgb(' + this.r + "," + this.g + "," + this.b + ")";
            };

            Color.prototype.toRGBAString = function () {
                return 'rgba(' + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
            };

            Color.prototype.clone = function () {
                return new Color(this.r,this.g,this.b,this.a);
            };

            //static functions
            Color.LerpColor = function (start,dest,ratio) {
                return new Color(
                    parseInt(start.r + (dest.r - start.r) * ratio),
                    parseInt(start.g + (dest.g - start.g) * ratio),
                    parseInt(start.b + (dest.b - start.b) * ratio),
                    start.a + (dest.a - start.a) * ratio
                );
            };

            Color.Random = function(){
                var r = Math.floor(Math.random()*255);
                var g = Math.floor(Math.random()*255);
                var b = Math.floor(Math.random()*255);
                return new Color(r,g,b);
            };


            Color.HexToRgb = function (hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return new Color(parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16));
            };

            return Color;
        })(),
        CreateBuffer: function () {

            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");

            return {
                canvas: canvas,
                ctx: ctx,
                width: -1,
                height: -1,
                invalidated: false,
                resize: function (w, h) {
                    if (w && h) {
                        w = Math.floor(w);
                        h = Math.floor(h);

                        if (this.width !== w || this.height !== h) {
                            this.canvas.width = w;
                            this.canvas.height = h;
                            this.width = w;
                            this.height = h;
                            return true;
                        }
                    }
                    return false;
                },
                clear: function () {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },
                //for debug!
                fill: function (color) {
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(0, 0, this.width, this.height);
                },
                getPixelRatio: function () {
                    //http://www.html5rocks.com/en/tutorials/canvas/hidpi/
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                        this.ctx.mozBackingStorePixelRatio ||
                        this.ctx.msBackingStorePixelRatio ||
                        this.ctx.oBackingStorePixelRatio ||
                        this.ctx.backingStorePixelRatio || 1;

                    var ratio = devicePixelRatio / backingStoreRatio;
                    return ratio;
                }
            };
        }
    };
});