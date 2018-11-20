var spriteY = 0;
var currX = 150;
var down = true;

var end = 28800000;

var lineStart = 75;

var damage = 0;

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

function render() {
  draw();
  document.addEventListener('keydown', function(event) {
    switch(event.code) {
      case "KeyW":
        if (!moveStarted && damage < 40)
          moving = setInterval(forward, 50);
          moveStarted = true;
          break;
      case "KeyD":
        currX -= 4;
        console.log('right');
        break;
      case "KeyA":
        currX += 4;
        console.log('left');
        break;
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
        break;
      case "ArrowUp":
        clearInterval(moving);
        moveStarted = false;
        break;
    }
  }, false);
}

function forward() {
  if (speed < 1) {
    speed += .01;
  }

  if (speed > 1) {
    speed = 1;
  }

  if (spriteY >= 10) {
    down = false;
  } else if (spriteY <= 0) {
    down = true;
  }
  if (down) {
    spriteY += speed;
  } else {
    spriteY -= speed;
  }

  if (spriteY > 10) {
    spriteY = 10;
  } else if (spriteY < 0) {
    spriteY = 0;
  }

  elapsedTime += 50;
  if (currX > 75) {
    currX -= 2;
  }

  console.log(currX);

  if (currX <= 75) {
    damage += 1;
  }

  if (damage >= 40) {
    clearInterval(moving);
  }

  draw();
}

function draw() {
  context.clearRect(0, 0, 1000, 1000);

  context.fillStyle = 'rgb(36, 36, 36)';
  context.fillRect(0, 0, 300, 11);

  context.fillStyle = 'rgb(100, 100, 100)';
  context.fillRect(0, 75, 480, 300);
  context.fillStyle = 'rgb(194, 178, 128)';

  context.beginPath();
  context.moveTo(0, 75);
  context.lineTo(currX - 1, 75);
  context.lineTo(0, 120);
  context.fill();

  context.beginPath();
  context.moveTo(currX + 1, 75);
  context.lineTo(300, 75);
  context.lineTo(300, 120);
  context.fill();

  roadLines(lineStart);
  if (lineStart == 75) {
    //lineStart = 85;
    lineStart = 75;
  } else {
    lineStart = 75;
  }
  context.drawImage(image, 8, 7, 320, 225, 0, spriteY, 300, 150);
}

function roadLines(x) {
  context.strokeStyle = 'rgb(204, 204, 0)';

  context.beginPath();
  context.moveTo(currX, x);
  let xVal = 150 + ((150 - currX) * 2);
  context.lineTo(xVal, 300);
  context.stroke();
  /*
  let i = x;
  let j = x / 15;
  let start = currX;
  while (i < x + 200) {
    context.lineWidth = j / 5;
    context.beginPath();
    context.moveTo(start, i);
    context.lineTo(start - lineX, i + j);
    context.stroke();
    start -= 2 * lineX;
    i += j * 2;
    j += 2;

  }*/
}
