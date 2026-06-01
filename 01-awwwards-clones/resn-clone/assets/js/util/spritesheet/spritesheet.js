define([
    'util/class',
], function(
    Class
) {

    'use strict';


    /**
     * Pure data-based utility for using spritesheets in combination with frame sequences
     */
	var Spritesheet = Class.extend({

		framesTotal: 0,
		imageWidth: 0,
		imageHeight: 0,
		frameWidth: 0,
		frameHeight: 0,
		framesPerRow: 0,
		framesPerSpritesheet: 0,
		numSpritesheets: 0,

		initialize: function(framesTotal, imageWidth, imageHeight, frameWidth, frameHeight){

			this.imageWidth = imageWidth;
			this.imageHeight = imageHeight;
			this.frameWidth = frameWidth;
			this.frameHeight = frameHeight;
			this.framesTotal = framesTotal;

			this.framesPerRow = Math.floor(this.imageWidth / this.frameWidth);
			this.framesPerSpritesheet = this.framesPerRow * Math.floor(this.imageHeight / this.frameHeight);
			this.numSpritesheets = Math.ceil(this.framesTotal / this.framesPerSpritesheet);
		},

		getDataByFrame: function(frame){

			var data;
			var startIndex = 0;

			for(var i = 0; i < this.numSpritesheets; i++){

				if(frame >= startIndex && frame <= startIndex + this.framesPerSpritesheet - 1){
					
					var spritesheetFrame = frame - startIndex;
					var colIndex = spritesheetFrame % this.framesPerRow;
					var rowIndex = Math.floor(spritesheetFrame / this.framesPerRow);

					data = {
						index: i,
						frame: spritesheetFrame,
						x: colIndex * this.frameWidth,
						y: rowIndex * this.frameHeight
					};

					break;
				}

				startIndex = startIndex + this.framesPerSpritesheet;
			}

			return data;
		}
	});

	return Spritesheet;
});