function Bomber() {
	this.x = width/2;
	this.y = height/2;
	this.r = 30;
	this.speed = 7;
	this.life = 1;
	this.gotHit = false;
	this.inVulnerable = false; //make bomberman invisible for a moment
    this.makeSlow = false;
	this.moves = false;
    this.score = 0;
    var shieldImg;
    var bomberimage;
    var freezeEffect;
    bombermanimg = loadImage("res/images/bomberman.png")
    
     
    shieldImg= loadImage("res/images/shield_bubble.png");
    freezeEffect = loadImage("res/images/freezeEffect.png");
	this.show = function() {
		noStroke();
        image(bombermanimg, this.x-40, this.y-40, 80, 80);
        if(inVulnerable){
            image(shieldImg, this.x-40, this.y-40, 80, 80);
        }else if(makeSlow){
            image(freezeEffect, this.x-40, this.y-40, 80, 80);
        }
//		fill('#DCB239');
//		ellipse(this.x, this.y, this.r, this.r); 
        //bomber shape, ellipse will automatically draw an oval in the window. reference <http://processingjs.org/reference/ellipse_/>. 
	}

	this.plant = function() {
		var bomb = new Bomb(this.x, this.y);
		return bomb;
	}
    
}