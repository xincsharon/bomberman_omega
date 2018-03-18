function Enemy() {
	this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);
	this.r = 20;
	this.angle = 0;
	this.speed = 2;
	this.range = 200; //detect range

	this.show = function() {
		noStroke();
		fill('#DF744A');
		ellipse(this.x, this.y, this.r, this.r);
	}

	this.move = function(bomber) {
		var diffx = this.x - bomber.x;
		var diffy = this.y - bomber.y;

		var hyp = Math.sqrt(diffx*diffx + diffy*diffy);
		
		//make enemy be aggresive to chase after bomber, if this function is commented, enemy will run in horizontal and not get close to bomber
		this.angle = -1 * (Math.atan2(diffx, diffy) * (180 / Math.PI) + 90);
		
		//important function, without this function, game will crush 
		var dirx = (Math.cos(this.angle * (Math.PI/180))*this.speed);
		var diry = (Math.sin(this.angle * (Math.PI/180))*this.speed);
		
		//let the enemy move and chase after bomber 
		this.x += this.range >= hyp ? dirx : randomBetween(-2, 3);
		this.y += this.range >= hyp ? diry : randomBetween(-2, 3);

		if (this.x - this.r < 0) {
			this.x = this.r;
		}
		if (this.x + this.r > width) {
			this.x = width - this.r;
		}
		if (this.y - this.r < 0) {
			this.y = this.r;
		}
		if (this.y + this.r > height) {
			this.y = height - this.r;
		}
	}

	this.hits = function(enemy) {
		var d = dist(this.x, this.y, enemy.x, enemy.y);
		if (d*2 < this.r + enemy.r) {
			return true;
		} return false;
	}
}