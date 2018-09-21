///Map functions
//Add event listeners to all states/countirees
//add all event listeners to pins
//creates all html for pins
function Map(svgID, pinObjs, pinScreenObj){

	//start a new map 
	this.init = function(){
		this.cacheDOM();
		this.color('red');//color the map elements
		//make and add pins into the map
		for(let i in pinObjs){
			this.makePinHTML( pinObjs[i] );
		}
		this.cachePins();
		this.bindEvents();
	};

	//interface with the DOM i.e. get all nodes
	this.cacheDOM = function(){
		let cont = document.getElementById(svgID);
		//let elements = cont.getElementsByTagName('path');
		this.$container = cont;
		//select all paths that are not
		this.$elements = []; 
		let paths = cont.querySelectorAll('path, g');////states and or countries on map
		//console.log('paths', paths, elements);
		for(let ii=0;  ii<paths.length; ii++){
			let c = paths[ii].getAttribute('class');
			if(c){
				let classType = (c.split(' ')[0]);
				if( (classType != 'pin')&&(classType != 'group') ){
					this.$elements.push(paths[ii]);
				}	
			}else{
				//no class defined assume element
				this.$elements.push(paths[ii]);
			}
		}
	};
	this.cachePins = function(){
		let cont = document.getElementById(svgID);
		this.$pins = cont.querySelectorAll('.pin');//get all pins
	}
	this.cacheElement = function(id){
		this.$element = document.getElementById(id);
	};

	//event listeners---------
	this.bindEvents = function(){
		console.log('binding events to: ', this.$pins);
		//bind events to elements (states countires)
		this.$elements.forEach(function(node){
			//set mouse over for all items
			node.addEventListener('mouseenter', this.magnify2X.bind(this) );
			node.addEventListener('mouseleave', this.removeMagnify );

			node.addEventListener('mouseenter', this.addFillOpacity);
			node.addEventListener('mouseenter', this.showTop );
			node.addEventListener('mouseleave', this.removeFillOpacity );
		}.bind(this));
		//bind evenets to pins
		this.$pins.forEach(function(node){
			//set mouse over for all items
			node.addEventListener('mouseenter', this.magnifyPin.bind(this) );
			node.addEventListener('mouseleave', this.removeMagnifyPin.bind(this) );
			node.addEventListener('click',function(e){
				console.log('registered Click on pin ',e.target.id );
				pinScreenObj.init( pinObjs[e.target.id] );/*initiate a new pinScreen*/
			});
		}.bind(this));
	};
	//Callback functions (events)
	this.showTop = function(event){
		//move child to end of parent svg
		let child = event.target;
		let parent = child.parentNode;
		parent.append(child);
	};
	this.addFillOpacity = function(event){
		event.target.style.fillOpacity = 1.0;
	};
	this.removeFillOpacity = function(event){
		event.target.style.fillOpacity = 0.5;
	};
	this.removeMagnify = function(event){
		event.target.style.transform = '';
	};
	this.magnify2X = function(event){
		this.magnifySVGElement(  event.target,2,2);//need to bind this to eventHandler
	};
	this.removeMagnifyPin = function(event){
		let pinObj = pinObjs[ event.target.id ];
		event.target.style.transform =  this.placePinMatrix(pinObj,1,1);
	};
	this.magnifyPin = function(event){
		let pinObj = pinObjs[ event.target.id ];
		event.target.style.transform =  this.placePinMatrix(pinObj,1.5,1.5); 
	};
	this.magnifySVGElement = function(pathNode,scaleX,scaleY){

		let boundary = pathNode.getBoundingClientRect();

		let offsetX = (window.pageXOffset || document.documentElement.scrollLeft);//might need to get container offset
		let parentMarginX = pathNode.parentNode.parentNode.parentNode.offsetLeft;
		let x = boundary.x + (1/1.5)*boundary.width + offsetX - parentMarginX;

		let offsetY = (window.pageYOffset || document.documentElement.scrollTop);//might need to get container offset
		let parentMarginY = pathNode.parentNode.parentNode.parentNode.offsetTop;
		let y = boundary.y + (1/1.5)*boundary.height + offsetY - parentMarginY;

		let xTrans =  (x-scaleX*x);
		let yTrans =  (y-scaleX*y);

		let trans  = 'matrix('+
						scaleX +','+ '0,0,' + scaleY + ',' + //scale and rotations
						xTrans + ',' + yTrans +//translations
					')';
		pathNode.style.transform = trans;
	};

    //General  HTML CSS modifiers
	//actions
	this.color = function(color){
		this.$elements.forEach( function(node){
			node.style.fill = color;
		});
	}; 
	//this make pins
	this.placePinMatrix = function(pinObj,scaleX=1,scaleY=1){
		let loc = pinObj.pinPixelLocation();
		let centerX = ((scaleX*(11.52))-(11.52) )/(1);
		let centerY = ((scaleY*(23.04))-(23.04) )/2;
		let trans  = 'matrix('+ scaleX +','+ '0,0,' + scaleY + ',' + (loc.x - centerX) + ',' + (loc.y - centerY) +')';//  - scaleY*(23.04/2)
	
		return trans;
	};
	this.makePinHTML = function(pinObj){
		let pin = document.createElementNS( pinObj.svg.nameSpace , pinObj.svg.nodeType );
		let at = pinObj.svg.attributes;
		for(let i in at ){
			pin.setAttribute(i, at[i]);
		}
		// sets the transform
		pin.style.transform = this.placePinMatrix(pinObj);
		//now add it in to the respective state
		this.cacheElement(pinObj.parentId);
		this.$element.append(pin);
	};

}	