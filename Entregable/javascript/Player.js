class Player {
    constructor(id, name, game) {
        this.id = id;
        this.name = name;
        this.tokens = [];
        this.game = game;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setTokens(image, posX, posY) {
        for (let i = 0; i < 21; i++) {
            let token = new Token(posX, posY, 30, image);
            this.tokens.push(token);
            posY = posY - 20;

        }
    }

    drawTokens() {
        this.tokens.forEach(element => {
            element.draw();
        });
    }

    findClickedToken(x, y) {
        for (let index = 0; index < this.tokens.length; index++) {
            let element = this.tokens[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
        return null;
    }
}