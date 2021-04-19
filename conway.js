"use strict";

let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

let canvas;
let context;

function init() {
  let newCanvas = document.createElement('canvas');
  newCanvas.setAttribute("id", 'bkg-canvas');
  newCanvas.style['position'] = 'absolute';
  newCanvas.style['left'] = 0;
  newCanvas.style['right'] = 0;
  newCanvas.style['z-index'] = -1;
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
startAnimating(10);
