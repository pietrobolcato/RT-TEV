class Walker {
  constructor(x, y) { // initalize the walker
    this.pos = createVector(x, y, sizemult);

    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(3));

    this.opacity = 50;
    this.opacityStroke = 50;
    this.size = 32 * sizemult;
  }

  update(action, walker) {
    this.acc = p5.Vector.random2D();

    // other walkers 
    walker.map(w => {
      let diffVect = p5.Vector.sub(w.pos, this.pos);

      if (action === "random") { // calculate attraction 
        let r = random(-1, 1);
        diffVect.setMag(abs(r));

        if (r > 0)
          this.acc.sub(diffVect); // diverge
        else
          this.acc.add(diffVect); // converge

      } else if (action === "diverge") {
        this.acc.sub(diffVect);
      } else if (action === "converge") {
        this.acc.add(diffVect);
      }
    })

    this.vel.add(this.acc); // compute velocity vector
    this.vel.limit(1);

    this.pos.add(this.vel); // compute position vector
  }

  show() { // show the walker
    fill(36, 36, 42, random(this.opacity / 10, this.opacity));
    stroke(201, 201, 187, random(this.opacity / 10, this.opacityStroke));
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  hide() { // starts the ending procedure
    this.interval = setInterval(() => {
      this.opacity--;

      if (this.opacity === 6) { // stop
        clearInterval(this.interval);
        noLoop();
        saveCanvas(query + "_" + n_walkers + "_" + time, "png")
      }

      console.log(this.opacity)
    }, 1200 * sizemult);
  }
}