var whiteCursor, redCursor, blueCursor;

function startGame() {
    myGameArea.start();
    whiteCursor = new component(3, 200, "white", 0, 70);
    redCursor = new component(3, 200, "red", 0, 330);
    blueCursor = new component(3, 200, "blue", 0, 600);
    whiteCursor.speedX = 2;
    redCursor.speedX = 4;
    blueCursor.speedX = 8;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1600;
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
        if (this.x > myGameArea.canvas.width) {
            this.speedX = -this.speedX;
        } else if (this.x < 0) {
            this.speedX = -this.speedX;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    whiteCursor.newPos();
    redCursor.newPos();
    blueCursor.newPos();
    whiteCursor.update();
    redCursor.update();
    blueCursor.update();
}
