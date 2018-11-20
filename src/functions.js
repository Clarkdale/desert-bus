var spriteY = 0;
var down = true;

var lineStart = 75;

let elapsedTime = 0;
let distance = 0;
let speed = 0;

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let moveStarted = false;

let moving = null;

let image = new Image();
image.src = '../images/spriteSheet.png';
image.onload = function() {
  context.drawImage(image, 8, 7, 320, 225, 0, spriteY, 300, 150);
}

// Start things off


function render() {
  draw();
  document.addEventListener('keydown', function(event) {
    switch(event.code) {
      case "KeyW":
        if (!moveStarted)
          moving = setInterval(forward, 50);
          moveStarted = true;
        console.log("forward");
        break;
      case "KeyD":
        console.log('right');
        break;
      case "KeyA":
        console.log('left');
        break;

      // ================ HAS NOT BEEN FIXED ================
      case "ArrowUp":
        if (!moveStarted)
          moving = setInterval(forward, 50);
          moveStarted = true;
        console.log("forward");
        break;
      case "ArrowRight":
        console.log('right');
        break;
      case "ArrowLeft":
        console.log('left');
        break;

    }
  }, false);

  document.addEventListener('keyup', function(event) {
    switch(event.code) {
      case "KeyW":
        clearInterval(moving);
        moveStarted = false;
        console.log(moving);
      case "ArrowUp":
        clearInterval(moving);
        moveStarted = false;
        console.log(moving);
    }
  }, false);
}

function forward() {
  if (spriteY == 10) {
    down = false;
  } else if (spriteY == 0) {
    down = true;
  }
  if (down) {
    spriteY++;
  } else {
    spriteY--;
  }
  draw();
}

function draw() {
  context.clearRect(0, 0, 1000, 1000);

  context.fillStyle = 'rgb(36, 36, 36)';
  context.fillRect(0, 0, 300, 10);

  context.fillStyle = 'rgb(100, 100, 100)';
  context.fillRect(0, 75, 480, 300);
  context.fillStyle = 'rgb(194, 178, 128)';

  context.beginPath();
  context.moveTo(0, 75);
  context.lineTo(149, 75);
  context.lineTo(0, 120);
  context.fill();

  context.beginPath();
  context.moveTo(151, 75);
  context.lineTo(300, 75);
  context.lineTo(300, 120);
  context.fill();

  roadLines(lineStart);
  if (lineStart == 75) {
    lineStart = 85;
  } else {
    lineStart = 75;
  }
  context.drawImage(image, 8, 7, 320, 225, 0, spriteY, 300, 150);
}

function roadLines(x) {
  context.strokeStyle = 'rgb(204, 204, 0)';
  let i = x;
  let j = x / 15;
  while (i < x + 200) {
    context.lineWidth = j / 5;
    context.beginPath();
    context.moveTo(150, i);
    context.lineTo(150, i + j);
    context.stroke();
    i += j * 2;
    j += 2;
  }
}
