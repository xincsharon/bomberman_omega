var bomber;
var bomber2;
var inVulnerable = false;
var inVulnerable2 = false;
var makeSlow =  false;
var makeSlow2 =  false;
var makeSpeed = false;
var makeSpeed2 = false;
var makeStop = false;
var bomb;
var bomb2;
var bomb_flag = false;
var bomb_flag2 = false;
var detonated = false;
var detonated2 = false;
var has_exploded = false;
var has_exploded2 = false;
var gone = false;
var gone2 = false;
var explosion;
var explosion2;

var freeze;
var freezeEffect;
var freezeImg;
var freezeTraps = [];

var spikeTrap;
var spikeEffect;
var spikeTrapImg;
var spikeTraps = [];

var pickUp;
var powerUps;
var powImg;
var pUpExist = true;

var speedUp;
var speedUpImg;
var speedExist = true;

var timeStop;
var timeStopImg;
var timestop_effect;
var timeStopExist = true;
var timeStopEffect;

var enemies = [];
var enemy_count = 2;
var enemy2_count = 0;
var tmp_count = 4;
var enemy_add = 2;
var gameover = false;
var winner1 = 1;
var winner2 = 2;


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
var bombImg, bombImg2, shieldImg, freezeEffectImg, bombermanImg, bomberman2Img;;

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
var numImg = 8;



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
	explosion2Gif = loadGif("res/images/explosiongif.gif");
    
 //load add life powerup image
    powImg = loadImage("res/images/heartImg.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load speed up power up
    speedUpImg = loadImage("res/images/speed.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load spike trap image
    spikeTrapImg = loadImage("res/images/spike_trap.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load Freeze trap image
    freezeImg = loadImage("res/images/freeze2.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load time trap image
    timeStopImg = loadImage("res/images/stoptime.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load bomb image
    bombImg = loadImage("res/images/TNT-256.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load shield image
    shieldImg = loadImage("res/images/shield_bubble.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load freeze effect image
    freezeEffectImg = loadImage("res/images/freezeEffect.png", imgLoaded(), ifImgLoadError(), duringloading());
    //load time stop effect image
    timeStopEffect = loadImage("res/images/stun.png", imgLoaded(), ifImgLoadError(), duringloading());
    //setup bomberman image    
    //receive and change the selected bomber model
    
//    if (sessionStorage.getItem("selectedBomber") == 'soldier') {
//        bombermanImg = loadImage("res/images/bomberman3.png", imgLoaded(), ifImgLoadError(), duringloading());
//    } else if (sessionStorage.getItem("selectedBomber") == 'ninja') {
//        bombermanImg = loadImage("res/images/bomberman2.png", imgLoaded(), ifImgLoadError(), duringloading());
//    } else {
//        bombermanImg = loadImage("res/images/bomberman.png", imgLoaded(), ifImgLoadError(), duringloading());
//    }
    
//    if(sessionStorage.getItem("bombermod") == 3){
//        bomberman2Img = loadImage("res/images/bomberman3.png", imgLoaded(), ifImgLoadError(), duringloading());
//    }else if (sessionStorage.getItem("bombermod") == 2){
//        bomberman2Img = loadImage("res/images/bomberman2.png", imgLoaded(), ifImgLoadError(), duringloading());
//    }else{
//        bomberman2Img = loadImage("res/images/bomberman.png", imgLoaded(), ifImgLoadError(), duringloading());
//    }
    bombermanImg = loadImage("res/images/bomberman.png", imgLoaded(), ifImgLoadError(), duringloading());
    bomberman2Img = loadImage("res/images/bomberman2.png", imgLoaded(), ifImgLoadError(), duringloading());
       //loading screen background
    loading_screen = loadImage("res/images/bomberman_bg.png");

    //create add life power up
    powerUps = new powerUp(powImg, 20);
    //create speedUp power up
    speedUp = new powerUp(speedUpImg, 25);
    //create timeStop power up
    timeStop = new powerUp(timeStopImg, 30);
    
    //load background music
    var sound = loadSound("res/music/bomberman.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for forcefield when player lose one life
    forceFieldOn = loadSound("res/music/force_field_on.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for pick up power up
    pickUp = loadSound("res/music/pickup.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for freeze trap
    freezeEffect = loadSound("res/music/freezeEffect.mp3", SELoading(), ifSELoadError(), duringloading());
    //load sound effect for spike trap
    spikeEffect = loadSound("res/music/spiketrap_effect.mp3", SELoading(), ifSELoadError(), duringloading());
    // load sound effect for time stop
    timestop_effect = loadSound("res/music/timestop_effect.mp3", SELoading(), ifSELoadError(), duringloading());

    
   
    
    //add all the sound effect into the array for checking purpose in draw() function
    SE.push(sound);
    SE.push(forceFieldOn);
    SE.push(pickUp);
    SE.push(freezeEffect);
    
    //add all the gif into the array for checking purpose in draw() function
    gif.push(enemyGif);
    gif.push(enemy2Gif);
    gif.push(explosionGif);
	gif.push(explosion2Gif);

    
	//sound.play();
	//sound.pause();
    
    //initialise a new bomber and pass the image needed into it
    bomber = new Bomber1();
    bomber2 = new Bomber2();
	init_enemies(enemy_count, enemy2_count, level, enemyGif, enemy2Gif);
    init_freezeTrap(freezeImg);
    init_spikeTrap(spikeTrapImg);
	initClouds();
}

//Initialize an array to store spike traps
function init_spikeTrap(spikeTrapImg) {
    var spikeTrap = new trap(spikeTrapImg, 80);
    spikeTraps.push(spikeTrap);
}

//Intialize an array to store freeze traps
function init_freezeTrap(freezeImg) {
    var freeze = new trap(freezeImg, 30);
    freezeTraps.push(freeze);
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

        text("Player 1 Life Remaining: ", 50, 120);
        text(bomber.life, 350, 120);
		
		text("Player 2 Life Remaining: ", 50, 150);
        text(bomber2.life, 350, 150);

//        text("Player 1 Score: ", 50, 180);
//        text(bomber.score, 275, 180);
//        
//        
//        text("Player 2 Score: ", 50, 210);
//        text(bomber2.score, 275, 210);


        if (!bomber.moves && !bomber2.moves) {
            fill(255)
            textSize(25);
            text("Kill an enemy to increase your life", width/2 - 190, height/2 + 220);
            text("Player 1: W A S D To Move, SPACE Q to plant, E to detonate", width/2 - 280, height/2 + 260);
            text("Player 2: I J K L To Move, SPACE U to plant, O to detonate", width/2 - 280, height/2 + 300);
        }

        if (bomber.life <= 0) {
            gameover = true;
            window.location.href = "gameover1.html";
        }
        else if (bomber2.life <= 0) {
            gameover = true;
            window.location.href = "gameover2.html";
        }
        else {		
            handleControls();

            //Loop freeze trap array to display traps.
            //Freeze traps only spawn starting from Lv3.
            //If freeze trap hits bomber, decrease bomber movement from 7 to 1 for 1.5 seconds.
            for (var i = 0; i < freezeTraps.length; i++) {
                if (level >= 3) {
                    freezeTraps[i].show();

                    if (freezeTraps[i].hits(bomber) && !makeSlow && !inVulnerable) {
                        makeSlow = true;
                        freezeEffect.play();
                        bomber.speed = 1;
                        setTimeout(resetBomberSpeed, 1500);
                        freezeTraps.splice(i, 1);
                    }
                }
            }

            //Time stop power up(s) only spawn starting from Lv5
            //Decrease enemy detection range to 0 for 7 seconds.
            if (level >= 5) {
                if (timeStopExist) {
                    timeStop.show();
                }

                if (timeStop.hits(bomber)) {
                    timestop_effect.play();
                    stopEnemyMovement();
                    setTimeout(resetEnemyMovement, 7000);
                    timeStop.gone();
                    timeStopExist = false;
                }
            }
            
            //Loop spike trap array to display traps.
            //Spike traps only spawn starting from Lv8.
            //If spike trap hits bomber, deduct a life and make bomber invunerable for 2 seconds.
            for (var i = 0; i < spikeTraps.length; i++) {
                if (level >= 8) {
                    spikeTraps[i].show();

                    if (spikeTraps[i].hits(bomber) && !inVulnerable) {
                        spikeEffect.play();
                        inVulnerable = true;
                        setTimeout(makeVulnerable, 2000);
                        bomber.life -= 1;
                        spikeTraps.splice(i, 1);
                    }
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
            
                if(speedUp.hits(bomber2) && !inVulnerable2 && !makeSlow2){
                    makeSpeed2 = true;
                    pickUp.play();
                    bomber2.speed = 10;
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
            
                if (powerUps.hits(bomber2)){ 
                    pickUp.play();
                    bomber2.life+=1;
                    powerUps.gone();
                    pUpExist = false;
                }

            for (var i = 0; i < enemies.length; i++) {
                enemies[i].show();

                //enemy detect if bomberman move
                if (bomber.moves || bomber2.moves) {
                    //more enemies will chase after bomberman if he's in the range
                    enemies[i].move(bomber);
                    enemies[i].move(bomber2);
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
                
                 if (enemies[i].hits(bomber2) && !inVulnerable2) {
                    //after damaging bomberman, he will turn into inVulnerable
                    inVulnerable2 = true;
                    //force field will be up, this is to indicate player force field is up and player loses one live
                    forceFieldOn.play();
                    //bomberman is inVulnerable for 2seconds
                    setTimeout(makeVulnerable2, 2000);
                    //bomber.r += 20;  //increase the size of bomber radius
                    bomber2.life--; //decrease the number of life 
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
                
//                if (detonated && explosion.hits(bomber2) && !inVulnerable) {
//                    inVulnerable = true;
//                    //force field will be up, this is to indicate player force field is up and player loses one live
//                    forceFieldOn.play();
//                    setTimeout(makeVulnerable, 5000);
//                    //bomber.r += 20; //increase bomber size
//                    bomber2.life--;
//                }
                

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
//                            bomber.score += 50;
                            bomber.life++;


                            //If enemy is wiped out, then will calculate the next round of enemies
                            if (enemies.length < 1) {
                                enemy_count = tmp_count;
                                tmp_count += enemy_add;

                                //Starts increment if level is more than 2 for new enemy
                                if (level >= 2) {
                                    enemy2_count++;
                                }

                                bomber.moves = false;

                                //Check if life power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!pUpExist) {
                                    powerUps.respawn();
                                    pUpExist = true;
                                }else {
                                    powerUps.respawn();
                                }
                                
                                //Check if speed up power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!speedExist) {
                                    speedUp.respawn();
                                    speedExist = true;
                                }else {
                                    speedUp.respawn();
                                }
                                
                                //Check if time stop power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!timeStopExist) {
                                    timeStop.respawn();
                                    timeStopExist = true;
                                }else {
                                    timeStop.respawn();
                                }
                                
                                //Check array for freeze traps, if still contain trap, add another trap next round.
                                //Re-intialize freeze trap array if contain no trap from previous round.
                                if (level >= 3) {
                                    if (freezeTraps.length < 1) {
                                        init_freezeTrap(freezeImg, 30);
                                    } else {
                                        var freeze = new trap(freezeImg, 30);
                                        freezeTraps.push(freeze);
                                    }
                                }

                                //Check array for spike traps, if still contain trap, add another trap next round.
                                //Re-intialize spike trap array if contain no trap from previous round.
                                if (level >= 8) {
                                    if (spikeTraps.length < 1) {
                                        init_spikeTrap(spikeTrapImg, 80);
                                    } else {
                                        var spikeTrap = new trap(spikeTrapImg, 80);
                                        spikeTraps.push(spikeTrap);
                                    }
                                }
                                
                                setTimeout(init_enemies(enemy_count, enemy2_count, level, enemyGif, enemy2Gif), 3000);
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
            
            
        //bomb flag for bomber2
         if (bomb_flag2) {
                bomb2.show();

                if (detonated2 && explosion2.hits(bomber2) && !inVulnerable2) {
                    inVulnerable2 = true;
                    //force field will be up, this is to indicate player force field is up and player loses one live
                    forceFieldOn.play();
                    setTimeout(makeVulnerable2, 5000);
                    //bomber.r += 20; //increase bomber size
                    bomber2.life--;
                }
                
//                if (detonated && explosion.hits(bomber2) && !inVulnerable) {
//                    inVulnerable = true;
//                    //force field will be up, this is to indicate player force field is up and player loses one live
//                    forceFieldOn.play();
//                    setTimeout(makeVulnerable, 5000);
//                    //bomber.r += 20; //increase bomber size
//                    bomber2.life--;
//                }
                

                if (detonated2 && !has_exploded2) {
                    for (var i = 0; i < enemies.length; i++) {
                        if (explosion2.hits(enemies[i])){
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
//                            bomber2.score += 50;
                            bomber2.life++;


                            //If enemy is wiped out, then will calculate the next round of enemies
                            if (enemies.length < 1) {
                                enemy_count = tmp_count;
                                tmp_count += enemy_add;

                                //Starts increment if level is more than 2 for new enemy
                                if (level >= 2) {
                                    enemy2_count++;
                                }

                                bomber.moves = false;

                                //Check if life power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!pUpExist) {
                                    powerUps.respawn();
                                    pUpExist = true;
                                }else {
                                    powerUps.respawn();
                                }
                                
                                //Check if speed up power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!speedExist) {
                                    speedUp.respawn();
                                    speedExist = true;
                                }else {
                                    speedUp.respawn();
                                }
                                
                                //Check if time stop power up exist, if TRUE respawn new, else respawn at random location next round.
                                if (!timeStopExist) {
                                    timeStop.respawn();
                                    timeStopExist = true;
                                }else {
                                    timeStop.respawn();
                                }
                                
                                //Check array for freeze traps, if still contain trap, add another trap next round.
                                //Re-intialize freeze trap array if contain no trap from previous round.
                                if (level >= 3) {
                                    if (freezeTraps.length < 1) {
                                        init_freezeTrap(freezeImg, 30);
                                    } else {
                                        var freeze = new trap(freezeImg, 30);
                                        freezeTraps.push(freeze);
                                    }
                                }

                                //Check array for spike traps, if still contain trap, add another trap next round.
                                //Re-intialize spike trap array if contain no trap from previous round.
                                if (level >= 8) {
                                    if (spikeTraps.length < 1) {
                                        init_spikeTrap(spikeTrapImg, 80);
                                    } else {
                                        var spikeTrap = new trap(spikeTrapImg, 80);
                                        spikeTraps.push(spikeTrap);
                                    }
                                }
                                
                                setTimeout(init_enemies(enemy_count, enemy2_count, level, enemyGif, enemy2Gif), 3000);
                                level++;

                                for (var j = 0; j < enemies.length; j++) {
                                    enemies[j].range += 30; //after each lv, enemy detection range increase 
                                    enemies[j].speed += 0.5; //new add on, for enemy speed increase every level.
                                }
                            }		
                        }
                    }

                    //detonate the bomb 
                    bomb2.explode();
                    explosion2.show();
                    explosion2.expand();
                    //check if bomb exploded 
                    if (explosion2.r >= explosion2.explosion_radius) {
                        has_exploded2 = true;
                        gone2 = false;
                    }
                }

                //after bomb have detonated, and check if the bomb have already fade
                if (has_exploded2 && !gone2){
                    explosion2.show();
                    explosion2.fadeout();
                    if (explosion2.transparency <= 0 && explosion2.r <= 0) {
                        gone2 = true;
                        detonated2 = false;
                        has_exploded2 = false;
                        bomb_flag2 = false;
                    }
                }

            }

            bomber.show();	
            bomber2.show();

            //this function is for submitting mist to cloud
            for (var c of mist) {
                c.show();
                c.move(level * .5);
            }
        }
    }
}

function toggleKey(keyCode, isPressed){


	if (keyCode == 76 || keyCode == 74 || keyCode == 73 || keyCode == 75|| keyCode == 85|| keyCode == 79||
		keyCode == 68 || keyCode == 65 || keyCode == 87 || keyCode == 83 || keyCode == 81 || keyCode == 69)
		bomber.moves = true;

    if (keyCode == 68) {
		controller.d = isPressed;
	}
	if (keyCode == 65) {
		controller.a = isPressed;
	}
	if (keyCode == 87) {
	   controller.w = isPressed;
	} 
	if (keyCode == 83) {
		controller.s = isPressed;
	}
    
	if (keyCode == 76) {
		controller.l = isPressed;
	}
	if (keyCode == 74) {
		controller.j = isPressed;
	}
	if (keyCode == 73) {
		controller.i = isPressed;
	} 
	if (keyCode == 75) {
		controller.k = isPressed;
	}
   
	if ((keyCode == 81) && !bomb_flag){
		bomb_flag = true;
		bomb = bomber.plant();
        
        for(var i=0; i<enemies.length ; i++){
            enemies[i].afterHit = false;
        }
	} 
    
    if ((keyCode == 85) && !bomb_flag2){
		bomb_flag2 = true;
		bomb2 = bomber2.plant();
        
        for(var i=0; i<enemies.length ; i++){
            enemies[i].afterHit = false;
        }
	} 
    
    
	if ((keyCode == 69) && (!detonated && bomb_flag)){
		console.log("explodes!");
		// console.log(explode);
		// sound.play();
		var explode = new Audio("res/music/explode.mp3"); //exploding sound
	   explode.play(); //play the sound 
	
		detonated = true;
		explosion = new Explosion(bomb.x, bomb.y);			
	}
    
    if ((keyCode == 79) && (!detonated2 && bomb_flag2)){
		console.log("explodes2!");
		// console.log(explode);
		// sound.play();
		var explode = new Audio("res/music/explode.mp3"); //exploding sound
	   explode.play(); //play the sound 
	
		detonated2 = true;
		explosion2 = new Explosion2(bomb2.x, bomb2.y);			
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

    
    //control bomber to move left right up down
    
	if (controller.w) {
		bomber.y -= bomber.speed;
	} if (controller.s) {
		bomber.y += bomber.speed;
	} if (controller.d){
        bomber.x += bomber.speed;  
	} if (controller.a) {
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
    
    //control the bomber2 to move left right up down
    
	if (controller.i) {
		bomber2.y -= bomber2.speed;
	} if (controller.k) {
		bomber2.y += bomber2.speed;
	} if (controller.l){
        bomber2.x += bomber2.speed;  
	} if (controller.j) {
		bomber2.x -= bomber2.speed;        
	} 
	if (bomber2.x - bomber2.r < 0) {
		bomber2.x = bomber2.r;
	}
	if (bomber2.x + bomber2.r > width) {
		bomber2.x = width - bomber2.r;
	}
	if (bomber2.y - bomber2.r < 0) {
		bomber2.y = bomber2.r;
	}
	if (bomber2.y + bomber2.r > height) {
		bomber2.y = height - bomber2.r;
	}
    
 
    
//    if(bomber.x == width/2){
//        bomber.x += 0;
//    }
}

function makeVulnerable(){
	inVulnerable = false;
}

function makeVulnerable2(){
	inVulnerable2 = false;
}

function resetBomberSpeed(){
    makeSlow = false;
    bomber.speed = 7;
}

function resetBomber2Speed(){
    makeSlow2 = false;
    bomber2.speed = 7;
}

function resetBomberSpeedBack(){
    makeSpeed = false;
    bomber.speed = 7;
}

function resetBomber2SpeedBack(){
    makeSpeed2 = false;
    bomber2.speed = 7;
}

function stopEnemyMovement() {
    for (var i = 0; i < enemies.length; i++) {
        makeStop = true;
        enemies[i].range = 0;
    }
}


function resetEnemyMovement() {
    
    for (var i = 0; i < enemies.length; i++) {
        makeStop = false;
        enemies[i].range = 200;
    }
}

function removePower() {
    powerUps.gone();
}

function addPower() {
    powerUps.show();
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
	bomber = new Bomber1();
    bomber2 = new Bomber2();
	level = 1;
	inVulnerable = false;
    inVulnerable2 = false;
	bomb;
    bomb2;
	bomb_flag = false;
    bomb_flag2 = false;
	detonated = false;
    detonated2 = false;
	has_exploded = false;
    has_exploded2 = false;
	gone = false;
    gone2 = false;
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