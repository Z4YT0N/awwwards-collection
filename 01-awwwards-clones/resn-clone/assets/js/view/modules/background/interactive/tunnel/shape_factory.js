/**
 * Created by kev on 16-04-07.
 */

define(['svgmorph', 'config'],

    function (MORPH, Config) {

        var ShapeFactory = (function () {
            var ShapeFactory = function () {
            };
            ShapeFactory.prototype = {

                count     :0,
                paths:[
                    [
                        Config.CDN + '/svg/tunnel/drop.svg',
                        Config.CDN + '/svg/tunnel/circle_3.svg'
                    ],
                    [
                        Config.CDN + '/svg/tunnel/circle_2.svg',
                        Config.CDN + '/svg/tunnel/square.svg'
                    ],[
                        Config.CDN + '/svg/tunnel/square.svg',
                        Config.CDN + '/svg/tunnel/diamond.svg'
                    ],
                    [
                        Config.CDN + '/svg/tunnel/diamond.svg',
                        Config.CDN + '/svg/tunnel/circle_2.svg'
                    ],
                    [
                        Config.CDN + '/svg/tunnel/circle_4.svg',
                        Config.CDN + '/svg/tunnel/heart.svg'
                    ]
                ],

                morphs:null,

                numShapes:-1,
                shapes   :null,

                initialize:function (numShapes) {

                    this.numShapes = numShapes;

                    this.shapes = [];
                    this.morphs = [];

                    var self = this;
                    return MORPH.LoadShapes(this.paths).then(function (shapes) {

                        shapes.forEach(function (shape) {
                            var morph = new MORPH.Morph(shape).start();
                            morph.setOrigin(250,250);
                            self.morphs.push(morph);
                        });

                    });
                },

                resize:function (w, h) {

                    var scale,cX,cY,dX,dY;
                    this.morphs.forEach(function (morph) {
                        var scale = Math.max(w / morph.getWidth(),h / morph.getHeight());
                        morph.setScale(scale);
                        var cX = w;// * 0.5;
                        var cY = h;// * 0.5;

                        var dX = cX - morph.getX();
                        var dY = cY - morph.getY();

                        morph.translate(dX,dY);
                    });
                },

                update:function (time) {

                    if(Config.TABLET || Config.MOBILE){
                        this.shapes.push(this.morph1.getShape());
                    }else {
                        var ratio = Math.sin(time * 0.02);//

                        if (ratio < 0) {
                            ratio = ratio + 1;
                            this.morph1.setRatio(ratio);
                            this.shapes.push(this.morph1.getShape());
                        } else {
                            //ratio = ratio + 1;
                            this.morph2.setRatio(ratio);
                            this.shapes.push(this.morph2.getShape());
                        }
                    }

                    while (this.shapes.length > this.numShapes) {
                        this.shapes.shift();
                    }

                },


                getNextShape : function(){

                    //map ratio to 0-1..
                    var ratio = ((Math.cos(this.count++ * 0.02) * -1 + 1 )) / 2;//Math.sin(this.count++ * 0.09) * -1;

                    //get current morph index..
                    var index = Math.floor(ratio * this.morphs.length);

                    //get normalized ratio..
                    var r = 1 / this.morphs.length;
                    ratio = (ratio  - (index * r)) / r;

                    this.morphs[index].setRatio(ratio);
                    return this.morphs[index].getShape();
                },

                getShapes:function () {
                    return this.shapes;
                }
            };

            return ShapeFactory;
        })();


        return ShapeFactory;

    });