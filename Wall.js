"use strict";
function Wall() {
    
    this.x1 = window.innerWidth / 3;
    this.y1 = window.innerHeight / 3;
    
    this.x2 = window.innerWidth * 2 / 3;
    this.y2 = window.innerHeight / 3;
    
    this.x3 = window.innerWidth * 2 / 5;
    this.y3 = window.innerHeight / 4;
    
    this.x4 = window.innerWidth * 2 / 5;
    this.y4 = window.innerHeight * 3 / 4;
   
    this.show = function () {
        if (level ==1) {
            
            noStroke();
            fill('#FF0000');
            rect(this.x1, this.y1,10,window.height/3);
        
            noStroke();
            fill('#FF0000');
            rect(this.x2, this.y2,10,window.height/3);
           
            
        }else {
            noStroke();
            fill('#FF0000');
            rect(this.x1, this.y1,10,window.height/3);
        
            noStroke();
            fill('#FF0000');
            rect(this.x2, this.y2,10,window.height/3);
                
            noStroke();
            fill('#FF0000');
            rect(this.x3, this.y3,window.width/5,10);
            
            noStroke();
            fill('#FF0000');
            rect(this.x4, this.y4,window.width/5,10);
        
            
        }
            
    }
    
//    var touch = false;
//    if (((bomber.x <= this.x1) || (bomber.x >= (this.x1+5))) && (bomber.y >= this.y1) || (bomber.y <= this.y1 +5) || (bomber.y >= (this.y1*2)))
//        {
//            this.touch = false;
//        }
//    else 
//        this.touch = true;
    
    
}