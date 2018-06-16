
/**
 * Created by gleicher on 10/17/15.
 */
var grobjects = grobjects || [];

// make the two constructors global variables so they can be used later
var Skybox = undefined;

(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var skyboxBuffers = undefined;
    var texture = null;
    var LoadedImageFiles = LoadedImageFiles || {};
    LoadedImageFiles["skybox_posx.png"] = new Image();
    LoadedImageFiles["skybox_posx.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_posx.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/posx.jpg";

    LoadedImageFiles["skybox_negx.png"] = new Image();
    LoadedImageFiles["skybox_negx.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_negx.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/negx.jpg";

    LoadedImageFiles["skybox_posz.png"] = new Image();
    LoadedImageFiles["skybox_posz.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_posz.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/posz.jpg";

    LoadedImageFiles["skybox_negz.png"] = new Image();
    LoadedImageFiles["skybox_negz.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_negz.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/negz.jpg";

    LoadedImageFiles["skybox_posy.png"] = new Image();
    LoadedImageFiles["skybox_posy.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_posy.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/posy.jpg";

    LoadedImageFiles["skybox_negy.png"] = new Image();
    LoadedImageFiles["skybox_negy.png"].crossOrigin = "anonymous";
    LoadedImageFiles["skybox_negy.png"].src="https://raw.githubusercontent.com/greggman/twgl.js/master/examples/images/niagarafalls2s/negy.jpg";

    var skybox_posx = LoadedImageFiles["skybox_posx.png"];
    var skybox_negx = LoadedImageFiles["skybox_negx.png"];
    var skybox_posz = LoadedImageFiles["skybox_posz.png"];
    var skybox_negz = LoadedImageFiles["skybox_negz.png"];
    var skybox_posy = LoadedImageFiles["skybox_posy.png"];
    var skybox_negy = LoadedImageFiles["skybox_negy.png"];

    // constructor for Helicopter
    Skybox = function Skybox(name) {
        this.name = name;
        this.position = [0,0,0];    // will be set in init
    }
    Skybox.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["skybox-vs", "skybox-fs"]);
        }
        if (!skyboxBuffers) {
            var arrays = cube(20);
            skyboxBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);

            var texID = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texID);

            // Pos X
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_posx);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Neg X
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_negx);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Pos Z
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_posz);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Neg Z
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_negz);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Pos Y
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_posy);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Neg Y
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, skybox_negy);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        }
    };
    Skybox.prototype.draw = function(drawingState) {
        // make the helicopter fly around
        // this will change position and orientation

        var modelM = twgl.m4.identity();
        var inverse =twgl.m4.inverse(drawingState.view);
        twgl.m4.setTranslation(inverse,twgl.m4.transformPoint(drawingState.camera, [0, 0, 0]),inverse);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setUniforms(shaderProgram,{
            projection:drawingState.proj, modelview: drawingState.view, modelM: modelM });
        twgl.setBuffersAndAttributes(gl,shaderProgram,skyboxBuffers);
        twgl.drawBufferInfo(gl, gl.TRIANGLES, skyboxBuffers);
    };
    Skybox.prototype.center = function(drawingState) {
        return this.position;
    }

    function cube(side) {
        var s = (side || 1)/2;
        var coords = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        function face(xyz, nrm) {
            var start = coords.length/3;
            var i;
            for (i = 0; i < 12; i++) {
                coords.push(xyz[i]);
            }
            for (i = 0; i < 4; i++) {
                normals.push(nrm[0],nrm[1],nrm[2]);
            }
            texCoords.push(0,0, 1,0, 1,1,0,1);
            indices.push(start,start+1,start+2,start,start+2,start+3);
        }
        face( [-s,-0.01,s, s,-0.01,s, s,s,s, -s,s,s], [0,0,1] );
        face( [-s,-0.01,-s, -s,s,-s, s,s,-s, s,-0.01,-s], [0,0,-1] );
        face( [-s,s,-s, -s,s,s, s,s,s, s,s,-s], [0,1,0] );
        face( [-s,-0.01,-s, s,-0.01,-s, s,-0.01,s, -s,-0.01,s], [0,-1,0] );
        face( [s,-0.01,-s, s,s,-s, s,s,s, s,-0.01,s], [1,0,0] );
        face( [-s,-0.01,-s, -s,-0.01,s, -s,s,s, -s,s,-s], [-1,0,0] );
        return {
            vertexPositions: new Float32Array(coords),
            vertexNormals: new Float32Array(normals),
            vertexTextureCoords: new Float32Array(texCoords),
            indices: new Uint16Array(indices)
        }
    }

})();


grobjects.push(new Skybox("skybox"));

