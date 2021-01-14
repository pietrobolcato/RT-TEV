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

    // other walkers 
    walker.map(w => {
      let diffVect = p5.Vector.sub(w.pos, this.pos);

      let r = random(-1, 1);

      diffVect.setMag(abs(r));

      if (r > 0)
        this.acc.sub(diffVect); // diverge
      else
        this.acc.add(diffVect); // converge
      
      // console.log(r)

      // console.log(diffVect)
    })

    this.vel.add(this.acc);
    this.vel.limit(1);

    this.pos.add(this.vel);
  }

  show() {
    fill(36, 36, 42, this.opacity);
    stroke(201, 201, 187, this.opacityStroke);
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
    }, 500);
  }
}