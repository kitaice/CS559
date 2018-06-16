var grobjects = grobjects || [];

// make the two constructors global variables so they can be used later
var runway = undefined;

(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for trains
    runway=function runway(name, position, dim, color,src) {
        this.name = name;
        this.x=dim[0];
        this.z=dim[1];
        this.position = position;
        this.size = 1.0;
        this.color = color;
        this.texture=undefined;
        this.image = undefined;
        this.imgsrc=src;

    };
    runway.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all runways
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["runway-vs", "runway-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                        -1,0,1, -1,0,-1,   1,0,-1,   1, 0,1
                    ] },
                vnormal : {numComponents:3, data: [
                        0,1,0, 0,1,0, 0,1,0, 0,1,0
                    ]},
                indices: [
                    0,1,2, 0,2,3
                ],
                vTexCoord:{numComponents:2, data: [
                        0,0,  0,10, 1,10, 1,0
                    ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

        this.image = new Image();
        this.image.crossOrigin = "anonymous";

        this.image.onload = () =>{
            this.texture = twgl.createTexture(drawingState.gl, {src: this.image});
        };
        this.image.src =this.imgsrc;
    };
    runway.prototype.draw = function(drawingState) {
        // we make a model matrix to place the runways in the world
        var modelM = twgl.m4.scaling([this.x,this.size,this.z]);

        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            runwaycolor:this.color, model: modelM, texSampler1:this.texture });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);

    };
    runway.prototype.center = function(drawingState) {
        return this.position;
    };


})();
var runwaysrc="https://raw.githubusercontent.com/kitaice/CS540/master/runway.jpg";
var taxisrc="https://raw.githubusercontent.com/kitaice/CS540/master/taxi1.jpg";
var groundsrc="https://raw.githubusercontent.com/kitaice/CS540/master/ground.jpg";
grobjects.push(new runway("ground",[0,0.005, 0],[10,10],[1,1,1],groundsrc));
grobjects.push(new runway("runway1",[5.5,0.01, 0],[0.5,7],[0.5,0.5,0.5],runwaysrc));
grobjects.push(new runway("runway2",[8,0.01, 1],[0.5,9],[0.5,0.5,0.5],runwaysrc));
grobjects.push(new runway("taxiway1",[6.75,0.01, -5],[0.75,0.5],[0.75,0.75,0.75],taxisrc));
grobjects.push(new runway("taxiway2",[6.75,0.01, 6.5],[.75,0.5],[0.75,0.75,0.75],taxisrc));
grobjects.push(new runway("ramp",[4.25,0.01, 0],[0.75,4],[0.75,0.75,0.75],taxisrc));

