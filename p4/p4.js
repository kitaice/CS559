function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 10;
    var slider4 = document.getElementById('slider4');
    slider4.value = 40;
    var triangles = [];

    //var angle3 = 0;

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

    function drawScene(triangle,Tx) {
        for(var i=0;i<triangle.length;i++)
            drawTriangle(triangle[i],Tx);
    }

    function basis(Tx,color) {
        //context.fillStyle="blue";
        for (var i = 100; i < 400; i += 50) {
            for (var j = 100; j < 400; j += 50) {
                moveToTx(i+50,100,j,Tx);lineToTx(i,100,j,Tx);
                lineToTx(i,100,j+50,Tx);lineToTx(i+50,100,j,Tx);
                context.stroke();

                moveToTx(i+50,100,j,Tx);lineToTx(i+50,100,j+50,Tx);
                lineToTx(i,100,j+50,Tx);lineToTx(i+50,100,j,Tx);
                context.stroke();

                // triangles.push([m4.transformPoint(Tx, [i + 50, 100, j]),
                //     m4.transformPoint(Tx, [i, 100, j]),
                //     m4.transformPoint(Tx, [i, 100, j + 50]), "red"]);
                // triangles.push([m4.transformPoint(Tx, [i + 50, 100, j]),
                //     m4.transformPoint(Tx, [i + 50, 100, j + 50]),
                //     m4.transformPoint(Tx, [i, 100, j + 50]), "red"]);

                triangles.push([[i + 50, 100, j], [i, 100, j], [i, 100, j + 50], 0,color,m4.identity(),0.0]);
                triangles.push([[i + 50, 100, j], [i + 50, 100, j + 50], [i, 100, j + 50], 0,color,m4.identity(),0.0]);
            }
            context.closePath();
        }
    }

    function windmill(center,width,height,type,color,Tx){

        if (type==1){
            moveToTx(center[0]-width,center[1]+height,center[2]-width,Tx);
            lineToTx(center[0]+width,center[1]+height,center[2]-width,Tx);
            lineToTx(center[0]+width,center[1]+height,center[2]+width,Tx);
            lineToTx(center[0]-width,center[1]+height,center[2]+width,Tx);

            triangles.push([[center[0]-width,center[1]+height,center[2]-width],
                [center[0]+width,center[1]+height,center[2]-width],
                [center[0]+width,center[1]+height,center[2]+width],0,color,m4.identity(),0.0]);
            triangles.push([[center[0]-width,center[1]+height,center[2]-width],
                [center[0]-width,center[1]+height,center[2]+width],
                [center[0]+width,center[1]+height,center[2]+width],0,color,m4.identity(),0.0]);

///////////////////////////////////////////////////////////////////////////////////////////
            moveToTx(center[0]-width,center[1],center[2]-width,Tx);
            lineToTx(center[0],center[1]+0.5*height,center[2],Tx);
            lineToTx(center[0]+width,center[1],center[2]-width,Tx);
            context.stroke();context.closePath();
            moveToTx(center[0]-width,center[1]+height,center[2]-width,Tx);
            lineToTx(center[0],center[1]+0.5*height,center[2],Tx);
            lineToTx(center[0]+width,center[1]+height,center[2]-width,Tx);
            context.stroke();context.closePath();

            triangles.push([[center[0]-width,center[1], center[2]-width],
                [center[0],center[1]+0.5*height,center[2]],
                [center[0]+width,center[1],center[2]-width],0,color,m4.identity(),0.0]);
            triangles.push([[center[0]-width,center[1]+height, center[2]-width],
                [center[0],center[1]+0.5*height,center[2]],
                [center[0]+width,center[1]+height,center[2]-width],0,color,m4.identity(),0.0]);

////////////////////////////////////////////////////////////////////////////////////////////

            moveToTx(center[0]-width,center[1],center[2]+width,Tx);
            lineToTx(center[0],center[1]+0.5*height,center[2],Tx);
            lineToTx(center[0]+width,center[1],center[2]+width,Tx);
            context.stroke();context.closePath();
            moveToTx(center[0]-width,center[1]+height,center[2]+width,Tx);
            lineToTx(center[0],center[1]+0.5*height,center[2],Tx);
            lineToTx(center[0]+width,center[1]+height,center[2]+width,Tx);
            context.stroke();context.closePath();

            triangles.push([[center[0]-width,center[1],center[2]+width],
                [center[0],center[1]+0.5*height,center[2]],
                [center[0]+width,center[1],center[2]+width],0,color,m4.identity(),0.0]);
            triangles.push([[center[0]-width,center[1]+height,center[2]+width],
                [center[0],center[1]+0.5*height,center[2]],
                [center[0]+width,center[1]+height,center[2]+width],0,color,m4.identity(),0.0]);
        }　else {
/////////////////////////////////////////////////////////////////////////////////////////////

            moveToTx(center[0]+width,center[1],center[2]-width,Tx);
            lineToTx(center[0],center[1]-height,center[2],Tx);
            lineToTx(center[0]+width,center[1],center[2]+width,Tx);
            context.stroke();context.closePath();

            triangles.push([[center[0]+width,center[1], center[2]-width],
                [center[0],center[1]-height,center[2]],
                [center[0]+width,center[1],center[2]+width],0,color,m4.identity(),0.0]);
//////////////////////////////////////////////////////////////////////////////////////////////
            moveToTx(center[0]-width,center[1],center[2]-width,Tx);
            lineToTx(center[0],center[1]-height,center[2],Tx);
            lineToTx(center[0]-width,center[1],center[2]+width,Tx);
            context.stroke();context.closePath();

            triangles.push([[center[0]-width,center[1], center[2]-width],
                [center[0],center[1]-height,center[2]],
                [center[0]-width,center[1],center[2]+width],0,color,m4.identity(),0.0])

        }
    }

    function draw() {
        // hack to clear the canvas fast
        canvas.width = canvas.width;

        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;
        var distance = slider3.value*0.1;
        var angle3 = slider4.value*0.01*Math.PI;
        var axis = [1,1,1];

        context.save();

        var Tmodel=m4.axisRotation(axis,angle2);
        var eye=[distance*700*Math.cos(angle1),angle3*400,distance*600*Math.sin(angle1)];
        var target=[0,0,0];
        var up=[0,1,0];
        var Tcamera=m4.inverse(m4.lookAt(eye,target,up));
        var Tprojection=m4.perspective(Math.PI/3,1,5,400);
        var Tviewport=m4.multiply(m4.scaling([200,-200,200]),m4.translation([300,300,0]));
        var Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
        var Tmcp=m4.multiply(m4.multiply(Tmodel,Tcamera),Tprojection);
        var Tmc=m4.multiply(Tmodel,Tcamera);
        var Tmcpv=m4.multiply(Tmodel,Tcpv);

        basis(Tmcpv,1);

        windmill([150,100,350],20,100,1,2,Tmcpv);
        windmill([200,100,150],40,200,1,3,Tmcpv);
        windmill([270,100,270],40,250,1,3,Tmcpv);
        windmill([350,100,350],30,150,1,4,Tmcpv);
        windmill([150,100,150],20,100,0,2,Tmcpv);
        windmill([350,100,150],40,200,0,4,Tmcpv);
        windmill([270,100,270],60,250,0,5,Tmcpv);
        windmill([150,100,350],30,150,0,5,Tmcpv);
        triangles.sort(function (a,b){
            var acam=m4.transformPoint(Tmc,a[2]);
            var bcam=m4.transformPoint(Tmc,b[2]);
            var az=(a[1][2]+a[2][2]+a[0][2])/3;
            var bz=(b[1][2]+b[2][2]+b[0][2])/3;
            if(acam>bcam) return 1;
            else if (acam<bcam) return -1;
            else return 0;
        });
        for(var i=0;i<triangles.length;i++){
            var cam=m4.transformPoint(Tmc,triangles[i][2]);
            if(triangles[i][4]==1){
                triangles[i][3]="rgb("+Math.floor(-cam[2]*0.3)+",0,0)";
            } else if(triangles[i][4]==2) {
                triangles[i][3]="rgb(0,"+Math.floor(-cam[2]*0.3)+",0)";
            } else if(triangles[i][4]==3) {
                triangles[i][3]="rgb(0,0,"+Math.floor(-cam[2]*0.3)+")";
            } else if(triangles[i][4]==4) {
                triangles[i][3]="rgb("+Math.floor(-cam[2]*0.3)+",0,"+Math.floor(-cam[2]*0.3)+")";
            }else if(triangles[i][4]==5) {
                triangles[i][3]="rgb("+Math.floor(-cam[2]*0.3)+","+Math.floor(-cam[2]*0.3)+",0)";
            }
        }
        triangles.sort(function (a,b){
            var az=(a[1][2]+a[2][2]+a[0][2])/3;
            var bz=(b[1][2]+b[2][2]+b[0][2])/3;
            if(az>bz) return 1;
            else if (az<bz) return -1;
            else return 0;
        });
        drawScene(triangles,Tmcpv);
        // for(var i=0;i<triangles.length;i++){
        //     var cam=m4.transformPoint(Tmc,triangles[i][1]);
        //     triangles[i][3]="rgb("+Math.round(-cam[2]*0.3)+","+Math.round(-cam[2]*0.1)+","+Math.round(-cam[2]*0.9)+")";
        // }


    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();

}
window.onload = setup;
