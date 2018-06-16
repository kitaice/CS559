/**
 * Created by gleicher on 10/17/15.
 */
var grobjects = grobjects || [];

// make the two constructors global variables so they can be used later
var car = undefined;

(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for cars
    car=function car(name,position,dir) {
        this.name=name;
        this.position = position;
        this.color = [1,0,0];
        this.taxi=this.speed/5;
        this.dir=dir;
        if (dir==true)
            this.speed=getRandomInt();
        else
            this.speed=-getRandomInt();

    }
    car.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cars
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["car-vs", "car-fs"]);
        }
        if (!buffers) {
            var arrays = {
            vpos : { numComponents: 3, data: [
                    0,10,0,     0,10,-40,  0,0,0,    0,10,-40,     0,0,-40,   0,0,0,
                    0,10,-40,   0,10,0,    40,10,0,     0,10,-40,     40,10,-40,    40,10,0,
                    40,10,-40,  40,10,0,   50,20,0,    40,10,-40,    50,20,-40,   50,20,0,
                    50,20,-40, 50,20,0,  70,20,0,    50,20,-40,   70,20,-40,   70,20,0,
                    70,20,-40, 70,20,0,  80,10,0,     70,20,-40,   80,10,0,      80,10,-40,
                    80,10,-40,  80,10,0,   100,10,0,    80,10,-40,    100,10,0,     100,10,-40,
                    100,10,-40, 100,10,0,  100,0,0,  100,10,-40,   100,0,0,   100,0,-40,
                    0,10,0,     0,0,0,  100,0,0,  0,10,0,       100,10,0,     100,0,0,
                    0,10,-40,   0,0,-40, 100,10,-40, 0,0,-40,   100,10,-40,   100,0,-40,
                    50,20,0,   40,10,0,   75,20,0,    40,10,0,      75,20,0,     80,10,0,
                    40,10,-40,  50,20,-40, 70,20,-40, 40,10,-40,    70,20,-40,   80,10,-40,
                    0,0,-40, 0,0,0,   100,0,0, 0,0,-40,   100,0,0,   100,0,-40
                ] },
            vnormal : {numComponents:3, data: [
                    -1,0,0, -1,0,0, -1,0,0,  -1,0,0,-1,0,0,-1,0,0,
                    0,1,0, 0,1,0, 0,1,0,  0,1,0, 0,1,0, 0,1,0,
                    3,-2,0, 3,-2,0, 3,-2,0,  3,-2,0, 3,-2,0, 3,-2,0,
                    0,1,0, 0,1,0, 0,1,0,  0,1,0, 0,1,0, 0,1,0,
                    3,2,0, 3,2,0, 3,2,0,  3,2,0, 3,2,0, 3,2,0,
                    0,1,0, 0,1,0, 0,1,0,  0,1,0, 0,1,0, 0,1,0,
                    1,0,0, 1,0,0, 1,0,0,  1,0,0, 1,0,0, 1,0,0,
                    0,0,1, 0,0,1, 0,0,1,  0,0,1, 0,0,1, 0,0,1,
                    0,0,-1, 0,0,-1, 0,0,-1,  0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,  0,0,1, 0,0,1, 0,0,1,
                    0,0,-1, 0,0,-1, 0,0,-1,  0,0,-1, 0,0,-1, 0,0,-1,
                    0,-1,0, 0,-1,0, 0,-1,0,  0,-1,0, 0,-1,0, 0,-1,0
                ]}
        };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    car.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cars in the world
        var modelM = twgl.m4.multiply(twgl.m4.scaling([0.002,0.002,0.002]),twgl.m4.rotationY(Math.PI/2));
        advance(this,drawingState);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            carcolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    car.prototype.center = function(drawingState) {
        return this.position;
    };
    function getRandomInt() {
        return Math.floor(Math.random() * (10)) + 5;
    }
    function advance(car, drawingState) {
        // on the first call, the copter does nothing
        if (!car.lastTime) {
            car.lastTime = drawingState.realtime;
            return;
        }
        var delta = drawingState.realtime - car.lastTime;
        car.lastTime = drawingState.realtime;

        // now do the right thing depending on state


        if (car.position[2] >= -5 || car.position[2] <= 3)
            car.position[2] += 0.001 * car.speed;
        else
            car.position[2] += 0.005 * car.speed;

        if (car.position[2] >= groundPlaneSize)
            car.position[2] = -groundPlaneSize;

        else if(car.position[2]<= -groundPlaneSize)
            car.position[2]= groundPlaneSize;
    }

})();

// normally, I would put this into a "scene description" file, but having
// it here means if this file isn't loaded, then there are no dangling
// references to it

// make the objects and put them into the world
// note that the helipads float above the floor to avoid z-fighting
grobjects.push(new runway("road1",[0.5,0.01, 0],[0.1,10],[0.1,0.1,0.1],runwaysrc));
grobjects.push(new runway("road2",[0.9,0.01,0],[0.1,10],[0.1,0.1,0.1],runwaysrc));
grobjects.push(new car("car1",[0.5,0.01, 0],true));
grobjects.push(new car("car2",[0.6,0.01, 2],true));
grobjects.push(new car("car3",[0.5,0.01, -1],true));
grobjects.push(new car("car4",[1,0.01, 0],false));
grobjects.push(new car("car5",[0.9,0.01, 5],false));
