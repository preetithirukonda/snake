// Set up the canvas and the snake
var canvas = document.getElementById("game-board");
var ctx = canvas.getContext("2d");
var letters = "WILLYOUGOTOPROMWITHME"; //21
var score = 0;
const canvas2 = document.getElementById('score-board');
const ctx2 = canvas2.getContext('2d');


var snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 },
  { x: 40, y: 10 },
];

var dx = 10;
var dy = 0;

var food = { x: 0, y: 0, letter: "" };
var eatenLetters = [];
const question = [];

// Generate a new letter and food location
function generateFood() {
    console.log("hehe", foodX, foodY, food.letter);
    var currentLetter = food.letter;
    var foodX = Math.floor(Math.random() * 32) * 10 + 40;
    var foodY = Math.floor(Math.random() * 32) * 10 + 40;

    //var foodX = Math.floor(Math.random() * (canvas.width - 40) / 10) *10;
    //var foodY = Math.floor(Math.random() * (canvas.height - 40) / 10) * 10;
 
    // Generate a random letter from the phrase "will you go to prom with me?"
    
    var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  
    // Check if the letter has already been eaten by the snake
    while (snake.includes(randomLetter)) {
      console.log("skajfklsfas",randomLetter);
      randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
     food = {x: foodX, y: foodY, letter: randomLetter};
     food.x=foodX;
     food.y=foodY;
     food.letter = randomLetter;
     
     console.log("hehe", foodX, foodY, food.letter);
  }
  generateFood();

  function drawFood() {
    ctx.font = "14px Arial";
    ctx.fillText(food.letter, food.x + 1, food.y + 10);
    ctx.fill();
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
      }
    drawFood();
  
    // Display the eaten letters in the #letters div
    var lettersDiv = document.getElementById("letters");
    if (lettersDiv) {
      lettersDiv.innerHTML = "Eaten letters: " + snake.join(", ");
    }
    // Draw the score
    score = (snake.length - 4);
    console.log("score",score);
  ctx.fillText("Score: " + (snake.length - 4), 10, canvas.height - 10);
  }
  
 
// Move the snake
function moveSnake(food) {
  // Move the snake
  var head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake ate the food
  if (head.x === food.x && head.y === food.y) {
    eatenLetters.push(food.letter);
    generateFood();
  } else {
    snake.pop();
  }
}

// Check if the snake collided with the walls or itself
function checkCollision() {
  // Check if the snake hit the walls
  if (snake[0].x < 0 || snake[0].x >= canvas.width ||
      snake[0].y < 0 || snake[0].y >= canvas.height) {
    return true;
  }

  // Check if the snake hit itself
  for (var i = 3; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // No collision detected
  return false;
}

// Handle the keydown event to change the direction of the snake
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft" && dx !== 10) {
    dx = -10;
    dy= 0;
  } else if (event.key === "ArrowRight" && dx !== -10) {
    dx = 10;
    dy = 0;
  } else if (event.key === "ArrowUp" && dy !== 10) {
    dx = 0;
    dy = -10;
  } else if (event.key === "ArrowDown" && dy !== -10) {
    dx = 0;
    dy = 10;
  }
});

function editScoreBoard(){
  const square = String.fromCodePoint(0x1F7E2);
  ctx2.fillStyle = 'black';
  ctx2.font = '20px serif';
  ctx2.fillRect(20, 20, score * 20, 20);
  ctx2.fillText(" ?",20*22, 35);
  //ctx2.fillText(square, score * 50, 50);
  if (score==21){
    winGame();
  }
}


function winGame(){
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '40px serif';
  ctx.textAlign = "center";
  ctx.fillText("YOU WIN!!",canvas.width/2, canvas.height/2);
  ctx.font = '20px serif';
  ctx.fillText("the question is....",canvas.width/2, 280);
  setTimeout(revealQuestion, 2000);
  
 

}


function revealQuestion(){
   ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
   ctx2.fillStyle = 'black';
   ctx2.font = '20px serif';
   ctx.textAlign = "center";
   ctx2.fillText("W I L L  Y O U  G O  T O  P R O M  W I T H  M E ?",20, 35);
  
}
// Run the game loop
function gameLoop() {
   console.log(snake[0].x, snake[0].y, canvas.width, canvas.height);
console.log(food.x, food.y, food.letter);
  moveSnake(food);
 // drawFood();
  draw();
  editScoreBoard();

  if (checkCollision()&&score<21) { //!!!CHANGE TO 21
    alert("Game over!");
    clearInterval(intervalId);
  }else if (checkCollision()){
    clearInterval(intervalId);
  }
}



var intervalId = setInterval(gameLoop, 100);
