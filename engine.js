var bomber;
var inVulnerable = false;

var bomb;
var bomb_flag = false;
var detonated = false;
var has_exploded = false;
var gone = false;
var explosion;

var enemies = [];
var enemy_count = 5;
var tmp_count = 7;
var enemy_add = 2;
var gameover = false;

var controller = new Object();
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var UP_KEY = 38;
var C_KEY = 67;
var SPACE = 32;
var ENTER = 13;	

var cloud_count = 100;
var mist = [];

var level = 1;
var wall;


function setup() {
    
	var myCanvas=createCanvas(window.innerWidth, window.innerHeight);
	bomber = new Bomber();
    wall=new Wall(level);
	var sound = new Audio("res/music/bomberman.mp3");
	//sound.play();
	//sound.pause();

	init_enemies(enemy_count);
	initClouds();
}

function init_enemies(e) {
	for(var i = 0; i < e; i++) {
		var enemy = new Enemy();
		enemies.push(enemy);
        
	}
}

function draw() {

	background(13, 16, 17);

	textSize(40);
	textFont("Impact");
	fill('#BFD8D2');
	/*text("Bomberman Omega", 30, 60);

	textSize(30);
	textFont("Impact");
	fill('#FEDCD2');
	text("by alfisalvacion", 50, 90);*/

	textSize(40);
	text("Level ", 50, 60);
	text(level, 155, 60);
	// fill(93, 255, 0);
	fill(255)
	textSize(30);
	text("Enemies Left: ", 50, 90);
	text(enemies.length, 225, 90);
	
	text("Life Remaining: ", 50, 120);
	text(bomber.life, 250, 120);
    
    text("Score: ", 50, 150);
    text(bomber.score, 150, 150);


	if (!bomber.moves) {
		fill(255)
		textSize(25);
		text("Kill all the enemies using your bomb", width/2 - 190, height/2 + 300);
		text("SPACE/J to plant, C/K to detonate", width/2 - 170, height/2 + 330);
		text("Use Arrow Keys or W, A, S, D to move", width/2 - 185, height/2 + 360);
	}

	if (bomber.life <= 0) {
		gameover = true;
		textSize(200);
		textFont("Impact");
		fill(211, 8, 93);
		text("GAME OVER", width/5, height/2);

		textSize(85);
		// textFont("Impact");
		fill('#FEDCD2');
		text("You reached Level ", width/4 + 30, height/2 + 100);	
		text(level, width/2 + 250, height/2 + 100);	
		textSize(70);
		// textFont("Impact");
		fill('#DCB239');
		text("Press ENTER to play again", width/5 + 100, height/2 + 170);		
	}

	else {		
		handleControls();

		for (var i = 0; i < enemies.length; i++) {
			enemies[i].show();
			
			//enemy detect if bomberman move
			if (bomber.moves) {
				//more enemies will chase after bomberman if he's in the range
				enemies[i].move(bomber);		
			}
			
			//detect if enemy hit bomberman and detect if bomberman is still in inVulnerable state
			if (enemies[i].hits(bomber) && !inVulnerable) {
				//after damaging bomberman, he will turn into inVulnerable
				inVulnerable = true;
				//bomberman is inVulnerable for 2seconds
				setTimeout(makeVulnerable, 2000);
				//bomber.r += 20;  //increase the size of bomber radius
				bomber.life--; //decrease the number of life 
			}
		}

		if (bomb_flag) {
			bomb.show();

			if (detonated && explosion.hits(bomber) && !inVulnerable) {
				inVulnerable = true;
				setTimeout(makeVulnerable, 5000);
				//bomber.r += 20; //increase bomber size
				bomber.life--;
			}

			if (detonated && !has_exploded) {
				for (var i = 0; i < enemies.length; i++) {
					if (explosion.hits(enemies[i])){
						console.log("hit!");
						enemies.splice(i, 1); //destroy enemy (i is number of enemy. 1 is set to destroy particular enemy, if set to 0 then no enemy will be destroy)
                        bomber.score+=50;
						
						//if enemy is wipe out, then will calculate the next round of enemies
						if (enemies.length < 1) {
							enemy_count = tmp_count;
							tmp_count += enemy_add;
							bomber.moves = false;

							setTimeout(init_enemies(enemy_count), 3000);
							// init_enemies(enemy_count);
							level++;
							for (var j = 0; j < enemies.length; j++) {
								enemies[j].range += 30; //after each lv, enemy detection range increase 
								enemies[j].speed += 0.5; //new add on, for enemy speed increase every level.
							}
						}
					}
				}
				
				//detonate the bomb 
				bomb.explode();
				explosion.show();
				explosion.expand();
				//check if bomb exploded 
				if (explosion.r >= explosion.explosion_radius) {
					has_exploded = true;
					gone = false;
				}
			}
			
			//after bomb have detonated, and check if the bomb have already fade
			if (has_exploded && !gone){
				explosion.show();
				explosion.fadeout();
				if (explosion.transparency <= 0 && explosion.r <= 0) {
					gone = true;
					detonated = false;
					has_exploded = false;
					bomb_flag = false;
				}
			}
			
		}
		
		bomber.show();	
	
		//this function is for submitting mist to cloud
		for (var c of mist) {
			c.show();
			c.move(level * .5);
		}
		
		// call the wall function. 
        //wall.show();
	}
}

