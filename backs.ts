let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

let tmpCanvas: HTMLCanvasElement;
let tmpContext: CanvasRenderingContext2D;

export function initBackground() {
    let newCanvas: HTMLCanvasElement = document.createElement('canvas');
    newCanvas.setAttribute("id", 'bkg-canvas');
    newCanvas.style['position'] = 'fixed';
    newCanvas.style['left'] = '0';
    newCanvas.style['right'] = '0';
    newCanvas.style['top'] = '0';
    newCanvas.style['z-index'] = '-1';
    newCanvas.width  = window.innerWidth;
    newCanvas.height = window.innerHeight;
    document.body.style.backgroundColor = "black";

    tmpCanvas = document.createElement('canvas');
    tmpContext = tmpCanvas.getContext('2d');
    tmpCanvas.width  = window.innerWidth;
    tmpCanvas.height = window.innerHeight;
    document.body.style.backgroundColor = "black";

    document.body.appendChild(newCanvas);

    canvas = <HTMLCanvasElement>document.getElementById('bkg-canvas');
    context = canvas.getContext('2d');
}

export function getContext() : CanvasRenderingContext2D {
    return context;
}

export function getCanvas() : HTMLCanvasElement {
    return canvas;
}

window.addEventListener('resize', _ => {
    tmpCanvas.width = window.innerWidth;
    tmpCanvas.height = window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
