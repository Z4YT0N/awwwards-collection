/**
 * Created by kev on 2016-05-09.
 */
define(['backbone',
        'howler',
        'config'],

    function (Backbone,
        Howler,
        Config) {

        return Backbone.View.extend({

            sounds      :null,
            currentIndex:0,
            currentSound:null,
            timeOut     :null,
            src         :"",

            initialize:function (options) {
                this.sounds = [];
                this.src = options.src;
                this.interval = options.interval || 16000;

                //load first
               var self = this;
                this.createSound().then(function(sound){
                        self.currentSound = sound;
                });
            },

            show:function () {
                //start timer
                var self = this;
                this.timeOut = setInterval(function(){
                        self.onTimeOut();
                },this.interval);

                if (this.currentSound) {
                    this.currentSound.play();
                }else {
                    this.onTimeOut();
                }
            },

            onTimeOut:function () {

                if (this.sounds.length < 2) {
                    var self = this;
                    this.createSound().then(function (sound) {
                        self.currentSound = sound;
                        sound.play();
                    });
                } else {
                    this.currentSound = this.sounds[this.currentIndex++ % 2];
                    this.currentSound.play();
                }
            },

            createSound:function (onLoad) {
                var self = this;
                return new Promise(function (resolve,reject) {

                    var sound = new Howler.Howl({
                        urls:[self.src],
                        loop:false,
                        onload : function(){
                                                    //add to pool
                              self.sounds.push(this);
                              resolve(this);
                        },
                        onloaderror : function(){
                               reject();
                        }
                    });

                });
            },

            hide:function () {

                if (this.timeOut) {
                    clearTimeout(this.timeOut);
                }

                if (this.currentSound) {
                    this.currentSound.stop();
                }

                //dispose sounds
                this.sounds.forEach(function (sound) {
                    sound.unload();
                });
                this.sounds = [];

            }

        });
    });