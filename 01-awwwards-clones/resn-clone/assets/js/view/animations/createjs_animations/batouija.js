define([], function () {
	"use strict";
	return {
	"manifest": [
		{
			"src": "/js/view/animations/createjs_animations/batouija.lib.js",
			"id": "batouija.lib.js"
		},
		{
			"src": "/img/easel/desktop/batouija/batouija_1_sheet.png",
			"createjs": {
				"ns": "batouija",
				"spritesheet": [
					{
						"x": 0,
						"y": 0,
						"width": 731,
						"height": 552,
						"id": "wing02",
						"src": "images/wing02.png"
					},
					{
						"x": 733,
						"y": 0,
						"width": 957,
						"height": 351,
						"id": "wing03",
						"src": "images/wing03.png"
					}
				],
				"width": 1690,
				"height": 552
			}
		},
		{
			"src": "/img/easel/desktop/batouija/batouija_0_sheet.png",
			"createjs": {
				"ns": "batouija",
				"spritesheet": [
					{
						"x": 0,
						"y": 1046,
						"width": 497,
						"height": 716,
						"id": "body",
						"src": "images/body.png"
					},
					{
						"x": 1831,
						"y": 716,
						"width": 72,
						"height": 67,
						"id": "finger01",
						"src": "images/finger01.png"
					},
					{
						"x": 1831,
						"y": 560,
						"width": 82,
						"height": 71,
						"id": "finger02",
						"src": "images/finger02.png"
					},
					{
						"x": 1831,
						"y": 633,
						"width": 69,
						"height": 81,
						"id": "finger03",
						"src": "images/finger03.png"
					},
					{
						"x": 1890,
						"y": 428,
						"width": 49,
						"height": 75,
						"id": "finger04",
						"src": "images/finger04.png"
					},
					{
						"x": 1831,
						"y": 428,
						"width": 57,
						"height": 130,
						"id": "hand",
						"src": "images/hand.png"
					},
					{
						"x": 904,
						"y": 483,
						"width": 436,
						"height": 558,
						"id": "head",
						"src": "images/head.png"
					},
					{
						"x": 1342,
						"y": 483,
						"width": 391,
						"height": 367,
						"id": "leftear",
						"src": "images/leftear.png"
					},
					{
						"x": 1831,
						"y": 0,
						"width": 110,
						"height": 303,
						"id": "lowerarm",
						"src": "images/lowerarm.png"
					},
					{
						"x": 499,
						"y": 1046,
						"width": 242,
						"height": 538,
						"id": "lowerarmshadow",
						"src": "images/lowerarmshadow.png"
					},
					{
						"x": 904,
						"y": 0,
						"width": 925,
						"height": 481,
						"id": "ouijaboard",
						"src": "images/ouijaboard.png"
					},
					{
						"x": 999,
						"y": 1046,
						"width": 297,
						"height": 284,
						"id": "ouijapoint",
						"src": "images/ouijapoint.png"
					},
					{
						"x": 1298,
						"y": 1046,
						"width": 241,
						"height": 192,
						"id": "ouijapointer",
						"src": "images/ouijapointer.png"
					},
					{
						"x": 743,
						"y": 1046,
						"width": 254,
						"height": 338,
						"id": "rightear",
						"src": "images/rightear.png"
					},
					{
						"x": 1831,
						"y": 305,
						"width": 65,
						"height": 121,
						"id": "thumb",
						"src": "images/thumb.png"
					},
					{
						"x": 0,
						"y": 0,
						"width": 902,
						"height": 1044,
						"id": "wing01",
						"src": "images/wing01.png"
					}
				],
				"width": 1941,
				"height": 1762
			}
		}
	],
	"root": "batouija",
	"ns": "batouija",
	"width": "1450",
	"height": "360",
	"fps": "30",
	"js": "batouija.lib.js"
};
});