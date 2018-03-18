function Bomber() {
	this.x = width/2;
	this.y = height/2;
	this.r = 30;
	this.speed = 7;
	this.life = 5;
	this.gotHit = false;
	this.inVulnerable = false; //make bomberman invisible for a moment
	this.moves = false;

	this.show = function() {
		noStroke();
		fill('#DCB239');
		ellipse(this.x, this.y, this.r, this.r); //bomber shape, ellipse will automatically draw an oval in the window. reference <http://processingjs.org/reference/ellipse_/>. 
	}

	this.plant = function() {
		var bomb = new Bomb(this.x, this.y);
		return bomb;
	}

}