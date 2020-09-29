class Token {

    constructor(posX, posY, radius, image) {
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.context = context;
        this.radius = radius;
        this.highlighted = false;
        this.highlightedStyle = 'yellow';
        this.startPosX = posX;
        this.startPosY = posY;
    }

    draw() {

        let imageScaledSize = this.radius * 2
        let imageX = this.posX - this.radius;
        let imageY = this.posY - this.radius;
        context.drawImage(this.image, imageX, imageY, imageScaledSize, imageScaledSize);

        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);


        if (this.highlighted === true) {
            context.strokeStyle = this.highlightedStyle;
            context.lineWidth = 5;
            context.stroke();
        }
        context.closePath()
    }

    getRadius() {
        return this.radius
    }

    setHighlighted(param) {
        this.highlighted = param;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    startPosition() {
        this.posX = this.startPosX;
        this.posY = this.startPosY;
    }
}