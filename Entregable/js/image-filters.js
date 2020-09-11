document.addEventListener("DOMContentLoaded", listeners);

function listeners() {
    canvas = document.querySelector("#canvas");
    ctx = document.querySelector("#canvas").getContext("2d");
    saved_image = null;
    document.querySelector("#imageUpload").addEventListener("click", image_upload);
    document.querySelector("#negative").addEventListener("click", negative_effect);
    document.querySelector("#sepia").addEventListener("click", sepia_effect);
    document.querySelector("#binary").addEventListener("click", binary_effect);
    document.querySelector("#clear-effects").addEventListener("click", clear_effects);
    document.querySelector("#brightness").addEventListener("click", brightness_effect);
    document.querySelector("#saturation-level").addEventListener("change", saturation_effect);
    document.querySelector("#blur").addEventListener("click", blur_effect);

    let btn = document.querySelector("#download-image");
    btn.addEventListener("click", function() {
        console.log("descarga");
        let image = canvas.toDataURL("image/jpg");
        this.href = image;
    });
}



function image_upload(event) {
    document.querySelector('#img-input-paint').click();
    let input = document.querySelector('#img-input-paint');

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;

            image.onload = function() {
                let imageAspectRatio = (1.0 * this.width) / this.height;
                saved_image = this;
                let imageScaledHeight = canvas.height;
                let imageScaledWidth = canvas.height * imageAspectRatio;
                canvas.width = imageScaledWidth;
                ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
            }
        }
    }
}

function clear_effects() {
    let imageAspectRatio = (1.0 * saved_image.width) / saved_image.height;
    let imageScaledHeight = canvas.height;
    let imageScaledWidth = canvas.height * imageAspectRatio;
    ctx.drawImage(saved_image, 0, 0, imageScaledWidth, imageScaledHeight);
}

function negative_effect() {
    clear_effects();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;

    for (let i = 0; i < dataArr.length; i += 4) {
        let r = dataArr[i];
        let g = dataArr[i + 1];
        let b = dataArr[i + 2];

        dataArr[i] = 255 - r;
        dataArr[i + 1] = 255 - g;
        dataArr[i + 2] = 255 - b;
    }
    ctx.putImageData(imageData, 0, 0);
}

function brightness_effect() {
    clear_effects();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;

    for (let i = 0; i < dataArr.length; i += 4) {
        let r = dataArr[i];
        let g = dataArr[i + 1];
        let b = dataArr[i + 2];

        dataArr[i] = r * 2.5;
        dataArr[i + 1] = g * 2.5;
        dataArr[i + 2] = b * 2.5;
    }
    ctx.putImageData(imageData, 0, 0);
}

function sepia_effect() { //repasarlo 
    clear_effects();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;

    for (let i = 0; i < dataArr.length; i += 4) {
        let r = dataArr[i];
        let g = dataArr[i + 1];
        let b = dataArr[i + 2];

        dataArr[i] = (r * .393) + (g * .769) + (b * .189);
        dataArr[i + 1] = (r * .349) + (g * .686) + (b * .168);
        dataArr[i + 2] = (r * .272) + (g * .534) + (b * .131);
    }
    ctx.putImageData(imageData, 0, 0);
}

function binary_effect() {
    clear_effects();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;

    for (let i = 0; i < dataArr.length; i += 4) {
        let r = dataArr[i];
        let g = dataArr[i + 1];
        let b = dataArr[i + 2];

        let grey = (0.299 * r + 0.587 * g + 0.114 * b);
        if (grey > 100) {
            dataArr[i] = 255;
            dataArr[i + 1] = 255;
            dataArr[i + 2] = 255;
        } else {
            dataArr[i] = 0;
            dataArr[i + 1] = 0;
            dataArr[i + 2] = 0;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function saturation_effect(event) {
    clear_effects();
    let value = 0 - event.target.value; //range between -100 and 0
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;
    for (let i = 0; i < dataArr.length; i += 4) {
        let r = dataArr[i];
        let g = dataArr[i + 1];
        let b = dataArr[i + 2];

        var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
        dataArr[i] = gray * value + dataArr[i] * (1 - value);
        dataArr[i + 1] = gray * value + dataArr[i + 1] * (1 - value);
        dataArr[i + 2] = gray * value + dataArr[i + 2] * (1 - value);
    }
    ctx.putImageData(imageData, 0, 0);
}

function blur_effect() {
    clear_effects();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;
    for (let i = 0; i < dataArr.length; i++) {
        if (i % 4 === 3) { continue; }
        let pixel = dataArr[i];
        dataArr[i] = (pixel + (dataArr[i - 4] || pixel) + (dataArr[i + 4] || pixel) +
            (dataArr[i - 4 * imageData.width] || pixel) + (dataArr[i + 4 * imageData.width] || pixel) +
            (dataArr[i - 4 * imageData.width - 4] || pixel) + (dataArr[i + 4 * imageData.width + 4] || pixel) +
            (dataArr[i - 4 * imageData.width + 4] || pixel) + (dataArr[i + 4 * imageData.width - 4] || pixel)) / 9;
    }
    ctx.putImageData(imageData, 0, 0);
}