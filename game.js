
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = false;

// Starts the game

$(document).keydown(() => {
  if (!start){
    start = true;
    nextSequence();
  }
});

// Checks the user answers against the pattern game.

function checkAnswer(currentLevel){

  // Checks for the current color pressed by the user against the last one of the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (gamePattern.length === userClickedPattern.length){

      setTimeout(() => {
        nextSequence();
      }, 1000)

    }
  }else{
    playSound("wrong");

    // Change the background for a moment.
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    // Change the title when game over.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  start = false;
  gamePattern = [];
}

// Random sequence the user needs to follow.

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Button listener

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Button sounds.

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//  Animations for every time a button is pressed.

function animatePress(currentColour){
  let activationButton = $("." + currentColour);
  activationButton.addClass("pressed");
  setTimeout(function(){
    activationButton.removeClass("pressed");
  }, 100);
}
