let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height

let figures = [];

const NUM_FIGURES = 10;
const FIGURE_SIZE = 20;


function addRectangle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = 'rgb(0, 255, 0, 255)';
    let rect = new Rect(posX, posY, FIGURE_SIZE, FIGURE_SIZE, color, context);
    figures.push(rect);
}

function addCircle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = 'rgb(255, 0, 0, 255)';
    let circle = new Circle(posX, posY, FIGURE_SIZE / 2, color, context);
    figures.push(circle);
}

function drawFigures() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

let lastClickedFigure = null;
let isMouseDown = false;

function onMouseDown(event) {
    isMouseDown = true;

    if (lastClickedFigure != null) {
        lastClickedFigure.setHighlighted(false);
        lastClickedFigure = null;
    }

    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        clickedFigure.setHighlighted(true);
        lastClickedFigure = clickedFigure;
    }
    drawFigures();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}

function onMouseUp() {
    isMouseDown = false;
}

function initExample() {
    for (let index = 0; index < NUM_FIGURES; index++) {
        if (Math.random() > 0.5) {
            addRectangle();
        } else {
            addCircle();
        }
    }

    drawFigures();

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false)
}

initExample();