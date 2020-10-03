let seconds = 0;
let clockhand = document.querySelector();

setInterval(function() {
    seconds = (seconds + 1) % 60;
    clockhand.style.transform = 'rotateX(${360 * seconds / 60.0}deg)';
}, 1000);