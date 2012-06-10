
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require(__dirname + '/routes')
  , util = require('util')
  , twitter = require('twit')
  , http = require('http')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/my_database');

var conn = mongoose.connection;

var Tweet = new Schema({
    id        : ObjectId
  , id_string : String
  , Name      : String
  , picture   : [String]
  , pic_num   : Number
  , time      : Date
  , Likes     : Number
});

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

var tweeterer = mongoose.model('Tweet', Tweet);

var stream = twitter_client.stream('statuses/filter', { track: '#love' });
stream.on('tweet', function (tweet) {
  //console.log(tweet);
  var tweeter = new tweeterer();
  console.log(tweet.id_str);
  tweeter.id_string = tweet.id_str;
  tweeter.Name = tweet.user.screen_name;
  tweeter.pic_num = 0;
  if(tweet.entities.urls.length)
  {
    //console.log("length" + tweet.entities.urls.length);
    var i = 0;
    while(i<tweet.entities.urls.length)
    {
      tweeter.picture[i] = tweet.entities.urls[i].expanded_url;
      console.log("urls"+ tweet.entities.urls[i].expanded_url);
      i++;
    }
    tweeter.pic_num = i;
  }

  tweeter.time = tweet.created_at;
  tweeter.Likes = 0;
  tweeter.save(function(err){
    if (err) {
      console.log(err);
    }
    else
    {
      console.log('save');
    }

  });
  //console.log("fasfasdalknwngbijbkajs"+tweet.entities.urls[0].url);
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
});parseFloat

app.get('/twitterfeed', function(req,res){
  tweeterer.find({}, function (err, docs) {
    if(docs.length) {
      console.log('doc length'+docs.length);
    }

    if(err) {
      console.log(err);
    }
    else {
      res.send(docs);
    }
  });
});


// OAuth request according http://via.me/developers/authentication
app.get('/auth_via_me', function(req, response){
  var code_string = 'client_id=bdot8obe5grg7jnvrsub5wch0&client_secret=3l5ynyvg33xppjqslf8rpeizk&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth_via_me&code=' + req.query.code + '&response_type=token';

  var options = {
    host: "via.me",
    port: '80',
    path: '/oauth/access_token.json',
    method: 'POST',
    headers: {
      'Content-Length': code_string.length
    }
  };


  var req2 = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    /*console.log("res:" +res);
    console.log("q"+res.params);
    console.log('huh'+res.body);*/
    var body = '';
    res.on('data', function (chunk) {
      console.log('BODY: C');
      console.log(chunk);
      body += chunk;
    });

    res.on('end', function (finis) {
      console.log('BODY: F');
      //console.log(finis);
      console.log(body);
      response.end();
    });

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