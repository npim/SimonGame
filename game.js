
var colour = ["red","green","blue","yellow"];

var started = false;
var level = 0;
//test test this is comment
var userClickedPattern = [];
var gamePattern = [];

//DETECT KEYPRESS TO START THE GAME
// $(document).keypress(function(){
//   if(!started){
//     $("#level-title").text("Level "+level);
//     nextSequence();
//     started=true;
//   }
// });

// $(".btn").disabled=true;

//DETECT START BUTTON CLICK TO START THE GAME
$(".start-button").click(function() {
  if(!started){
    $(".btn").removeAttr("disabled");
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    $(".start").hide();
    $(".restart").hide();
  }
});

//DETECT USER'S BUTTON CLICKS
$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);//add the clicked button to the user's array
  animatedPress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//CHECK ANSWER
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("😭GAME OVER😭");
    $(".restart").show();
    $(".start").hide();
    $(".btn").attr("disabled","disabled");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//START OVER
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

//NEXT SEQUENCE
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);//generate random number from 0-3
  var newPattern = colour[randomNumber];
  gamePattern.push(newPattern);//add random number to the game pattern array
  animatedPress(newPattern);
  playSound(newPattern);
}

//PLAY SOUND
function playSound(color){
  var audio = new Audio ('/SimonGame/sounds/'+color+'.mp3');
  audio.play();
}

//ANIMATED PRESS
function animatedPress(color) {
  $("#"+color).addClass("pressed");
  setTimeout(function() {
    $("#"+color).removeClass("pressed");
  }, 100);
}
