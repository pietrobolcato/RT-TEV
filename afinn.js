function getAfinnScoreText(afinn, textinput) { // get afinn score from an input text
  let words = textinput.split(/\W/); // split in words
  let scored_words = [];
  let total_score = 0;

  for (var i = 0; i < words.length; i++) { // calculate afinn for each word
    let word = words[i].toLowerCase();

    if (afinn.hasOwnProperty(word)) {
      let score = afinn[word];
      total_score += Number(score);
      scored_words.push(word + ': ' + score + ' ');
    }
  }

  let ret = {"total_score": total_score, "comparative": total_score / words.length}; // return total and comparative score
  return ret;
}

function getAfinnScoreWord(afinn, wordinput) { // get afinn score from a single word
  let total_score = 0;
  
  let word = wordinput.toLowerCase();

  if (afinn.hasOwnProperty(word)) {
    let score = afinn[word];
    total_score += Number(score);
  }
  
  return total_score;
}