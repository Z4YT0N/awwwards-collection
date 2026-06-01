define([
  'backbone',

  'view/modules/background/interactive/awwward/model/audio_model'
], function(
  Backbone,

  AudioModel
) {

  var AudioCollection = Backbone.Collection.extend({
    model: AudioModel
  });

  return new AudioCollection();

});
