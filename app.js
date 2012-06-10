
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require(__dirname + '/routes')
  , util = require('util')
  , twitter = require('twit')
  , http = require('http');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Twitter Client
var twitter_client = new twitter({
    consumer_key: 'hFoKKrU6yJuKGRA1TCzGwA',
    consumer_secret: '2orp8MrqK0pxSrSsk1o2Pi5Kps533bzGniIQyeSTE',
    access_token: '604028730-kf6vDQ4SVVclB1sXVmSboTr9ZfXxAHEiEqmdLl6J',
    access_token_secret: 'WxmkvAiC2alyYpqLh2uAfHDByyJo4RbMxx9LFRC8Y'
});

/*app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
*/

// setInterval(
//   function(){ twitter_client.search('#XHack2012', function(data) {
//     console.log("INTERV"+util.inspect(data));
//     })
// }, 1000);

// Routes
app.get('/', function(req, res){
  res.render('index', { title: 'happenin' });
});

app.get('/index', function(req, res){
  res.render('index' , { title: 'happenin' });
});

app.get('/feed', function(req,res){
  var stream = twitter_client.stream('statuses/filter', { track: '#yolo' });
  stream.on('tweet', function (tweet) {
    //console.log(tweet);
    console.log(tweet.id_str);
    if(tweet.entities.urls.length)
    {
      console.log("length" + tweet.entities.urls.length);
    } 
    console.log("fasfasdalknwngbijbkajs"+tweet.entities.urls[0].url);
    res.send(tweet);
  });
});

// OAuth request according http://via.me/developers/authentication
app.get('/auth_via_me', function(req, response){
  var code_string = 'client_id=e0hn7s13jjjom16k5q9v7q885&client_secret=9zw22lfpt3grnfumo97qsyvuv&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth_via_me&code=' + req.query.code + '&response_type=token';
  var options = {
    host: "via.me",
    port: '80',
    path: '/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Length': code_string.length
    }
  };

  var req2 = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    
    res.setEncoding('utf8');
    
    // console.log("res:" +res);
    // console.log("q"+res.params);
    // console.log('huh'+res.body);
    res.on('data', function (chunk) {
      // console.log(res);
      console.log('BODY: C' + chunk);
    });

    res.on('end', function (finis) {
      // console.log(res);
      console.log('BODY: F' + finis);
    });

    response.end();
  });

  req2.write(code_string);
  
  req2.end();
});

app.get('/getoauth', function(req, res){
  res.render('getoauth' , { title: 'happenin' });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});