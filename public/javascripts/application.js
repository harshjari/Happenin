var tweets = []
var client = {
	getTweets : function(){
		
		$.ajax({
  			url: "/twitterfeed",
  			cache: false	
		}).done(function( json ) {
			var count = 0;

			$.each(json, function(index, tweet) { 
  				if( count < 2 && $.inArray(tweet.id_string, tweets) == -1){
  					console.log(tweet);
	  				client.addBox(tweet);
	  				tweets.push(tweet.id_string);

	  				count++;
  				} 

			});
		});
	},

	addBox: function(tweet){
		var img = "";
		if(tweet.picture.length > 0){
			img = '<img src="' + tweet.picture[0] + '" />';
		}
		
		var $boxes = $('<div class="item">' + img + ' || <a href="http://twitter.com/' + tweet.Name + '">@' + tweet.Name + '</a> || ' + $.timeago(tweet.time) + ' || ' + tweet.text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@@#\/%?=~_|!:,.;]*[-A-Z0-9+&@@#\/%=~_|])/ig, '<a href="$1" target="_blank" rel="nofollow">$1</a>').replace(/(?:^| )[@]+(\w+)/ig, ' <a href="http://www.twitter.com/$1" class="user" target="_blank" rel="nofollow">@$1</a>').replace(/(?:^| )[#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/ig, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all" class="hash" target="_blank" rel="nofollow">#$1</a>') + '</div>');
		$('.container').prepend( $boxes ).masonry( 'reload' );
	}
}

$(function(){

	var $container = $('.container');

	$container.imagesLoaded( function(){
  	$container.masonry({
    	itemSelector : '.item'
  		});
	});

	client.getTweets();

	setInterval(function() {
		client.getTweets();
	}, 5000);

});