/**
 * Created by gleicher on 9/5/2015.
 */
/** sample solution for the CS559 programming assignment 2
 * students may look at this code, but not copy it verbatim
 */
// paths
function Path(x,y,posx,posy,height) {
    "use strict";
    this.x = x;
    this.y = y;
    this.posx=posx;
    this.posy=posy;
    this.height=height;
    this.base=this.posy;
    this.ascend=false;
}
Path.prototype.eval = function() {
    "use strict";
    var temp;
    this.posx=(this.posx+this.x)%1200;
    if(this.posx==1200){
        this.posy=this.base;
    }
    if(this.y!=0){
        if(this.ascend==false){
            temp=(this.posy+this.y)%this.height;
            this.posy+=this.y;
        }
        if(this.posy==this.base+this.height){
            this.ascend=true;
        }
        else if (this.posy==this.base){
            this.ascend=false;
        }
        if(this.ascend==true){
            this.posy-=this.y;
        }
    }



}

