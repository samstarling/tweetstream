# tweetstream

![](https://www.versioneye.com/user/projects/53f8ca8de09da3d172000370/badge.svg?style=flat)

`tweetstream` is a Node.js app that's designed to show the results of a Twitter search on a big screen. It uses Twitter's streaming API to track a particular keyword, and then uses WebSockets to stream these to the front-end. The tweets are then queued up in the front end, and a new one is shown every 6 seconds.

![](https://raw.githubusercontent.com/samstarling/tweetstream/master/docs/screenshot.png)

### Running

[Register an application with Twitter](http://apps.twitter.com), and then set the following environment variables:

* `TWITTER_CONSUMER_KEY`
* `TWITTER_CONSUMER_SECRET`
* `TWITTER_ACCESS_TOKEN_KEY`
* `TWITTER_ACCESS_TOKEN_SECRET`

You can then run the application like so:

    $ node server.js

Then go to `http://localhost:7080` to view the tweets.
