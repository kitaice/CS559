function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var slider1 = document.getElementById('slider1');
    slider1.value = 45;
    var slider2 = document.getElementById('slider2');
    slider2.value = 11;
    var slider3 = document.getElementById('slider3');
    slider3.value = -11;
    var slider4 = document.getElementById('slider4');
    slider4.value = 0
    var slider5 = document.getElementById('slider5');
    slider5.value = 20
    var slider6 = document.getElementById('slider6');
    slider6.value = 25
    var slider7 = document.getElementById('slider7');
    slider7.value = 0
    var slider8 = document.getElementById('slider8');
    slider8.value = 0
    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var theta1 = slider1.value*0.005*Math.PI;
        var phi1 = slider2.value*0.05*Math.PI;
        var phi2 = slider3.value*0.05*Math.PI;
        var theta2= slider4.value*0.05*Math.PI;
        var length=slider5.value*0.05;
        var width=slider6.value*0.04;
        var dx = slider7.value;
        var dy = slider8.value;

        function ClockHand(color) {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(10,5);
            context.lineTo(90,5);
            context.lineTo(100,0);
            context.lineTo(90,-5);
            context.lineTo(10,-5);
            context.closePath();
            context.fill();
        }

        function DrawAxes() {
            context.strokeStyle="black";
            context.beginPath();
            context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
            context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
            context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
            context.stroke();
        }
        DrawAxes();
        context.save();
        context.translate(dx,dy);
        DrawAxes();
        context.translate(150,50);
        context.save();
        ClockHand("blue");
        context.translate(0,0);
        context.save();
        context.rotate(theta1);
        ClockHand("green");
        context.translate(100,0);
        context.save();
        context.rotate(phi1);
        ClockHand("red");
        context.translate(100,0);
        context.save();
        context.rotate(phi2);
        context.rotate(-45*0.005*Math.PI);
        context.scale(length,width);
        ClockHand("orange");
        context.save();
        context.restore();
        context.restore();
        context.restore();
        context.restore();
        context.restore();
        context.restore();
        context.translate(150,50);
        context.rotate(theta2);
        ClockHand("brown");
    }
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    slider5.addEventListener("input",draw);
    slider6.addEventListener("input",draw);
    slider7.addEventListener("input",draw);
    slider8.addEventListener("input",draw);
    draw();
}
window.onload = setup;