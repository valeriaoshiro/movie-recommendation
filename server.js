var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var twitterAPI = require('node-twitter-api');

require('dotenv').config();
//require('./config/database');

var app = express();

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

var twitter = new twitterAPI({
    consumerKey: 'lbSpXNPQmQpbuEfAGFZn8VTwO',
    consumerSecret: 'yk74dXSJ6rFAVMwhZAEaAWCwWRXcrVpDYKd4RjclhJks76Z5c1',
    //callback: 'http://localhost:3000/'
});

var rToken, rTokenSecret, aToken, aTokenSecret;

app.get("/", function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
            console.log(results);
        } else {
            rToken = requestToken;
            rTokenSecret = requestTokenSecret;
            res.redirect("https://twitter.com/oauth/authenticate?oauth_token="+rToken);

            console.log('request')
            console.log(rToken, rTokenSecret);
            console.log(results);
        }
    });
});

// twitter.getAccessToken(rToken, rTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
//     if (error) {
//         console.log(error);
//     } else {
//         // aToken = accessToken;
//         // aTokenSecret = accessTokenSecret;

//         // console.log('Access');
//         // console.log(aToken, aTokenSecret);
//     }
// });

//app.use(require('./config/auth'));

// Put API routes here, before the "catch all" route
//app.use('/api/users', require('./routes/api/users'));
//app.use('/api/podcasts', require('./routes/api/podcasts'));

// The following "catch all" route is necessary for
// a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});