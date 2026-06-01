define([
    'backbone',
    'howler2',
    'TweenMax',
    'underscore',
    'view/modules/background/interactive/awwward/model/audio_collection'
], function(
    Backbone,
    Howler,
    TweenMax,
    _,
    AudioCollection
) {

    var Levels = {
        bgm: 0.75,
        sfx: 1
    };

    var Master = {
        _volume: 1,
        _muted: false,
        isMuted: function() {
            return this._muted;
        },
        mute: function() {
            this._muted = true;
            TweenMax.killTweensOf(this);
            this._volume = 0;
            Howler.Howler.volume(this._volume);
            this.trigger('changemute', this._muted);
        },
        unmute: function() {
            this._muted = false;
            TweenMax.killTweensOf(this);
            this._volume = 1;
            Howler.Howler.volume(this._volume);
            this.trigger('changemute', this._muted);
        },
        fadeInOutToggle: function() {
            if (this._muted) {
                this.fadeIn();
            } else {
                this.fadeOut();
            }
        },
        fadeIn: function(time) {
            this._muted = false;
            TweenMax.to(this, (time || 1), {
                _volume: 1,
                onUpdate: function() {
                    Howler.Howler.volume(this._volume);
                }.bind(this)
            });
            this.trigger('changemute', this._muted);
        },
        fadeOut: function(time) {
            this._muted = true;
            TweenMax.to(this, (time || 1), {_volume: 0, onUpdate: function() {
                Howler.Howler.volume(this._volume);
            }.bind(this)});
            this.trigger('changemute', this._muted);
        },
        getVolume: function() {
            return this._volume;
        },
        setVolume: function(volume) {
            this._volume = volume;
            Howler.Howler.volume(this._volume);
        }
    };
    _(Master).extend(Backbone.Events);

    var AudioController = {

        play: function(id, options) {

            var audio = AudioCollection.get(id);

            if (audio) {
                return audio.play(options);
            } else {
                //
            }
        },

        stop: function(id) {

            var audio = AudioCollection.get(id);

            if (audio) {
                return audio.stop();
            } else {
                //
            }
        },

        Master: Master,

        Levels: Levels
    };

    return AudioController;

});
