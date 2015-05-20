var assert = require('assert');
var tweetStorm = require('./tweetstorm.js');
var repeat = require('repeat-string');

describe('tweetStorm', function() {
  it('should keep string unchanged if less than 140 characters', function() {
    var storm = tweetStorm('hello world');

    assert(storm instanceof Array);
    assert.equal(storm.length, 1);
    assert.equal(storm[0], 'hello world');
  });

  it('should split strings longer than 140 manually', function() {
    var storm = tweetStorm(repeat('B', 141));

    assert(storm instanceof Array);
    assert.equal(storm.length, 2);
    assert.equal(storm[0].length, 138);
    assert.equal(storm[1].length, 9);
  });

  it('should only count the url against up to a degree', function() {
    var originalTweet = repeat('https://drive.google.com/thisurlisreallylong ', 10).trim();
    var storm = tweetStorm(originalTweet);
    var shouldBeThisManyTweets = 3;
    var actuallyThisManyTweets = 2;

    assert(actuallyThisManyTweets < shouldBeThisManyTweets);
    assert(originalTweet.length > (140 * shouldBeThisManyTweets));
    assert(storm instanceof Array);
    assert.equal(storm.length, actuallyThisManyTweets);
  });

  it('should convert long string to tweet storm array', function() {
    var storm = tweetStorm(repeat('A ', 150));

    assert(storm instanceof Array);
    assert.equal(storm.length, 3);
    assert.equal(storm[0], ('1/ ' + repeat('A ', 69)).trim());
    assert.equal(storm[1], ('2/ ' + repeat('A ', 69)).trim());
    assert.equal(storm[2], ('3/ ' + repeat('A ', 12)).trim());
  });

  it('should return original tweet from given storm', function() {
    var originalTweet = repeat('A ', 150).trim();
    var storm = tweetStorm(originalTweet);
    var constructedTweet = tweetStorm(storm);

    assert.equal(typeof constructedTweet, 'string');
    assert.equal(originalTweet, constructedTweet);
  });
});
