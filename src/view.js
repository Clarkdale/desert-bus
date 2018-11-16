function gameHook() {
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = 'rgb(100, 100, 100)';
  context.fillRect(0, 75, 480, 300);
  context.fillStyle = 'rgb(194, 178, 128)';

  context.beginPath();
  context.moveTo(0, 75);
  context.lineTo(149, 75);
  context.lineTo(15, 110);
  context.lineTo(0, 110);
  context.fill();

  context.beginPath();
  context.moveTo(151, 75);
  context.lineTo(300, 75);
  context.lineTo(300, 110);
  context.lineTo(285, 110);
  context.fill();

  var image = new Image();
  image.src = '../images/spriteSheet.png';
  image.onload = function() {
    context.drawImage(image, 8, 7, 320, 225, 0, 0, 300, 150);
  }
}
