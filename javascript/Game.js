class Game {
    constructor() {
        this.board = [];
        this.actualPlayer = null;
        this.board_img = new Image();
        this.setUpBoard();
        this.NUM_ROWS = 6;
        this.NUM_COLUMNS = 7;
    }

    setUpBoard() {
        const NUM_ROWS = 6;
        for (let rowIndex = 0; rowIndex < NUM_ROWS; rowIndex++) {
            this.board[rowIndex] = ['_', '_', '_', '_', '_', '_', '_'];
        }
    }

    //#region display
    display(player1, player2) {
        this.clearCanvas();
        this.displayBoard()
        player1.drawTokens();
        player2.drawTokens();
    }

    displayBoard() {
            let img = document.getElementById("bg-image");
            context.drawImage(img, 0, 0);
        }
        //#endregion

    //#region playing handler
    handleTurn(event, player) {
        this.actualPlayer = player;
        if (!this.isValidPlayed(event)) {
            return false;
        }
        this.checkForWinner();
        return true;
    }

    isValidPlayed(event) {
        let posX = event.layerX;
        let posY = event.layerY;
        let token = this.actualPlayer.findClickedToken(posX, posY);
        let col;

        switch (true) {
            case (posX < 300):
                return false;
            case (posX > 1100):
                return false;
            case (posX < 400):
                col = 0;
                break;
            case (posX < 500):
                col = 1;
                break;
            case (posX < 600):
                col = 2;
                break;
            case (posX < 700):
                col = 3;
                break;
            case (posX < 800):
                col = 4;
                break;
            case (posX < 900):
                col = 5;
                break;
            case (posX < 1000):
                col = 6;
                break;
            case (posX < 1100):
                col = 7;
                break;
        }
        let row = this.getRow(col);
        if (row != -1 && posY < 200) {
            let tokenX = ((col * 100) + 350);
            let tokenY = ((row * 100) + 150);
            token.setPosition(tokenX, tokenY);
            this.board[row][col] = this.actualPlayer.getId();
            return true;
        }
        return false;
    }

    getRow(col) {
            for (let row = this.NUM_ROWS - 1; row >= 0; row--) {
                if (this.board[row][col] === "_") {
                    return row;
                }
            }
            return -1;
        }
        //#endregion

    //#region winner checks 
    checkForWinner() {
        console.log(this.board);
        if ((this.checkHorizontalWin() || this.checkVerticalWin()) || (this.checkDiagonalWinLeft() || this.checkDiagonalWinRight())) {
            this.declareWinner();
        } else if (this.checkIfFull()) {
            this.declareEnd();
        }
    }

    checkHorizontalWin() {
        let id = this.actualPlayer.getId();
        let counter = 0;
        for (let row = this.NUM_ROWS - 1; row >= 0; row--) {
            counter = 0;
            for (let col = 0; col < this.NUM_COLUMNS; col++) {
                if (this.board[row][col] === id) {
                    counter++;
                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return false;
    }

    checkVerticalWin() {
        let id = this.actualPlayer.getId();
        let counter = 0;
        for (let col = 0; col < 7; col++) {
            counter = 0;
            for (let row = this.NUM_ROWS - 1; row >= 0; row--) {
                if (this.board[row][col] === id) {
                    counter++;
                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
        return false;
    }

    checkDiagonalWinLeft() {
        let id = this.actualPlayer.getId();
        for (let subrow = this.NUM_ROWS - 1; subrow >= 3; subrow--) {
            for (let subcol = 0; subcol < 4; subcol++) {
                if (this.board[subrow][subcol] === id) {
                    let diagonal1 = this.board[subrow - 1][subcol + 1];
                    let diagonal2 = this.board[subrow - 2][subcol + 2];
                    let diagonal3 = this.board[subrow - 3][subcol + 3];
                    if ((id === diagonal1) && (id === diagonal2) && (id === diagonal3)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkDiagonalWinRight() {
        let id = this.actualPlayer.getId();
        for (let subrow = this.NUM_ROWS - 1; subrow >= 3; subrow--) {
            for (let subcol = 3; subcol < 7; subcol++) {
                if (this.board[subrow][subcol] === id) {
                    let diagonal1 = this.board[subrow - 1][subcol - 1];
                    let diagonal2 = this.board[subrow - 2][subcol - 2];
                    let diagonal3 = this.board[subrow - 3][subcol - 3];
                    if ((id === diagonal1) && (id === diagonal2) && (id === diagonal3)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkIfFull() {
            for (let row = 0; row < this.NUM_ROWS; row++) {
                for (let col = 0; col < this.NUM_COLUMNS; col++) {
                    if (this.board[row][col] === "_") {
                        return false;
                    }
                }
            }
            this.declareEnd();
            return true;
        }
        //#endregion

    //#region utilities
    clearCanvas() {
        context.fillStyle = '#F8F8FF';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    declareWinner() {
        showWinner(this.actualPlayer);
    }

    declareEnd() {
            endGame();
        }
        //#endregion

}