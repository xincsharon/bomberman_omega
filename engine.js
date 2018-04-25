var bomber;
var inVulnerable = false;
var makeSlow =  false;
var makeSpeed = false;
var bomb;
var bomb_flag = false;
var detonated = false;
var has_exploded = false;
var gone = false;
var explosion;

var pickUp;
var powerUps;
var freeze;
var freezeEffect;
var pUpExist = true;
var freezeExist = true;
var speedUp;
var speedExist = true;

var enemies = [];
var enemy_count = 2;
var enemy2_count = 0;
var tmp_count = 4;
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
var forceFieldOn;


var angle = 0;
var angle2 = 0;
var angle3 = 0;
var SE = [];
var gif = [];
var explosionGif;
var enemyGif;
var enemy2Gif;
var bombImg, shieldImg, freezeEffectImg, bombermanImg;;

var loading = true;
var imgLoading = true;
var gifLoading = true;
var imgLoading = true;

var soundCount = 0;
var tempSoundCount = 0;
var gifCount = 0;
var tempGifCount = 0;
var imgCount = 0;
var tempImgCount = 0;
var numImg = 7;



function imgLoaded(){
    imgCount ++;
    if(imgCount == numImg){
        imgLoading = false;
    }
}
function gifLoading() {
    console.log("The gif starts loading.");
}

function SELoading() {
    console.log("The soudn effect start loading.");
}

function ifSELoadError() {
    console.log("There's an error, song is not loaded");
}

function ifImgLoadError() {
    console.log("There's an error, image is not loaded");
}

