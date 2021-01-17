class Tweets {
  constructor(consumerKey, consumerSecret, token, tokenSecret) { // initalize the API with the keys and tokens
    this.cb = new Codebird();
    this.cb.setConsumerKey(consumerKey, consumerSecret);
    this.cb.setToken(token, tokenSecret);
  }

  getTweets(query, quantity, max_id = -1) { // get english tweets and returns a promise
    let tweet_texts = []
    let min_id = -1;

    let params = {
      q: query + " lang:en",
      result_type: 'recent',
      count: quantity
    };

    if (max_id !== -1)
      params["max_id"] = max_id;

    return new Promise((resolve, reject) => {
      this.cb.__call(
        "search_tweets",
        params,
        function (reply) {
          var statuses = reply.statuses;

          if (typeof statuses === "undefined") {
            let ret = {
              "text": [],
              "next": -1
            }

            resolve(ret) 
          } else {
            for (var i = 0; i < statuses.length; i++) {
              var tweet = statuses[i];
              tweet_texts.push(tweet.text);
              if (tweet.id < min_id || min_id === -1)
                min_id = tweet.id;
            }

            let ret = {
              "text": tweet_texts,
              "next": reply.search_metadata.next_results.substr(8, 19)
            }

            resolve(ret)
          }
        }
      );
    })
  }
}