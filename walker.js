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
    if (this.opacity > 0) {
      this.acc = p5.Vector.random2D();

      this.vel.add(this.acc);
      this.vel.limit(1);

      this.pos.add(this.vel);
    } else {
      noLoop()
      clearInterval(this.interval)
    }
  }

  show() {
    fill(63, this.opacity);
    stroke(218, 218, 202, this.opacityStroke);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  hide() {
    this.interval = setInterval(() => {
      this.opacity--;
      // this.size = map(this.opacity, 0, 50, 0, 32); 
      // this.opacityStroke = map(this.opacityStroke, 0, 50, 0, 255);
      console.log(this.opacity, this.size);
    }, 500);
    // for (var i = this.var3; i >= 0; i--) {
    //   
    //   console.log(i)
    // }

    // fill(51, 255);
    // ellipse(this.pos.x, this.pos.y, 32);

    // noFill();
    // arc(this.pos.x, this.pos.y, 70, 70, PI, PI + QUARTER_PI);
  }
}