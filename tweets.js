class Tweets {
  constructor(consumerKey, consumerSecret, token, tokenSecret) {
    this.cb = new Codebird();
    this.cb.setConsumerKey(consumerKey, consumerSecret);
    this.cb.setToken(token, tokenSecret);
  }

  getTweets(query, quantity) {
    let ret = []

    let params = {
      q: query,
      result_type: 'recent',
      count: quantity
    };

    this.cb.__call(
      "search_tweets",
      params,
      function (reply) {
        var statuses = reply.statuses;
        for (var i = 0; i < statuses.length; i++) {
          var tweet = statuses[i];
          if (!tweet.retweeted_status) {
            ret.push(tweet.text);
          }
        }
        // print the max_id which helps if you want to grab pages of data
        // print('max_id: ' + reply.search_metadata.max_id);
      }
    );

    return ret;
  }
}