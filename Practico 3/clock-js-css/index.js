let hoursHand = null;
let minutesHand = null;
let secondsHand = null;

window.addEventListener('load', onload);

function onload() {
    hoursHand = document.querySelector(".hour");
    minutesHand = document.querySelector(".minute");
    secondsHand = document.querySelector(".second");

    update();
    setInterval(update, 1000);
}

function update() {

    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    hoursHand.style.transform = `rotate(${360 * (hours % 12) /12}deg)`;
    minutesHand.style.transform = `rotate(${360 * minutes % 60}deg)`;
    secondsHand.style.transform = `rotate(${360 * seconds % 60}deg)`;

}