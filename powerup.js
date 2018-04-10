function powerUp(powerImg, radius) {
	this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);
    
	this.makeSlow = false;
	this.r = radius;
    this.angle =0;
    
    this.show = function(){
        noStroke();
        if(this.r == 20){
            image(powerImg, this.x-20, this.y-20, this.r*2, this.r*2);
        }else if(this.r == 30){
            image(powerImg, this.x-30, this.y-30, this.r*2, this.r*2);
        }else if(this.r == 25){
			image(powerImg, this.x-25, this.y-25, this.r+15, this.r+20);
		}
//        		fill('#DCB239');
//		ellipse(this.x, this.y, this.r, this.r); 
    }
    
    // this is to make sure the player can hit the power up by touching it.
    this.hits = function(powerup){
        var d = dist(this.x, this.y, powerup.x, powerup.y);
        if (d*2 < this.r + powerup.r){
            return true;
        } return false;
    }
    
    // this function is to respawn the power up in the new level when player pick up power up from the previous level
    this.respawn = function(){
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.r = radius;
        
        this.show();
    }
    
    // this function is to hide the heart power up so that when player pick up the power up then it will be gone from the screen.
    this.gone = function(){
            this.x = null;
            this.y = null;
        
        this.r=0;
    }
}
