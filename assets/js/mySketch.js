var click = 0;
var mouseRipples = [];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("mySketch");

  noFill();
  stroke(0);
}

function draw() {

  background(255);

  if (mouseIsPressed) {

    if ((mouseRipples[click] == null) || (mouseRipples[click - 1] == null)) {

      click += 1;
      mouseRipples[click] = new ripple(mouseX, mouseY);
    }

    else if (dist(mouseRipples[click - 1].posX, mouseRipples[click - 1].posY, mouseX, mouseY) > 2) {
      click += 1;
      mouseRipples[click] = new ripple(mouseX, mouseY);
    }
  }

  if (mouseRipples[click] != null) {

    for (var i = 1; i <= click; i++) {
      mouseRipples[i].grow();

    }
  }
}

function ripple(x, y) {
  this.posX = x;
  this.posY = y;

  this.size = 0;
  this.speed = 2;

  this.opacity = 255;

  this.grow = function() {

    stroke(0, 0, 0, this.opacity);
    ellipse(this.posX, this.posY, this.size, this.size);
    stroke(0, 0, 0, this.opacity + 50);
    ellipse(this.posX, this.posY, this.size / 1.2, this.size / 1.2);

    this.opacity -= this.speed / this.speed;
    this.size += this.speed / this.speed;
  }

}
