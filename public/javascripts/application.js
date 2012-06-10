
var tweets = []
var client = {
	getTweets : function(){
		
		$.ajax({
  			url: "/feed",
  			cache: false	
		}).done(function( json ) {
			// json.reverse();
			
			var count = 0;

			$.each(json, function(index, tweet) { 
  				if( count < 200 && $.inArray(tweet.id_string, tweets) == -1){
	  				client.addBox(tweet);
	  				tweets.push(tweet.id_string);

	  				count++;
  				} 

			});
		});
	},

	addBox: function(tweet){
		console.log(tweet);
		var img = "";
		if(tweet.picture.length > 0){
			img = '<img src="' + tweet.picture[0] + '" />';
		}
		
		var profile = '<img class="profile_pic" src="' + tweet.profile_p + '" />';
		var pic = '';
		
		if(tweet.pic_num > 0 && /via.me/i.test(tweet.picture[0]) ){
			console.log(tweet.picture[0]);
				
			// var xmlhttp;
			// if (window.XMLHttpRequest)
			//   {// code for IE7+, Firefox, Chrome, Opera, Safari
			//   xmlhttp=new XMLHttpRequest();
			//   }
			// else
			//   {// code for IE6, IE5
			//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			//   }
			// xmlhttp.onreadystatechange=function()
			//   {
			//   if (xmlhttp.readyState==4 && xmlhttp.status==200)
			//     {
			//     	console.log(xmlhttp.responseText);
			//     }
			//   }
			// xmlhttp.open("GET",tweet.picture[0],true);
			// xmlhttp.send();




			// $.ajax({
			// 	url: tweet.picture[0],
			// 	type: "GET",
			// 	dataType: 'json',
			// 	cache: 'false', 
			//   	success: function(data) {
			//     	console.log("HEllo inside");
  	// 				console.log(data);
			//   	}
			// });

			// $.getJSONP(url: tweet.picture[0], function(data) { 
			// 	console.log(data) 
			// });


			// $.get(tweet.picture[0], function(data) {
			// 	console.log("HEllo inside");
  	// 			console.log(data);
			// });
			
		}

		console.log(tweet.picture.length)
		
		var $boxes_with_image = $('<div class="item"><div class="image">' + img + '</div><span class="time">' + $.timeago(tweet.time) + '</span>' + profile + '<p><a class="name" href="http://twitter.com/' + tweet.Name + '">@' + tweet.Name + '</a>' +  tweet.text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@@#\/%?=~_|!:,.;]*[-A-Z0-9+&@@#\/%=~_|])/ig, '<a href="$1" target="_blank" rel="nofollow">$1</a>').replace(/(?:^| )[@]+(\w+)/ig, ' <a href="http://www.twitter.com/$1" class="user" target="_blank" rel="nofollow">@$1</a>').replace(/(?:^| )[#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/ig, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all" class="hash" target="_blank" rel="nofollow">#$1</a>') + '</p></div>');
		var $boxes = $('<div class="item"><span class="time">' + $.timeago(tweet.time) + '</span>' + profile + '<p><a class="name" href="http://twitter.com/' + tweet.Name + '">@' + tweet.Name + '</a>' +  tweet.text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@@#\/%?=~_|!:,.;]*[-A-Z0-9+&@@#\/%=~_|])/ig, '<a href="$1" target="_blank" rel="nofollow">$1</a>').replace(/(?:^| )[@]+(\w+)/ig, ' <a href="http://www.twitter.com/$1" class="user" target="_blank" rel="nofollow">@$1</a>').replace(/(?:^| )[#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/ig, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all" class="hash" target="_blank" rel="nofollow">#$1</a>') + '</p></div>');
		
		// div.item.col1
		// 	p @ultramusic THANK YOU ALL! THIS WAS THE MOST AMAZING EXPERIENCE FOR ALL OF US!!! WHAT WAS YOUR MAIN HIGHLIGHT OF #ULTRA2012 
		// 	div.links
		// 		span.shares 
		// 			| <a href="http://www.google.com">23</a>
		// 		span.likes 
		// 			| <a href="http://www.google.com">32</a> 

		$('.box_container').prepend( $boxes ).masonry( 'reload' );
	}, 

	getAttendees : function(){
		// $.getJSON('https://www.eventbrite.com/json/event_list_attendees?id=3417554999&app_key=NMGPX4UPZJIRD766RK&callback=?', function(data) { console.log(data) });
		var data = {"attendees": [{"attendee": {"first_name": "Abhishek", "last_name": "soni", "suffix": "", "event_id": 3417554999, "company": "vmware", "prefix": "", "id": 109635919}}, {"attendee": {"first_name": "Abhishek", "last_name": "soni", "suffix": "", "event_id": 3417554999, "company": "vmware", "prefix": "", "id": 109635923}}, {"attendee": {"first_name": "Aditi", "last_name": "Jain", "suffix": "", "event_id": 3417554999, "company": "McKinsey", "prefix": "", "id": 111010937}}, {"attendee": {"first_name": "Aditya", "last_name": "Bhandaru", "suffix": "", "event_id": 3417554999, "company": "Google", "prefix": "", "id": 115849152}}, {"attendee": {"first_name": "Adrien", "last_name": "Lamothe", "suffix": "", "event_id": 3417554999, "company": "Stealth Company", "prefix": "", "id": 114051488}}, {"attendee": {"first_name": "Adrienne", "last_name": "Rasmussen", "suffix": "", "event_id": 3417554999, "company": "StyleTech", "prefix": "", "id": 114586054}}, {"attendee": {"first_name": "Ajay", "last_name": "Jain", "suffix": "", "event_id": 3417554999, "company": "JainLabs", "prefix": "", "id": 111010933}}, {"attendee": {"first_name": "Ajith", "last_name": "C", "suffix": "", "event_id": 3417554999, "company": "vimee", "prefix": "", "id": 113728016}}, {"attendee": {"first_name": "Alan", "last_name": "Seong", "suffix": "", "event_id": 3417554999, "company": "RippleAway", "prefix": "", "id": 115265060}}, {"attendee": {"first_name": "Alida", "last_name": "Brandenburg", "suffix": "", "event_id": 3417554999, "company": "2 Girls 1 Startup", "prefix": "", "id": 114493144}}, {"attendee": {"first_name": "Alison", "last_name": "Bright", "suffix": "", "event_id": 3417554999, "company": "About.com", "prefix": "", "id": 111701815}}, {"attendee": {"first_name": "Allison", "last_name": "Wagda", "suffix": "", "event_id": 3417554999, "company": "BitTorrent", "prefix": "", "id": 115899600}}, {"attendee": {"first_name": "Amir", "last_name": "Youssefi", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 114692152}}, {"attendee": {"first_name": "andi", "last_name": "Galpern", "suffix": "", "event_id": 3417554999, "company": "CASCADE SF", "prefix": "", "id": 115236848}}, {"attendee": {"first_name": "Andrew", "last_name": "Mello", "suffix": "", "event_id": 3417554999, "company": "Mailjet", "prefix": "", "id": 115650816}}, {"attendee": {"first_name": "Andrew", "last_name": "Song", "suffix": "", "event_id": 3417554999, "company": "self", "prefix": "", "id": 115097294}}, {"attendee": {"first_name": "Angelo", "last_name": "Hizon", "suffix": "", "event_id": 3417554999, "company": "vastapps", "prefix": "", "id": 109845189}}, {"attendee": {"first_name": "Ankit", "last_name": "Gag", "suffix": "", "event_id": 3417554999, "company": "Cisco", "prefix": "", "id": 110882775}}, {"attendee": {"first_name": "Anni", "last_name": "Yang", "suffix": "", "event_id": 3417554999, "company": "ADHAYA", "prefix": "", "id": 113862222}}, {"attendee": {"first_name": "Anurag", "last_name": "Soni", "suffix": "", "event_id": 3417554999, "company": "mcafee", "prefix": "", "id": 109635921}}, {"attendee": {"first_name": "Aperahama", "last_name": "Parangi", "suffix": "", "event_id": 3417554999, "company": "Apple", "prefix": "", "id": 115862490}}, {"attendee": {"first_name": "Apoorv", "last_name": "Parijat", "suffix": "", "event_id": 3417554999, "company": "JIIT", "prefix": "", "id": 114670790}}, {"attendee": {"first_name": "April", "last_name": "Wensel", "suffix": "", "event_id": 3417554999, "company": "Self", "prefix": "", "id": 115212964}}, {"attendee": {"first_name": "Ariel", "last_name": "Jakobovits", "suffix": "", "event_id": 3417554999, "company": "Deskmasters", "prefix": "", "id": 114691604}}, {"attendee": {"first_name": "Arthur", "last_name": "Summerville", "suffix": "", "event_id": 3417554999, "company": "RoboTech Services", "prefix": "", "id": 111211505}}, {"attendee": {"first_name": "Asees", "last_name": "Singh", "suffix": "", "event_id": 3417554999, "company": "PaperG", "prefix": "", "id": 114603194}}, {"attendee": {"first_name": "Asif", "last_name": "Sheikh", "suffix": "", "event_id": 3417554999, "company": "Google", "prefix": "", "id": 112839735}}, {"attendee": {"first_name": "atul ", "last_name": "kumar", "suffix": "", "event_id": 3417554999, "company": "Sathyabama University", "prefix": "", "id": 111250565}}, {"attendee": {"first_name": "atul ", "last_name": "kumar", "suffix": "", "event_id": 3417554999, "company": "Sathyabama University", "prefix": "", "id": 111250567}}, {"attendee": {"first_name": "Austin", "last_name": "Cooley", "suffix": "", "event_id": 3417554999, "company": "Quillt", "prefix": "", "id": 114361698}}, {"attendee": {"first_name": "Ben", "last_name": "Daniel", "suffix": "", "event_id": 3417554999, "company": "Brick", "prefix": "", "id": 114530322}}, {"attendee": {"first_name": "Bess", "last_name": "Ho", "suffix": "", "event_id": 3417554999, "company": "Archimedes Labs", "prefix": "", "id": 115410894}}, {"attendee": {"first_name": "Bob", "last_name": "Bloom", "suffix": "", "event_id": 3417554999, "company": "Montgomery Solutions", "prefix": "", "id": 112851797}}, {"attendee": {"first_name": "Bob", "last_name": "Bloom", "suffix": "", "event_id": 3417554999, "company": "Montgomery Solutions", "prefix": "", "id": 108990617}}, {"attendee": {"first_name": "Brad", "last_name": "Smith", "suffix": "", "event_id": 3417554999, "company": "RadiumOne", "prefix": "", "id": 107882521}}, {"attendee": {"first_name": "Brett", "last_name": "Suwyn", "suffix": "", "event_id": 3417554999, "company": "Chute", "prefix": "", "id": 109006537}}, {"attendee": {"first_name": "Bryan", "last_name": "Chao", "suffix": "", "event_id": 3417554999, "company": "Cisco", "prefix": "", "id": 114270476}}, {"attendee": {"first_name": "C", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 116212840}}, {"attendee": {"first_name": "Carlos", "last_name": "Mairena Mora", "suffix": "", "event_id": 3417554999, "company": "RoboTech Services", "prefix": "", "id": 111211503}}, {"attendee": {"first_name": "Chanchal", "last_name": "Jain", "suffix": "", "event_id": 3417554999, "company": "Degree7", "prefix": "", "id": 111010943}}, {"attendee": {"first_name": "Cherian ", "last_name": "Thomas", "suffix": "", "event_id": 3417554999, "company": "Zynga", "prefix": "", "id": 115200574}}, {"attendee": {"first_name": "Cheston", "last_name": "Contaoi", "suffix": "", "event_id": 3417554999, "company": "Driveframe", "prefix": "", "id": 110648113}}, {"attendee": {"first_name": "Chris", "last_name": "Zankel", "suffix": "", "event_id": 3417554999, "company": "OnLive", "prefix": "", "id": 116400104}}, {"attendee": {"first_name": "Christine", "last_name": "Huynh", "suffix": "", "event_id": 3417554999, "company": "CBS Interactive", "prefix": "", "id": 114303166}}, {"attendee": {"first_name": "Christopher", "last_name": "Wendel", "suffix": "", "event_id": 3417554999, "company": "Twilio", "prefix": "", "id": 115273482}}, {"attendee": {"first_name": "Dan", "last_name": "Kang", "suffix": "", "event_id": 3417554999, "company": "Twilio", "prefix": "", "id": 115315996}}, {"attendee": {"first_name": "Dan", "last_name": "Yang", "suffix": "", "event_id": 3417554999, "company": "Twilio", "prefix": "", "id": 115316910}}, {"attendee": {"first_name": "Dani", "last_name": "Zuniga", "suffix": "", "event_id": 3417554999, "company": "BitPollen", "prefix": "", "id": 107818985}}, {"attendee": {"first_name": "Dariusz", "last_name": "Walczak", "suffix": "", "event_id": 3417554999, "company": "Coworking ZOO", "prefix": "", "id": 116556350}}, {"attendee": {"first_name": "David", "last_name": "Murray", "suffix": "", "event_id": 3417554999, "company": "GoalSponsors, Inc.", "prefix": "", "id": 115353606}}, {"attendee": {"first_name": "Deepankar", "last_name": "Mohapatra", "suffix": "", "event_id": 3417554999, "company": "Indigo Architects", "prefix": "", "id": 111241137}}, {"attendee": {"first_name": "Delia", "last_name": "Angulo", "suffix": "", "event_id": 3417554999, "company": "Delia &", "prefix": "", "id": 111242845}}, {"attendee": {"first_name": "Denise", "last_name": "Hall", "suffix": "", "event_id": 3417554999, "company": "Vitamin T", "prefix": "", "id": 111174873}}, {"attendee": {"first_name": "Denise", "last_name": "Hall", "suffix": "", "event_id": 3417554999, "company": "Vitamin T", "prefix": "", "id": 111174879}}, {"attendee": {"first_name": "Dimitare", "last_name": "Karagogov", "suffix": "", "event_id": 3417554999, "company": "TCS", "prefix": "", "id": 115563736}}, {"attendee": {"first_name": "Dimitare ", "last_name": "Karagogov", "suffix": "", "event_id": 3417554999, "company": "RadiumOne Recruits", "prefix": "", "id": 116408556}}, {"attendee": {"first_name": "Dimitrios", "last_name": "Konstantinidis", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 116552368}}, {"attendee": {"first_name": "Ding", "last_name": "Zhou", "suffix": "", "event_id": 3417554999, "company": "klout", "prefix": "", "id": 116585774}}, {"attendee": {"first_name": "Donald", "last_name": "Dewsnup", "suffix": "", "event_id": 3417554999, "company": "Angel Investor", "prefix": "", "id": 115010122}}, {"attendee": {"first_name": "Doug", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "Big bad goose", "prefix": "", "id": 114659016}}, {"attendee": {"first_name": "Doug", "last_name": "May", "suffix": "", "event_id": 3417554999, "company": "The Intuitive Edge", "prefix": "", "id": 114131734}}, {"attendee": {"first_name": "Ed", "last_name": "Parker", "suffix": "", "event_id": 3417554999, "company": "Landmark", "prefix": "", "id": 109002369}}, {"attendee": {"first_name": "Eli", "last_name": "Luxenberg", "suffix": "", "event_id": 3417554999, "company": "Eli Luxenberg", "prefix": "", "id": 115938000}}, {"attendee": {"first_name": "Elizabeth", "last_name": "Ford", "suffix": "", "event_id": 3417554999, "company": "LinkedIn", "prefix": "", "id": 115871268}}, {"attendee": {"first_name": "Elmer", "last_name": "Wu", "suffix": "", "event_id": 3417554999, "company": "self", "prefix": "", "id": 110937291}}, {"attendee": {"first_name": "Eric", "last_name": "Foster", "suffix": "", "event_id": 3417554999, "company": "Bonnnier R&D", "prefix": "", "id": 115221188}}, {"attendee": {"first_name": "Eric", "last_name": "Garrett", "suffix": "", "event_id": 3417554999, "company": "Consultant", "prefix": "", "id": 116400438}}, {"attendee": {"first_name": "Erick", "last_name": "Davidson", "suffix": "", "event_id": 3417554999, "company": "Startup World", "prefix": "", "id": 116571458}}, {"attendee": {"first_name": "Ethan", "last_name": "Gahng", "suffix": "", "event_id": 3417554999, "company": "D", "prefix": "", "id": 114123992}}, {"attendee": {"first_name": "Eunice", "last_name": "Joung", "suffix": "", "event_id": 3417554999, "company": "Massive Health", "prefix": "", "id": 115814088}}, {"attendee": {"first_name": "F", "last_name": "S", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 115212966}}, {"attendee": {"first_name": "Francis", "last_name": "Skipper", "suffix": "", "event_id": 3417554999, "company": "451 Marketing", "prefix": "", "id": 111050291}}, {"attendee": {"first_name": "Franky", "last_name": "Aguilar", "suffix": "", "event_id": 3417554999, "company": "99centbrains", "prefix": "", "id": 115475150}}, {"attendee": {"first_name": "Fred", "last_name": "Radford", "suffix": "", "event_id": 3417554999, "company": "Abby's LLC", "prefix": "", "id": 115668018}}, {"attendee": {"first_name": "Friend of Sharam", "last_name": "Fouladgar-Mercer", "suffix": "", "event_id": 3417554999, "company": "KJ", "prefix": "", "id": 114306770}}, {"attendee": {"first_name": "G.", "last_name": "Chen", "suffix": "", "event_id": 3417554999, "company": "IBD", "prefix": "", "id": 113572164}}, {"attendee": {"first_name": "Georgy", "last_name": "Ramonov", "suffix": "", "event_id": 3417554999, "company": "Home", "prefix": "", "id": 110437749}}, {"attendee": {"first_name": "Gerard", "last_name": "Roy", "suffix": "", "event_id": 3417554999, "company": "CRI", "prefix": "", "id": 115861728}}, {"attendee": {"first_name": "Gordon", "last_name": "Mah", "suffix": "", "event_id": 3417554999, "company": "Keynote Systems", "prefix": "", "id": 116536838}}, {"attendee": {"first_name": "Greg", "last_name": "Gopman", "suffix": "", "event_id": 3417554999, "company": "angelhack", "prefix": "", "id": 115622438}}, {"attendee": {"first_name": "Gregarious", "last_name": "Narain", "suffix": "", "event_id": 3417554999, "company": "Chute", "prefix": "", "id": 109006535}}, {"attendee": {"first_name": "Guest of", "last_name": "Adrien Lamothe", "suffix": "", "event_id": 3417554999, "company": "Stealth Company", "prefix": "", "id": 114051490}}, {"attendee": {"first_name": "Guest of", "last_name": "Adrien Lamothe", "suffix": "", "event_id": 3417554999, "company": "Stealth Company", "prefix": "", "id": 114051492}}, {"attendee": {"first_name": "Harsh", "last_name": "Jariwala", "suffix": "", "event_id": 3417554999, "company": "Intern", "prefix": "", "id": 115812628}}, {"attendee": {"first_name": "Howard", "last_name": "Tu", "suffix": "", "event_id": 3417554999, "company": "Razorfish", "prefix": "", "id": 111187543}}, {"attendee": {"first_name": "Ignacio", "last_name": "Andreu", "suffix": "", "event_id": 3417554999, "company": "Masterbranch.com", "prefix": "", "id": 112956379}}, {"attendee": {"first_name": "Imhotep", "last_name": "al-basiel", "suffix": "", "event_id": 3417554999, "company": "chiforcesoftware/Karim,s Dream interactive", "prefix": "", "id": 114122072}}, {"attendee": {"first_name": "Isa ", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 107882077}}, {"attendee": {"first_name": "Islam", "last_name": "Sharabash", "suffix": "", "event_id": 3417554999, "company": "internmatch", "prefix": "", "id": 114674802}}, {"attendee": {"first_name": "james", "last_name": "vliet", "suffix": "", "event_id": 3417554999, "company": "Sfmar", "prefix": "", "id": 110272955}}, {"attendee": {"first_name": "james", "last_name": "vliet", "suffix": "", "event_id": 3417554999, "company": "Sfmar", "prefix": "", "id": 108478941}}, {"attendee": {"first_name": "James", "last_name": "Wofford", "suffix": "", "event_id": 3417554999, "company": "au top", "prefix": "", "id": 109014445}}, {"attendee": {"first_name": "Jeff", "last_name": "Harris", "suffix": "", "event_id": 3417554999, "company": "Talkwheel", "prefix": "", "id": 107600759}}, {"attendee": {"first_name": "Jeff", "last_name": "Kalikstein", "suffix": "", "event_id": 3417554999, "company": "LeanMeanTech", "prefix": "", "id": 114278120}}, {"attendee": {"first_name": "Jeff", "last_name": "Linwood", "suffix": "", "event_id": 3417554999, "company": "LeanMeanTech", "prefix": "", "id": 114278118}}, {"attendee": {"first_name": "Jenny", "last_name": "Yoshizawa", "suffix": "", "event_id": 3417554999, "company": "2 Girls 1 Startup", "prefix": "", "id": 114493146}}, {"attendee": {"first_name": "Jiajun", "last_name": "Zhu", "suffix": "", "event_id": 3417554999, "company": "freelance", "prefix": "", "id": 109845191}}, {"attendee": {"first_name": "Joe", "last_name": "Kiernan", "suffix": "", "event_id": 3417554999, "company": "Frontdesk Anywhere", "prefix": "", "id": 114276902}}, {"attendee": {"first_name": "Joey ", "last_name": "Colombo", "suffix": "", "event_id": 3417554999, "company": "99centbrains", "prefix": "", "id": 115478644}}, {"attendee": {"first_name": "Jon", "last_name": "Bardin", "suffix": "", "event_id": 3417554999, "company": "RisingCode.com", "prefix": "", "id": 114348002}}, {"attendee": {"first_name": "Jon", "last_name": "Dahl", "suffix": "", "event_id": 3417554999, "company": "Zencoder", "prefix": "", "id": 108766001}}, {"attendee": {"first_name": "Jonathan", "last_name": "Bredemeyer", "suffix": "", "event_id": 3417554999, "company": "DramaTec Creative Group", "prefix": "", "id": 116420002}}, {"attendee": {"first_name": "Jose", "last_name": "Benavides", "suffix": "", "event_id": 3417554999, "company": "UI Consultant", "prefix": "", "id": 114829108}}, {"attendee": {"first_name": "Joseph", "last_name": "Okafor", "suffix": "", "event_id": 3417554999, "company": "Hustle & Hack", "prefix": "", "id": 115501008}}, {"attendee": {"first_name": "Josh", "last_name": "Michaels", "suffix": "", "event_id": 3417554999, "company": "Jetson Creative", "prefix": "", "id": 114315004}}, {"attendee": {"first_name": "Julien", "last_name": "Dubeau", "suffix": "", "event_id": 3417554999, "company": "USF grad student", "prefix": "", "id": 116431388}}, {"attendee": {"first_name": "Justin", "last_name": "Lynn", "suffix": "", "event_id": 3417554999, "company": "Votizen, Inc.", "prefix": "", "id": 115643794}}, {"attendee": {"first_name": "Kapil", "last_name": "Dalwani", "suffix": "", "event_id": 3417554999, "company": "YellowPages.com", "prefix": "", "id": 109295807}}, {"attendee": {"first_name": "Karla", "last_name": "Espinosa", "suffix": "", "event_id": 3417554999, "company": "99centbrains", "prefix": "", "id": 115478646}}, {"attendee": {"first_name": "Kazuhiro", "last_name": "Koga", "suffix": "", "event_id": 3417554999, "company": "freelance", "prefix": "", "id": 116582064}}, {"attendee": {"first_name": "Kedar", "last_name": "Shah", "suffix": "", "event_id": 3417554999, "company": "Entrepreneur", "prefix": "", "id": 109318339}}, {"attendee": {"first_name": "Ken", "last_name": "Pascal", "suffix": "", "event_id": 3417554999, "company": "DrinkEntrepreneurs", "prefix": "", "id": 115356316}}, {"attendee": {"first_name": "Ken", "last_name": "Pascal", "suffix": "", "event_id": 3417554999, "company": "DrinkEntrepreneurs", "prefix": "", "id": 115356320}}, {"attendee": {"first_name": "Ken", "last_name": "Pascal", "suffix": "", "event_id": 3417554999, "company": "DrinkEntrepreneurs", "prefix": "", "id": 115356322}}, {"attendee": {"first_name": "Kevin", "last_name": "Hong", "suffix": "", "event_id": 3417554999, "company": "Dealflicks.com", "prefix": "", "id": 115217800}}, {"attendee": {"first_name": "Kevin", "last_name": "Kilkenny", "suffix": "", "event_id": 3417554999, "company": "Graphix", "prefix": "", "id": 116111354}}, {"attendee": {"first_name": "Kevin", "last_name": "Lim", "suffix": "", "event_id": 3417554999, "company": "self ", "prefix": "", "id": 115084488}}, {"attendee": {"first_name": "Kush", "last_name": "Patel", "suffix": "", "event_id": 3417554999, "company": "Hash Map Labs", "prefix": "", "id": 114035864}}, {"attendee": {"first_name": "Kyle", "last_name": "Graehl", "suffix": "", "event_id": 3417554999, "company": "BitTorrent, Inc", "prefix": "", "id": 115896030}}, {"attendee": {"first_name": "Lana", "last_name": "Alber", "suffix": "", "event_id": 3417554999, "company": "self", "prefix": "", "id": 115588504}}, {"attendee": {"first_name": "Landon", "last_name": "Reed", "suffix": "", "event_id": 3417554999, "company": "Georgia Institute of Technology", "prefix": "", "id": 115862246}}, {"attendee": {"first_name": "Lao", "last_name": "Akili", "suffix": "", "event_id": 3417554999, "company": "laokaplow.com", "prefix": "", "id": 115296682}}, {"attendee": {"first_name": "LaTorri", "last_name": "Lindsay", "suffix": "", "event_id": 3417554999, "company": "Tinypay Inc.", "prefix": "", "id": 115395162}}, {"attendee": {"first_name": "Lily ", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "Vision & Sound Enterprises", "prefix": "", "id": 110572759}}, {"attendee": {"first_name": "Linmiao", "last_name": "Xu", "suffix": "", "event_id": 3417554999, "company": "Big Bad Goose", "prefix": "", "id": 114658538}}, {"attendee": {"first_name": "Lolly", "last_name": "Dormido", "suffix": "", "event_id": 3417554999, "company": "jiggabits", "prefix": "", "id": 115658664}}, {"attendee": {"first_name": "Lorenzo", "last_name": "Pisani", "suffix": "", "event_id": 3417554999, "company": "Tinypay Inc.", "prefix": "", "id": 115395160}}, {"attendee": {"first_name": "LORENZO", "last_name": "TAN", "suffix": "", "event_id": 3417554999, "company": "Cutting Edge Tech", "prefix": "", "id": 115243468}}, {"attendee": {"first_name": "LORENZO", "last_name": "TAN", "suffix": "", "event_id": 3417554999, "company": "Cutting Edge Tech", "prefix": "", "id": 115001248}}, {"attendee": {"first_name": "Louis", "last_name": "de Valliere", "suffix": "", "event_id": 3417554999, "company": "Addepar", "prefix": "", "id": 115810968}}, {"attendee": {"first_name": "Lucas", "last_name": "Zhang", "suffix": "", "event_id": 3417554999, "company": "Dou", "prefix": "", "id": 115159184}}, {"attendee": {"first_name": "Maggie", "last_name": "Yung", "suffix": "", "event_id": 3417554999, "company": "Lee Hardware", "prefix": "", "id": 110545513}}, {"attendee": {"first_name": "manar", "last_name": "rafat", "suffix": "", "event_id": 3417554999, "company": "ass", "prefix": "", "id": 115612060}}, {"attendee": {"first_name": "Mandeep", "last_name": "Janjua", "suffix": "", "event_id": 3417554999, "company": "www.MySlices.com", "prefix": "", "id": 111235199}}, {"attendee": {"first_name": "Mark", "last_name": "Junkunc", "suffix": "", "event_id": 3417554999, "company": "COG1.com", "prefix": "", "id": 111482893}}, {"attendee": {"first_name": "Mark", "last_name": "Meves", "suffix": "", "event_id": 3417554999, "company": "Skylab, LLC", "prefix": "", "id": 114051282}}, {"attendee": {"first_name": "Matt", "last_name": "Mayers", "suffix": "", "event_id": 3417554999, "company": "Sad Lad, LLC", "prefix": "", "id": 114066762}}, {"attendee": {"first_name": "Matthew", "last_name": "Szatmary", "suffix": "", "event_id": 3417554999, "company": "Zencoder", "prefix": "", "id": 116399138}}, {"attendee": {"first_name": "Max", "last_name": "Kanter", "suffix": "", "event_id": 3417554999, "company": "Twitter", "prefix": "", "id": 114636192}}, {"attendee": {"first_name": "Maximilian", "last_name": "Harmon", "suffix": "", "event_id": 3417554999, "company": "MRH LLC", "prefix": "", "id": 111066755}}, {"attendee": {"first_name": "Melanie", "last_name": "Plageman", "suffix": "", "event_id": 3417554999, "company": "Motaavi", "prefix": "", "id": 115229444}}, {"attendee": {"first_name": "Melvin", "last_name": "Tercan", "suffix": "", "event_id": 3417554999, "company": "Tinypay, Inc.", "prefix": "", "id": 114553118}}, {"attendee": {"first_name": "mesho", "last_name": "ahmed", "suffix": "", "event_id": 3417554999, "company": "rrr", "prefix": "", "id": 115612448}}, {"attendee": {"first_name": "mike", "last_name": "cifani", "suffix": "", "event_id": 3417554999, "company": "saweet", "prefix": "", "id": 108852711}}, {"attendee": {"first_name": "Molly", "last_name": "Maser", "suffix": "", "event_id": 3417554999, "company": "Betts Recruiting", "prefix": "", "id": 115309366}}, {"attendee": {"first_name": "Morten", "last_name": "Versvik", "suffix": "", "event_id": 3417554999, "company": "Mobitroll", "prefix": "", "id": 114381296}}, {"attendee": {"first_name": "Myk", "last_name": "Klemme", "suffix": "", "event_id": 3417554999, "company": "Sprk", "prefix": "", "id": 115620270}}, {"attendee": {"first_name": "Navdeep", "last_name": "Gill", "suffix": "", "event_id": 3417554999, "company": "CBS Interactive", "prefix": "", "id": 114303164}}, {"attendee": {"first_name": "Ned", "last_name": "Ruggeri", "suffix": "", "event_id": 3417554999, "company": "Hash Map Labs", "prefix": "", "id": 114035866}}, {"attendee": {"first_name": "NIck", "last_name": "Chadwick", "suffix": "", "event_id": 3417554999, "company": "Zencoder", "prefix": "", "id": 108522403}}, {"attendee": {"first_name": "Nick", "last_name": "Esquerra", "suffix": "", "event_id": 3417554999, "company": "Fluid Inc.", "prefix": "", "id": 115511834}}, {"attendee": {"first_name": "Nicolas", "last_name": "Grenie", "suffix": "", "event_id": 3417554999, "company": "ifeelgoods", "prefix": "", "id": 115238724}}, {"attendee": {"first_name": "Niko", "last_name": "Cunningham", "suffix": "", "event_id": 3417554999, "company": "Quillt", "prefix": "", "id": 114361702}}, {"attendee": {"first_name": "Oren ", "last_name": "Bennett", "suffix": "", "event_id": 3417554999, "company": "FunnelBox", "prefix": "", "id": 116154452}}, {"attendee": {"first_name": "Oscar", "last_name": "Sanchez", "suffix": "", "event_id": 3417554999, "company": "Twilio", "prefix": "", "id": 115272850}}, {"attendee": {"first_name": "Paras", "last_name": "Jain", "suffix": "", "event_id": 3417554999, "company": "JainLabs", "prefix": "", "id": 111010935}}, {"attendee": {"first_name": "Patrick", "last_name": "Liang", "suffix": "", "event_id": 3417554999, "company": "KJ", "prefix": "", "id": 114325504}}, {"attendee": {"first_name": "Patrick", "last_name": "Randolph", "suffix": "", "event_id": 3417554999, "company": "Talkwheel", "prefix": "", "id": 107600757}}, {"attendee": {"first_name": "Peta", "last_name": "Cooper ", "suffix": "", "event_id": 3417554999, "company": "iLL Fortune", "prefix": "", "id": 111231953}}, {"attendee": {"first_name": "Phil", "last_name": "Wee", "suffix": "", "event_id": 3417554999, "company": "freelance", "prefix": "", "id": 109845187}}, {"attendee": {"first_name": "Pradeep", "last_name": "Jain", "suffix": "", "event_id": 3417554999, "company": "Degree7", "prefix": "", "id": 111010941}}, {"attendee": {"first_name": "Prateek", "last_name": "Gupta", "suffix": "", "event_id": 3417554999, "company": "SJSU", "prefix": "", "id": 109346205}}, {"attendee": {"first_name": "Qu", "last_name": "An", "suffix": "", "event_id": 3417554999, "company": "Reachoo", "prefix": "", "id": 116401310}}, {"attendee": {"first_name": "Quynh", "last_name": "Pham", "suffix": "", "event_id": 3417554999, "company": "Reachoo", "prefix": "", "id": 116399676}}, {"attendee": {"first_name": "Rachita", "last_name": "chandra", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 115651448}}, {"attendee": {"first_name": "Raghavan", "last_name": "Muthuregunathan", "suffix": "", "event_id": 3417554999, "company": "Columbia University", "prefix": "", "id": 113834732}}, {"attendee": {"first_name": "Rahil", "last_name": "Patel", "suffix": "", "event_id": 3417554999, "company": "Rahil", "prefix": "", "id": 110657853}}, {"attendee": {"first_name": "Rahul", "last_name": "Madan", "suffix": "", "event_id": 3417554999, "company": "KJ", "prefix": "", "id": 114396610}}, {"attendee": {"first_name": "RAJAGOPAL", "last_name": "SATHYAMURTHI", "suffix": "", "event_id": 3417554999, "company": "KJ", "prefix": "", "id": 114309394}}, {"attendee": {"first_name": "Raman", "last_name": "Sohal", "suffix": "", "event_id": 3417554999, "company": "New startup", "prefix": "", "id": 111244101}}, {"attendee": {"first_name": "Rami", "last_name": "Sayar", "suffix": "", "event_id": 3417554999, "company": "Twilio", "prefix": "", "id": 113088923}}, {"attendee": {"first_name": "Rauhmel", "last_name": "Fox", "suffix": "", "event_id": 3417554999, "company": "WHOmentors.com, Inc.", "prefix": "", "id": 111533165}}, {"attendee": {"first_name": "raymond", "last_name": "lee", "suffix": "", "event_id": 3417554999, "company": "salesforce", "prefix": "", "id": 116492464}}, {"attendee": {"first_name": "Richard", "last_name": "Fung", "suffix": "", "event_id": 3417554999, "company": "University of Calgary", "prefix": "", "id": 116409204}}, {"attendee": {"first_name": "Robert", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "Vision & Sound Enterprises", "prefix": "", "id": 110572755}}, {"attendee": {"first_name": "Robert", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "Vision & Sound Enterprises", "prefix": "", "id": 110572757}}, {"attendee": {"first_name": "Roger", "last_name": "Chen", "suffix": "", "event_id": 3417554999, "company": "Facebook", "prefix": "", "id": 116296850}}, {"attendee": {"first_name": "Ronald", "last_name": "Mannak", "suffix": "", "event_id": 3417554999, "company": "Yobble", "prefix": "", "id": 115937436}}, {"attendee": {"first_name": "Sabrina", "last_name": "Atienza", "suffix": "", "event_id": 3417554999, "company": "IBM", "prefix": "", "id": 110437803}}, {"attendee": {"first_name": "Sagar", "last_name": "Vikani", "suffix": "", "event_id": 3417554999, "company": "SJSU", "prefix": "", "id": 109346207}}, {"attendee": {"first_name": "Sahil", "last_name": "Desai", "suffix": "", "event_id": 3417554999, "company": "Bump Technologies", "prefix": "", "id": 114637464}}, {"attendee": {"first_name": "Sandeep", "last_name": "Davu", "suffix": "", "event_id": 3417554999, "company": "Docsync", "prefix": "", "id": 111729373}}, {"attendee": {"first_name": "Satish", "last_name": "Veerapuneni", "suffix": "", "event_id": 3417554999, "company": "Self", "prefix": "", "id": 115770614}}, {"attendee": {"first_name": "Schwep Bing", "last_name": "Chong", "suffix": "", "event_id": 3417554999, "company": "-", "prefix": "", "id": 116505572}}, {"attendee": {"first_name": "Scott", "last_name": "Abromowitz", "suffix": "", "event_id": 3417554999, "company": "Student - University of Maryland", "prefix": "", "id": 116588916}}, {"attendee": {"first_name": "Scott", "last_name": "Lee", "suffix": "", "event_id": 3417554999, "company": "Protozero", "prefix": "", "id": 115944392}}, {"attendee": {"first_name": "Sean", "last_name": "Wycliffe", "suffix": "", "event_id": 3417554999, "company": "Dealflicks.com", "prefix": "", "id": 115217798}}, {"attendee": {"first_name": "Shane", "last_name": "Mooney", "suffix": "", "event_id": 3417554999, "company": "Quillt", "prefix": "", "id": 114361700}}, {"attendee": {"first_name": "Sharam", "last_name": "Fouladgar-Mercer", "suffix": "", "event_id": 3417554999, "company": "KJ", "prefix": "", "id": 114306768}}, {"attendee": {"first_name": "Shawn", "last_name": "O'Connor", "suffix": "", "event_id": 3417554999, "company": "Timefire", "prefix": "", "id": 116314360}}, {"attendee": {"first_name": "Shivneet", "last_name": "Singh", "suffix": "", "event_id": 3417554999, "company": "Fortune Planet - A Social Game", "prefix": "", "id": 114621708}}, {"attendee": {"first_name": "sivakumar", "last_name": "ramanathan", "suffix": "", "event_id": 3417554999, "company": "consultant", "prefix": "", "id": 110122673}}, {"attendee": {"first_name": "Srihari", "last_name": "Yamanoor", "suffix": "", "event_id": 3417554999, "company": "Independent", "prefix": "", "id": 115321074}}, {"attendee": {"first_name": "Steffen", "last_name": "Frost", "suffix": "", "event_id": 3417554999, "company": "Mobileccino", "prefix": "", "id": 114897572}}, {"attendee": {"first_name": "Stephen", "last_name": "Balaban", "suffix": "", "event_id": 3417554999, "company": "32ar, Inc.", "prefix": "", "id": 114327048}}, {"attendee": {"first_name": "Steve", "last_name": "Heffernan", "suffix": "", "event_id": 3417554999, "company": "Zencoder", "prefix": "", "id": 108511843}}, {"attendee": {"first_name": "tanya", "last_name": "vernitsky", "suffix": "", "event_id": 3417554999, "company": "zencoder", "prefix": "", "id": 108515051}}, {"attendee": {"first_name": "Tiffany", "last_name": "Kosolcharoen", "suffix": "", "event_id": 3417554999, "company": "Klout", "prefix": "", "id": 114312548}}, {"attendee": {"first_name": "TIMOTHY", "last_name": "CHAN", "suffix": "", "event_id": 3417554999, "company": "Minted", "prefix": "", "id": 115247244}}, {"attendee": {"first_name": "Timothy", "last_name": "Evans", "suffix": "", "event_id": 3417554999, "company": "evolv9", "prefix": "", "id": 114038146}}, {"attendee": {"first_name": "Tom", "last_name": "Jones", "suffix": "", "event_id": 3417554999, "company": "NLP Consulting", "prefix": "", "id": 114207072}}, {"attendee": {"first_name": "Valentin ", "last_name": "Smirnoff", "suffix": "", "event_id": 3417554999, "company": "Tinypay/MarketPage", "prefix": "", "id": 114586052}}, {"attendee": {"first_name": "Vanessa", "last_name": "Ramos", "suffix": "", "event_id": 3417554999, "company": "Masterbranch.com", "prefix": "", "id": 112956381}}, {"attendee": {"first_name": "Vicky ", "last_name": "Sachdeva", "suffix": "", "event_id": 3417554999, "company": "Cisco ", "prefix": "", "id": 111228519}}, {"attendee": {"first_name": "Vikram", "last_name": "Bhatla", "suffix": "", "event_id": 3417554999, "company": "Fortune Planet - A Social Game", "prefix": "", "id": 114621710}}, {"attendee": {"first_name": "Vikrant", "last_name": "Ramteke", "suffix": "", "event_id": 3417554999, "company": "Finderous", "prefix": "", "id": 111729375}}, {"attendee": {"first_name": "Vinay", "last_name": "Ellanki", "suffix": "", "event_id": 3417554999, "company": "Networks in motion", "prefix": "", "id": 115785808}}, {"attendee": {"first_name": "Vinay ", "last_name": "Ellanki", "suffix": "", "event_id": 3417554999, "company": "RadiumOne Recruits", "prefix": "", "id": 116408554}}, {"attendee": {"first_name": "Vishal", "last_name": "Verma", "suffix": "", "event_id": 3417554999, "company": "LifeInLists", "prefix": "", "id": 116405884}}, {"attendee": {"first_name": "Will", "last_name": "Farino", "suffix": "", "event_id": 3417554999, "company": "Plug and Play Tech Center", "prefix": "", "id": 115227428}}, {"attendee": {"first_name": "William", "last_name": "Clements", "suffix": "", "event_id": 3417554999, "company": "YBCBD ", "prefix": "", "id": 114506986}}, {"attendee": {"first_name": "William", "last_name": "Estoque", "suffix": "", "event_id": 3417554999, "company": "http://disconnect.me", "prefix": "", "id": 114054538}}, {"attendee": {"first_name": "Wylie", "last_name": "Conlon", "suffix": "", "event_id": 3417554999, "company": "Quizlet", "prefix": "", "id": 116318380}}, {"attendee": {"first_name": "Xavier", "last_name": "Laumonier", "suffix": "", "event_id": 3417554999, "company": "self", "prefix": "", "id": 115238570}}, {"attendee": {"first_name": "Yang", "last_name": "Chung", "suffix": "", "event_id": 3417554999, "company": "N/A", "prefix": "", "id": 114033580}}, {"attendee": {"first_name": "yang", "last_name": "yang", "suffix": "", "event_id": 3417554999, "company": "salesforce", "prefix": "", "id": 114036208}}, {"attendee": {"first_name": "Yisha", "last_name": "Peng", "suffix": "", "event_id": 3417554999, "company": "Stanford University", "prefix": "", "id": 115666918}}, {"attendee": {"first_name": "Yosun", "last_name": "Chang", "suffix": "", "event_id": 3417554999, "company": "KUBIKULO AReality3D", "prefix": "", "id": 116222106}}]};
		// console.log(data.attendees);

		data.attendees

		$.each(data.attendees, function(index, attendee) { 	
			if(index < 40){
				// console.log(attendee.attendee);
				var $li = '<li>' + attendee.attendee.first_name + ' ' + attendee.attendee.last_name + ' - ' + attendee.attendee.company + '</li>';
				$(".attendees").append($li);
			}
		});

	}
}

$(function(){

	var $container = $('.box_container');

	$container.imagesLoaded( function(){
  	$container.masonry({
    	itemSelector : '.item'
  		});
	});

	client.getTweets();
	client.getAttendees();

	setInterval(function() {
		client.getTweets();
	}, 5000);

});