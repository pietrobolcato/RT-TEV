let walker = []
let xoff = [];
let yoff = [];
let inc = [];

let tweets;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(218, 218, 202);

  for (var i = 0; i < 1; i++) {
    w = new Walker(width/2, height/2);
    walker.push(w);
    xoff.push(0);
    yoff.push(0);
    inc.push(random(1,3))
  }

  // let t = new Tweets('jJKwYVKkqnSkbr63NpK7Vzvkx', 'lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw', '364475473-kMBumzdzoxKZcduTwFGizG0iyMldRx1CQtcRXm2w', 'KBjBbqUZ0of2SQZDFEqSFof7kQPpENigIh7d3BMUQyCjN');
  // tweets = t.getTweets("trump", 5)

  // console.log(tweets);
}

function draw() {
  for (var i = 0; i < walker.length; i++) {
    walker[i].update(xoff[i], yoff[i], walker);
    walker[i].show();

    xoff[i] += inc[i];
    yoff[i] += inc[i];
  }  
}

function keyPressed() {
  if (key === "s") {
    for (var i = 0; i < walker.length; i++) 
      walker[i].hide();
    // noLoop()
  }
}