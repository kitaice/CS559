function start() { "use strict";

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var m4 = twgl.m4;

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 100;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 30;
    var slider4 = document.getElementById('slider4');
    slider4.value = 50;
    // Read shader source
    var vertexSource = document.getElementById("vs").text;
    var fragmentSource = document.getElementById("fs").text;

    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader)); return null; }

    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);

    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);

    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);


    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.intensity=gl.getUniformLocation(shaderProgram,"intensity");
    shaderProgram.specularE=gl.getUniformLocation(shaderProgram,"specularE");

    // Data ...

    // vertex positions
    var vertexPos1 = new Float32Array(
        [
            1,0,1, 5,0,1, 5,0,5,  1,0,5,
            1,0,1, 3,0,1, 2,3,2,
            3,0,3, 1,0,3, 2,3,2,
            1,0,1, 1,0,3, 2,3,2,
            3,0,3, 3,0,1, 2,3,2,
            3,0,3, 4.25,0,3, 3.6,-2,3.6,
            4.25,0,4.25, 3,0,4.25, 3.6,-2,3.6,
            3,0,3, 3,0,4.25, 3.6,-2,3.6,
            4.25,0,4.25, 4.25,0,3, 3.6,-2,3.6,
            4.25,0,4.25, 5,0,4.25, 4.6,1,4.6,
            5,0,5, 4.25,0,5, 4.6,1,4.6,
            4.25,0,4.25, 4.25,0,5, 4.6,1,4.6,
            5,0,5, 5,0,4.25, 4.6,1,4.6,

            1, 0, 1,  1, -1.5, 2,  1,-1.5, 0,   0,-3, 1,
            1, 0, 1,  -1,-1.5, 1,   1,-1.5,2,    1, -1.5,0,
            0, -3, 1, -1,-1.5, 1,   1,-1.5,2,     1, -1.5,0

        ]);

    var vertexPos2 = new Float32Array(
        [
            1,0,1, 5,0,1, 5,0,5,  1,0,5,
            1,0,1, 3,0,1, 2,3,2,
            3,0,3, 1,0,3, 2,3,2,
            1,0,1, 1,0,3, 2,3,2,
            3,0,3, 3,0,1, 2,3,2,
            3,0,3, 4.25,0,3, 3.6,-2,3.6,
            4.25,0,4.25, 3,0,4.25, 3.6,-2,3.6,
            3,0,3, 3,0,4.25, 3.6,-2,3.6,
            4.25,0,4.25, 4.25,0,3, 3.6,-2,3.6,
            4.25,0,4.25, 5,0,4.25, 4.6,1,4.6,
            5,0,5, 4.25,0,5, 4.6,1,4.6,
            4.25,0,4.25, 4.25,0,5, 4.6,1,4.6,
            5,0,5, 5,0,4.25, 4.6,1,4.6
        ]);

    // vertex normals
    var vertexNormals1 = new Float32Array(
        [
            0, -1, 0,   0, -1, 0,   0, -1, 0,   0, -1, 0,
            0, -1, 3,   0, -1, 3,   0, -1, 3,
            0, 1, 3,    0, 1, 3,    0, 1, 3,
            -3, 1, 0,   -3, 1, 0,   -3, 1, 0,
            -3, -1, 0,  -3, -1, 0,  -3, -1, 0,
            0,0.75,2.5, 0,0.75,2.5, 0,0.75,2.5,
            0,-0.8125,2.5, 0,-0.8125,2.5, 0,-0.8125,2.5,
            -2.5,-0.75,0, -2.5,-0.75,0, -2.5,-0.75,0,
            -2.5,0.8125,0, -2.5,0.8125,0, -2.5,0.8125,0,
            0,-0.2625,0.75, 0,-0.2625,0.75, 0,-0.2625,0.75,
            0,0.3,0.75, 0,0.3,0.75, 0,0.3,0.75,
            -0.75,0.2625,0, -0.75,0.2625,0, -0.75,0.2625,0,
            -0.75,-0.3,0, -0.75,-0.3,0, -0.75,-0.3,0,

            1.5, 1, -1.5,   1.5, 1, -1.5,   1.5, 1, -1.5,   1.5, 1, -1.5,
            1.5, -2, -3,   1.5, -2, -3,   1.5, -2, -3,   1.5, -2, -3,
            -1.5, -1, 3,   -1.5, -1, 3,   -1.5, -1, 3,   -1.5, -1, 3

        ]);

    var vertexNormals2 = new Float32Array([
        0, -1, 0,   0, -1, 0,   0, -1, 0,   0, -1, 0,
        0, -1, 3,   0, -1, 3,   0, -1, 3,
        0, 1, 3,    0, 1, 3,    0, 1, 3,
        -3, 1, 0,   -3, 1, 0,   -3, 1, 0,
        -3, -1, 0,  -3, -1, 0,  -3, -1, 0,
        0,0.75,2.5, 0,0.75,2.5, 0,0.75,2.5,
        0,-0.8125,2.5, 0,-0.8125,2.5, 0,-0.8125,2.5,
        -2.5,-0.75,0, -2.5,-0.75,0, -2.5,-0.75,0,
        -2.5,0.8125,0, -2.5,0.8125,0, -2.5,0.8125,0,
        0,-0.2625,0.75, 0,-0.2625,0.75, 0,-0.2625,0.75,
        0,0.3,0.75, 0,0.3,0.75, 0,0.3,0.75,
        -0.75,0.2625,0, -0.75,0.2625,0, -0.75,0.2625,0,
        -0.75,-0.3,0, -0.75,-0.3,0, -0.75,-0.3,0
    ]);

    // vertex colors
    var vertexColors1 = new Float32Array(
        [
            1,1,0, 1,0,1, 0,1,1, 0,1,0,
            1,0,0, 0,1,1, 0,0,1,//
            1,1,0, 0,1,1, 0,1,0,
            1,1,1, 0,1,0, 0,0,0,
            1,1,1, 0,0,1, 0,1,0,
            1,0,1, 0,1,0, 0,0,0,//
            0,1,0, 1,1,1, 1,1,0,
            0,1,1, 1,1,0, 1,0,0,
            1,0,1, 0,1,1, 0,0,0,
            1,1,1, 0,1,0, 0,0,0,//
            1,1,0, 0,0,1, 0,0,0,
            0,0,1, 1,1,0, 1,0,0,
            0,0,0, 1,0,0, 1,1,1,

            0, 0, 1,   1, 0, 1,   0, 1, 1,   1, 1, 1,
            1, 1, 0,   1 ,0, 1,   1, 1, 0,   1, 0, 1,
            1, 1, 1,   0, 1, 1,   1, 1, 0,   0, 1, 1


        ]);


    var vertexColors2 = new Float32Array(
        [   1,1,0, 1,0,1, 0,1,1, 0,1,0,
            1,0,0, 0,1,1, 0,0,1,//
            1,1,0, 0,1,1, 0,1,0,
            1,1,1, 0,1,0, 0,0,0,
            1,1,1, 0,0,1, 0,1,0,
            1,0,1, 0,1,0, 0,0,0,//
            0,1,0, 1,1,1, 1,1,0,
            0,1,1, 1,1,0, 1,0,0,
            1,0,1, 0,1,1, 0,0,0,
            1,1,1, 0,1,0, 0,0,0,//
            1,1,0, 0,0,1, 0,0,0,
            0,0,1, 1,1,0, 1,0,0,
            0,0,0, 1,0,0, 1,1,1
        ]);

    // element index array
    var triangleIndices1 = new Uint8Array(
        [
//           0, 1, 2,     0, 2, 3,
//             4, 5, 6,    7, 8, 9,//
//             10,11,12,   13,14,15,
//             16,17,18,   19,20,21,//
//             22,23,24,   25,26,27,
//             28,29,30,   31,32,33,//
//             34,35,36,   37,38,39,
            40, 41, 42,   40, 42, 43,
            44, 45, 46,   44, 45, 47,
            48, 49, 50, 48, 50, 51
//             0, 1, 2,   0, 2, 3,
//             4, 5, 6,   4, 5, 7,
//             8, 9, 10,  8, 10, 11

        ]); //

    var triangleIndices2 = new Uint8Array(
        [   0, 1, 2,     0, 2, 3,
            4, 5, 6,    7, 8, 9,//
            10,11,12,   13,14,15,
            16,17,18,   19,20,21,//
            22,23,24,   25,26,27,
            28,29,30,   31,32,33,//
            34,35,36,   37,38,39
        ]);

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos1, gl.STATIC_DRAW);
    trianglePosBuffer1.itemSize = 3;
    trianglePosBuffer1.numItems = 24;

    var trianglePosBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos1, gl.STATIC_DRAW);
    trianglePosBuffer2.itemSize = 3;
    trianglePosBuffer2.numItems = 40;

    // block transfer them to the graphics hardware
    var triangleNormalBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals1, gl.STATIC_DRAW);
    triangleNormalBuffer1.itemSize = 3;
    triangleNormalBuffer1.numItems = 24;

    var triangleNormalBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals2, gl.STATIC_DRAW);
    triangleNormalBuffer2.itemSize = 3;
    triangleNormalBuffer2.numItems = 40;

    // a buffer for colors
    var colorBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors1, gl.STATIC_DRAW);
    colorBuffer1.itemSize = 3;
    colorBuffer1.numItems = 24;


    var colorBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors2, gl.STATIC_DRAW);
    colorBuffer2.itemSize = 3;
    colorBuffer2.numItems = 40;

    // a buffer for indices
    var indexBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices1, gl.STATIC_DRAW);

    var indexBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices2, gl.STATIC_DRAW);

    // Scene (re-)draw routine
    function draw() {

        // Translate slider values to angles in the [-pi,pi] interval
        var size = slider1.value*0.01;
        var angle2 = slider2.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [450*Math.sin(-70*0.01*Math.PI),100.0,450*Math.cos(-70*0.01*Math.PI)];
        var target = [0,0,0];
        var up = [0,1,0];

        var tModel1 = m4.scaling([size*100,size*100,100]);
        var tModel2 = m4.multiply(m4.scaling([100,100,100]),m4.axisRotation([1,0,1],angle2));
        var tnModel = m4.axisRotation([1,1,1],angle2);
        var tCamera = m4.inverse(m4.lookAt(eye,target,up));
        var tProjection = m4.perspective(Math.PI/4,1,10,1000);

        var tMV1=m4.multiply(tModel1,tCamera);
        var tMV2=m4.multiply(tModel2,tCamera);
        var tMVn=m4.multiply(tnModel,tCamera);
        var tMVP1=m4.multiply(m4.multiply(tModel1,tCamera),tProjection);
        var tMVP2=m4.multiply(m4.multiply(tModel2,tCamera),tProjection);
        var intensity=slider3.value*0.01;
        var specularE=slider4.value*0.01;
        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV1);
        gl.uniformMatrix4fv(shaderProgram.MVNormalmatrix,false,tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP1);
        gl.uniform1f(shaderProgram.intensity,intensity);
        gl.uniform1f(shaderProgram.specularE,specularE);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer1);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer1.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer1);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer1.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer1.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, triangleIndices1.length, gl.UNSIGNED_BYTE, 0);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV2);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP2);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer2);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer2.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer2);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer2.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer2.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, triangleIndices2.length, gl.UNSIGNED_BYTE, 0);

    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}