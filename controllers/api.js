var request = require('request');
const URL = `https://api.themoviedb.org/4/list/{list_id}?page=1&api_key=${process.env.API_KEY}&sort_by=release_date.asc`;

function getTweets(req, res) {
    var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      });
    var params = {screen_name: 'valeriaoshiro'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    } else {
        console.log(error);
    }
    });
}

module.exports = {
    getTweets
}