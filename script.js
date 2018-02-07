var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "images/bear.png";

// so things load automatically on the page
window.onload = function() {
  // so bear appears automatically on page
  drawBear(bear)
};

var myObstacles = [];
var board = {
  frames:0
};

// used pacman example
var bear = {
  x: 650,
  y: 10,
  moveLeft: function() {
    this.x -= 25
  },
  moveRight: function() {
    this.x += 25
  },
  moveDown: function() {
    this.y += 25
  },
  moveUp: function() {
    this.y -= 25
  }
}

function drawBear(bear) {
  ctx.drawImage(img, bear.x, bear.y, 90, 140)
  ctx.strokeRect (bear.x, bear.y, 90, 140)
};

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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle += .01);
        ctx.drawImage(treeImg, this.x, this.y, 80, 100);
        ctx.restore();
    }
    this.collide = function(tree) {
      // collision detection based on coordinates
      var left = bear.x;
      var right = bear.x + (bear.width);
      var top = bear.y;
      var bottom = bear.y + (bear.height);
      var treeLeft = tree.x;
      var treeRight = tree.x + (this.width);
      var treeTop =tree.y;
      var treeBottom = tree.y + (this.height);
      var collided = true;
      if ((bottom < treeTop) ||
          (top > treeBottom) ||
          (right < treeLeft) ||
          (left > treeRight)) {
          collided = false;
      } return collided;
    }
}

var everyInterval = ((n) => {
  if ((frameNo / n) % 1 === 0) {
    return true
  }
  return false
});

var pushRandObstacle = () => {
  if (everyInterval(50) && myObstacles.length < 50) {
    var treeX = Math.floor(Math.random() * 530);
    var treeY = 100;
    var treeWidth = 50;
    var treeHeight = 50;
    myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
  }
};

document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37: //left arrow
      // case 67: //a
        bear.moveLeft();
        console.log("left");
        break;
      case 39: //right arrow
      // case 68: //d
        bear.moveRight();
        console.log("right");
        break;
      case 40: //down arrow
        bear.moveDown();
        console.log("down");
        break;  
      case 38: //up arrow
        bear.moveUp();
        console.log("up");
        break;    
  }
  // update canvas when a key is pressed
  updateCanvas();
};

function updateCanvas() {
  // clears the canvas, bear would repeat
  ctx.clearRect(0,0,1800,2200);
  // makes bear fall one point at time
  bear.y += 1;
  // draws bear again every time canvas updates
  drawBear(bear);
  board.frames ++;
  // Adjust rate at which obstacle appear
  if(board.frames % 3 === 1){
      treeX = Math.floor(Math.random() * 1420);
      treeY = 800;
      treeWidth = 50;
      treeHeight = 50;
      myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
      board.frames = 2;
      console.log(myObstacles);
  } for (i = 0; i < myObstacles.length; i++) {
      // Adjust speed of obstacles
      myObstacles[i].y -= 5;
      myObstacles[i].update();    
    } for (var i =0; i < myObstacles.length; i++) {
      if (bear.collide(myObstacles[i])){
           // document.location.reload();
           document.location.href = "index.html";
    //        alert("game over");
      }
    }  
}

// updating canvas every 60 milliseconds
// Adjust speed at which obstacles approach
setInterval(updateCanvas, 60);
// end of using pacman example
