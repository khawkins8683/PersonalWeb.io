//Anonomous function to call the main routines
//only class constructor function from other files are in the global name space
(function(){
	
	let main = {
		
		makeUSAPins: function(){ 
			this.pinBookUSA = {};//everytime new Pin is called the object is added to the pinBook
			this.pinBookWorld = {};
			//Yosemite
			new PinUsa(this.pinBookUSA,'Yosemite National Park','CA',	'natpark',37.8651+1, -119.5383-4.5,'yosemite.jpg',
				'Vivamizzle fo shizzle rizzle gizzle sure consectetizzle pretizzle. Vivamizzle sit amet break it down. Nizzle eu gizzle fo shizzle lacizzle stuff feugizzle. Uhuh ... yih! suscipizzle my shizz ipsizzle. Fo break it down gizzle. Nizzle fo shizzle my nizzle enim, fo shizzle sizzle, congue bow wow wow, dignissim rizzle, libero. Nullam vitae pede rizzle erizzle posuere shiz. Quisque mah nizzle fizzle, congue break it down, auctizzle check out this, mollis shizzle my nizzle crocodizzle get down get down, shizzle my nizzle crocodizzle. Bizzle sure dui. Gangster risizzle yo, elementum consectetizzle, sollicitudin daahng dawg, consequat dang, turpizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle gangsta yo eu pizzle rutrizzle vehicula. Break yo neck, yall fo shizzle fo dope. Pellentesque fizzle nizzle ',
				['grack.png','yosemitefalls.png','slothwall.png'],
				['climbing the grack 5.6','looking in awe','climbing sloth wall 5.7']
			);
			//JT
			new PinUsa(this.pinBookUSA,'Joshua Tree National Park','CA','natpark',	35, -119.5383-2,'JT.jpg',
				'Vivamizzle fo shizzle rizzle gizzle sure consectetizzle pretizzle. Vivamizzle sit amet break it down. Nizzle eu gizzle fo shizzle lacizzle stuff feugizzle. Uhuh ... yih! suscipizzle my shizz ipsizzle. Fo break it down gizzle. Nizzle fo shizzle my nizzle enim, fo shizzle sizzle, congue bow wow wow, dignissim rizzle, libero. Nullam vitae pede rizzle erizzle posuere shiz. Quisque mah nizzle fizzle, congue break it down, auctizzle check out this, mollis shizzle my nizzle crocodizzle get down get down, shizzle my nizzle crocodizzle. Bizzle sure dui. Gangster risizzle yo, elementum consectetizzle, sollicitudin daahng dawg, consequat dang, turpizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle gangsta yo eu pizzle rutrizzle vehicula. Break yo neck, yall fo shizzle fo dope. Pellentesque fizzle nizzle ',
				['bumpy.png','sunset.jpg','kyleanderic.jpg','katie.jpg','eric.jpg'],
				['fun weird climb','a classic sunset over the iconic Joshua Tree boulder fields in December 2017','Joshua Tree NP was our first stop on a road trip up the west coast','Katie scrambling up to the famous arch at the White Tank camp ground','Eric discovering that rocks are cool!']
			);
			//Cochise
			new PinUsa(this.pinBookUSA,'Cochise Stronghold','AZ','underrated',	31.9224, -109.9673-5,'bannar.jpg',
				'Vivamizzle fo shizzle rizzle gizzle sure consectetizzle pretizzle. Vivamizzle sit amet break it down. Nizzle eu gizzle fo shizzle lacizzle stuff feugizzle. Uhuh ... yih! suscipizzle my shizz ipsizzle. Fo break it down gizzle. Nizzle fo shizzle my nizzle enim, fo shizzle sizzle, congue bow wow wow, dignissim rizzle, libero. Nullam vitae pede rizzle erizzle posuere shiz. Quisque mah nizzle fizzle, congue break it down, auctizzle check out this, mollis shizzle my nizzle crocodizzle get down get down, shizzle my nizzle crocodizzle. Bizzle sure dui. Gangster risizzle yo, elementum consectetizzle, sollicitudin daahng dawg, consequat dang, turpizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle gangsta yo eu pizzle rutrizzle vehicula. Break yo neck, yall fo shizzle fo dope. Pellentesque fizzle nizzle ',
				['cochisedome.jpg','whatsmyline.jpg','rockafellow.jpg'],
				[
					'The face of "What\'s My Line?" a fantasic southern AZ rock climb on the cochise dome at the stronghold',
					'Mike following me up.  The climb is mostly protected (all but 2 cams!) by slingin chicken heads. Pretty remarkable for a 400 ft climb!. P.S. if you don\'t know what "slingin chicken heads is, look at the red sling"',
					'A great view of Rock-a-fellow from the top of the cochise dome'
				]
			);
			//Boulder
			new PinUsa(this.pinBookUSA,'Boulder','CO','home',	40.0-2.0, -105.2705-3.5,'bannar.jpg',
				'There is no way around it, I was blessed to grow up in Boulder Colorado.  It is a great town with beautiful views at every glance, and a great scietific community.  Unfortunately the town is loosing its appeal.  It is becoming evermore upscale and is loosing its roots.  It is no longer a place for dirty hippies that just want to live life and experience the Colorado Rockies.  Instead it is dominated by multimillionares who complain about tall buildings that block their views of the flatirons because they are too disenfranchised to climb the damn things themselves.  It is overrrated by every measure, this is why I am happy staying in AZ.  Tucson has the same beaty for 1/2 the price and 1/3 the pretention.',
				['cobbrock.jpg','sealrock.jpg'],
				['Looking up a 5.7 crack at cobb rock.  Classic accessible boulder rock climbing!','Seal rock, you really just want a couple ropes for the repel, which is the real adventure, the climb is a pretty pedestrian 5.4.']
			);
			//Phoenix/Mcdowells
			new PinUsa(this.pinBookUSA,'McDowell\'s Phoenix','AZ','underrated',	36.0-2.0, -113.2705-3.5,'mcdowells.jpg',
				'The McDowell Mountains are nestled just north east of Phoenix and have some of the best trad climbing in the area.  It is a beautiful stretch of desert, with both Saguaros, common to the Sonoran desert, and Desert Oaks, Common to the Mojave Desert.  After moving from Tucson to Tempe, discovering this area made me feel a lot better about my new location.',
				['hanging_gardens.jpg','pitch1.jpg','pitch2.jpg','rap.jpg'],
				[
					'Hanging Gardens (5.6, 250 ft), starts bellow he trangular cut-out, and runs along the cracks all the way up the center of the wall.',
					'Getting started! placing my first piece of pro on pitch 1 of Hanging Gardens',
					'Following a wonderful finger crack on pitch 2 of Hanging Gardens',
					'That\'s a rap (pun intended)! Heading home!'
				]
			);
			//Superstitions
			//LA
			//Tucson
			new PinUsa(this.pinBookUSA,'Tucson','AZ','home',	36.0-3.0, -112.0-3.5,'tucson.jpg',
				'I moved to Tucson AZ, from Boulder CO, in 2012 to attend the University of Arizona.  Since then, it has always felt like a second home for me.  I love the endless sunshine, relaxed vibes, and gigantic mountains.  Seriously though, they are under-rated.  Mt Lemmon, the closest giant, has a prominence over 5,000 ft.  The climate is much different in the desert when your close to a mile up.  Instead of seguaros and sand, you have trees and even creeks!  If you don\'t have enough time to dive up the west coast, just drive the 28 miles up Mount. Lemmon instead.  You will get just about the same climatic change. ',
				['lemmon_nora_katie.jpg','lemon_jeremy.jpg','rincons1.jpg','rincons2.jpg','rincons3.jpg','windypoint.jpg'],
				[
					'Hangin out on Lemmon with my two favorite girls, Katie and Nora!',
					'My buddy Jeremy getting beat by a knarly 5.11+.  You can tell his bellayer is getting bored, not a great sign.',
					'Backpacking in the Rincons.  Mile 1 - seguaros - normal sonoran desert stuff!',
					'Backpacking in the Rincons. Mile 7 - things are looking different now. More grasses and shrub plants.',
					'Backpacking int the Rincons. Mile 12 - at the top now, 5,000 feet higher than the desert floor - big trees and even ferns!'
				]
			);

			//redwood
			new PinUsa(this.pinBookUSA,'Redwood National Park','CA','natpark',41.2132, -124.0046-3.4,'bannar.jpg',
				'redwood national park is the best! There are no entrence fees, and once you are in the park, you are transported to a nigh prehistoric place.  Giants older than Jesus erupt from the earth each desprately trying to reach further into the sunlight.',
				['redwoodarch.jpg','talltrees.jpg','crazytree.jpg','me.jpg','eric.jpg'],
				[
					'on our way down to the tall tree grove',
					'Tall Trees grove, once home to the tallest know redwood.  All the trees here are over 320ft tall!',
					'Frens and other trees make there home bellow the redwood canopy.',
					'Me enjoying a view of tall tree grove from the near by creek. Don\'t let the perspective descieve you the trees are well over 300ft and those bushes infront of them are realy large deciduous trees.',
					'Eric getting his mind blown'
				]
			);
			//olympic penn
			new PinUsa(this.pinBookUSA,'Olympic National Park','WA','natpark',47.8021-2, -123.6044+3,'bannar.jpg',
				'Olympic National Park was my favorite destination along my west coast road trip.  The diversity is mind blowing, you have rugged mountains that, roll into the temporate rainforest that they create, before crashing into an furrowed rocky coast line.  I will be going back to this magical place!',
				['backflip.jpg','hoh.jpg','hoh2.jpg','white.jpg','brown.jpg','olympic_sunset.jpg','olypic_coast.jpg','cave.jpg','treebridge.jpg'],
				[
					'Is there a more majestic backflip location in the world?! I think not!',
					'The Hoh Rainforest. It is teeming with green, dripping with moss, and absolutely unworldly.  Definitely swing by if you are ever in Washinton State.',
					'More Hoh!',
					'This is how my buddy Eric drinks a beer.',
					'This is how my other buddy Eric drinks a beer.',
					'The sun setting behind some of many rock outcroppings along the coast.',
					'The Olypic Coast at low tide',
					'My buddy Eric majesting in a sea cave',
					'This tree has no idea whats going on.'
				]
			);
		},

		init: function(){
			//first make USA map
			this.makeUSAPins();
			this.usaPinScreen = new PinScreen('pinscreenusa');
			this.usaMap = new Map('svgusa',this.pinBookUSA,this.usaPinScreen);
			this.usaMap.init();//lauch interactive map
			//now make usa key
			//this.usaKey = new Key(['natpark','underrated','home','city'],'usakey');
			//this.usaKey.init();

			//make world map

			//Bind events
			this.cacheDOM();
			this.bindEvents();
		},

		cacheDOM: function(){
			this.$pins = document.querySelectorAll('.pin');
			this.$exitBtnUsa = document.getElementById('usacontainer').getElementsByClassName('exitbutton')[0];
			this.$header = document.getElementsByTagName('header')[0];
		},

		bindEvents: function(){
			//window.addEventListener('scroll', this.scrollPageDirection.bind(this) );
			this.$exitBtnUsa.addEventListener('click', this.renderHeader.bind(this) );

			this.$pins.forEach(function(pin){
				pin.addEventListener('click', this.closeHeader.bind(this) );
			}.bind(this));
		},

		//event listener callback functions
		renderHeader: function(){
			this.$header.style.display = 'block';
		},
		closeHeader: function(){
			this.$header.style.display = 'none';
		},
		setY: 0,//variable to track scroll direction
		scrollPageDirection: function(){
			let offsetY = (window.pageYOffset || document.documentElement.scrollTop);
			if((offsetY - this.setY)>0){//moving down page
				this.closeHeader();
			}else{
				this.renderHeader();		
			}
			this.setY = offsetY;
		}
	};

	main.init();

})()

/*


//world map
//Make world pins
let ecuador = new PinWorld(
	'Ecuador with the Erics',
	'EC',
	'trip',
	0,-28.01,
	'flag.jpg',
	'After graduation my good buddy White Eric headed down to Southe America.  Brown Eric and I decided  this was the perfect time to head down and meet up with our buddy in Ecuador',
	['quito.jpeg','hostel.jpeg','window.jpeg'],
	['Quito the capital of Ecuador, at 9,000 ft of elevation... It rained every day!','One of our hostels on the coast','view out of my window onto the streets of Quito']
);
let worldPins = {};
let list2 = [ecuador];
for(let i = 0; i<list2.length; i++){
	worldPins[ list2[i].id  ] = list2[i];
}
let worldPinScreen = new PinScreen('pinscreenworld');
let worldMap = new Map('svgworld',worldPins, worldPinScreen);
worldMap.init();


*/