function toggleKey(keyCode, isPressed){


	if (keyCode == RIGHT_KEY || keyCode == LEFT_KEY || keyCode == UP_KEY || keyCode == DOWN_KEY || 
		keyCode == 68 || keyCode == 65 || keyCode == 87 || keyCode == 83)
		bomber.moves = true;

	if (keyCode == RIGHT_KEY || keyCode == 68) {
		controller.right = isPressed;
	}
	if (keyCode == LEFT_KEY || keyCode == 65) {
		controller.left = isPressed;
	}
	if (keyCode == UP_KEY || keyCode == 87) {
		controller.up = isPressed;
	} 
	if (keyCode == DOWN_KEY || keyCode == 83) {
		controller.down = isPressed;
	}
	if ((keyCode == SPACE || keyCode == 74) && !bomb_flag){
		bomb_flag = true;
		bomb = bomber.plant();
	} 
	if ((keyCode == C_KEY || keyCode == 75) && (!detonated && bomb_flag)){
		console.log("explodes!");
		// console.log(explode);
		// sound.play();
		var explode = new Audio("res/music/explode.mp3"); //exploding sound
	explode.play(); //play the sound 
	
		detonated = true;
		explosion = new Explosion(bomb.x, bomb.y);			
	}
	console.log(keyCode);
	if (keyCode == ENTER && gameover){
		gameover = false;
		reset();
		draw();
	}
}



function handleControls(){
     
    //detect when the bomber touch the wall
    /*var touchright = false;
    var touchleft = false;
    
    if ((((bomber.x <= wall.x1) || (bomber.x >= (wall.x1+5))) && (bomber.y >= wall.y1) || (bomber.y <= wall.y1 +5) || (bomber.y >= (wall.y1*2))) && (((bomber.x <= wall.x2) || (bomber.x >= (wall.x2+10)))&& (bomber.y >= wall.y1) || (bomber.y <= wall.y2 +5) || (bomber.y >= (wall.y2*2)))){
        this.touchright = false;
        }
        else{
		this.touchright = true;
        }
    
    
    if  ((((bomber.x > wall.x1+5) || (bomber.x < wall.x1)) && (bomber.y >= wall.y1) || (bomber.y <= wall.y1 +5) || (bomber.y >= (wall.y1*2))) && (((bomber.x <= wall.x2) || (bomber.x >= (wall.x2+10)))&& (bomber.y >= wall.y1) || (bomber.y <= wall.y2 +5) || (bomber.y >= (wall.y2*2)))){
        this.touchleft = false;
        }
        else{
		this.touchleft = true;
        }*/

    
    //control the bomber to move left right up down
    
	if (controller.up) {
		bomber.y -= bomber.speed;
	} if (controller.down) {
		bomber.y += bomber.speed;
	} if (controller.right){
        bomber.x += bomber.speed;  
	} if (controller.left) {
		bomber.x -= bomber.speed;        
	} 
	if (bomber.x - bomber.r < 0) {
		bomber.x = bomber.r;
	}
	if (bomber.x + bomber.r > width) {
		bomber.x = width - bomber.r;
	}
	if (bomber.y - bomber.r < 0) {
		bomber.y = bomber.r;
	}
	if (bomber.y + bomber.r > height) {
		bomber.y = height - bomber.r;
	}
    
//    if(bomber.x == width/2){
//        bomber.x += 0;
//    }
}

function makeVulnerable(){
	inVulnerable = false;
}

document.onkeydown = function(evt){
	toggleKey(evt.keyCode, true);
};

document.onkeyup = function(evt){
	toggleKey(evt.keyCode, false);
};

function randomBetween(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

//reset the game after player press "ENTER"
function reset(){
	bomber = new Bomber();
	level = 1;
	inVulnerable = false;
	bomb;
	bomb_flag = false;
	detonated = false;
	has_exploded = false;
	gone = false;
	enemy_count = 5;
	tmp_count = 7;
	// console.log(enemy_count);
	// alert(enemy_count);
	enemies = [];
	init_enemies (enemy_count);
}

function initClouds(){
	for (var i = 0; i <  cloud_count; i++) {
		var cloud = new Cloud();
		mist.push(cloud);
	}
}