var spriteY = 0;
var currX = 110;
var down = true;

var end = 28800000;
//var end = 100;
var score = 0;

var left = false;

let saved = false;

var lineStart = 52;

var damage = 0;

let elapsedTime = 0;
let distance = 0;
let speed = 0;

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let moveStarted = false;

let moving = null;

let username;

let image = new Image();
image.src = 'images/spriteSheet.png';

function render() {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "controller.php?n=getUser", true);
  ajax.send();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      username = ajax.responseText
      if (username === 'UNKNOWN') {
        context.fillStyle = '#ffffff';
        context.fillText("Please login", 122, 75);
        var press = document.createElement("button");
        var text = document.createTextNode("Login");
        press.appendChild(text);
        press.onclick = function() {
          window.location.href = "index.html";
        };
        document.body.appendChild(press);
      } else {
        username = ajax.responseText;
        makeGame();
      }
    }
  }
}

function makeGame() {
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
        if (currX > 105 && damage < 40) {
          currX -= 4;
          console.log('right');
        }
        break;
      case "KeyA":
        if (damage < 40) {
          left = true;
        }
        break;
      case "ArrowUp":
        if (!moveStarted && damage < 40) {
          moving = setInterval(forward, 50);
          moveStarted = true;
        }
        break;
      case "ArrowRight":
        console.log('right');
        break;
      case "ArrowLeft":
        if (damage < 40) {
          left = true;
        }
        break;
    }
  }, false);

  document.addEventListener('keyup', function(event) {
    switch(event.code) {
      case "KeyW":
        moveStarted = false;
        break;
      case "ArrowUp":
        moveStarted = false;
        break;
      case "KeyA":
        left = false;
        break;
      case "ArrowLeft":
        left = false;
        break;
    }
  }, false);
}

function forward() {
  if (speed < 1 && moveStarted) {
    speed += .01;
  } else {
    speed -= .01;
  }

  if (speed > 1) {
    speed = 1;
  } else if (speed <= 0) {
    speed = 0;
    clearInterval(moving);
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

  if (elapsedTime >= end) {
    clearInterval(moving);
    score += 1;
    endScreen();
    if (!saved) {
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "controller.php?n=newScore&score=" + score, true);
      ajax.send();
      saved = true;
    }
  } else {
    if (damage >= 40 && !saved) {
      moveStarted = false;
      score += (elapsedTime / end);
      score = Math.floor(score);
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "controller.php?n=newScore&score=" + score, true);
      ajax.send();
      saved = true;
    }

    if (left) {
      if (currX < 225) {
        currX += 4;
      }
    }

    draw();
  }
}

function draw() {
  context.clearRect(0, 0, 1000, 1000);
  let hour = (new Date()).getHours();
  let sand = 'rgb(194, 178, 128)';
  let road = 'rgb(100, 100, 100)';
  let dirt = 'rgb(144, 128, 78)';
  let sky = '#b5d6e0';

  if (hour == 17 || hour == 7) {
    sky = "#ffef7a";
  } else if (hour == 18 || hour == 6) {
    sky = "#f7c16a";
  } else if (hour == 19 || hour == 5) {
    sky = "#ff6b3e";
  } else if (hour >= 20 || hour <= 4) {
    sky = "#27214e";
    road = "#000000";
    sand = 'rgb(144, 128, 78)';
    dirt = 'rgb(94, 78, 28)';
  }

  context.fillStyle = sand;
  context.fillRect(0, 60, 480, 300);

  context.fillStyle = road;

  context.beginPath();
  context.moveTo(currX - 5, 60);
  context.lineTo(currX + 5, 60);
  context.lineTo(currX + 300, 150);
  context.lineTo(currX - 300, 150);
  context.fill();

  context.fillStyle = dirt;
  context.beginPath();
  context.moveTo(currX - 5, 60);
  context.lineTo(currX - 300, 150);
  context.lineTo(currX - 400, 150);
  context.lineTo(currX - 10, 60);
  context.fill();

  context.beginPath();
  context.moveTo(currX + 5, 60);
  context.lineTo(currX + 300, 150);
  context.lineTo(currX + 400, 150);
  context.lineTo(currX + 10, 60);
  context.fill();


  roadLines(lineStart);
  if (lineStart >= 74) {
    lineStart = 52;
  } else {
    lineStart += 2 * speed;
  }

  context.fillStyle = sky;
  context.fillRect(0, 0, 300, 60)

  context.fillStyle = 'rgb(36, 36, 36)';
  context.fillRect(0, 0, 300, 11);

  context.drawImage(image, 8, 7, 320, 225, 0, spriteY, 300, 150);

  context.fillStyle = '#000000';

  context.fillText(username, 74, spriteY + 23);
}

function roadLines(yVal) {
  context.strokeStyle = 'rgb(204, 204, 0)';
  let i = currX;
  context.lineWidth = 4;
  context.beginPath();
  context.setLineDash([10, 12]);
  context.moveTo(currX, yVal);
  context.lineTo(currX + (200 - currX) * -1, 300);
  context.stroke();
}

function endScreen() {
  context.clearRect(0, 0, 1000, 1000);
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, 1000, 1000);
  context.fillStyle = '#ffffff';
  context.fillText("Shift complete. Press Enter to continue", 65, 60);
  document.addEventListener('keypress', function(event) {
    if (event.code === "Enter") {
      elapsedTime = 0;
      render();
    }
  }, false);
}
