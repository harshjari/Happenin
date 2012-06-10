var client = {
	getTweets : function(){
		$.ajax({
  			url: "/twitterfeed",
  			cache: false	
		}).done(function( json ) {
			$.each(json, function(index, tweet) { 
  				// alert(index + ': ' + value); 
  				if( index < 30 ){
	  				client.addBox(tweet);
  				} 
			});
		});
	},

	addBox: function(tweet){
		console.log(tweet)
		var img = "";
		
		if(tweet.pic_num > 0){
			img = '<img src="' + tweet.picture[0] + ' />';
		}

		var $boxes = $('<div class="item">' + img + ' ' + tweet.name + ' Tweet content.</div>');
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
});