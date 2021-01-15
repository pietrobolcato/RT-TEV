class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);

    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(3));

    this.opacity = 50;
    this.opacityStroke = 50;
    this.size = 32;
  }

  update() {
    this.acc = p5.Vector.random2D();

    this.vel.add(this.acc);
    this.vel.limit(1);

    this.pos.add(this.vel);
  }

  show() {
    fill(36, 36, 42, random(this.opacity / 10, this.opacity));
    stroke(201, 201, 187, random(this.opacity / 10, this.opacityStroke));
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  hide() {
    this.interval = setInterval(() => {
      this.opacity--;

      if (this.opacity === 0) {
        clearInterval(this.interval);
        noLoop();
      }

      console.log(this.opacity)
    }, 5000);
  }
}