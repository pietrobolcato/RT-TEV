let walker;

function setup() {
  createCanvas(600, 400);
  background(218, 218, 202);

  walker = new Walker(300, 200);
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