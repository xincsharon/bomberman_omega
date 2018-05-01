function Enemy(enemyImg,life_allocated,size) {    
	var xPos = window.innerWidth-50;
	var yPos = window.innerHeight-50;
	
	console.log(xPos);
	console.log(yPos);
	
	var arrayPosx = [];
	var arrayPosy = [];
	var i = 0;
	
	for(i = 0; i < window.innerWidth; i++){
		if((xPos > bomber.x - 10) || (xPos < bomber.x + 10)){
			arrayPosx[i] = xPos;
			xPos--;
		} else {
			arrayPosx[i] = 200;
			xPos--;
		}
	}
	
	for(i = 0; i < window.innerHeight; i++){
		if((yPos > bomber.y - 10) || (xPos < bomber.y + 10)){
			arrayPosy[i] = yPos;
			yPos--;
		} else {
			arrayPosy[i] = 200;
			yPos--;
		}
	}
	
	console.log(arrayPosx);
	console.log(arrayPosy);
	
	var a = Math.floor(Math.random(arrayPosx) * (width - 100));
	var b = Math.floor(Math.random(arrayPosy) * (height - 100));

	console.log(a);
	console.log(b);
	
	this.x = arrayPosx[a];
	this.y = arrayPosy[b];
	
	/*this.x = Math.floor(Math.random() * width);
	this.y = Math.floor(Math.random() * height);*/
	this.r = size;
	this.angle = 0;
	this.speed = 2;
	this.range = 200; //detect range
    this.life = life_allocated;
    this.afterHit = false;
    this.makeStop = false;

	this.show = function() {
		noStroke();
        if(size == 40){
            image(enemyImg, this.x-40, this.y-40, this.r*2, this.r*2);
        }else if(size == 65){
            image(enemyImg, this.x-60, this.y-60, this.r*2, this.r*2);
        }
        
        if(makeStop){
            image(timeStopEffect,this.x-12, this.y-55, 25, 25);
        }
//		fill('#DF744A');
//		ellipse(this.x, this.y, this.r, this.r);
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
		
        if(!pause){
            //let the enemy move and chase after bomber 
            this.x += this.range >= hyp ? dirx : randomBetween(-2, 3);
            this.y += this.range >= hyp ? diry : randomBetween(-2, 3);
        }
        
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
    
    this.lostLife = function(){
        this.life = this.life - 1;    
    }
}