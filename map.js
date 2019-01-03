///Map functions
//Add event listeners to all states/countirees
//add all event listeners to pins
//creates all html for pins

function Map(svgID, pinObjs, pinScreenObj){
	//start a new map 
	this.init = function(){
		this.cacheDOM();
		this.color('rgba(160, 160, 190,1)');//color the map elements
		//make and add pins into the map
		for(let i in pinObjs){
			this.makePinHTML( pinObjs[i] );
		}
		this.cahce$elements();
		this.cachePins();
		this.bindEvents();
	};
	//interface with the DOM i.e. get all nodes
	this.cacheDOM = function(){
		this.$container = document.getElementById(svgID);
		//select all paths that are not
		this.cahce$elements();
	};
	this.cachePins = function(){
		let cont = document.getElementById(svgID);
		this.$pins = cont.querySelectorAll('.pin');//get all pins
	}
	this.cacheElement = function(id){
		this.$element = document.getElementById(id);
	};
	this.cahce$elements = function(){
		this.$elements = []; 
		let paths = this.$container.querySelectorAll('path, g');////states and or countries on map
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
	//event listeners---------
	this.bindEvents = function(){
		//bind events to elements (states countires)
		this.$elements.forEach(function(node){
			//set mouse over for all items
			this.bind$element(node);
		}.bind(this));
		//bind evenets to pins
		this.$pins.forEach(function(node){
			//set mouse over for all items
			node.addEventListener('mouseenter', this.magnifyPin.bind(this) );
			node.addEventListener('mouseleave', this.removeMagnifyPin.bind(this) );
			//pin name
			node.addEventListener('mouseenter', this.showPinName.bind(this) );
			node.addEventListener('mouseleave', this.removePinName.bind(this) );
			
			node.addEventListener('click',function(e){
				pinScreenObj.init( pinObjs[e.target.id] );/*initiate a new pinScreen*/
			});
		}.bind(this));
	};
	this.bind$element = function(node){
		node.addEventListener('mouseenter', this.magnify2X.bind(this) );
		node.addEventListener('mouseleave', this.removeMagnify );

		node.addEventListener('mouseenter', this.addFillOpacity);
		node.addEventListener('mouseenter', this.showTop );

		node.addEventListener('mouseleave', this.removeFillOpacity );
	};

	//Callback functions (events) ----------------- ----------- ------ ----
	//Callback functions (events) ----------------- ----------- ------ ---
	//Callback functions (events) ----------------- ----------- ------ ---
	//Callback functions (events) ----------------- ----------- ------ ---
	//Callback functions (events) ----------------- ----------- ------ ---

	let nameTagType = 'H3';
	this.showPinName = function(event){
		let $pin = event.target;
		let pinObj = pinObjs[ $pin.id ];
		let parent = this.$container.parentNode;// can I put an h1 in a g tag?
		let $name = document.createElement(nameTagType);

		$name.innerHTML = pinObj.name;
		//position just to right of pin
		//TODO add in scroll + margin offset
		$name.style.position = 'absolute';

		let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		let scrollTop= window.pageYOffset || document.documentElement.scrollTop;

		$name.style.top =( $pin.getBoundingClientRect().y + scrollTop ) + 'px';
		$name.style.left = (35 + $pin.getBoundingClientRect().x + scrollLeft) + 'px';
		parent.append($name);
	};
	this.removePinName = function(event){
		let parent = this.$container.parentNode;
		let h3 = parent.querySelector(nameTagType);
		h3.remove();
	};
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
		let s =1.20;// 1.5;//scale
		let boundary = pathNode.getBoundingClientRect();

		let offsetX = (window.pageXOffset || document.documentElement.scrollLeft);//might need to get container offset
		let parentMarginX = pathNode.parentNode.parentNode.parentNode.offsetLeft;
		let x = boundary.x + (1/s)*boundary.width + offsetX - parentMarginX;

		let offsetY = (window.pageYOffset || document.documentElement.scrollTop);//might need to get container offset
		let parentMarginY = pathNode.parentNode.parentNode.parentNode.offsetTop;
		let y = boundary.y + (1/s)*boundary.height + offsetY - parentMarginY;

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
	this.placePinMatrix = function(pinObj,scaleX=1,scaleY=1){
		let loc = pinObj.pinPixelLocation();
		let centerX = ((scaleX*(11.52))-(11.52) )/(1);
		let centerY = ((scaleY*(23.04))-(23.04) )/2;
		let trans  = 'matrix('+ scaleX +','+ '0,0,' + scaleY + ',' + (loc.x - centerX) + ',' + (loc.y - centerY) +')';//  - scaleY*(23.04/2)
		//console.log('setting pin ',[scaleX,scaleY],pinObj.id,' to location',(loc.x - centerX),(loc.y - centerY));
		return trans;
	};
	//here we should check to see if there is a <g>
	//if no <g> we need to make one
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
		//now run nestPin
		this.nestPin(pin);
	};

	this.nestPin = function($pin){
		if( this.$element.tagName.toUpperCase() === 'PATH' ){
			//create a <g> tage
			let g = document.createElementNS('http://www.w3.org/2000/svg','g');
			//set g to previous id/class type
			let id = this.$element.getAttribute('id');
			g.setAttribute('class', this.$element.getAttribute('class') );
			g.setAttribute('id', id );
			this.$element.setAttribute('id', id + '_Path');
			this.$element.setAttribute('class','group');
			g.append(this.$element);
			this.$container.append(g);
			this.$element = g;
		}
		this.$element.append($pin);
	};
}	