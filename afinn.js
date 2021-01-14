function getAfinnScoreText(afinn, textinput) {
  let words = textinput.split(/\W/);
  let scored_words = [];
  let total_score = 0;

  for (var i = 0; i < words.length; i++) {
    let word = words[i].toLowerCase();

    if (afinn.hasOwnProperty(word)) {
      let score = afinn[word];
      // console.log(word, score);
      total_score += Number(score);
      scored_words.push(word + ': ' + score + ' ');
    }
  }

  let ret = {"total_score": total_score, "comparative": total_score / words.length};
  return ret;
}

function getAfinnScoreWord(afinn, wordinput) {
  let total_score = 0;
  
  let word = wordinput.toLowerCase();

  if (afinn.hasOwnProperty(word)) {
    let score = afinn[word];
    // console.log(word, score);
    total_score += Number(score);
  }
  
  return total_score;
}