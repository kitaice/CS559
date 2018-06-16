function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;
    var slider4 = document.getElementById('slider4');
    slider4.value = 15;

    function moveToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.moveTo(locTx[0],locTx[1]);
    }

    function lineToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.lineTo(locTx[0],locTx[1]);
    }

    function drawAxes(Tx) {
        context.lineWidth=3;
        context.beginPath();context.strokeStyle="red";  moveToTx(0,0,0,Tx);lineToTx(300,0,0,Tx);context.stroke();context.closePath();
        context.beginPath();context.strokeStyle="green";moveToTx(0,0,0,Tx);lineToTx(0,300,0,Tx);context.stroke();context.closePath();
        context.beginPath();context.strokeStyle="blue"; moveToTx(0,0,0,Tx);lineToTx(0,0,300,Tx);context.stroke();context.closePath();
        context.lineWidth=1;
    }


    function drawBlade(x,y,z,dz,Tx,color){
        var fill=color;
        context.beginPath();
        moveToTx(x,y,z,Tx);lineToTx(x,y,z+dz,Tx);context.stroke();
        moveToTx(x,y+100,z,Tx);lineToTx(x,y+100,z+dz,Tx);context.stroke();

        context.fillStyle=fill;
        moveToTx(x,y,z+dz,Tx);lineToTx(x-10,y+10,z+dz,Tx);lineToTx(x-10,y+90,z+dz,Tx);lineToTx(x,y+100,z+dz,Tx);
        lineToTx(x+10,y+90,z+dz,Tx);lineToTx(x+10,y+10,z+dz,Tx);lineToTx(x,y,z+dz,Tx);context.stroke();
        moveToTx(x,y,z,Tx);lineToTx(x-10,y+10,z,Tx);lineToTx(x-10,y+90,z,Tx);lineToTx(x,y+100,z,Tx);
        lineToTx(x+10,y+90,z,Tx);lineToTx(x+10,y+10,z,Tx);lineToTx(x,y,z,Tx);context.stroke();
        context.closePath();
        context.fill();

    }
    function draw() {
        // hack to clear the canvas fast
        canvas.width = canvas.width;

        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;
        var angle3 = slider3.value*0.01*Math.PI;
        var depth=slider4.value;
        var axis = [1,1,1];

        var Tworld_to_camera = m4.multiply(m4.scaling([1,-1,1]),               // First, flip the y-axis (to compensate for canvas y-axis pointing down)
            m4.multiply(m4.rotationY(angle1),             // Then, spin around the y-axis (based on slider)
                m4.translation([50,canvas.height-50,50]))); // Then shift so that the origin is 50 pixels from lower-left canvas corner
        var Tmodel_to_world  = m4.axisRotation(axis,angle2);
        var Tmodel_to_camera = m4.multiply(Tmodel_to_world,Tworld_to_camera);

        var first=m4.multiply(m4.rotationX(0.25*Math.PI),
            m4.multiply(m4.rotationY(angle1),
            m4.translation([150,canvas.height-150,150])));
        drawBlade(0,0,200,-depth,first,"blue");
        var second=m4.multiply(m4.multiply(m4.translation([0,0,0]),m4.multiply(m4.rotationZ(Math.PI),first)),m4.rotationZ(angle3));
        var third=m4.multiply(m4.translation([50,100,-100]),first);
        drawBlade(0,0,200,-depth,second,"red");
        drawBlade(0,200,300,depth*0.5,first,"green");
        drawBlade(50,0,100,depth*0.5,third,"blue");
        var fourth=m4.multiply(m4.multiply(m4.rotationX(angle2),first),m4.rotationX(-0.5*Math.PI));
        drawBlade(0,200,300,depth*0.8,fourth,"brown");
        var fifth=m4.multiply(m4.multiply(m4.rotationZ(angle2),m4.translation([200,300,100])),Tmodel_to_camera);
        var sixth=m4.multiply(m4.rotationX(angle1),fifth);
        drawBlade(0,0,0,-depth,fifth,"yellow");
        drawBlade(0,-100,0,depth,sixth,"yellow");
        // var zaxis = m4.multiply(m4.multiply(m4.scaling([1,-1,1]),               // First, flip the y-axis (to compensate for canvas y-axis pointing down)
        //     m4.multiply(m4.rotationZ(angle3),             // Then, spin around the y-axis (based on slider)
        //         m4.translation([100,canvas.height-100,100]))),Tmodel_to_camera);

        context.closePath();
        drawAxes(Tworld_to_camera);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);

    draw();
}

