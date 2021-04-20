"use strict";

let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

let canvas;
let context;

// Rows and columns of the board.
let rows = 100;
let cols = 50;

// Divisor for likelyhood the cell starts out as alive.
// For example: 4 means 1/4 chance.
let chance = 4;

// Enum of alive and dead states.
const lifeState = Object.freeze({"alive":1, "dead":2});


// 2D array of cells.
// TODO presets like Gaspar gun 
let cells = (_ => {
  let retVal = [[]];
  for(let i = 0; i < rows; i++) {
    retVal[i] = [];
    for(let j = 0; j < cols; j++) {
      retVal[i][j] = ((Math.floor((Math.random() * chance) + 1) == 1) ? lifeState.alive : lifeState.dead);
    }
  }
  
  return retVal;
})();


function init() {
  let newCanvas = document.createElement('canvas');
  newCanvas.setAttribute("id", 'bkg-canvas');
  newCanvas.style['position'] = 'absolute';
  newCanvas.style['left'] = 0;
  newCanvas.style['right'] = 0;
  newCanvas.style['z-index'] = -1;
  newCanvas.width  = window.innerWidth;
  newCanvas.height = window.innerHeight;
  document.body.style.backgroundColor = "black";

  document.body.appendChild(newCanvas);
  
  
  canvas = document.getElementById('bkg-canvas');
  context = canvas.getContext('2d');
}



function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  console.log("Starting on Unix timestamp: " + startTime);
  animate();
}

function draw() {
  let drawCell = { 'x' : 0, 'y' : 0, 'width' : (window.innerWidth / rows), 'height' : (window.innerHeight / cols)};

  context.beginPath();
  context.fillStyle = '#FFFFFF';
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      drawCell.x = i * drawCell.width;
      drawCell.y = j * drawCell.height;

      if(cells[i][j] === lifeState.alive)
        context.rect(drawCell.x, drawCell.y, drawCell.width, drawCell.height);
    }
  }
  context.fill();
  context.closePath();
}

function animate() {

  // stop
  if (stop) {
    return;
  }

  // request another frame

  requestAnimationFrame(animate);

  // calc elapsed time since last loop

  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = now - (elapsed % fpsInterval);
    draw();


    // TESTING...Report #seconds since start and achieved fps.
    let sinceStart = now - startTime;
    let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + currentFps, 10, 30);

  }
}


init();
startAnimating(10);
