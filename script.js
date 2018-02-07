var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "images/bear.png";

// so things load automatically on the page
window.onload = function() {
  // so bear appears automatically on page
  
  drawBear(bear);
  
  // var img = document.getElementById("tree");
  // ctx.drawImage(img, 10, 10);
};

var myObstacles = [];
var board = {
frames:0
}


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
}

// function drawTree(tree) {
//   var treeImg = new Image();
//   treeImg.onload = function() {
//     ctx.drawImage(treeImg, tree.x, tree.y, 90, 140);
//   }
//   treeImg.src = "images/tree.png";
// }



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
    // treeImg.onload = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle += .01);
        ctx.drawImage(treeImg, this.x, this.y, 80, 100);
        ctx.restore();
    // };      
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
 //    ctx.rotate(this.angle += .002);
    var treeWidth = 50;
    var treeHeight = 50;
    myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
  }
 }



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
  if(board.frames % 5 === 1){
      treeX = Math.floor(Math.random() * 1420);
      treeY = 800;
      treeWidth = 50;
      treeHeight = 50;
      myObstacles.push(new Obstacle(treeX, treeY, treeWidth, treeHeight));
      board.frames = 2;
      console.log(myObstacles);
    }
    for (i = 0; i < myObstacles.length; i++) {
      
      // Adjust speed of obstacles
      myObstacles[i].y -= 5;
      myObstacles[i].update();    
    }
}


// updating canvas every 60 milliseconds

// Adjust speed at which obstacles approach
setInterval(updateCanvas, 60);



// end of using pacman example


// var trees = new Image();
// trees.src = 'images/tree.png';

// var myObstacles[];


// function treeObstacles (x, y, image, isLoaded, width, height) {
//   this.x = x
//   this.y = y
//   this.image = image;
//   this.isLoaded = false;
//   this.width = width;
//   this.height = height;
// }

// treeObstacles.prototype.draw = function () {
//   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
// };

// function getRandom(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var myTrees = [
//   new treeObstacles (getRandom(0, 450), ((Math.random() * canvas.height - 410)), trees, false, 40, 40),
//   new treeObstacles (getRandom(0, 450), ((Math.random() * canvas.height - 410)), trees, false, 40, 40),
//   new treeObstacles (getRandom(0, 450), ((Math.random() * canvas.height - 410)), trees, false, 40, 40),
//   new treeObstacles (getRandom(0, 450), ((Math.random() * canvas.height - 410)), trees, false, 40, 40),
// ];

// function makeTrees() {
//   for (var i=0; i < 1; i++ ) {
//   myTrees.push(new treeObstacles(getRandom(0, 450), ((Math.random() * canvas.height - 410)), tree, false, 40, 40));
//   console.log(myTrees);
//   }
// }

// function drawTrees(){
//   myTrees.forEach(function (oneTree) {
//     oneTree.y += 1;
//     oneTree.draw()
//   }
// }





//Try 1

// var trees = [
//   {"id":"tree1", "x": 100, "y": -20, "w":20, "h":40},
//   {"id":"tree2", "x": 220, "y": -20, "w":20, "h":40},
//   {"id":"tree3", "x": 300, "y": -20, "w":20, "h":40},
//   {"id":"tree4", "x": 150, "y": -70, "w":20, "h":40},
//   {"id":"tree5", "x": 225, "y": -70, "w":20, "h":40},
//   {"id":"tree6", "x": 350, "y": -70, "w":20, "h":40}
// ];

// function renderTrees(){
//   for (var i = 0; i < trees.length; i++){
//     ctx.img.src = "images.tree.png";
//     ctx.fillRect (trees[i].x, trees[i].y+=.5, trees[i].w, trees[i].h);
//   }
// }

// function animate() {
//   ctx.clearRect(0, 0, cW, cH);
//   renderTrees();
// }
// var animateInterval = (setInterval, 30);

// Finish Try 1
















// // window.onload = function() {
//   // document.getElementById("start-button").onclick = function() {
//     // startGame();
//     draw(bear);
//   // };

//   // function startGame() {
//     // myGameArea.myObstacles = [];
//     myGameArea.start();
//     // player = new Component(300, 100, "./images/bear.png", (myGameArea.canvas.width/2) - 15, myGameArea.canvas.height - 100, "player");
//   // }
//       // making a bear

  
   



//   // car game ref
//   var myGameArea = {
//     start: function() {
//       this.canvas.width = screen.width - screen.width * 0.7;
//       this.canvas.height = screen.height - screen.height * 0.25;
//       this.context = this.canvas.getContext("2d");
//       document.getElementById("canvas").append(this.canvas);
//       this.reqAnimation = window.requestAnimationFrame(updateGameArea);
//     },
//     myObstacles: [],
//     frames: 0,
//     // score goes here
//     // clear: function() {
//     //   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     // },
//     stop: function() {
//       cancelAnimationFrame(this.reqAnimation);
//       this.gameOver();
//     },
//     gameOver: function() {
//       // this.clear();
//       // this.drawFinalPoints();
//     },
//     // drawFinalPoints: function() {
//     //   this.context.fillStyle = "black";
//     //   this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
//     //   this.context.font = '34px Verdana';
//     //   this.context.fillStyle = '#870007';
//     //   this.context.fillText('Game Over!', 100, 250);
//     //   this.context.fillStyle = 'white';
//     //   this.context.fillText('Your final score', 70, 300);
//     //   this.context.fillText(points, 150, 340);
//     // }
//   } // end of my game area


//   // component for bear

//   function Component(width, height, image, x, y, type) {

//     this.width = width;
//     this.height = height;
//     this.type = type;
//     this.x = x;
//     this.y = y;
//     // if (this.type == "player") { 
//       this.image = new Image(); 
//     // }
//     // this.update = function() {
//     //   ctx = myGameArea.context;
//     //   if(this.type == "player"){
//     //     this.image.src = color;
//     //     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     //   } else {
//     //     ctx.fillStyle = color;
//     //     ctx.fillRect(this.x, this.y, this.width, this.height);
//     //   }
//     // };

//     this.left = function() { return this.x; };
//     this.right = function() { return (this.x + this.width); };
//     this.top = function() { return this.y; };
//     this.bottom = function() { return this.y + (this.height); };
//     // this.crashWith = function(obstacle) {
//     //   return !((player.bottom() < obstacle.top()) ||
//     //     (player.top() > obstacle.bottom()) ||
//     //     (player.right() < obstacle.left()) ||
//     //     (player.left() > obstacle.right()));
//     // };

//   } // end of Component

//   function updateGameArea() {
//     // for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
//     //   if (player.crashWith(myGameArea.myObstacles[i])) {
//     //     myGameArea.stop();
//     //     return;
//     //   }
//     // }

//     // myGameArea.clear(); 
  
//     // drawObstacles();
//     myGameArea.frames += 1;
//     // for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
//     //   myGameArea.myObstacles[i].y += 1;
//     //   myGameArea.myObstacles[i].update();
//     // }
//     player.update();
//     // myGameArea.score();
//     myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
//   } // End of update game area

//   // function drawObstacles() {
//   //   if (myGameArea.frames % 140 === 0) {
//   //     minWidth = (myGameArea.canvas.width - 80)*0.3;
//   //     maxWidth = (myGameArea.canvas.width - 80)*0.7;
//   //     width = minWidth + Math.floor(Math.random()*(maxWidth-minWidth));
//   //     posX = 40 + (Math.floor(Math.random() * (myGameArea.canvas.width-80-width)));
//   //     myGameArea.myObstacles.push(new Component(width, 20, "#870007", posX, 0));
//   //   }
//   // }



// // }
