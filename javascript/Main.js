document.addEventListener('DOMContentLoaded', setUp);
document.querySelector('#playAgain').addEventListener('click', setUp);
document.querySelector('#restart').addEventListener('click', setUp);

//#region variables globales
let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');
const WINNER_ELEM = document.querySelector("#winner-span");
const SECONDS = 30;
let time = SECONDS;
//#endregion


function setUp() {
    $("#startGameModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    document.querySelector("#startGame").addEventListener('click', start);
}

function start() {
    //#region declaraciones para empezar. 
    let lastClickedToken = null;
    let isMouseDown = false;
    time = SECONDS;

    let game = new Game();
    let player1_name = document.querySelector("#player1-name").value;
    let player2_name = document.querySelector("#player2-name").value;
    let player_1 = new Player(1, player1_name, game);
    let player_2 = new Player(2, player2_name, game);
    let playerPlaying = player_1;

    let earth = document.getElementById("earth");
    let mars = document.getElementById("mars");
    player_1.setTokens(earth, 100, 600);
    player_2.setTokens(mars, 1200, 600);

    const COUNTDOWN_ELEM = document.querySelector("#countdown");
    const PLAYER_PLAYING_ELEM = document.querySelector("#player-playing");
    //#endregion

    //#region declaracion de Event Listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
    PLAYER_PLAYING_ELEM.innerHTML = `${playerPlaying.getName()}`;
    //#endregion

    //#region Mouse Events
    function onMouseDown(event) {
        isMouseDown = true;
        let clickedToken = playerPlaying.findClickedToken(event.layerX, event.layerY);
        if (clickedToken != null) {
            clickedToken.setHighlighted(true);
            lastClickedToken = clickedToken;
        }
        game.display(player_1, player_2);
    }

    function onMouseMoved(event) {
        if (isMouseDown && lastClickedToken != null) {
            lastClickedToken.setPosition(event.layerX, event.layerY);
            game.display(player_1, player_2);
        }
    }

    function onMouseUp(event) {
        isMouseDown = false;
        if (lastClickedToken != null) {
            lastClickedToken.setHighlighted(false);
            if (game.handleTurn(event, playerPlaying)) {
                playerPlaying.deleteToken(lastClickedToken);
                switchPlayer();
            } else {
                lastClickedToken.startPosition();
            }
        }
        lastClickedToken = null;
        game.display(player_1, player_2)
    }
    //#endregion 

    //#region timer
    function switchPlayer() {
        if (playerPlaying === player_1) {
            playerPlaying = player_2;
        } else {
            playerPlaying = player_1;
        }
        time = SECONDS;
        PLAYER_PLAYING_ELEM.innerHTML = `${playerPlaying.getName()}`;
    }

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        COUNTDOWN_ELEM.innerHTML = `${minutes}:${seconds}`;
        time--;
        if (time === 0) {
            switchPlayer();
        }
    }

    //  setInterval(updateCountdown, 1000);
    //#endregion 

    game.display(player_1, player_2);
}


function showWinner(winner) {
    $("#winner").modal({
        backdrop: 'static',
        keyboard: false
    });
    WINNER_ELEM.innerHTML = `${winner.getName()}`;
}

function endGame() {
    $("#game-over").modal({
        backdrop: 'static',
        keyboard: false
    });
}