function Bomber2() {
	this.x = width/1.5;
	this.y = height/2;
	this.r = 30;
	this.speed = 7;
	this.life = 1;
	this.gotHit = false;
	this.inVulnerable2 = false; //make bomberman invisible for a moment
    this.makeSlow = false;
	this.moves = false;
    this.score = 0;
//    var bomberimage;

	this.show = function() {
		noStroke();
        image(bomberman2Img, this.x-40, this.y-40, 80, 80);
        if(inVulnerable2){
            image(shieldImg, this.x-40, this.y-40, 80, 80);
        }else if(makeSlow){
            image(freezeEffectImg, this.x-40, this.y-40, 80, 80);
        }
//		fill('#DCB239');
//		ellipse(this.x, this.y, this.r, this.r); 
        //bomber shape, ellipse will automatically draw an oval in the window. reference <http://processingjs.org/reference/ellipse_/>. 
	}

	this.plant = function() {
		var bomb2 = new Bomb2(this.x, this.y);
		return bomb2;
	}
    
}