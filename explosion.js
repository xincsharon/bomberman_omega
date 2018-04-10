function Explosion(bomb_x, bomb_y) {
	this.x = bomb_x;
	this.y = bomb_y;
	this.r = 30;
    
    //changed explosion radius
	this.explosion_radius = 195; //bomb explode size 
	this.transparency = 1000;
    
    //changed fadeout_rate so that it wont delay so long for the gif to animate
	this.fadeout_rate = 20; //bomb fade away speed
	this.expand_rate = 10; //bomb detonate speed
    
    //added gif image as explosion effect
//    var explosiongif = loadGif("res/images/explosiongif.gif");
    
	this.show = function() {
		noStroke();
//        fill(211, 8, 93, this.transparency);
//		ellipse(this.x, this.y, this.r, this.r);
        
        //draw the explosion image
        image(explosionGif, this.x-85, this.y-90, 170, 170);

	}

	this.fadeout = function() {
		if (this.transparency > 0) {
			this.transparency -= this.fadeout_rate;
		}
		if (this.transparency <= 0) {
			this.r = 0;
		}
	}

	this.expand = function() {
		if (this.r <= this.explosion_radius)
			this.r += this.expand_rate;
	}

	this.hits = function(enemy) {
		var d = dist(this.x, this.y, enemy.x, enemy.y);
		if (d*2 < this.r + enemy.r ) {
			return true;
		} return false;
	}
}
