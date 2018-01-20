var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

require('dotenv').config();
//require('./config/database');

var app = express();
var Twitter = require('twitter');

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());


// ===============

var client = new Twitter({
  consumer_key: 'lbSpXNPQmQpbuEfAGFZn8VTwO',
  consumer_secret: 'yk74dXSJ6rFAVMwhZAEaAWCwWRXcrVpDYKd4RjclhJks76Z5c1',
  access_token_key: '69708645-USrLsO1FSjI63poIR24h93JpyAo4orVEjJapM3S8Z',
  access_token_secret: 'aMDLlhdYt1TnBVqOs0pd7vnOCBbw0ipkq3tT5BzlyK6An'
});
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
    console.log(error);
  }
});

// =============


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