var whiteCursor, redCursor, blueCursor, yellowCursor, greenCursor, purpleCursor;

function startGame() {
    myGameArea.start();
    whiteCursor = new component(3, 200, "white", 0, myGameArea.canvas.height / 3 - 270);
    redCursor = new component(3, 200, "red", 0, 2*myGameArea.canvas.height / 3 - 270);
    blueCursor = new component(3, 200, "blue", 0, 3*myGameArea.canvas.height / 3- 270);
    yellowCursor = new component(200, 3, "yellow", myGameArea.canvas.width / 3 - 440, 0);
    greenCursor = new component(200, 3, "green", 2*myGameArea.canvas.width / 3 - 440, 0);
    purpleCursor = new component(200, 3, "purple", 3*myGameArea.canvas.width / 3 - 440, 0);
    whiteCursor.speedX = 2;
    redCursor.speedX = 4;
    blueCursor.speedX = 8;
    yellowCursor.speedY = 16;
    greenCursor.speedY = 32;
    purpleCursor.speedY = 64;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1920;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > myGameArea.canvas.width) {
            this.speedX = -this.speedX;
        } else if (this.x < 0) {
            this.speedX = -this.speedX;
        } else if (this.y > myGameArea.canvas.height) {
            this.speedY = -this.speedY;
        } else if (this.y < 0) {
            this.speedY = -this.speedY;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    whiteCursor.newPos();
    redCursor.newPos();
    blueCursor.newPos();
    yellowCursor.newPos();
    greenCursor.newPos();
    purpleCursor.newPos();
    whiteCursor.update();
    redCursor.update();
    blueCursor.update();
    yellowCursor.update();
    greenCursor.update();
    purpleCursor.update();
}