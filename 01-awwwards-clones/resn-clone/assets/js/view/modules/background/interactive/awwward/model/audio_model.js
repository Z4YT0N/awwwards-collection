define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {

    var PlayInstance = function(howl, id) {
        this._howl = howl;
        this._id = id;
    };

    _(PlayInstance.prototype).extend({
        playing: function() {
            return this._howl.playing(this._id);
        },
        volume: function(volume) {
            if(typeof volume === 'number') {
                this._howl.volume(volume, this._id);
            }
            else {
                return this._howl.volume(this._id);
            }
        },
        stop: function() {
            this._howl.stop(this._id);
        },
        fadeOut: function(duration) {
            duration = duration * 1000;
            var start = this.volume();
            var end = 0;
            this._howl.once('fade', function() {
                this.stop();
            }.bind(this), this._id);
            this._howl.fade(start, end, duration, this._id);
        },
        fadeIn: function(duration, end) {
            end = typeof end === 'number' ? end : 1;
            this.fadeTo(duration, end);
        },
        fadeTo: function(duration, end) {
            duration = duration * 1000;
            var start = this.volume();
            this._howl.fade(start, end, duration, this._id);
        }
    });

    var AudioModel = Backbone.Model.extend({

        play: function(args) {
            var options = {
                loop: false,
                volume: 1
            };
            if(typeof args === 'object') {
                _(options).extend(args);
            }

            var howl = this.get('sound');
            var id = howl.play();
            howl.volume(options.volume, id);
            howl.loop(options.loop, id);
            return new PlayInstance(howl, id);
        },

        stop: function() {

            var howl = this.get('sound');
            var id = howl.stop();

            return new PlayInstance(howl, id);
        }

    });

    return AudioModel;

});
