/**
* Module dependencies.
*/

// Xhack2012SF access_token : 7sgk9g3h5b3nyjf7rqij9pue0

var express = require('express')
	, routes = require(__dirname + '/routes')
	, util = require('util')
	, twitter = require('twit')
	, http = require('http')
	, jquery = require('jquery')
	, mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/temp3');

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
	consumer_key: 'hFoKKrU6yJuKGRA1TCzGwA',
	consumer_secret: '2orp8MrqK0pxSrSsk1o2Pi5Kps533bzGniIQyeSTE',
	access_token: '604028730-kf6vDQ4SVVclB1sXVmSboTr9ZfXxAHEiEqmdLl6J',
	access_token_secret: 'WxmkvAiC2alyYpqLh2uAfHDByyJo4RbMxx9LFRC8Y'
});

var tweeterer = mongoose.model('Tweet', Tweet);
var first_run = 0;

twitter_client.get('search', { q: 'XHack2012', since: '2012-01-01', rpp: 100, include_entities: 1 }, function(err, reply) {
	if(first_run === 0) {
		first_run = 1;

		//console.log('length'+reply.results.length);
		//console.log(reply.next_page);
		
		var i = 0;
		
		while(reply!==null && i<reply.results.length) {
			
			var tweeter = new tweeterer();
			
			if( reply.results[i].entities.urls.length )
			{
				//console.log("length" + tweet.entities.urls.length);
				var j = 0;
				while(j<reply.results[i].entities.urls.length)
				{
					tweeter.picture[j]     = reply.results[i].entities.urls[j].expanded_url;
					//console.log("First stream urls: "+ reply.results[i].entities.urls[j].expanded_url);
					if(reply.results[i].entities.urls[j].expanded_url.substring(0,15).toLowerCase() == 'http://via.me/-')
					{
						var newrl          = "http://api.via.me/v1/posts/" +reply.results[i].entities.urls[j].expanded_url.substring(15,tweeter.picture[j].length)+"?client_id=ef7ewclqgf2kvs734o9lzcswk";
						tweeter.picture[j] = newrl;
					}
					j++;
				}
				tweeter.pic_num = j;
			}
			tweeter.time               = Date.parse(reply.results[i].created_at);
			tweeter.id_string          = reply.results[i].id_str;
			tweeter.profile_p          = reply.results[i].profile_image_url;
			tweeter.Name               = reply.results[i].from_user;
			tweeter.Likes              = 0;
			tweeter.text               = reply.results[i].text;

			// Post to XHack2012SF for demo
			// var tempData = 'text=' + tweeter.text + "+by+" + tweeter.Name +'&media_type=status&access_token=7sgk9g3h5b3nyjf7rqij9pue0'

			// var optionsPost = {
			// 	host: "api.via.me",
			// 	port: '80',
			// 	path: '/post',
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Length': tempData.length
			// 	}
			// };


			// var req3 = http.request(optionsPost, function(res2) {
			// 	console.log('STATUS: ' + res2.statusCode);
			// 	console.log('HEADERS: ' + JSON.stringify(res2.headers));
			// 	res2.setEncoding('utf8');
			// 	/*console.log("res:" +res);
			// 	console.log("q"+res.params);
			// 	console.log('huh'+res.body);*/
			// 	var body                     = '';
			// 	res2.on('data', function (chunk) {
			// 		console.log('BODY: C');
			// 		console.log(chunk);
			// 		body += chunk;
			// 	});

			// 	res2.on('end', function (finis) {
			// 		console.log('BODY: F');
			// 		//console.log(finis);
			// 		console.log(body);
			// 	});

			// });

			// req3.write(tempData);

			// req3.end();





			tweeter.save(function(err){
				if (err) {
					//console.log(err);
				}
				else
				{
					//console.log('save');
				}
			});
			i++;
		}

	}
});

var stream = twitter_client.stream('statuses/filter', { track: 'XHack2012,XHACK' });

stream.on('tweet', function (tweet) {
	var tweeter                    = new tweeterer();
	// console.log(tweet.id_str);
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
			//console.log(err);
		}
		else
		{
			//console.log('save');
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
// Routes
app.get('/', function(req, res){
	res.render('index', { title: 'happenin' });
});

app.get('/index', function(req, res){
	res.render('index' , { title: 'happenin' });
});

app.get('/twitterfeed', function(req,res){
	tweeterer.find({}, function (err, docs) {
		//if(docs.length) {
			//console.log('doc length'+docs.length);
			//}

			if(err) {
				console.log(err);
			}
			else {
				res.send(docs);
			}
		});
	});

	function compare(a,b) {
		if (a.created_at < b.created_at)
		return -1;
		if (a.created_at > b.created_at)
		return 1;
		return 0;
	}

	app.get('/feed', function(req,res){
		tweeterer.find({}, function (err, docs) {
			//if(docs.length) {
				//console.log('doc length'+docs.length);
				//}
				docs.sort(compare);

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
			var code_string                = 'client_id=bdot8obe5grg7jnvrsub5wch0&client_secret=3l5ynyvg33xppjqslf8rpeizk&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth_via_me&code=' + req.query.code + '&response_type=token';

			var options                    = {
				host: "via.me",
				port: '80',
				path: '/oauth/access_token.json',
				method: 'POST',
				headers: {
					'Content-Length': code_string.length
				}
			};


			var req2                       = http.request(options, function(res) {
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				/*console.log("res:" +res);
				console.log("q"+res.params);
				console.log('huh'+res.body);*/
				var body                     = '';
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
