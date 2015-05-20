var twitter = require('twitter-text');

module.exports = function storm(text) {
  var LETTER_LIMIT = 140;
  var tweets = [];

  if (!text) {
    throw new Error('Must pass a long tweet or array of tweets from tweet storm.');
  }

  if (text instanceof Array) {
    var tweetStorm = text;
    tweets = tweetStorm.map(function(tweet) {
      return tweet.substr(tweet.match(/\d+\/ /g)[0].length);
    });

    return tweets.join(' ');
  }

  var words = text.split(' ');
  var newWords = [];
  var word;

  for (var i in words) {
    word = words[i] + ' ';

    if (word.length > LETTER_LIMIT) {
      // special case... the word given is longer than 140
      var splits = word.match(/.{1,135}/g).map(function(word, index, arr) {
        if (index !== arr.length - 1) {
          return word;
        }
        return word.trim();
      });

      word = splits[0] + ' ';
      splits.slice(1);

      newWords = newWords.concat(splits);
    } else {
      newWords.push(word.trim());
    }
  }

  var tweet = '';
  var tweetNum = 1;

  for (var j in newWords) {
    word = newWords[j] + ' ';
    var beforeTweet = tweetNum + '/ ' + tweet.trim();
    var afterTweet = tweetNum + '/ ' + (tweet + word).trim();

    if (twitter.getTweetLength(afterTweet) > LETTER_LIMIT) {
      tweets.push(beforeTweet);
      tweet = word;
      tweetNum += 1;
    } else {
      tweet += word;
    }
  }
  tweets.push(tweetNum + '/ ' + tweet.trim());

  if (tweets.length === 1) {
    return [ storm(tweets) ];
  }

  return tweets;
};
