class Rect extends Figure {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        this.height = height;
        this.width = width;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);

        if (this.highlighted === true) {
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.strokeRect(this.posX, this.posY, this.width, this.height);
        }
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }
}