"use strict"
document.addEventListener('DOMContentLoaded', global());
function global() {

    let col = 4;
    let rows = 5;

    let matrix = [];
    for (let i = 0; i < col; i++) {
        matrix[i] = [];
        for (let j = 0; j < rows; j++) {
            matrix[i][j] = Math.floor(Math.random() * 100);
        }
    }

    console.table(matrix);


    document.querySelector("#max-button").addEventListener('click', max_value);
    document.querySelector("#max-and-min-button").addEventListener('click', max_and_min);
    document.querySelector("#average-button").addEventListener('click', average_rows);
    document.querySelector("#draw-square").addEventListener('click', draw_square);
    document.querySelector("#draw-image").addEventListener('click', draw_with_image);
    document.querySelector("#draw-gradient").addEventListener('click', draw_gradient);
    document.querySelector("#draw-3-color-gradient").addEventListener('click', gradient_black_yellow_red);
    document.querySelector("#draw-tonal-gradient").addEventListener('click', gradient_tonal_armony);

    function max_value() {
        let max = 0;
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < rows; j++) {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
            }
        }
        console.log("El valor maximo de toda la matriz es: " + max);
    }

    function max_and_min() {
        let max = 0;
        let min = 1000;
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < rows; j++) {
                if ((i % 2 == 0) && max < matrix[i][j]) {
                    max = matrix[i][j];
                } else if ((i % 2 != 0) && min > matrix[i][j]) {
                    min = matrix[i][j];
                }
            }
        }
        console.log("El valor maximo contenido en las filas pares es: " + max);
        console.log("El valor minimo contenido en las filas impares es: " + min);
    }

    function average_rows() {
        let promedio = [];
        let aux = 0;
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < rows; j++) {
                aux += matrix[i][j];
            }
            promedio.push(aux / rows);
            aux = 0;
        }
        console.log(promedio);
    }

    function draw_square() {
        let ctx = document.querySelector("#square").getContext("2d");
        ctx.fillStyle = "#632b30";
        ctx.fillRect(300, 300, 300, 300);
    }


    function draw_with_image() {
        let ctx = document.querySelector("#draw-image-data").getContext("2d");
        let width = 500;
        let height = 500;
        let imageData = ctx.createImageData(width, height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                setPixel(imageData, x, y, 230, 175, 46, 255);
            }
        }
        ctx.putImageData(imageData, 200, 50);
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function draw_gradient() {
        let ctx = document.querySelector("#gradient").getContext("2d");
        let width = 500;
        let height = 700;
        let coeficiente = 255 / height;
        let r;
        let g;
        let b;
        let imageData = ctx.createImageData(width, height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = y * coeficiente;
                g = y * coeficiente;
                b = y * coeficiente;
                setPixel(imageData, x, y, r, g, b, 255);
            }
        }
        ctx.putImageData(imageData, 200, 50);
    }

    function gradient_black_yellow_red() {

        let ctx = document.querySelector("#color-gradient").getContext("2d");
        let width = 500;
        let height = 700;
        let coeficiente = 255 / (width / 2);
        let r;
        let g;
        let b;
        let imageData = ctx.createImageData(width, height);
        for (let x = 0; x < width; x++) {

            if (x < (width / 2)) {
                r = x * coeficiente;
                g = x * coeficiente;
                b = 0;
            } else {
                r = x * coeficiente;
                g -= (x * coeficiente);
                b = 0;
            }

            for (let y = 0; y < height; y++) {
                setPixel(imageData, x, y, r, g, b, 255);
            }
        }
        ctx.putImageData(imageData, 200, 50);
    }


}
