# tweetstorm [![Build Status](https://travis-ci.org/ryanseys/tweetstorm.svg)](https://travis-ci.org/ryanseys/tweetstorm)

> Convert a string into a properly formatted tweet storm and convert a tweet storm back to the original tweet.

## Install

```sh
npm install --save tweetstorm
```

## Usage

```js
var tweetStorm = require('tweetstorm');
var veryLongString = 'this is a very long string...'; // greater than 140 characters

// Converting a string to a tweet storm.
var storm = tweetStorm(veryLongString);
// [ '1/ this is a very long string', '/2 ...long string ends here.' ]

// Converting a tweet storm back into the original tweet.
var originalTweet = tweetStorm(storm);
// originalTweet === veryLongString
```

## License

MIT &copy; 2015 Ryan Seys
