let walker = []
let xoff = [];
let yoff = [];
let inc = [];

let t;
let tweets;
let tweets_index = 0;
let next_max_id = -1;
let fetch_started = false;

let afinn;

let randcount = 0;

let query = "hate";
let n_walkers = 10;

function preload() {
  afinn = loadJSON('afinn.json');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  // background(255, 111, 89);
  background(218, 218, 202);
  // frameRate(10)

  for (var i = 0; i < n_walkers; i++) {
    w = new Walker(width / 2, height / 2);
    walker.push(w);
    xoff.push(0);
    yoff.push(0);
    inc.push(random(1, 3))
  }

  t = new Tweets('jJKwYVKkqnSkbr63NpK7Vzvkx', 'lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw', '364475473-kMBumzdzoxKZcduTwFGizG0iyMldRx1CQtcRXm2w', 'KBjBbqUZ0of2SQZDFEqSFof7kQPpENigIh7d3BMUQyCjN');
  // tweets = JSON.parse("[\"@parlertakes We should not let fraudulent conspiracy theories infiltrate the social media sites that have made a di… https://t.co/7D2QK3oNYi\",\"@monica_2978 You won't: You'll only meett anti-Trump supporters.\",\"@RepSwalwell and I compare you sir to David Sheldon Boone.  you going to walk back your words now that the FBI has… https://t.co/res3CLK7cz\",\"@SARA2001NOOR @businessinsider I need reliable source to believe it and retweet. Can you help me with that?\\n\\nIf it'… https://t.co/pjhbke84S0\",\"I am screaming at Trump stealing shit from the White House. If he aint gonna be shit he might as well commit to it.\",\"@DJJudd @jaketapper @AlliemalCNN Let’s count, #trump #mccarthy #guliani #trumpjr #ivanka #jared #erick #jordan I could go on.\",\"@briantylercohen Moving Trump stuff!! Yes!\",\"@BolsonaroSP O motivo foi a fake news que o Trump inventou de que as eleições teriam sido roubadas.\",\"@flofi_kb @DerGraue2 @NiemalsD Sie haben ja NICHTS! ASYLANTEN...ASYLANTEN...Wenn da nix zu holen ist...Querdenken..… https://t.co/RAyUVZBotQ\",\"@laurenboebert She wants your money - Yep she is a female Trump\",\"The man is not even president and he already has a plan to deal with the pandemic. Trump never had one after a year. https://t.co/fV3QWEj1Pe\",\"@PaulSmithTO @Pragmatron1 @mustangmadd @DianeMariePosts Blocking, true, is unrelated to free speech, but so is twit… https://t.co/xW1iMtVpUM\",\"@RepMattGaetz @DonaldJTrumpJr Haha! That's a joke. Millions are still unemployed since March 20, 2020. 375,000 have… https://t.co/JdpYp46GVr\",\"Il y a quelque chose de bizarre qui se passe... si Trump est un fou et que personne ne votera pas pour lui, cela do… https://t.co/vywQW80w7o\",\"@justchillin1998 @sirach_23_28 @stltoday Other than spending way more money how do these plans differ from Trump’s plans?\",\"Perhaps she will be generous enough to donate it to Trump’s Presidential Library. https://t.co/3Pk0Utfzsg\"]")
}

async function draw() {
  if (tweets_index === 0 || randcount > 1000) {
    // noLoop()

    if (fetch_started === false) {
      fetch_started = true;

      let tweets_result = await t.getTweets(query, 150, next_max_id)
      tweets = tweets_result.text.join(". ").split(/\W/);
      next_max_id = tweets_result.next;

      fetch_started = false;
      randcount = 0;
      // console.log("nuovo")
      console.log(tweets, next_max_id)
    }
  }

  if (typeof tweets === "undefined" || typeof tweets[tweets_index] === "undefined") { // random
    console.log("rand")
    for (var i = 0; i < walker.length; i++) {
      walker[i].update("random", walker);
      walker[i].show();

      xoff[i] += inc[i];
      yoff[i] += inc[i];
    }

    randcount += 1;
  } else {
    let affScore = getAfinnScoreWord(afinn, tweets[tweets_index]);

    for (var i = 0; i < walker.length; i++) {
      if (affScore > 0) {
        walker[i].update("converge", walker);
      }
      else if (affScore < 0) {
        walker[i].update("diverge", walker);
      } else if (affScore === 0) {
        walker[i].update("random", walker);
      }

      walker[i].show();

      xoff[i] += inc[i];
      yoff[i] += inc[i];
    }

    console.log(getAfinnScoreWord(afinn, tweets[tweets_index]));
    tweets_index++;

    if (tweets_index >= tweets.length) {
      tweets_index = 0;
    }
  }
}

function keyPressed() {
  if (key === "s") {
    for (var i = 0; i < walker.length; i++)
      walker[i].hide();
    // noLoop()
  } else if (key === 'x') {
    console.log("stop")
    noLoop()
  }
}