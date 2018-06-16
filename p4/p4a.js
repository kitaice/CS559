function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 1;
    var triangles = [];
    var clips = [];
    var angle3 = 0;
    // function initGeometry(){
    //     triangles.push([[100,100,100],[100,100,400],[400,100,400],"red"]);
    //     triangles.push([[100,100,100],[100,300,300],[100,300,100],"green"]);
    //     triangles.push([[400,100,100],[400,100,400],[400,100,400],"green"]);
    //     triangles.push([[300,100,100],[300,300,300],[300,300,100],"purple"]);
    // }

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

    function drawTriangle(triangle,Tx){
        context.beginPath();
        context.fillStyle=triangle[3];
        moveToTx(triangle[0][0],triangle[0][1],triangle[0][2],Tx);
        lineToTx(triangle[1][0],triangle[1][1],triangle[1][2],Tx);
        lineToTx(triangle[2][0],triangle[2][1],triangle[2][2],Tx);
        context.closePath();
        context.fill();
    }

    function blade(center,diameter,Tx){
        // moveToTx(center[0]-diameter,center[1],center[2]+25,Tx);
        // lineToTx(center[0],center[1],center[2]+25,Tx);
        // lineToTx(center[0]-diameter,center[1],center[2]-25,Tx);
        // lineToTx(center[0]-diameter,center[1],center[2]+25,Tx);
        // context.stroke();
        //
        // moveToTx(center[0]-diameter,center[1],center[2]-25,Tx);
        // lineToTx(center[0],center[1],center[2]-25,Tx);
        // lineToTx(center[0],center[1],center[2]+25,Tx);
        // lineToTx(center[0]-diameter,center[1],center[2]-25,Tx);
        // context.stroke();
        //
        // moveToTx(center[0],center[1],center[2]+25,Tx);
        // lineToTx(center[0],center[1],center[2]-25,Tx);
        // lineToTx(center[0]+diameter,center[1],center[2]-25,Tx);
        // lineToTx(center[0],center[1],center[2]+25,Tx);
        // context.stroke();
        //
        // moveToTx(center[0]+diameter,center[1],center[2]-25,Tx);
        // lineToTx(center[0]+diameter,center[1],center[2]+25,Tx);
        // lineToTx(center[0],center[1],center[2]+25,Tx);
        // lineToTx(center[0]+diameter,center[1],center[2]-25,Tx);
        // context.stroke();


        // triangles.push(m4.transformPoint(Tx,[[center[0]-diameter,center[1],center[2]+25],
        //     [center[0],center[1],center[2]+25],
        //     [center[0]-diameter,center[1],center[2]-25]]));
        // triangles.push(m4.transformPoint(Tx,[[center[0]-diameter,center[1],center[2]-25],
        //     [center[0],center[1],center[2]-25],
        //     [center[0],center[1],center[2]+25]]));
        // triangles.push(m4.transformPoint(Tx,[[center[0],center[1],center[2]+25],
        //     [center[0],center[1],center[2]-25],
        //     [center[0]+diameter,center[1],center[2]-25]]));
        // triangles.push(m4.transformPoint(Tx,[[center[0]+diameter,center[1],center[2]-25],
        //     [center[0]+diameter,center[1],center[2]+25],
        //     [center[0],center[1],center[2]+25]]));

        triangles.push([m4.transformPoint(Tx,[center[0]-diameter,center[1],center[2]+25]),
            m4.transformPoint(Tx,[center[0],center[1],center[2]+25]),
            m4.transformPoint(Tx,[center[0]-diameter,center[1],center[2]-25]),"red"]);
        triangles.push([m4.transformPoint(Tx,[center[0]-diameter,center[1],center[2]-25]),
            m4.transformPoint(Tx, [center[0],center[1],center[2]-25]),
            m4.transformPoint(Tx, [center[0],center[1],center[2]+25]),"red"]);
        triangles.push([m4.transformPoint(Tx,[center[0],center[1],center[2]+25]),
            m4.transformPoint(Tx,[center[0],center[1],center[2]-25]),
            m4.transformPoint(Tx,[center[0]+diameter,center[1],center[2]-25]),"red"]);
        triangles.push([m4.transformPoint(Tx,[center[0]+diameter,center[1],center[2]-25]),
            m4.transformPoint(Tx,[center[0]+diameter,center[1],center[2]+25]),
            m4.transformPoint(Tx, [center[0],center[1],center[2]+25]),"red"]);


    }

    function windmill(center,width,height,Tx){

        // moveToTx(center[0]-width,center[1],center[2]-width,Tx);
        // lineToTx(center[0]+width,center[1],center[2]-width,Tx);
        // lineToTx(center[0]+width,center[1],center[2]+width,Tx);
        // lineToTx(center[0]-width,center[1],center[2]-width,Tx);
        // context.stroke();
        //
        // moveToTx(center[0]-width,center[1],center[2]-width,Tx);
        // lineToTx(center[0]-width,center[1],center[2]+width,Tx);
        // lineToTx(center[0]+width,center[1],center[2]+width,Tx);
        // lineToTx(center[0]-width,center[1],center[2]-width,Tx);
        // context.stroke();

        triangles.push([m4.transformPoint(Tx,[center[0]-width,center[1],center[2]-width]),
            m4.transformPoint(Tx,[center[0]+width,center[1],center[2]-width]),
            m4.transformPoint(Tx,[center[0]+width,center[1],center[2]+width]),"red"]);
        triangles.push([m4.transformPoint(Tx,[center[0]+width,center[1],center[2]+width]),
            m4.transformPoint(Tx,[center[0]-width,center[1],center[2]+width]),
            m4.transformPoint(Tx,[center[0]-width,center[1],center[2]-width]),"red");

        // moveToTx(center[0]-width,center[1],center[2]-width,Tx);
        // lineToTx(center[0],center[1]+height,center[2],Tx);
        // lineToTx(center[0]+width,center[1],center[2]-width,Tx);
        // context.stroke();
        triangles.push(m4.transformPoint(Tx,[center[0]-width,center[1], center[2]-width]),
            m4.transformPoint(Tx,[center[0],center[1]+height,center[2]]),
            m4.transformPoint(Tx,[center[0]+width,center[1],center[2]-width]),"red");

        // moveToTx(center[0]-width,center[1],center[2]+width,Tx);
        // lineToTx(center[0],center[1]+height,center[2],Tx);
        // lineToTx(center[0]+width,center[1],center[2]+width,Tx);
        // context.stroke();
        triangles.push(m4.transformPoint(Tx,[center[0]-width,center[1],center[2]-width]),
            m4.transformPoint(Tx,[center[0],center[1]+height,center[2]]),
            m4.transformPoint(Tx,[center[0]+width,center[1],center[2]+width]),"red");
    }
    function basis(Tx){
        // context.fillStyle=color;
        // moveToTx(100,100,400,Tx);lineToTx(400,100,400,Tx);
        // lineToTx(400,100,100,Tx);lineToTx(100,100,100,Tx);
        // lineToTx(100,100,400,Tx);context.stroke();
        for(var i=100;i<400;i+=50){
            for (var j=100;j<400;j+=50){
                // moveToTx(i+50,100,j,Tx);lineToTx(i,100,j,Tx);
                // lineToTx(i,100,j+50,Tx);lineToTx(i+50,100,j,Tx);
                // context.stroke();
                //
                // moveToTx(i+50,100,j,Tx);lineToTx(i+50,100,j+50,Tx);
                // lineToTx(i,100,j+50,Tx);lineToTx(i+50,100,j,Tx);
                // context.stroke();

                triangles.push(m4.transformPoint(Tx,[i+50,100,j]),
                    m4.transformPoint(Tx,[i,100,j]),
                    m4.transformPoint(Tx,[i,100,j+50]),"red");
                triangles.push(m4.transformPoint(Tx,[i+50,100,j]),
                    m4.transformPoint(Tx,[i+50,100,j+50]),
                    m4.transformPoint(Tx,[i,100,j+50]),"red");
            }
            context.closePath();
            // context.fill();
            // for(var i=0;i<triangles.length;i++)
            //     drawTriangle(triangles[i],Tx);
        }
        function drawScene(Tx) {
            for(var i=0;i<triangles.length;i++)
                drawTriangle(triangles[i],Tx);
        }
        function update(angle3,rotateSpeed){
            angle3=(angle3+rotateSpeed)%360;
            return angle3;
        }
        function draw() {
            // hack to clear the canvas fast
            canvas.width = canvas.width;

            var angle1 = slider1.value*0.01*Math.PI;
            var angle2 = slider2.value*0.01*Math.PI;
            var rotateSpeed=slider3.value*0.01;
            angle3=update(angle3,rotateSpeed);
            var axis = [1,1,1];

            context.save();

            var Tmodel=m4.axisRotation(axis,angle2);
            var eye=[700*Math.cos(angle1),400,700*Math.sin(angle1)];
            var target=[0,0,0];
            var up=[0,1,0];

            var Tcamera=m4.inverse(m4.lookAt(eye,target,up));
            var Tprojection=m4.perspective(Math.PI/3,1,5,400);
            var Tviewport=m4.multiply(m4.scaling([200,-200,200]),m4.translation([300,300,0]));
            var Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
            var Tmcp=m4.multiply(m4.multiply(Tmodel,Tcamera),Tprojection);
            var Tmc=m4.multiply(Tmodel,Tcamera);
            var Tmcpv=m4.multiply(Tmodel,Tcpv);

            //drawScene(Tmcpv);
            basis(Tmcpv);
            var w1=m4.multiply(m4.axisRotation([0,1,0],angle3),m4.multiply(m4.translation([150,200,350]),Tmcpv));
            var w2=m4.multiply(m4.axisRotation([0,1,0],angle3),m4.multiply(m4.translation([200,300,150]),Tmcpv));
            var w3=m4.multiply(m4.axisRotation([0,1,0],angle3),m4.multiply(m4.translation([270,350,270]),Tmcpv));
            var w4=m4.multiply(m4.axisRotation([0,1,0],angle3),m4.multiply(m4.translation([350,250,350]),Tmcpv));
            windmill([150,100,350],20,100,Tmcpv);
            blade([0,0,0],50,w1);
            windmill([200,100,150],40,200,Tmcpv);
            blade([0,0,0],100,w2);
            windmill([270,100,270],40,250,Tmcpv);
            blade([0,0,0],75,w3);
            blade([0,0,0],50,w4);
            windmill([350,100,350],30,150,Tmcpv);

            // for(var i=0;i<triangles.length;i++){
            //     var cam=m4.transformPoint(Tmc,triangles[i][1]);
            //     triangles[i][3]="rgb("+Math.round(-cam[2]*0.3)+","+Math.round(-cam[2]*0.1)+","+Math.round(-cam[2]*0.9)+")";
            // }
            //TODO WHEN DRAWING APPLY TPERCPECTIVE & TVIEWPORT  IN LINETOTX
            drawScene(Tmcpv);
            //drawAxes(Tcpv);
            window.requestAnimationFrame(draw);
        }

        slider1.addEventListener("input",draw);
        slider2.addEventListener("input",draw);
        slider3.addEventListener("input",draw);
        //initGeometry();
        draw();

    }
//window.onload = setup;
