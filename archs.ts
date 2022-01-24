import {initBackground, getCanvas, getContext} from './backs.js';

// Init and globals.
initBackground();
let canvas = getCanvas();
let context = getContext();

// Util functions.

class DrawCell {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number, width: number, height: number,
                color: string = '#FFFFFF') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw = () => {
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height);
    }
}

// Movement in Squares by Bridget Riley
function movementInSquares() {
    let wWidth = window.innerWidth;
    let wHeight = window.innerHeight;
    let drawCell = new DrawCell(0, 0, 32, 32);
    let numSquares = Math.ceil(wWidth / drawCell.width);
    let horizon = wWidth * 0.65;


    // Clear the context.
    context.clearRect(0, 0, wWidth, wHeight);
    let drawSq = true;
    for(let i = 0; i < wWidth; i += drawCell.width) {
        drawCell.x = i;
        drawCell.width = Math.max(2, drawCell.height *
            Math.sqrt((drawCell.x < horizon) ?
                ((horizon - drawCell.x) / horizon) :
                ((drawCell.x - horizon) / horizon)));
        for(let j = 0; j < wHeight; j += drawCell.height) {
            if(drawSq) {
                drawCell.y = j;
                drawCell.draw();
            }
            drawSq = !drawSq;
        }
    }
    context.fill();
    context.closePath();
    context.drawImage(canvas, 0, 0, wWidth, wHeight);
}


movementInSquares();
