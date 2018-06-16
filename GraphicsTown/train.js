/**
 * Created by gleicher on 10/17/15.
 */
var grobjects = grobjects || [];

// make the two constructors global variables so they can be used later
var train = undefined;

(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for trains
    train=function train(name,position,speed) {
        this.name=name;
        this.position = position;
        this.speed=speed;
        this.dir=1;
        this.color = [1,1,0.9];
    }
    train.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all trains
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["train-vs", "train-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos: {
                    numComponents: 3, data: [
                        -0.1,0,4, 0.1,0,4, -0.098,0.25,3.75, 0.098,0.25,3.75,
                        -0.1, 0, 2.02, 0.1, 0, 2.02, -0.098, 0.25, 2.02, 0.098, 0.25, 2.02,
                        -0.1, 0, 1.98, 0.1, 0, 1.95, -0.098, 0.25, 1.98, 0.098, 0.25, 1.98,
                        -0.1, 0, 0.02, 0.1, 0, 0.02, -0.098, 0.25, 0.02, 0.098, 0.25, 0.02,
                        -0.1, 0, -0.02, 0.1, 0, -0.02, -0.098, 0.25, -0.02, 0.098, 0.25, -0.02,
                        -0.1, 0, -1.98, 0.1, 0, -1.98, -0.098, 0.25, -1.98, 0.098, 0.25, -1.98,
                        -0.1, 0, -2.02, 0.1, 0, -2.02, -0.098, 0.25, -2.02, 0.098, 0.25, -2.02,
                        -0.1, 0, -4, 0.1, 0, -4, -0.098, 0.25, -3.75, 0.098, 0.25, -3.75

                    ]
                },
                vnormal: {
                    numComponents: 3, data: [
                        0, 1, 1, 0, 1, 1, 0, 0, -1, 0, 0, -1,
                        -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0,
                        0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0,

                        0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1,
                        -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0,
                        0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0,

                        0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1,
                        -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0,
                        0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0,

                        0, 0, 1, 0, 0, 1, 0, -1, 1, 0, -1, 1,
                        -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0,
                        0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0
                    ]
                },
                indices: [
                    0, 1, 2, 1, 2, 3, 4, 5, 6, 5, 6, 7,
                    0, 2, 4, 2, 4, 6, 1, 3, 5, 3, 5, 7,
                    0, 1, 4, 1, 4, 5, 2, 3, 4, 3, 6, 7,

                    8, 9, 10, 9, 10, 11, 12, 13, 14, 13, 14, 15,
                    8, 10, 12, 10, 12, 14, 9, 11, 13, 11, 13, 15,
                    8, 9, 12, 9, 12, 13, 10, 11, 14, 11, 14, 15,

                    16, 17, 18, 17, 18, 19, 20, 21, 22, 21, 22, 23,
                    16, 18, 20, 18, 20, 22, 17, 19, 21, 19, 21, 23,
                    16, 17, 20, 17, 20, 21, 18, 19, 22, 19, 22, 23,

                    24, 25, 26, 25, 26, 27, 28, 29, 30, 29, 30, 31,
                    24, 26, 28, 26, 28, 30, 25, 27, 29, 27, 29, 31,
                    24, 25, 28, 25, 28, 29, 26, 27, 30, 27, 30, 31
                ]
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    train.prototype.draw = function(drawingState) {
        // we make a model matrix to place the trains in the world
        var modelM = twgl.m4.scaling([0.35,0.35,0.35]);
        advance(this,drawingState);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            traincolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    train.prototype.center = function(drawingState) {
        return this.position;
    };

    // constants
    var verticalSpeed = 2 / 1000;      // units per milli-second
    var flyingSpeed = 3/1000;          // units per milli-second
    var turningSpeed = 3/1000;         // radians per milli-second

    // utility - generate random  integer
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    // this actually does the work
    function advance(train, drawingState) {
        // on the first call, the copter does nothing
        if (!train.lastTime) {
            train.lastTime = drawingState.realtime;
            return;
        }
        var delta = drawingState.realtime - train.lastTime;
        train.lastTime = drawingState.realtime;

        // now do the right thing depending on state
        train.position[2]+=0.005*train.dir*train.speed;
        //console.log(train.position);
        if(train.position[2]>=groundPlaneSize || train.position[2]<=-groundPlaneSize ) train.dir *=-1;
    }
})();

// normally, I would put this into a "scene description" file, but having
// it here means if this file isn't loaded, then there are no dangling
// references to it

// make the objects and put them into the world
// note that the helipads float above the floor to avoid z-fighting
grobjects.push(new train("train1",[-5,0.01,0],5));
grobjects.push(new runway("rail1",[-5.01,0.01,0],[0.01,10],[0,0,0]));


grobjects.push(new train("train2",[-6,0.01,0],2));
grobjects.push(new runway("rail2",[-6,0.01,0],[0.01,10],[0,0,0]));


grobjects.push(new train("train3",[-7,0.01,0],-3));
grobjects.push(new runway("rail3",[-7,0.01,0],[0.01,10],[0,0,0]));


grobjects.push(new train("train4",[-8,0.01,0],4));
grobjects.push(new runway("rail4",[-8,0.01,0],[0.01,10],[0,0,0]));
