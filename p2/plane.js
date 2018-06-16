
"use strict ";


function plane(context,x,y,path,color,color1)
{
    this.context=context;
    this.posX=x;
    this.posY=y;
    this.path=path;
    this.outPropAngle  = 0;
    this.inPropAngle = 0;
    this.color=color;
    this.color1=color1;
}
plane.prototype.drawBlade = function(angle,x,y) {

    this.context.translate(x,y);
    this.context.rotate(angle);
    this.context.beginPath();
    this.context.moveTo(0,-15);
    this.context.lineTo(0,15);
    this.context.closePath();
    this.context.stroke();
    this.context.rotate(-angle);
    this.context.translate(-x,-y);

};
plane.prototype.drawBody = function() {

    this.context.fillStyle=this.color
    this.context.strokeStyle="#000000";

    this.context.save();
    // vertical wing
    this.context.beginPath();
    this.context.moveTo(-1,-25);
    this.context.lineTo(0,-45);
    this.context.lineTo(1,-25);
    this.context.lineTo(-1,-25);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(30,-30);
    this.context.lineTo(-30,-30);
    this.context.closePath();
    this.context.stroke();

    // wings
    this.context.beginPath();
    this.context.moveTo(25,-4);
    this.context.lineTo(150,-4);
    this.context.lineTo(75,-2);
    this.context.lineTo(25,-1);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(-25,-4);
    this.context.lineTo(-150,-4);
    this.context.lineTo(-75,-2);
    this.context.lineTo(-25,-1);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
    // body
    this.context.beginPath();
    this.context.arc(0,0,25,0,2*Math.PI);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.fillStyle = this.color1;
    this.context.beginPath();
    this.context.moveTo(22,10);
    this.context.lineTo(20,15);
    this.context.lineTo(-20,15);
    this.context.lineTo(-22,10);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
    // cockpit
    this.context.fillStyle = "#000000";
    this.context.strokeStyle="#000000";
    this.context.beginPath();
    this.context.moveTo(14,-5);
    this.context.lineTo(12,-10);
    this.context.lineTo(-12,-10);
    this.context.lineTo(-14,-5);
    this.context.lineTo(14,-5);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.save();
    this.context.scale(-1,1);
    this.context.restore();
    this.context.beginPath();
    this.context.arc(0,0,3,0,2*Math.PI);
    this.context.fill()
    // propellers
    this.context.beginPath();
    this.context.arc(45,-1,3,0,2*Math.PI);
    this.context.fill()

    this.context.beginPath();
    this.context.arc(-45,-1,3,0,2*Math.PI);
    this.context.fill()

    this.context.beginPath();
    this.context.arc(85,-3,3,0,2*Math.PI);
    this.context.fill()

    this.context.beginPath();
    this.context.arc(-85,-3,3,0,2*Math.PI);
    this.context.fill()

    this.drawBlade(this.inPropAngle,45,-1);
    this.drawBlade(this.inPropAngle,-45,-1);
    this.drawBlade(this.outPropAngle,85,-3);
    this.drawBlade(this.outPropAngle,-85,-3);
    this.context.restore();
};
plane.prototype.draw = function() {
    this.context.save();
    this.context.translate(this.posX, this.posY);
    this.drawBody();
    this.context.restore();
}
plane.prototype.update = function() {
    this.outPropAngle  += 0.5;
    this.inPropAngle -= 0.5;
    this.path.eval();
    this.posX=this.path.posx;
    this.posY=this.path.posy;
}
