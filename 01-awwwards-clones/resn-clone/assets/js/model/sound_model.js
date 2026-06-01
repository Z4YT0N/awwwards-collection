define([

        'jquery',
        'underscore',
        'backbone',
        'TweenMax',
        'config',
        'events/app_events',
        'events/sound_states',
        "howler",
        'model/app_model',
        "model/loader_collection",
        'util/anim_frame'

    ],function ($,
        _,
        Backbone,
        TweenMax,
        Config,
        AppEvents,
        SoundStates,
        Howler,
        AppModel,
        LoaderCollection,
        AnimFrame) {

        'use strict';

        /**
         * We'll try to follow this interface for the sound objects
         *
         * @type {{sound: null, interval: null, type: string, play: ISoundData.play, stop: ISoundData.stop}}
         */
        var ISoundData = {
            sound   :null,
            interval:null,
            type    :"",
            sprites :[],
            channel :-1,
            /**
             *
             * @param sprite
             * @param delay
             * @param channel
             */
            play    :function (sprite,delay,channel) {
            },
            stop    :function () {
            }
        };

        var TRACK_ID = 0;
        // var CLIP_IP = 0;

        var Model = Backbone.Model.extend({

            defaults:{
                currentPlayer:false,
                muted        :false,
                paused       :false,
                clips        :[],
                tracks       :[],
                ambients     :[],
                loaded       :false
            },

            _history           :[],
            _ambientCollections:{},
            _sounds            :[],
            _activeTracks      :[],
            _ambientIndex      :0,
            _audioSources      :[],
            _randomClipIds     :[],
            _randomIndex       :0,

            url         :Config.CDN + "/data/sounds.json",
            muted       :Config.SOUND_MUTED,
            ambientMuted:false,

            prevTrackIndex: -1,

            initialize:function () {

            },

            start: function(){
                this.fetch({success:this.initiateSounds.bind(this)});

                AnimFrame.on('anim_frame',this.updateTime,this);
                this.listenTo(this,"change:ambient",function () {
                    //console.log("history : " + this._history.length);
                    this._history.push(this.get("ambient"));
                });
            },

            initiateSounds:function () {

                //for clips and tracks we'll load the soubnds directly into
                // the howler instances. These instances will be saved onto objects
                var promises = [];
                promises.push(this.loadClips());
                promises.push(this.loadTracks());
                promises.push(this.loadAmbients());

                var self = this;
                return Promise.all(promises).then(function () {
                    self.set("loaded",true);
                }).catch(function (e) {
                    console.log(e);
                    console.error("SOUND LOAD :: " + e.stack);
                });

            },

            loadTracks:function () {
                var promises = [];
                var tracks = this.get("tracks");
                tracks.forEach(function (track) {
                    this.parseTrack(track);
                    promises.push(this.loadSound(track.sound));
                },this);

                return Promise.all(promises);
            },

            loadClips:function () {
                var promises = [];
                var clips = this.get("clips");
                clips.forEach(function (clip) {
                    this.parseClip(clip);
                    promises.push(this.loadSound(clip.sound));
                },this);

                for (var i = 0; i < clips.length; i++) {
                    for (var id in clips[i].sprites) {
                        if (id.indexOf("random") !== -1) {
                            this._randomClipIds.push(id);
                        }
                    }
                }

                return Promise.all(promises);
            },

            parseTrack:function (track) {
                var self = this;
                track.sprites = this.parseSprites(track.sprites);
                var sound = new Howler.Howl({
                    urls  :[Config.CDN + track.src],
                    sprite:track.sprites,
                    loop  :track.looping !== undefined ? track.looping : true,
                });

                //extend ISoundData...
                track.sound = sound;
                track.interval = null;
                track.type = "track";
                track.uid = TRACK_ID++;
                track.tween = {volume:0};

                track.play = function (id,delay,volume,fadeDuration) {

                    delay = delay || 0;
                    fadeDuration = fadeDuration !== undefined ? fadeDuration / 1000 : 0.5;
                    volume = volume || 1;

                    clearTimeout(track.interval);
                    var restart = !track.playing;
                    track.playing = true;


                    track.interval = setTimeout(function () {
                        self.addTrack(track);

                        if (restart) {
                            track.sound.pos(0,track.id);
                            track.sound.play(track.id);
                        }

                        TweenMax.killTweensOf(track.tween);
                        TweenMax.to(track.tween,fadeDuration,{
                            volume  :volume,
                            onUpdate:function () {
                                track.sound.volume(track.tween.volume,track.id);
                            }
                        });

                    },delay);

                };
                track.stop = function (fade) {

                    clearTimeout(track.interval);
                    fade = fade !== undefined ? fade : false;

                    self.removeTrack(this);

                    TweenMax.killTweensOf(track.tween);
                    if (fade) {
                        TweenMax.to(track.tween,0.5,{
                            volume    :0,
                            onUpdate  :function () {
                                track.sound.volume(track.tween.volume,track.id);
                            },
                            onComplete:function () {
                                track.sound.stop(track.id);
                                track.dispose();
                            }
                        });
                    } else {
                        track.sound.stop(track.id);
                        track.dispose();
                    }

                };
                track.dispose = function () {
                    //only want to stop playing if all fades are complete! Therefore,
                    //tracks must be stopped!
                    track.playing = false;
                    clearTimeout(track.interval);
                };
            },

            parseClip:function (clip) {
                var self = this;
                //extend ISoundData interface
                clip.sprites = self.parseSprites(clip.sprites);
                var sound = new Howler.Howl({
                    urls  :[Config.CDN + clip.src],
                    sprite:clip.sprites,
                    //buffer : true
                });
                clip.sound = sound;
                clip.interval = null;
                clip.type = "clip";
                clip.play = function (id,delay,volume) {

                    delay = delay || 0;
                    volume = volume || 1;
                    var index = self._sounds.indexOf(clip);

                    if (index === -1) {
                        //only play if deactivated
                        clearTimeout(clip.interval);
                        clip.interval = setTimeout(function () {
                            self.addActiveSound(clip,500);
                            clip.sound.volume(volume,id);
                            clip.sound.play(id);
                        },delay);
                    }
                };

            },

            parseSprites:function (spriteArr) {
                var sprites = {};
                spriteArr = spriteArr || [];
                for (var i = 0; i < spriteArr.length; i++) {
                    var dur = spriteArr[i].d;
                    var id = spriteArr[i].id;
                    sprites[id] = dur;
                }

                return sprites;
            },

            parseAmbient  :function (ambient) {

                //fades in by default
                ambient.fade = ambient.fade !== undefined ? ambient.fade : true;
                var page = ambient.page || "default";


                if (!this._ambientCollections.hasOwnProperty(page)) {
                    this._ambientCollections[page] = [];
                }

                this._ambientCollections[page].push(ambient);
            },
            /**
             * If a sound is getting killed, or we know when it should end,
             * we can add it here, where it will be monitored ontick
             *
             * @param sound
             * @param duration
             */
            addActiveSound:function (sound,duration) {
                try {
                    sound.startTime = Date.now();
                    sound.duration = duration || 0;
                    sound.endTime = sound.startTime + duration;

                    this._sounds.push(sound);
                } catch (e) {
                    console.log(e.stack);
                }
            },

            /**
             * We'll want to manage which tracks get played and stopped (based
             * on priority) here..
             *
             * @param track
             */
            addTrack:function (track,channel) {
                this._activeTracks.push(track);
            },

            removeTrack:function (track) {
                var index = this._activeTracks.indexOf(track);
                if (index !== -1) {
                    this._activeTracks.splice(index,0);
                }
            },

            killTracks:function (channel) {
                this._activeTracks.forEach(function (track) {
                    track.stop(true);
                });

                //clean up
                while (this._activeTracks.length) {
                    this._activeTracks.pop();
                }
            },


            updateTime:function (time) {

                time = time || Date.now();

                var i = this._sounds.length;
                while (i--) {

                    var sound = this._sounds[i];
                    if (sound.endTime < time) {
                        //stop and remove (deactivate)
                        if (sound.type === "track") {
                            sound.sound.stop();
                        }

                        //clear any play-delays
                        clearTimeout(sound.interval);

                        //remove from monitor
                        this._sounds.splice(i,1);
                    }
                }

                this.set("time",time);
            },

            /**
             * Returns whether the sound is still being monitored (stops
             * clip sounds from getting fired repeatedly)
             *
             * @param sound
             * @returns {boolean}
             */
            isSoundActive:function (sound) {
                return this._sounds.indexOf(sound) !== -1;
            },

            loadAmbients:function () {

                //load tracks via LoaderCollection
                var tracks = this.get("ambients").tracks;
                tracks.forEach(function (track) {

                    //create ambient collections
                    this.parseAmbient(track);

                    var src = Config.CDN + track.src;
                    var loadId = "AMBIENT_TRACKS_" + track.id;
                    LoaderCollection.add({'group':'main','id':loadId,'src':src});

                },this);

                var self = this;
                return new Promise(function (resolve) {
                    function loaded(e) {
                        if (e.group === "main") {
                            self.stopListening(LoaderCollection,"complete");
                            resolve();
                        }
                    }

                    self.listenTo(LoaderCollection,"complete",loaded);
                    // LoaderCollection.start("main");
                });

            },

            loadSound:function (sound) {
                return new Promise(function (resolve) {
                    sound.on("load",function () {
                        sound.off("load");
                        resolve();
                    });
                });
            },

            getIsFading:function () {

                if (this._history.length === 0 || AppModel.get("page") === AppModel.PAGES.WORK) {
                    return true;
                }

                return false;
            },

            reset : function(){
                this._ambientIndex = 0;
            },

            getNextAmbient:function () {

                var page = AppModel.get("page");
                var tracks = this.getAmbients();

                var trackIndex;

                if ( page === AppModel.PAGES.WORK ) {

                    // Repeat
                    if ( Math.random() >= 0.5 && this.prevTrackIndex > -1 ) {

                        trackIndex = this.prevTrackIndex;
                        // console.log('REPEAT!');
                    }
                    // Play next
                    else {

                        trackIndex = parseInt( Math.random() * tracks.length, 10 );
                        // console.log('NEXT!');
                    }

                    this.prevTrackIndex = trackIndex;
                }
                else {

                    trackIndex = this._ambientIndex % tracks.length;
                }

                // Otherwise go to next track
                var nextTrack = tracks[trackIndex];
                this.set("ambient",nextTrack);

                //increase index
                if (tracks.length > 2) {

                    var nextIndex;
                    do {
                        nextIndex = Math.floor(Math.random() * tracks.length);
                    } while (nextIndex === this._ambientIndex);

                    this._ambientIndex = nextIndex;
                } else {
                    this._ambientIndex++;
                }

                return nextTrack;
            },


            setVolume:function (volume) {
                for (var i = 0; i < this._activeTracks.length; i++) {
                    this._activeTracks[i].sound.volume(volume);
                }
            },

            getTrackById:function (id) {
                var tracks = this.get("tracks");
                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    if (track.id === id) {
                        return track;
                    }
                    if (track.sprites.hasOwnProperty(id)) {
                        return track;
                    }
                }
                console.error("SOUND MODEL :: no sound found for :" + id);
                return null;
            },

            getClipById:function (id) {
                var i,sprites,clips = this.get("clips");

                for (i = 0; i < clips.length; i++) {
                    sprites = clips[i].sprites;
                    if (sprites.hasOwnProperty(id)) {
                        return clips[i];
                    }
                }
                console.error("SOUND MODEL :: no sound found for :" + id);
                return null;
            },

            /**
             * Returns bg tracks array determined via page context
             * @returns Array
             */
            getAmbients:function () {

                var page = AppModel.get("page");
                if (AppModel.get("postLoaderPage")) {
                    page = AppModel.get("postLoaderPage");
                }

                if (page === AppModel.PAGES.WORK) {
                    return this._ambientCollections["work"];
                } else if (page === AppModel.PAGES.ABOUT ||
                    AppModel.get("page") === AppModel.PAGES.CONTACT) {
                    return this._ambientCollections["about"];
                }

                return this._ambientCollections["default"];
            },

            update:function (state) {

                switch (state) {

                    case SoundStates.MUTE:

                        this.mute();
                        break;

                    case SoundStates.UNMUTE:

                        this.unmute();
                        break;

                    case SoundStates.PAUSE:

                        this.pause();
                        break;

                    case SoundStates.RESUME:

                        this.resume();
                        break;

                    default:
                        console.error('Sound Model didn\'t receive a state in it\'s update()...');
                        break;

                }

            },

            mute:function () {

                if (!this.muted) {

                    this.muted = true;
                    this.trigger(AppEvents.Audio.Mute);

                    this._audioSources.forEach(function (target) {
                        target.muted = true;
                    },this);
                }
            },

            muteAmbient:function () {
                if (!this.ambientMuted) {
                    this.ambientMuted = true;
                    this.trigger(AppEvents.Audio.MuteAmbinet);
                }
            },

            unmute:function () {

                if (this.muted) {

                    this.muted = false;
                    this.trigger(AppEvents.Audio.Unmute);

                    this._audioSources.forEach(function (target) {
                        target.muted = false;
                    },this);
                }
            },

            unMuteAmbient:function () {
                if (this.ambientMuted) {
                    this.ambientMuted = false;
                    this.trigger(AppEvents.Audio.Unmute);
                }
            },

            pause:function () {

                if (!this.paused && !this.muted) {

                    this.paused = true;
                    this.trigger(AppEvents.Audio.Pause);
                }
            },

            resume:function () {

                if (this.paused && !this.muted) {

                    this.paused = false;
                    this.trigger(AppEvents.Audio.Resume);
                }
            },

            addSource:function (target) {
                if (this._audioSources.indexOf(target) === -1) {
                    this._audioSources.push(target);

                    target.muted = this.muted;
                }
            },

            removeSource:function (target) {
                var index = this._audioSources.indexOf(target);
                if (index !== -1) {
                    this._audioSources.splice(index,1);
                }
            },

            getNextRandomId:function () {
                if (!this.muted) {
                    return this._randomClipIds[this._randomIndex++ % this._randomClipIds.length];
                }

                return null;
            }

        });

        return new Model();

    }
);