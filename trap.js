function trap(img,radius) {
	this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);
    
	this.makeSlow = false;
    this.is_Exist = true;
	this.r = radius;
    this.angle =0;
    
    this.show = function(){
        noStroke();
        if(this.r == 30){
            image(img, this.x-30, this.y-30, this.r*2, this.r*2);
        }else if(this.r == 80){
			image(img, this.x-45, this.y-45, this.r+15, this.r+20);
		}
//        		fill('#DCB239');
//		ellipse(this.x, this.y, this.r, this.r); 
    }

    this.hits = function(powerup){
        var d = dist(this.x, this.y, powerup.x, powerup.y);
        if (d*2 < this.r + powerup.r){
            return true;
        } return false;
    }
    

    this.respawn = function(){
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.r = radius;
        
        this.show();
    }

    this.gone = function(){
        this.x = null;
        this.y = null;       
        this.r=0;
    }
}
