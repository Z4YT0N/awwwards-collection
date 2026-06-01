define([
	"jquery",
	"underscore",
	"backbone",
	"util/createjs",
	"model/loader_collection"
], function (
	$,
	_,
	Backbone,
	createjs,
	LoaderCollection
	) {

	var jsTag = {};

	return Backbone.View.extend({

		stage: null,
		root: null,

		initialize: function( options ) {

			//# Create canvas element for root node
			this.canvas = $('<canvas width="'+options.width+'" height="'+options.height+'"></canvas>');
			this.setElement( this.canvas[0] );

			//# Load the javascript lib tag into the page
			if( !jsTag[options.js] ) {
				jsTag[options.js] = LoaderCollection.getResult( options.js );
				$('head').append( jsTag[options.js] );
			}

			//# Instantiate root clip,


			this.root = new createjs.lib[ options.ns ][ options.root ]();

			//# Create stage
			this.stage = new createjs.Stage( this.el );
			this.stage.addChild(this.root);
			createjs.Touch.enable(this.stage);
			this.stage.enableMouseOver();
			this.stage.update();

			//# TODO: create individual tickers
			createjs.Ticker.setFPS(options.fps);
			createjs.Ticker.addEventListener("tick", this.stage);

		},

		destroy: function() {
			createjs.Ticker.removeEventListener(this.stage);
			this.stage.removeAllChildren();
			this.stage = null;
			this.$el.remove();
			this.root.removeAllEventListeners();
			this.root = null;
		}
	});

});