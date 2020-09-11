document.addEventListener("DOMContentLoaded", listeners);


function listeners() {
    canvas = document.querySelector("#canvas");
    ctx = document.querySelector("#canvas").getContext("2d");
    document.querySelector("#pencil").addEventListener("click", draw);
    document.querySelector("#erase").addEventListener("click", erase);
    document.querySelector("#erase-all").addEventListener("click", erase_all);
    document.querySelector("#color-picker").addEventListener("change", color_picker);
}

function color_picker(event) {
    ctx.strokeStyle = event.target.value;
}

function draw() {
    let isdrawing = false;
    let x = 0;
    let y = 0;
    canvas.onmousedown = function(e) {
        x = e.offsetX;
        y = e.offsetY;
        isdrawing = true;
    };
    canvas.onmousemove = function(e) {
        if (isdrawing) {
            draw_line(x, y, e.offsetX, e.offsetY, 3);
            x = e.offsetX;
            y = e.offsetY;
        }
    }
    canvas.onmouseup = function(e) {
        isdrawing = false;
    }
}

function erase() {
    ctx.strokeStyle = "rgba(255, 255, 255, 255)";
    draw();
}

function draw_line(x1, y1, x2, y2, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function erase_all() {
    ctx.clearTo = function() {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    saved = null;
    ctx.clearTo();
}