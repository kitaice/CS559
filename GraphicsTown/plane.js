/**
 * Created by gleicher on 10/17/15.
 */
var grobjects = grobjects || [];

// make the two constructors global variables so they can be used later
var plane = undefined;

(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;
    var rotorBuffers = undefined;
    // constructor for cars
    plane=function car(name,position) {
        this.name=name;
        this.position = position;
        this.color = [0,1,0];
    };
    plane.prototype.init = function(drawingState) {

        var gl=drawingState.gl;
        // create the shaders once - for all cars
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["car-vs", "car-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                        -0.5,0.05,0.1,   -0.48,0.2,0.15,  -0.3,0.05,0.15,   -0.3,0.25,0.15,  -0.25,0.35,0.1,
                        0.1,0.35,0.1,    0.15,0.3,0.1,  0.4,0.2,0.1,    0.35,0.05,0.05,
                        1.0,0.3,0.02,  1.05,0.26,0.02,  1.1,0.4,0.0,
                        -0.5,0.05,-0.1,  -0.48,0.2,-0.15, -0.3,0.05,-0.15,  -0.3,0.25,-0.15, -0.25,0.35,-0.1,
                        0.1,0.35,-0.1,   0.15,0.3,-0.1, 0.4,0.2,-0.1,   0.35,0.05,-0.05,
                        1.0,0.3,-0.02, 1.05,0.26,-0.02
                    ] },
                vnormal : {numComponents:3, data: [
                        3,-0.2,-5.36, 3,-0.2,-5.36, 0,5,9, 0,5,9, 0,5,9, 0,5,9, 0,5,9, 5,-1,13, 5,-1,13, 1,5,19,
                        -12,0.8,0, -12,0.8,0, -12,108,0, -12,108,0, -108,3,0, -108,3,0, 0,1,0, 0,1,0, 3,1,0, 3,1,0, 0,1,0, 0,1,0,
                        15,-2,0,  -17,1,0, -6,100,0, -6,100,0, 6,-1,0, 6,-1,0,  0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        -3,-0.2,-5.36,  -3,-0.2,-5.36, 0,-5,-9, 0,-5,-9, 0,-5,-9, 0,-5,-9, 0,-5,-9, -5,1,13, -5,1,13, -1,-5,19
                    ]},
                indices : [
                    0,1,3, 0,2,3, 2,3,8, 3,7,8, 3,6,7, 3,5,6, 3,4,5, 6,7,9, 7,9,10, 9,10,11,
                    0,1,12, 1,12,13, 1,3,15, 3,13,15, 3,4,15, 4,15,16, 4,5,16, 5,16,17, 5,6,18, 6,17,18, 6,9,18, 9,18,21,
                    9,11,21, 10,11,22, 7,10,19, 10,19,22, 7,8,19, 8,19,20, 2,8,14, 8,14,20, 0,2,12, 2,12,14,
                    12,13,15, 12,14,15, 14,15,20, 15,19,20, 15,18,19, 15,17,18, 15,16,17, 18,19,21, 19,21,22, 11,21,22
                ]
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
            var rarrays = {
                vpos : {numcomponents:3, data: [
                        0,.4,0, 1,.4,0.05, 1,.4, -0.05,
                        0,.4,0, -1,.4,0.05, -1,.4, -0.05,
                        0,.4,0, 0.05,.4,1, -0.05,.4, 1,
                        0,.4,0, 0.05,.4,-1, -0.05,.4, -1
                    ]},
                vnormal : {numcomponents:3, data: [
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0
                    ]},
                indices : [
                    0,1,2, 3,4,5, 6,7,8, 9,10,11
                ]
            };
            rotorBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,rarrays);
        }

    };
    plane.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cars in the world
        var modelM = twgl.m4.scaling([0.5,0.5,0.5]);
        var rotorM = twgl.m4.scaling([0.5,0.5,0.5]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            carcolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);

        twgl.m4.setTranslation(rotorM,this.position,rotorM);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            helcolor:this.color, model: rotorM });
        twgl.setBuffersAndAttributes(gl,shaderProgram,rotorBuffers);
        twgl.drawBufferInfo(gl, gl.TRIANGLES, rotorBuffers);
    };
    plane.prototype.center = function(drawingState) {
        return this.position;
    };

})();
var grid="https://raw.githubusercontent.com/kitaice/CS540/master/grid2.jpg";
grobjects.push(new Cube("bridge",[ 3.5,0,0.2],0.15,1.5,0.15,[1.0,1.0,1.0],grid));
grobjects.push(new Cube("bridge1",[ 4,0,2.4],0.15,1.5,0.15,[1.0,1.0,1.0],grid));
grobjects.push(new Cube("bridge2",[ 3.5,0,-1.2],0.15,1.5,0.15,[1.0,1.0,1.0],grid));
grobjects.push(new plane("plane",[4.5,0.02,2.8]));
grobjects.push(new plane("plane2",[4,0.02,0.5]));
grobjects.push(new plane("plane3",[4,0.02,-1.5]));