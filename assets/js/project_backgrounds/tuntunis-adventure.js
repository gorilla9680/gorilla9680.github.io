var stitches = [];
var stitchTotal = 5;
var stitchCurrent = 1;

var frameCounter = 0;
var frameSpacing = 100;

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("tuntunis-adventure");

  background(255);

  for (var i = 0; i < stitchCurrent; i++) {
    stitches[i] = new runningStitch();
  }
}

function draw() {

  stitchManager();
  stitchDeleter();

  for (var i = 0; i < stitchCurrent; i++) {
    stitches[i].stitchMachine();
  }

  for (var i = 0; i < stitchCurrent; i++) {
    stitches[i].show();
  }

}

function stitchManager() {
  frameCounter += 1;

  if (stitchCurrent < stitchTotal) {
    if (frameCounter > frameSpacing) {

      stitches.push(new runningStitch());
      stitchCurrent += 1;

      frameCounter = 0;
    }
  }
}

function stitchDeleter() {

  for(i = 0; i < stitchCurrent; i++){
    if (stitches[i].eraserDrift > stitches[i].baxa.width) {
      stitches.splice(i, 1);
      stitchCurrent -= 1;
    }
  }
}

function runningStitch() {
  this.baxa = createGraphics(random(windowWidth/4, windowWidth/2), windowHeight/2);
  this.baxaAngle = random(0, 2 * PI);

  this.amplitude = random(20, 60);
  this.angle = 0;
  this.eraserAngle = 0;

  this.originX = 0
  this.originY = this.baxa.height / 2;

  this.drift = 0;
  this.eraserDrift = 0;
  this.speed = random(1, 4);

  this.stitchSize = 20;
  this.stitchColor = color(random(255), random(255), random(255));

  this.imagePosX = random(windowWidth);
  this.imagePosY = random(windowHeight);

  this.stitchMachine = function() {
    if (this.drift < this.baxa.width) {
      this.stitch();
    } else {
      this.baxa.strokeWeight(10);
      this.baxa.stroke(255);

      this.removeStitch();
    }
  }

  this.stitch = function() {

    this.dotted();

    var ringX = this.originX + this.drift;
    var ringY = this.originY + this.amplitude * sin(this.angle);

    this.baxa.point(ringX, ringY);

    this.angle += PI / 90;

    this.drift += this.speed;

  }

  this.removeStitch = function() {

    var ringX = this.originX + this.eraserDrift;
    var ringY = this.originY + this.amplitude * sin(this.eraserAngle);

    this.baxa.point(ringX, ringY);

    this.eraserAngle += PI / 90;

    this.eraserDrift += this.speed;

  }

  this.dotted = function() {
    if (this.drift % this.stitchSize > this.stitchSize / 2) {
      this.baxa.strokeWeight(3);
      this.baxa.stroke(this.stitchColor);
    } else {
      this.baxa.strokeWeight(0);
      this.baxa.stroke(255);
    }
  }

  this.show = function() {
    push();
    translate(width/2, height/2);
    rotate(this.baxaAngle);
    translate(-width/2, -height/2);
    image(this.baxa, 0, 0);
    pop();
  }
}