function ifGifLoadError() {
    console.log("There's an error, gif is not loaded");
}
function duringloading() {
    console.log("The file is still loading.");
}
function setup() {
    
	var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
	
    
    //load 2 types of enemy's gif image
    enemyGif = loadGif("res/images/monster2.gif");
    enemy2Gif = loadGif("res/images/monster.gif");
    //load explosion gif
    explosionGif = loadGif("res/images/explosiongif.gif");
    
    //load add life powerup image
    var powImg = loadImage("res/images/heartImg.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load Freeze power up
    var freezeImg = loadImage("res/images/freeze2.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load speed up power up
    var speedUpImg = loadImage("res/images/speed.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load bomb image
    bombImg = loadImage("res/images/TNT-256.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load shield image
    shieldImg= loadImage("res/images/shield_bubble.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load freeze effect image
    freezeEffectImg = loadImage("res/images/freezeEffect.png", imgLoaded(), ifImgLoadError(), duringloading());
    //setup bomberman image    
    //receive and change the selected bomber model
    if(sessionStorage.getItem("selectedBomber") == 'soldier'){
        bombermanImg = loadImage("res/images/bomberman3.png", imgLoaded(), ifImgLoadError(), duringloading());
    }else if (sessionStorage.getItem("selectedBomber") == 'ninja'){
        bombermanImg = loadImage("res/images/bomberman2.png", imgLoaded(), ifImgLoadError(), duringloading());
    }else{
        bombermanImg = loadImage("res/images/bomberman.png", imgLoaded(), ifImgLoadError(), duringloading());
    }
    //loading screen background
    loading_screen = loadImage("res/images/bomberman_bg.png");
    
    
    
    //create add life power up
    powerUps = new powerUp(powImg, 20);
    //create freeze power up
    freeze = new powerUp(freezeImg, 30);
    //create speedUp power up
    speedUp = new powerUp(speedUpImg,25);
    
    
    
    //load background music
	var sound = loadSound("res/music/bomberman.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for forcefield when player lose one life
    forceFieldOn = loadSound("res/music/force_field_on.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for pick up power up
    pickUp = loadSound("res/music/pickup.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for freeze trap
    freezeEffect = loadSound("res/music/freezeEffect.mp3", SELoading(), ifSELoadError(), duringloading());
    
    
   
    
    //add all the sound effect into the array for checking purpose in draw() function
    SE.push(sound);
    SE.push(forceFieldOn);
    SE.push(pickUp);
    SE.push(freezeEffect);
    
    //add all the gif into the array for checking purpose in draw() function
    gif.push(enemyGif);
    gif.push(enemy2Gif);
    gif.push(explosionGif);

    
	//sound.play();
	//sound.pause();
    
    //initialise a new bomber and pass the image needed into it
    bomber = new Bomber();
	init_enemies(enemy_count, enemy2_count, level, enemyGif, enemy2Gif);
	initClouds();


}

function init_enemies(e, e2, current_level, eGif, e2Gif) {
	for (var i = 0; i < e; i++) {
		var enemy = new Enemy(eGif,1,40);
		enemies.push(enemy); 
	}
    
    
    if(current_level >= 2){
        for(var i = 0; i < e2; i++) {
		  var enemy = new Enemy(e2Gif,3,65);
		  enemies.push(enemy); 
	   }
    }
}


function draw() {
    console.log("The following console log is from Draw():");
    console.log("Loading: "+ loading);
	console.log("shield SE loaded:"+forceFieldOn.isLoaded());
    console.log("pickup SE loaded:"+pickUp.isLoaded());
//    console.log("sound SE loaded:"+sound.isLoaded());
    console.log("Number of sound loaded: " + soundCount);
    console.log("First gif is loaded:" + enemyGif.loaded());
    console.log("Second gif is loaded:" + enemy2Gif.loaded());
    console.log("Gifs loaded: "+ gifCount);
    console.log("Images loaded: "+imgCount);
    console.log("SE loaded: " + soundCount);
    
//    console.log(powImg);
//    console.log(speedUpImg);
//    console.log(freezeImg);
    console.log("In Draw() , the gif loaded count is : "+gifCount+" Status of gif loading: " + gifLoading);
    
    //check if the sound effects in the arrays are all loaded
    for(var i=0; i < SE.length; i++){
        if(SE[i].isLoaded()){
            tempSoundCount ++;
        }
    }
    soundCount = tempSoundCount;
    tempSoundCount = 0;
    
    if(soundCount == SE.length){
        SELoading = false;
    }
    
    //check if the gifs in the array are all loaded
    for(var i=0; i < gif.length; i++){
        if(gif[i].loaded()){
            tempGifCount ++;
        }
    }
    
    
    gifCount = tempGifCount;
    tempGifCount = 0;
    
    if(gifCount == gif.length){
        gifLoading = false;
    }
    

    
    //if sound efects, gifs and images are not loading, then stop loading by setting it as false
    if(! SELoading && !gifLoading && !imgLoading){
        loading = false;
    }
    

    
    if(loading){
        console.log("Loading screen on");
        background(loading_screen,0,0);
        
        textFont("Impact");
	   fill('#ffffff');
        textSize(50);
	   text("Loading... ", width/5 *2, height/2 - 150);

        
        stroke(255);
        noFill();
        rect(width/3, height/2 - 100, width/3, 20);

        noStroke();
        fill(255, 100);
        var w = (width/3) * ((soundCount + gifCount + imgCount) / (SE.length + gif.length + numImg));
        rect(width/3 , height/2 - 100, w, 20);
        
        stroke(255);
        noFill();
        ellipse(width/2, height * 2 /3, 250, 250);
          
        translate(width / 2, height * 2 / 3);
        rotate(angle3);
        strokeWeight(4);
        stroke(255);
        line(0,0,70,0);
        angle3 += 0.05;
        
        rotate(angle);
        strokeWeight(4);
        stroke(255);
        line(0,0,100,0);
        angle += 0.1;
        
        rotate(angle2);
        strokeWeight(2);
        stroke(255);
        line(0,0,100,0);
        angle2 += 0.3;
        
    }else{
    

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
            text("Kill all the enemies using your bomb", width/2 - 190, height/2 + 280);
            text("SPACE/J to plant, C/K to detonate", width/2 - 170, height/2 + 310);
            text("Use Arrow Keys or W, A, S, D to move", width/2 - 185, height/2 + 340);
        }

        if (bomber.life <= 0) {
            gameover = true;
            window.location.href = "gameover.html";
            sessionStorage.setItem("highscore",bomber.score);
//            textSize(200);
//            textFont("Impact");
//            fill(211, 8, 93);
//            text("GAME OVER", width/6 + 30, height/2);
//
//            textSize(85);
//            // textFont("Impact");
//            fill('#FEDCD2');
//            text("You reached Level ", width/4 + 10, height/2 + 90);	
//            text(level, width/2 + 270, height/2 + 90);	
//            textSize(70);
//            // textFont("Impact");
//            fill('#DCB239');
//            text("Press ENTER to play again", width/5 + 70, height/2 + 170);		
        }

        else {		
            handleControls();

                if(level >= 3){
                    // Spawns the trap and show in the game    
                    if(freezeExist){
                        freeze.show();
                    }

                    // Check if trap is activated and execute effect only when bomber is vunerable
                    if(freeze.hits(bomber) && !makeSlow && !inVulnerable){
                        makeSlow = true;
                        freezeEffect.play();
                        bomber.speed = 1;
                        setTimeout(resetBomberSpeed,1500);
                        freeze.gone();
                        freezeExist = false;
                    }


                }    

                //spawn the speed up in game 
                if(speedExist){
                    speedUp.show();
                }

                //increase bomber speed after they have hit the power up, then it will gone after 
                if(speedUp.hits(bomber) && !inVulnerable && !makeSlow){
                    makeSpeed = true;
                    pickUp.play();
                    bomber.speed = 10;
                    setTimeout(resetBomberSpeedBack, 5000);
                    speedUp.gone();
                    speedExist = false;
                }


                // spawns the power up and show in the game
                if (pUpExist){
                    powerUps.show();  
                }   

                // when the player hits the heart, bomber's life will increase by 1, while  at the same time the heart will be gone.
                if (powerUps.hits(bomber)){ 
                    pickUp.play();
                    bomber.life+=1;
                    powerUps.gone();
                    pUpExist = false;
                }

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
                    //force field will be up, this is to indicate player force field is up and player loses one live
                    forceFieldOn.play();
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
                    //force field will be up, this is to indicate player force field is up and player loses one live
                    forceFieldOn.play();
                    setTimeout(makeVulnerable, 5000);
                    //bomber.r += 20; //increase bomber size
                    bomber.life--;
                }

                if (detonated && !has_exploded) {
                    for (var i = 0; i < enemies.length; i++) {
                        if (explosion.hits(enemies[i])){
                            console.log("hit!");

                            //Make sure that it only run this function once that is to minus 1 life from current enemy
                            if(!enemies[i].afterHit){
                                enemies[i].lostLife();
                                enemies[i].afterHit = true;
                            }

                            //Check if life is less than 1, remove it from enemies array
                            if(enemies[i].life < 1){
                                enemies.splice(i,1);
                            }

                            //When hit, add 50 points
                            bomber.score += 50;


                            //If enemy is wiped out, then will calculate the next round of enemies
                            if (enemies.length < 1 ) {
                                enemy_count = tmp_count;
                                tmp_count += enemy_add;

                                //Starts increment if level is more than 2 for new enemy
                                if(level >= 2){
                                    enemy2_count++; 
                                }

                                bomber.moves = false;

                                // checks if there's any life power up from the previous level, if no then spawns a new one.
                                if (pUpExist == false){
                                    powerUps.respawn(); 
                                    pUpExist = true;
                                }

                                if(freezeExist == false){
                                    freeze.respawn();
                                    freezeExist = true;
                                }

                                if(speedExist == false){
                                    speedUp.respawn();
                                    speedExist = true;
                                }

                            setTimeout(init_enemies(enemy_count,enemy2_count,level, enemyGif, enemy2Gif), 3000);

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
        }
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
        
        for(var i=0; i<enemies.length ; i++){
            enemies[i].afterHit = false;
        }
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

function resetBomberSpeed(){
    makeSlow = false;
    bomber.speed = 7;
}

function resetBomberSpeedBack(){
    makeSpeed = false;
    bomber.speed = 7;
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
	enemy_count = 2;
    enemy2_count = 0;
	tmp_count = 4;
	// console.log(enemy_count);
	// alert(enemy_count);
	enemies = [];
	init_enemies(enemy_count, enemy2_count, level, enemyGif, enemy2Gif);
}

function initClouds(){
	for (var i = 0; i <  cloud_count; i++) {
		var cloud = new Cloud();
		mist.push(cloud);
	}
}
