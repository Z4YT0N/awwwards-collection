define([
    'config',
    'util/resn/math'
], function(
    Config,
    MathUtils
) {

    function Center(options) {

        this._init(options);
    }

    Center.prototype = {

        _init: function(options) {

            this.ctx = options.ctx;

            this.ease = options.ease;

            this.startX = options.x;
            this.startY = options.y;

            this.rndReverse = MathUtils.randomIntInRange(-1, 1);

            this.vx = 0.02;
            this.vy = 0.02;

            this.mX = 0;
            this.mY = 0;
            
            this.tmX = 0;
            this.tmY = 0;

            this.lifespan = this.currLifespan = Math.random() * 500;

            this.isDead = false;

            this.rnd = Math.random();

            this.angX = 0; // angle velocity
            this.angY = 0;

            this.img = options.img;
            this.imgW = this.img.width;
            this.imgH = this.img.height;

            this.startScale = Math.random();

            this.ampMult = 1;
        },

        setMouseCoords: function(x, y) {
            this.tmX = x;
            this.tmY = y;
        },

        setSize: function(w, h) {
            this.w = w;
            this.h = h;
        },

        update: function() {

            this.mX += (this.tmX - this.mX) * this.ease;
            this.mY += (this.tmY - this.mY) * this.ease;

            this.angX += this.vx;
            this.angY += this.vy;

            // this.scale = rX + Math.sin(this.angX) * 0.3;

            this.x = this.w - this.imgW * 0.5;
            this.y = (this.h - this.imgH) * 0.5;

            this.draw();
        },

        draw: function() {

            var rX = this.mX / this.w;
            var rY = this.mY / this.h;

            var imgW = this.imgW;
            var imgH = this.imgH;

            var imgOffX = this.x + (imgW * 0.5);
            var imgOffY = this.y + (imgH * 0.5);

            var scale;
            
            if(!Config.MOBILE){
                scale = 0.2 + rX * 0.4;
            } else {
                scale = 0.05 + rX * 0.2;
            }

            this.ctx.save();
            
            this.ctx.translate(imgOffX, imgOffY);
            this.ctx.scale(scale, scale);
            this.ctx.rotate((Math.PI * 2) * Math.abs(this.angX * 0.1));
            this.ctx.translate(-imgOffX, -imgOffY);
            
            this.ctx.drawImage(
                this.img,
                0, 0, this.imgW, this.imgH,
                this.x, this.y, imgW, imgH
            );
            
            this.ctx.restore();
        },

        getIsDead: function() {
            return this.isDead;
        }
    };

    return Center;

});