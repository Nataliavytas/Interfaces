// Countdown

let count = document.querySelector(".countdown");
let days = document.querySelector("#days");
let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");
let countDownDate = new Date("Oct 31, 2020 16:20:00").getTime();

function digitalCountdown() {
    days.innerHTML = "";
    hours.innerHTML = "";
    minutes.innerHTML = "";
    seconds.innerHTML = "";

    let now = new Date();
    let date = countDownDate - now;

    days_value = Math.floor(date / (1000 * 60 * 60 * 24));
    hours_value = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes_value = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
    seconds_value = Math.floor((date % (1000 * 60)) / 1000);

    if (seconds_value < 10) {
        seconds_value = ("0" + seconds_value);
    }
    if (minutes_value < 10) {
        minutes_value = ("0" + minutes_value);
    }
    if (hours_value < 10) {
        hours_value = ("0" + hours_value);
    }

    days.innerHTML = days_value;
    hours.innerHTML = hours_value;
    minutes.innerHTML = minutes_value;
    seconds.innerHTML = seconds_value;
}
setInterval(digitalCountdown, 100);

// Elementos que entran al scrollear

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


window.addEventListener("scroll", function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 180) {
        document.querySelector('.countdown').style.display = "block";
        document.querySelector('.countdown').style.animation = "enter-right 1.5s ease-in-out";
    }
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.querySelector('#movie-description').style.display = "block";
        document.querySelector('#movie-description').style.animation = "enter-right 1.5s ease-in-out";
    }
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.querySelector('#curious-facts').style.display = "block";
        document.querySelector('#curious-facts').style.animation = "enter-left 1.5s ease-in-out";
    }
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        document.querySelector('.characters').style.display = "block";
        document.querySelector('.characters').style.animation = "appear 1.5s ease-in-out";
    }

    if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) {
        document.querySelector('.carrousel').style.display = "block";
        document.querySelector('.carrousel').style.animation = "appear 1.5s ease-in-out";
    }
});

/* Characters  3d*/

$(document).ready(function() {
    $('.char-1').mousemove(function(e) {
        x = e.pageX - this.offsetLeft - $(this).width() / 2;
        y = e.pageY - this.offsetTop - $(this).height() / 2;
        relax = .020; // mouse sensitivity
        x *= relax;
        y *= relax;
        transform = 'rotatey(' + x * 4 + 'deg) ';
        transform += 'rotatex(' + (y * 0.1 * 1) + 'deg) ';
        transform += 'translateZ(-40px) ';
        $('.char-1').css('transform', transform);
    });

    $('.char-2').mousemove(function(e) {
        x = e.pageX - this.offsetLeft - $(this).width() / 2;
        y = e.pageY - this.offsetTop - $(this).height() / 2;
        relax = .020; // mouse sensitivity
        x *= relax;
        y *= relax;
        transform = 'rotatey(' + x * 4 + 'deg) ';
        transform += 'rotatex(' + (y * 0.1 * 1) + 'deg) ';
        transform += 'translateZ(-40px) ';
        $('.char-2').css('transform', transform);
    });
});