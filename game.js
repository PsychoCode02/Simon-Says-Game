let buttonColours = ["red","blue", "green", "yellow"];
let gamePatter = [];
let userClickedPattern = [];

let started = false
let level = 0; 



let playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
    
}    

let animatePress = (currentColour) => {   
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => { $("#" + currentColour).removeClass("pressed"); }, 100);
}  

let nextSequence =  () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);

    let randomNumber = Math.floor(Math.random(0) * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePatter.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour); 
}    


$("body").on("click",function(){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
       started = true;
   }
});


$("body").on("keypress",function(){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
       started = true;
   }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour); 
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

let checkAnswer = (currentLevel) => {
    if (gamePatter[currentLevel] ===   userClickedPattern[currentLevel]){
        console.log("success")
     if ( userClickedPattern.length ===  gamePatter.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    
      } 
        
    } else {
        let audio = new Audio("sounds/wrong.mp3"); 
         audio.play();
         
         $("h1").text("Game Over Palomo Press Any Key to Play Again")
    
         $("body").addClass("game-over");
         setTimeout(() => { $("body").removeClass("game-over"); }, 2000)
             startOver();
    }
}

let startOver = () => {
      level = 0; 
      gamePatter = [];
      started = false;
}






