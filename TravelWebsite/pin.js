///----------------------------------------------------
// ---------Object constructors for Pins ----------------
///----------------------------------------------------------
function applyPrototype(parent,child){
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}
//-------------------------------
//Pin Object prototype
//to be used with svg map 
//--------------
function Pin(name, type, lat ,long, mainImage ,blog ,images=[], imageCaptions=[]){
	//identification
	this.id = name.split(' ').join('_');
	this.name = name;//title for the pin
	//classes css
	this.type = type;
	//location
	this.location = {'lat':lat, 'long':long};
	//Slide show - information
	this.screenData = {
		'bannar':'./Images/Pins/'+this.id+'/'+mainImage,
		'activities':[],
		'activityComments':imageCaptions,
		'blog': blog
	};
	for(let i = 0; i<images.length; i++){
		this.screenData.activities.push('./Images/Pins/'+this.id+'/'+images[i]);
	}
	//SVG definition for a pin
	//This could be its own object
	this.svg = {
		'nodeType':'path',
		'nameSpace':'http://www.w3.org/2000/svg',
		'attributes':{
			'id': this.id,
			'class':'pin'+' '+this.type,
			'd':"M18 6c0-3.314-2.687-6-6-6s-6 2.686-6 6c0 2.972 2.164 5.433 5 5.91v12.09l2-2v-10.09c2.836-.477 5-2.938 5-5.91zm-8.66-1.159c-.53-.467-.516-1.372.034-2.023.548-.65 1.422-.799 1.952-.333s.515 1.372-.033 2.021c-.549.652-1.423.801-1.953.335z"
		}
	}
}
//different for world pin vs us Pin
Pin.prototype.pinPixelLocation = function() {
	// take lat and long and convert to x,y
	let x = this.location.long;
	let y = this.location.lat;

	return {'x':x,'y':y}
};


///USA PIn-------------------------------------------------------------------------
//USA PIn-------------------------------------------------------------------------
///USA PIn-------------------------------------------------------------------------
///USA PIn-------------------------------------------------------------------------
///USA PIn-------------------------------------------------------------------------

//Utility functions for USA Map
function State(id,lat,long){
	this.id = id;
	this.location = [long,lat];
}
Object.defineProperties(State.prototype , {pixels: {
	get: function(){
			let rect = document.getElementById(this.id).getBoundingClientRect();
			return [rect.x,rect.y];}
	}
});
function linearFit(st1, st2,type){
	let m = ((st2.pixels[type] - st1.pixels[type])/(st2.location[type] - st1.location[type]));
	let b = (st2.pixels[type] - (m * st2.location[type] ));
	return {'m':m, 'b':b}
}
///USA --- constructor function------------------------------------------------------------------------------------
function PinUsa(name, state, type, lat ,long, mainImage ,blog ,images=[], imageCaptions=[]){
	//point this to a new instance of the pin object
	Pin.call(this, name, type, lat ,long, mainImage ,blog ,images, imageCaptions);
	this.parentId = state;
}
//Polymorphism --------------------------------
applyPrototype(Pin,PinUsa);
PinUsa.prototype.pinPixelLocation = function(){
	//make new states for geographic to pixel references
	let FL = new State('FL', 31.358979, -87.957235);
	let WA = new State('WA', 48.397406, -124.754235);

	let fx = linearFit(WA,FL,0);//get m and b for y = mx + b;
	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	let marginOffsetX = document.getElementById('container').offsetLeft;
	
	let x = (fx.m*this.location.long + fx.b) - marginOffsetX + scrollLeft;

	let fy = linearFit(WA,FL,1);
	let scrollTop= window.pageYOffset || document.documentElement.scrollTop;
	let marginOffsetY = document.getElementById('container').offsetTop;
	
	let y = (fy.m*this.location.lat + fy.b) - marginOffsetY + scrollTop;

	return {'x':x , 'y':y};
};





//World prototype---------------------------------  ----
//------------------------------------------------  ----
//------------------------------------------------  ----

function PinWorld(name, country, type, lat ,long, mainImage ,blog ,images=[], imageCaptions=[]){
	//point this to a new instance of the pin object
	Pin.call(this, name, type, lat ,long, mainImage ,blog ,images, imageCaptions);
	this.parentId = country;
}
//Polymorphism --------------------------------
applyPrototype(Pin, PinWorld);
PinWorld.prototype.pinPixelLocation = function(){
	//get the country location by 
	let countryRect = document.getElementById(this.parentId).getBoundingClientRect();
	//let pinRect = document.getElementById( this.id ).getBoundingClientRect();
	//place pin in the center
	let x = countryRect.x - (0/2)*countryRect.width;// - (1/2)*pinRect.width;
	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	let marginOffsetX = document.getElementById('container').offsetLeft;

	let y = countryRect.y - (0/2)*countryRect.height;// - (1/2)*pinRect.height;
	let scrollTop= window.pageYOffset || document.documentElement.scrollTop;
	let marginOffsetY = document.getElementById('container').offsetTop;


	console.log('placing: ',this.id, {'x':x , 'y':y} );
	console.log('placing with offsets: ',this.id, {
		'x': (x - marginOffsetX + scrollLeft) , 
		'y':(y - marginOffsetY + scrollTop)
	} );
	return {
		'x': (x - marginOffsetX + scrollLeft) , 
		'y':(y - marginOffsetY + scrollTop)
	};
};