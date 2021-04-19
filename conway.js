// let secondsPassed;
// let oldTimeStamp;
// let fps;


// function init(){
//   canvas = document.getElementById('canvas');
//   context = canvas.getContext('2d');

//   // Start the first frame request
//   window.requestAnimationFrame(gameLoop);
// }


// function gameLoop(timeStamp) {

//   // Calculate the number of seconds passed since the last frame
//   secondsPassed = (timeStamp - oldTimeStamp) / 1000;
//   oldTimeStamp = timeStamp;

//   // Calculate fps
//   fps = Math.round(1 / secondsPassed);

//   // Draw number to the screen
//   context.fillStyle = 'white';
//   context.fillRect(0, 0, 200, 100);
//   context.font = '25px Arial';
//   context.fillStyle = 'black';
//   context.fillText("FPS: " + fps, 10, 30);

//   // Perform the drawing operation
//   draw();

//   // The loop function has reached it's end. Keep requesting new frames
//   window.requestAnimationFrame(gameLoop);
// }

// function draw(){
//   let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
//   context.fillStyle = randomColor;
//   context.fillRect(100, 50, 200, 175);
// }

// init();
"use strict";

let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

let canvas;
let context;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
}



function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  console.log(startTime);
  animate();
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

function draw(){
  let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
  context.fillStyle = randomColor;
  context.fillRect(100, 50, 200, 175);
}

init();
startAnimating(5);
