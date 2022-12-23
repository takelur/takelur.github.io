// Get the canvas element and set up the context
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

// Set the canvas size to the window's inner size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Prevent scrolling when using mouse wheel
canvas.addEventListener("wheel", function(event) {
    event.preventDefault();
  });  

// Set up the car image
var carImg = new Image();
carImg.src = 'car.png';

// Set up the car object
var car = {
    x: canvas.width / 2,  // The car's x position
    y: canvas.height / 2, // The car's y position
    angle: 0,
    xSpeed: 0,
    ySpeed: 0
  };
  


// Prevent the default behavior of the left, up, right, down, and spacebar keys
window.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 32) {
      event.preventDefault();
    }
  });

// Set up the keyboard controls
var keysDown = {};
window.addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);
window.addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

// Set up the update function
function update() {
    // Calculate the magnitude of the car's x and y speeds
    var speed = Math.sqrt(car.xSpeed * car.xSpeed + car.ySpeed * car.ySpeed);
  
    // Only allow the car's angle to be updated if the car is moving above a certain threshold
    var turningThreshold = 0.1;
    if (speed > turningThreshold) {
      // Update the car's angle based on the left and right arrow keys
      var turningRate = 2.2;  // Adjust the turning rate here
      if (37 in keysDown) { // left arrow
        car.angle -= turningRate;
      }
      if (39 in keysDown) { // right arrow
        car.angle += turningRate;
      }
    }
  
    // Update the car's x and y speed based on the up and down arrow keys
    var acceleration = 0.1;
    if (38 in keysDown) { // up arrow
      car.xSpeed += acceleration * Math.cos(car.angle * Math.PI / 180);
      car.ySpeed += acceleration * Math.sin(car.angle * Math.PI / 180);
    }
    if (40 in keysDown) { // down arrow
      car.xSpeed -= acceleration * Math.cos(car.angle * Math.PI / 180);
      car.ySpeed -= acceleration * Math.sin(car.angle * Math.PI / 180);
    }
  
    // Apply some friction to the car's movement direction
    car.xSpeed *= 0.99;
    car.ySpeed *= 0.99;
  
    // If the spacebar is pressed, apply a strong friction value to the car's x and y speeds
    if (32 in keysDown) { // spacebar
      car.xSpeed *= 0.94;
      car.ySpeed *= 0.94;
    }
  
    // Update the car's position based on its x and y speed
    car.x += car.xSpeed;
    car.y += car.ySpeed;
  
    // Clamp the car's position to the canvas bounds
    car.x = Math.max(0, Math.min(canvas.width, car.x));
    car.y = Math.max(0, Math.min(canvas.height, car.y));
  }
  
  

// Set up the draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save the context and rotate it to the car's angle
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate((car.angle + 90) * Math.PI / 180);

  // Scale down the car image
  ctx.scale(0.15, 0.15);

  // Draw the car
  ctx.drawImage(carImg, -carImg.width / 2, -carImg.height / 2);

  // Restore the context
  ctx.restore();
}

// Set up the game loop
function gameLoop() {
  update();  // Update the game state
  draw();  // Draw the game to the canvas

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);