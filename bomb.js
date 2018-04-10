function Bomb(bomber_x, bomber_y) {
	this.x = bomber_x;
	this.y = bomber_y;
	this.r = 10; //bomb size 
    
    //added bomb image to replace the little orange dot
    
//    bomberimg = loadImage("res/images/TNT-256.png");

	this.show = function() {
		noStroke();
        image(bombImg, this.x-30, this.y-30, 60, 60)
//		fill(211, 8, 93, this.transparency);
//		rect(this.x, this.y, this.r, this.r);
	}

	this.explode = function() {
		this.r = 0;	
	}
}