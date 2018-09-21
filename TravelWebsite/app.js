///MAKE USA Pins-------------------------

let yosemiteUsa = new PinUsa(
		'Yosemite National Park',
		'CA',
		'natpark',
		37.8651+1, -119.5383-4.5,
		'yosemite.jpg',
		'Vivamizzle fo shizzle rizzle gizzle sure consectetizzle pretizzle. Vivamizzle sit amet break it down. Nizzle eu gizzle fo shizzle lacizzle stuff feugizzle. Uhuh ... yih! suscipizzle my shizz ipsizzle. Fo break it down gizzle. Nizzle fo shizzle my nizzle enim, fo shizzle sizzle, congue bow wow wow, dignissim rizzle, libero. Nullam vitae pede rizzle erizzle posuere shiz. Quisque mah nizzle fizzle, congue break it down, auctizzle check out this, mollis shizzle my nizzle crocodizzle get down get down, shizzle my nizzle crocodizzle. Bizzle sure dui. Gangster risizzle yo, elementum consectetizzle, sollicitudin daahng dawg, consequat dang, turpizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle gangsta yo eu pizzle rutrizzle vehicula. Break yo neck, yall fo shizzle fo dope. Pellentesque fizzle nizzle ',
		['grack.png','yosemitefalls.png','slothwall.png'],
		['climbing the grack 5.6','looking in awe','climbing sloth wall 5.7']
);

let jt = new PinUsa(
		'Joshua Tree National Park',
		'CA',
		'natpark',
		35, -119.5383-2,
		'JT.jpg',
		'Vivamizzle fo shizzle rizzle gizzle sure consectetizzle pretizzle. Vivamizzle sit amet break it down. Nizzle eu gizzle fo shizzle lacizzle stuff feugizzle. Uhuh ... yih! suscipizzle my shizz ipsizzle. Fo break it down gizzle. Nizzle fo shizzle my nizzle enim, fo shizzle sizzle, congue bow wow wow, dignissim rizzle, libero. Nullam vitae pede rizzle erizzle posuere shiz. Quisque mah nizzle fizzle, congue break it down, auctizzle check out this, mollis shizzle my nizzle crocodizzle get down get down, shizzle my nizzle crocodizzle. Bizzle sure dui. Gangster risizzle yo, elementum consectetizzle, sollicitudin daahng dawg, consequat dang, turpizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle gangsta yo eu pizzle rutrizzle vehicula. Break yo neck, yall fo shizzle fo dope. Pellentesque fizzle nizzle ',
		['bumpy.png'],
		['fun weird climb']
);

let usaPins = {};
let list = [jt,yosemiteUsa];
for(let i = 0; i<list.length; i++){
	usaPins[ list[i].id  ] = list[i];
}//USA Map
let usaPinScreen = new PinScreen('pinscreenusa');
let usaMap = new Map('svgusa',usaPins,usaPinScreen);
console.log('UsaMap', usaMap);
usaMap.init();



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



//general functions for page -------------------------------------------
//----------------------------------------------------------------------

function renderHeader(){
	let header = document.getElementsByTagName('header')[0];
	header.style.display = 'block';
}
function closeHeader(){
	let header = document.getElementsByTagName('header')[0];
	header.style.display = 'none';
}
let setY = 0;
function scrollPageDirection(){
	let offsetY = (window.pageYOffset || document.documentElement.scrollTop);
	if((offsetY-setY)>0){//moving down page
		closeHeader();
	}else{
		renderHeader();
	}
	setY = offsetY;
}
window.addEventListener('scroll', scrollPageDirection );
let exitBtnUsa = document.getElementById('usacontainer').getElementsByClassName('exitbutton')[0];
exitBtnUsa.addEventListener('click', renderHeader );

let pins = document.querySelectorAll('.pin');
pins.forEach(function(pin){
	pin.addEventListener('click', closeHeader );
});

///TODO:

//Auto wrapping states/countries in a g container

//---Stop events from rapid firing
//---Fix wierd pinscreen exitbutton scroll bug
//----better formatting for the pin screen

//-----world country zoom geometry
//-----world pin placement geometry

//-----add pin location and type to the pin hover events
//-----add in a footer

//---usa ajax to grab usa images for usa bkg
//--- usa ajax to grab world images as bkg for world map



//structure main code into modular form