let walker;

function setup() {
  createCanvas(600, 400);
  background(255, 111, 89);

  walker = new Walker(300 + random(-width/4, width/4), 200 + random(-height/4, height/4));
}

function draw() {
  walker.update();
  walker.show();
}

function keyPressed() {
  if (key === "s") {
    walker.hide();
    // noLoop()
  }
}