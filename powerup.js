function powerUp(heartImg) {
	this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);
    
    
    
	this.r = 20;
    this.angle =0;
    
    var heartImg;
    heartImg = loadImage("res/images/heartImg.png");
    
    this.show = function(){
        noStroke();
        image(heartImg, this.x-20, this.y-20, this.r*2, this.r*2);
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
        this.r = 20;
        
        this.show();
    }
    this.gone = function(){
            this.x = null;
            this.y = null;
        
        this.r=0;
    }
}
