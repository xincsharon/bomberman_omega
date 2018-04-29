
//Create a session to determine which model is selected &
//Toggle visibility of indication of selection
function selectedBomber(x,modelType){
    for(var i = 1; i <= 3; i++){
        document.getElementById("selected_" + i).style.visibility = "hidden";
    }
    document.getElementById(x).style.visibility = "visible";
    sessionStorage.setItem("selectedBomber",modelType);
}

//Redirect to main screen
//Clear everything is session
function backToMain(){
    window.location.href = "index.html";
    sessionStorage.clear();
}

//Redirect to game screen
//Clear highscore in session
function restartGame(){
    window.location.href = "game.html";
    sessionStorage.removeItem("highscore");
}

//Redirect to game screen
//Clear highscore in session
function restartGame2(){
    window.location.href = "game2.html";
    sessionStorage.removeItem("highscore");
}