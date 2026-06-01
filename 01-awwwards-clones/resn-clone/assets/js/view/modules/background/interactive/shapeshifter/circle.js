define([
    'config',
    'util/resn/math'
], function(
    Config,
    MathUtils
) {

    function Circle(options) {

        this.MAX_SIZE = 50;
        this.NB_POINTS = 10;

        this._init(options);
    }

    Circle.prototype = {

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

            this.angX = 0;
            this.angY = 0;

            this.imgSc = Config.MOBILE ? 0.2 : 0.35;

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

            var rX = this.mX / this.w;
            var rY = this.mY / this.h;

            this.angX += this.vx;
            this.angY += this.vy;

            this.scale = rX + Math.sin(this.angX) * 0.3;

            this.x = this.startX;
            this.y = this.startY;

            // this.currLifespan -= 1;
            // if(this.currLifespan <= 0){
            //     this.isDead = true;
            // }

            this.draw();
        },

        draw: function() {

            var o = MathUtils.clamp(this.currLifespan / (this.lifespan * 0.1), 0, 1);

            this.ctx.save();

            // this.ctx.translate(this.w, this.h * 0.5);
            // this.ctx.rotate(Math.sin(this.angX));
            // this.ctx.translate(-this.w, -this.h * 0.5);

            this.ctx.beginPath();

            this.radius = this.w * 0.1 + (this.scale * (this.w * 0.5));

            for (var i = 0; i < this.NB_POINTS; i++) {

                var angle = -Math.PI * (i / this.NB_POINTS);
                var imgSize = this.imgW * this.imgSc;
                
                var pX = (this.x - imgSize * 0.5) + Math.sin(angle) * this.radius;
                var pY = (this.y - imgSize * 0.5) + Math.cos(angle) * this.radius;

                // var pX = this.x + Math.sin(angle) * this.radius;
                // var pY = this.y + Math.cos(angle) * this.radius;

                var imgOffsetX = pX + (imgSize * 0.5);
                var imgOffsetY = pY + (imgSize * 0.5);

                this.ctx.save();

                this.ctx.translate(imgOffsetX, imgOffsetY);
                this.ctx.rotate((Math.PI * 2) * Math.sin(this.angX));
                this.ctx.translate(-imgOffsetX, -imgOffsetY);

                this.ctx.drawImage(
                    this.img,
                    0, 0, this.imgW, this.imgH,
                    pX, pY, imgSize, imgSize
                );

                this.ctx.restore();
            }


            // this.ctx.fillStyle = 'rgba(255,255,255,'+o+')';
            // this.ctx.fill();

            // this.ctx.closePath();

            this.ctx.restore();
        },

        getIsDead: function() {
            return this.isDead;
        }
    };

    return Circle;

});