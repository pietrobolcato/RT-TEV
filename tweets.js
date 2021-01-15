class Tweets {
  constructor(consumerKey, consumerSecret, token, tokenSecret) {
    this.cb = new Codebird();
    this.cb.setConsumerKey(consumerKey, consumerSecret);
    this.cb.setToken(token, tokenSecret);
  }

  getTweets(query, quantity, max_id = -1) {
    let tweet_texts = []

    let params = {
      q: query + " lang:en",
      result_type: 'recent',
      count: quantity
    };

    if (max_id !== -1)
      params["since_id"] = max_id;

    return new Promise((resolve, reject) => {
      this.cb.__call(
        "search_tweets",
        params,
        function (reply) {
          var statuses = reply.statuses;

          if (typeof statuses === "undefined") {
            let ret = {
              "text": [],
              "max_id": -1
            }

            resolve(ret) 
          } else {
            for (var i = 0; i < statuses.length; i++) {
              var tweet = statuses[i];
              if (!tweet.retweeted_status) {
                tweet_texts.push(tweet.text);
              }
            }

            let ret = {
              "text": tweet_texts,
              "max_id": reply.search_metadata.max_id
            }

            resolve(ret)
          }
        }
      );
    })
  }
}