/**
* Module dependencies.
*/
var express = require('express')
	, routes = require(__dirname + '/routes')
	, util = require('util')
	, twitter = require('twit')
	, http = require('https')
	, jquery = require('jquery')
	, mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var conn = mongoose.connection;

var Tweet = new Schema({
	id        : ObjectId
	, id_string : { type: String, unique: true }
	, Name      : String
	, text      : String
	, picture   : [String]
	, pic_num   : Number
	, profile_p : String
	, time      : Number
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
	consumer_key: 'x',
	consumer_secret: 'x',
	access_token: 'x',
	access_token_secret: 'x'
});

var tweeterer = mongoose.model('Tweet', Tweet);
var first_run = false;

// twitter_client.get('search', { q: 'XHack2012', since: '2012-01-01', rpp: 100, include_entities: 1 }, function(err, reply) {
// 	if(first_run == false) {
// 		first_run = true;
// 		tweeterer.collection.drop();
		
// 		var i = 0;
		
// 		while(reply!==null && i<reply.results.length) {
			
// 			var tweeter = new tweeterer();
			
// 			if( reply.results[i].entities.urls.length )
// 			{
// 				var j = 0;
// 				while(j<reply.results[i].entities.urls.length)
// 				{
// 					tweeter.picture[j]     = reply.results[i].entities.urls[j].expanded_url;
// 					if(reply.results[i].entities.urls[j].expanded_url.substring(0,15).toLowerCase() == 'http://via.me/-')
// 					{
// 						var newrl          = "http://api.via.me/v1/posts/" +reply.results[i].entities.urls[j].expanded_url.substring(15,tweeter.picture[j].length)+"?client_id=ef7ewclqgf2kvs734o9lzcswk";
// 						tweeter.picture[j] = newrl;
// 					}
// 					j++;
// 				}
// 				tweeter.pic_num = j;
// 			}
// 			tweeter.time               = Date.parse(reply.results[i].created_at);
// 			tweeter.id_string          = reply.results[i].id_str;
// 			tweeter.profile_p          = reply.results[i].profile_image_url;
// 			tweeter.Name               = reply.results[i].from_user;
// 			tweeter.Likes              = 0;
// 			tweeter.text               = reply.results[i].text;

// 			tweeter.save(function(err){
// 				if (err) {
// 					console.log(err);
// 				}
// 			});
// 			i++;
// 		}

// 	}
// });

var stream = twitter_client.stream('statuses/filter', { track: '#nerd,#hack' });

stream.on('tweet', function (tweet) {
	if(first_run == false) {
		process.stdout
 		first_run = true;
 		tweeterer.remove({}, function(err){
 			if(err) {
 				console.log(err);
 			}
 		});
	}
	var tweeter                    = new tweeterer();
	tweeter.id_string              = tweet.id_str;
	tweeter.Name                   = tweet.user.screen_name;
	tweeter.text                   = tweet.text;
	tweeter.profile_p              = tweet.user.profile_image_url;
	if(tweet.entities.urls.length)
	{
		var i                        = 0;
		while(i<tweet.entities.urls.length)
		{
			tweeter.picture[i]         = tweet.entities.urls[i].expanded_url;
			if(tweeter.picture[i].substring(0,15).toLowerCase() == 'http://via.me/-')
					{
						var newrl          = "http://api.via.me/v1/posts/" +tweeter.picture[i].substring(15,tweeter.picture[j].length)+"?client_id=ef7ewclqgf2kvs734o9lzcswk";
						tweeter.picture[j] = newrl;
					}
			i++;
		}
		tweeter.pic_num = i;
	}

	tweeter.time                   = Date.parse(tweet.created_at);
	tweeter.Likes                  = 0;
	tweeter.save(function(err){
		if (err) {
			console.log(err);
		}
	});
});

// Routes
app.get('/', function(req, res){
	res.render('index', { title: 'happenin' });
});

app.get('/index', function(req, res){
	res.render('index' , { title: 'happenin' });
});

app.get('/twitterfeed', function(req,res){
	tweeterer.find({}, function (err, docs) {

		if(err) {
			console.log(err);
		}
		else {
			res.send(docs);
		}
	});
});

function compare(b,a) {
	if (a.time < b.time)
		return -1;
	if (a.time > b.time)
		return 1;
	return 0;
}

app.get('/feed', function(req,res){
	tweeterer.find({}, function (err, docs) {
		docs.sort(compare);
		if(err) {
			console.log(err);
		}
		else {
			res.send(docs);
		}
	});
});

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
