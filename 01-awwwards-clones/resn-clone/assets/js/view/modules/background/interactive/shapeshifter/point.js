define([
    'config',
    'util/resn/math'
], function(
    Config,
    MathUtils
) {

    function Point(options) {

        this.MAX_SIZE = 50,

        this._init(options);
    }

    Point.prototype = {

        _init: function(options) {

            this.ctx = options.ctx;

            this.ease = options.ease;

            this.startX = options.x;
            this.startY = options.y;
            
            this.rndReverse = MathUtils.randomIntInRange(-1, 1);

            this.vx = (Math.random() * 0.02);
            this.vy = (Math.random() * 0.02);

            this.mX = 0;
            this.mY = 0;
            this.tmX = 0;
            this.tmY = 0;

            this.lifespan = this.currLifespan = Math.random() * 500;

            this.isDead = false;

            this.rnd = Math.random();

            this.angX = 0;
            this.angY = 0;

            this.img = options.img;

            this.startScale = Math.random();

            this.ampMult = 1;
        },

        setPrevPos: function(x,y) {
            this.prevX = x;
            this.prevY = y;
        },

        setMouseCoords: function(x,y) {
            this.tmX = this.rndReverse * x;
            this.tmY = this.rndReverse * y;
        },

        setSize: function(w, h) {
            this.w = w;
            this.h = h;

            var imgRatio = this.img.width / this.img.height;
            this.imgW = Math.min((350 / 1024) * w, this.img.width);
            this.imgH = this.imgW * imgRatio;
        },

        update: function() {

            this.mX += (this.tmX - this.mX) * this.ease;
            this.mY += (this.tmY - this.mY) * this.ease;

            var rX = this.mX / this.w;
            var rY = this.mY / this.h;

            this.ampX = (this.rnd * (this.w * 0.25)) + (rX * this.w * 0.75);
            this.ampY = (this.rnd * (this.h * 0.25)) + (rY * this.h * 0.75);

            this.angX += this.vx;
            this.angY += this.vy;

            this.scale = this.startScale + Math.sin(this.angX);

            var x = this.startX + (Math.sin(this.angX) * this.ampX);
            var y = this.startY + (Math.sin(this.angY) * this.ampY);

            this.x = x;
            this.y = y;

            // this.currLifespan -= 1;
            // if(this.currLifespan <= 0){
            //     this.isDead = true;
            // }

            this.draw();
        },

        draw: function() {
            
            var p0 = { 'x': this.prevX, 'y': this.prevY };
            var p1 = { 'x': this.x, 'y': this.y };
            var o = MathUtils.clamp(this.currLifespan / (this.lifespan * 0.1), 0, 1);

            var imgSize = this.imgW * this.scale;
            var imgOffsetX = p1.x + (imgSize * 0.5);
            var imgOffsetY = p1.y + (imgSize * 0.5);

            this.ctx.save();

            this.ctx.translate(imgOffsetX, imgOffsetY);
            this.ctx.rotate((Math.PI/4) * Math.sin(this.angX));
            this.ctx.translate(-imgOffsetX, -imgOffsetY);

            this.ctx.drawImage(
                this.img, 
                0, 0, this.img.width, this.img.height,
                p1.x, p1.y, imgSize, imgSize
            );

            this.ctx.restore();
        },

        getIsDead: function() {
            return this.isDead;
        }
    };

    return Point;

});