var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "images/bear.png";
var imgRight = new Image();
imgRight.src = "images/bearRight.png"; 
var myObstacles = [];
var frameNo = 0;
// var audioCollide = new Audio ("audio/gameOver.mp3")
// var wooho = new Audio ("audio/Wooho.mp3")

// so things load automatically on the page
window.onload = function() {
  // so bear appears automatically on page
  drawLeftBear(bear);
  frameCounter();
};

// used pacman example

//================
// Oso, donde arranca, tamaño y cuanto se mueve p/c lado
//================
var bear = {
  x: 650,
  y: 10,
  width: 90,
  height: 140,
  direction: "left",
  moveLeft: function() {
    this.x -= 40
  },
  moveRight: function() {
    this.x += 40
  },
  moveDown: function() {
    this.y += 40
  },
  moveUp: function() {
    this.y -= 40
  }
}

function drawLeftBear(bear) {
  ctx.drawImage(img, bear.x, bear.y, 100, 160)
};

function drawRightBear(bear) {
  ctx.drawImage(imgRight, bear.x, bear.y, 100, 160)
};

//=================================
//Arboles
//=================================
function Obstacle(x,y,width,height){
  this.width = width;
  this.height = height;
  this.x = x
  this.y = y
  this.speedX = 0
  this.speedY = 0
  this.update = function(){
    var treeImg = new Image();
    treeImg.src = "images/tree.png";
        ctx.drawImage(treeImg, this.x, this.y, 100, 130);
    }
    this.collide = function(bear) {
      // collision detection based on coordinates
      //bear
      var left = bear.x;
      var right = bear.x + (bear.width);
      var top = bear.y;
      var bottom = bear.y + (bear.height);
      //tree
      var treeLeft = this.x;
      var treeRight = this.x + (this.width);
      var treeTop =this.y;
      var treeBottom = this.y + (this.height);
      var collided = true;
      if ((bottom < treeTop) ||
          (top > treeBottom) ||
          (right < treeLeft) ||
          (left > treeRight)) {
          collided = false;
      } 
      return collided;
    }
}

var everyInterval = ((n) => {
  if ((frameNo / n) % 1 === 0) {
    return true
  }
  return false
});

//=================================
//Para mandar los arboles en forma aleatoria al array de mis obstaculos
//=================================
var pushRandObstacle = () => {
  if (everyInterval(50) && myObstacles.length < 50) {
    var treeX = Math.floor(Math.random() * 530);
    var treeY = 100;
    var treeWidth = 50;
    var treeHeight = 50;
    myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
  }
};

//=================================
//Para que el oso se mueva
//=================================
document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37: //left arrow
        bear.moveLeft();
        // console.log("left");
        // updateCanvas(drawLeftBear(bear));
        // setInterval(updateCanvas("left"), 25);
        bear.direction = "left";
        break;
      case 39: //right arrow
        bear.moveRight();
        // console.log("right");
        // updateCanvas(drawRightBear(bear));
        // setInterval(updateCanvas("right"), 25);
        bear.direction = "right";
        break;
      case 40: //down arrow
        bear.moveDown();
        // console.log("down");
        // updateCanvas(bear.moveDown());
        break;  
      case 38: //up arrow
        bear.moveUp();
        // console.log("up");
        // updateCanvas(bear.moveUp());
        break;    
  }
  // update canvas when a key is pressed
  // updateCanvas();
};

// updating canvas every 60 milliseconds
// Adjust speed at which obstacles approach

var frameSeconds = 0;

var frameCounter = function(){
    frameSeconds=frameSeconds+1; // adds 1 to seconds
    setInterval(updateCanvas, 20);
}

setInterval(frameCounter, 15000);

function updateCanvas() {
  // clears the canvas, bear would repeat
  ctx.clearRect(0,0,1800,2200);
  // makes bear fall one point at time
  bear.y += 1;
  // draws bear again every time canvas updates
  
  // Conditional to detect whether to draw left or right bear
  if (bear.direction == "left") {
    drawLeftBear(bear);
  } else {
    drawRightBear(bear);
  }
  // Adjust rate at which obstacle appear
  frameNo += 15;
  
  if(everyInterval(250)){
      treeX = Math.floor(Math.random() * 1420);
      treeY = 800;
      treeWidth = 50;
      treeHeight = 50;
      myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
  } 

//=================================
// Boundries
//=================================
  if (bear.x >= (canvas.width - bear.width)) {
    bear.x = (canvas.width - bear.width);
  }
  if (bear.x <= 0) {
    bear.x = 0;
  }
  if (bear.y >= (canvas.height - bear.height - 200)) {
    bear.y = (canvas.height - bear.height - 200);
  }
  if (bear.y <= 0) {
    bear.y = 0;
  }

//=================================
//Calling collide
//=================================
  myObstacles.forEach((elem) => {
    elem.y -= 2;
    if(elem.collide(bear)) {
      document.location.reload();
      document.location.href = "gameOver.html";
      // setTimeout(startOver, 2000);
    }
    elem.update();
  });
}


//=================================
//Counter
//=================================
var timerElement = document.getElementById('timer');
document.getElementById('timer').style.font = "20px DIN Alternate Bold";
document.getElementById('timer').style.color = "#fff";
var seconds = 0; // counter starts from 0
var counter =function(){
  seconds=seconds+1; // adds 1 to seconds
  timerElement.innerHTML = ("SCORE: "+seconds);
}
// timer interval is every second (1000ms)
setInterval(counter, 500);
// The main game loop
var main = function () {
  // run the update function
  update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

//=================================
//Print score in Game Over page (TBC)
//=================================
// var scoreElement = document.getElementById('score');
// scoreElement.innerText = ("YOUR SCORE "+ seconds + " !!!");

