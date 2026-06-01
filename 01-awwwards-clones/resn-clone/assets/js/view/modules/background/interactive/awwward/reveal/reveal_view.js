define([

    'jquery',
    'underscore',
    'config',
    'three',
    'TweenMax',

    'model/loader_collection',

    'view/common/base_view'

], function(

    $,
    _,
    Config,
    THREE,
    TweenMax,

    LoaderCollection,

    BaseView

) {
    'use strict';


    var View = BaseView.extend({

        size: 128,
        texSize: null,

        initialize: function(opts) {

            _.bindAll(this, 'onAnimComplete');

            this.setup(opts);
        },

        setup: function(opts) {

            this.wW = window.innerWidth;
            this.wH = window.innerHeight;

            this.mCoords = [0.5, 0.5];

            this.tweenObj = { 'prCircle': 0, 'prRect': 0, 'prAlpha': 0 };

            this.assets = opts.assets;

            this.create2DTexture();
        },

        create2DTexture: function() {

            // tmp
            this.cvTmp = document.createElement('canvas');
            this.cvTmp.width = this.size;
            this.cvTmp.height = this.size;

            this.cxTmp = this.cvTmp.getContext('2d');
            this.cxTmp.fillStyle = '#000000';
            this.cxTmp.fillRect(0, 0, this.cvTmp.width, this.cvTmp.height);

            // output
            this.cv = document.createElement('canvas');
            this.cv.width = this.size;
            this.cv.height = this.size;

            this.cx = this.cv.getContext('2d');
            this.cx.fillStyle = '#000000';
            this.cx.fillRect(0, 0, this.cv.width, this.cv.height);

            this.texOutput = new THREE.Texture(this.cv);
            this.texOutput.needsUpdate = true;

            this.texImg = LoaderCollection.getResult('AWWWARD_INTRO_LIGHT');

            this.texSize = this.texImg.width;

            /**
             * FOR TESTING
             */
//             $('#rootNode').append(this.cv);
//             $(this.cv).css({ width: this.size, height: this.size, top: 0, left: 0, 'z-index': 30, 'position': 'absolute' });
        },

        // states toggle ---------------------------------------------------------------
            
        start: function(d_, val_) {

            if (this._started){ return; }
            this._started = true;

            var d = d_ || 0;
            var val = val_ || 1;


            this.tweenTo(d, val);
        },

        stop: function() {

            if (!this._started){ return; }
            this._started = false;

        },

        tweenTo: function(d, val) {

            this.isRenderable = true;


            TweenMax.killTweensOf(this.tweenObj);

            TweenMax.to(this.tweenObj, 0.48, { 'prAlpha': val, 'ease': 'Power1.easeOut', 'delay': d + 0.28 });
            TweenMax.to(this.tweenObj, 2, { 'prCircle': 4 * val, 'ease': 'Power1.easeOut', 'delay': d + 0.28 });
            TweenMax.to(this.tweenObj, 4, { 'prRect': 4 * val, 'ease': 'Power1.easeOut', 'delay': d + 1.72, 'onComplete': this.onAnimComplete });
        },

        // handlers ---------------------------------------------------------------
            
        onAnimComplete: function() {
            
            this.stop();

            this.isRenderable = false;

        },

        // getters / setters ---------------------------------------------------------------

        getTexture: function() {

            return this.texOutput;
        },

        get2DTexture: function() {

            return this.cnv;
        },

        getStarted: function() {

            return this._started;
        },

        // destroy ---------------------------------------------------------------
            
        destroy: function() {
            
            this.texOutput.dispose();

            this.cvTmp = null;
            this.cv = null;
        },

        // handle ---------------------------------------------------------------

        handleDown: function() {
        },

        handleLeave: function() {

        },

        handleMove: function(coords) {
            
            this.mCoords = coords;
        },

        onIntersect: function( intersects ) {
        },


        // update ---------------------------------------------------------------

        update: function() {

            if (this.isRenderable) {
                this.render();
            }
        },

        render: function() {

            var prCircle = this.tweenObj.prCircle;
            var prAlpha = this.tweenObj.prAlpha;
            var prRect = this.tweenObj.prRect;

            var cW = this.cv.width;
            var cH = this.cv.height;

            this.cxTmp.save();

            // this.cxTmp.globalAlpha = 0.08;
            this.cxTmp.globalAlpha = 0.08 * prAlpha;
            // this.cxTmp.globalAlpha = 0.02 * prAlpha;

            var pos = [0, 0];
            pos[0] = this.mCoords[0] * cW;
            pos[1] = this.mCoords[1] * cH;

            var tSize = this.texSize * 0.48 * prCircle;

            this.cxTmp.drawImage(
                this.texImg,
                0, 0, this.texSize, this.texSize,
                pos[0] - tSize * 0.5, pos[1] - tSize * 0.5, tSize, tSize //* this.scaleRatio
            );

            this.cxTmp.fillStyle = 'rgba(255,255,255,' + prRect + ')';
            this.cxTmp.fillRect(0, 0, cW, cH);

            this.cxTmp.restore();

            this.cx.clearRect(0, 0, cW, cH);
            this.cx.save();
            this.cx.fillStyle = '#000000';
            this.cx.fillRect(0, 0, cW, cH);
            this.cx.globalAlpha = prAlpha;
            this.cx.drawImage(this.cvTmp, 0, 0, cW, cH);
            this.cx.restore();

            this.texOutput.needsUpdate = true;

        },

        // resize ---------------------------------------------------------------

        resize: function(w, h) {
            this.wW = w;
            this.wH = h;
        }

    });


    return View;

});
