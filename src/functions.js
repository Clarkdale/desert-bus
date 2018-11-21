var spriteY = 0;
var currX = 110;
var down = true;

var end = 28800000;

var lineStart = 60;

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
        if (!moveStarted && damage < 40) {
          moving = setInterval(forward, 50);
          moveStarted = true;
        }
        break;
      case "KeyD":
        if (currX > 105) {
          currX -= 4;
          console.log('right');
        }
        break;
      case "KeyA":
        if (currX < 225) {
          currX += 4;
          console.log(currX);
          console.log('left');
        }
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
  if (currX > 105) {
    currX -= 2;
  }

  if (currX <= 105 || currX >= 225) {
    damage += 1;
  }

  if (damage >= 40) {
    clearInterval(moving);
    //console.log(elapsedTime / end);
  }

  draw();
}

function draw() {
  context.clearRect(0, 0, 1000, 1000);

  context.fillStyle = 'rgb(36, 36, 36)';
  context.fillRect(0, 0, 300, 11);

  context.fillStyle = 'rgb(194, 178, 128)';
  context.fillRect(0, 60, 480, 300);


  context.fillStyle = 'rgb(100, 100, 100)';

  context.beginPath();
  context.moveTo(currX - 5, 60);
  context.lineTo(currX + 5, 60);
  context.lineTo(currX + 300, 150);
  context.lineTo(currX - 300, 150);
  context.fill();


  roadLines(lineStart);
  if (lineStart == 60) {
    //lineStart = 85;
    lineStart = 60;
  } else {
    lineStart = 60;
  }
  //context.drawImage(image, 8, 7, 320, 225, 0, spriteY, 300, 150);
}

function roadLines(x) {
  context.strokeStyle = 'rgb(204, 204, 0)';
  let i = currX;
  let yVal = x;

  while (i < 200) {
    context.beginPath();
    context.moveTo(currX, yVal);
    context.lineTo(currX + (200 - currX) * -1, 300);
    context.stroke();
    i += 200;
  }
}

function slope(val) {
  val *= 240;
  val /= (currX - 200);
  return val;
}
