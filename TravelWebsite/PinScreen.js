///Create and return a pin screen objet
//initializes on a pin Object 

function PinScreen(nodeID){
//Localized variables ---------------------------------------
	let slideShowImageID = 0;

//Main Functions ----------------------------------------------
//Main Functions ----------------------------------------------
//Main Functions ----------------------------------------------
//Main Functions ----------------------------------------------
//Main Functions ----------------------------------------------

//  Initialize screen | cacheDOM data | set evenetHandlers
	this.init = function(pinObj){

		//get DOM references
		this.cacheDOM();

		//set up html nodes to new pin data
		//set bannar
		this.setBannar(pinObj);
		//set slide show
		this.removeSlideShowImgNodes();
		this.removeSlideShowTxtNodes();
		this.makeSlideShowImgNodes(pinObj.screenData.activities);
		this.makeSlideShowTxtNodes(pinObj.screenData.activityComments);
		//set blog
		this.$blog.innerHTML = pinObj.screenData.blog;

		//now that we have set up the slide show we need to recache
		this.cacheDOM();
		this.nextImage();
		//set events
		this.bindEvents();
		//show screen
		this.render();
	};

	this.cacheDOM = function(){
		//Misc
		let cont = document.getElementById(nodeID);
		this.$container = cont;
		this.$exitbutton = cont.getElementsByClassName('exitbutton')[0];
		//bannar
		let bannar = cont.getElementsByClassName('pintitle')[0];
		this.$bannar = bannar;
		this.$bannarText = bannar.getElementsByTagName('textPath')[0];
		this.$bannarImage = bannar.getElementsByTagName('image')[0];
		this.$bannarImageCont = bannar.querySelector('pattern');
		//slide show
		let slcont = cont.getElementsByClassName('slideshowcont')[0];
		this.$slideShowCont = slcont;
		this.$slideShowCommentCont = slcont.getElementsByClassName('commentcont')[0];
		this.$slideShowComments = slcont.getElementsByTagName('p');
		this.$slideShowImages = slcont.getElementsByTagName('img');
		this.$slideShowNext = slcont.getElementsByClassName('nextbutton')[0];
		this.$slideShowPre = slcont.getElementsByClassName('prebutton')[0];
		//blog
		this.$blog = cont.getElementsByClassName('blog')[0].getElementsByTagName('p')[0];
	};

	this.bindEvents = function(){
		//pin screen scrolling
		this.$container.addEventListener('scroll', this.stayAtTop.bind(this) );
		//exit button
		this.$exitbutton.addEventListener('mouseenter',this.highLightFillOpacity );
		this.$exitbutton.addEventListener('mouseleave',this.removeHighLightFillOpacity );
		this.$exitbutton.addEventListener('click', this.close.bind(this)  );
		//slideshow
		//images
		for (var i = 0; i < this.$slideShowImages.length; i++) {
			let node = this.$slideShowImages[i];
			node.addEventListener('mouseenter',this.addBorder);
			node.addEventListener('mouseleave',this.removeBorder);
			node.addEventListener('click',this.nextImage.bind(this));
		}
		//comments
		for (var i = 0; i < this.$slideShowComments.length; i++) {
			let node = this.$slideShowComments[i];
			node.addEventListener('mouseenter',this.highLightBkgOpacity);
			node.addEventListener('mouseleave',this.removeHighLightBkgOpacity);
			node.addEventListener('click',this.nextImage.bind(this));
		}
		//next button 
		this.$slideShowNext.addEventListener('mouseenter', this.highLightFillOpacity);
		this.$slideShowNext.addEventListener('mouseleave', this.removeHighLightFillOpacity);
		this.$slideShowNext.addEventListener('click', this.nextImage.bind(this));
		//previous button
		this.$slideShowPre.addEventListener('mouseenter', this.highLightFillOpacity);
		this.$slideShowPre.addEventListener('mouseleave', this.removeHighLightFillOpacity);
		this.$slideShowPre.addEventListener('click', this.preImage.bind(this));
	};




//Event Handlers  --------------------------------------------------------
//Event Handlers  --------------------------------------------------------
//Event Handlers  --------------------------------------------------------
//Event Handlers  --------------------------------------------------------
//Event Handlers  --------------------------------------------------------
	this.stayAtTop = function(e){
		let top = e.target.scrollTop;
		console.log('shiftting: ' , this.$exitbutton );
		this.$exitbutton.style.top =  (top + 10) +'px';
	}
	this.addBorder = function(e){
		e.target.style.border = 'solid 2px white';
	};
	this.removeBorder = function(e){
		e.target.style.border = '';
	};
	this.highLightFillOpacity = function(e){
		e.target.style.fillOpacity = 1.0;
	};
	this.removeHighLightFillOpacity = function(e){
		e.target.style.fillOpacity = 0.5;
	};
	this.highLightBkgOpacity = function(e){
		e.target.parentNode.style.backgroundColor = 'rgba(0,0,0,1.0)';
	};
	this.removeHighLightBkgOpacity = function(e){
		console.log('removing bck highlight');
		e.target.parentNode.style.backgroundColor = 'rgba(0,0,0,0.5)';
	};
	this.nextImage = function(e){
		let l = this.$slideShowImages.length;
		//Check for multiple images
		if(l===1){
			lastSlideShowImageID = null;
			slideShowImageID = 0;
		}else{
			// increase curent image id
			slideShowImageID = slideShowImageID + 1;
			lastSlideShowImageID = slideShowImageID-1;
			//check for id rap arround to begging
			if( slideShowImageID>(l -1) ){
				slideShowImageID = 0;//reset slides
				lastSlideShowImageID = (l-1);
			}
		}	
		this.renderSlide();
	};
	this.preImage = function(e){
		let l = this.$slideShowImages.length;
		//Check for multiple images
		if(l===1){
			lastSlideShowImageID = null;
			slideShowImageID = 0;
		}else{
			//decrease current image id
			slideShowImageID = slideShowImageID - 1;
			lastSlideShowImageID = slideShowImageID + 1;
			//check for id rap arround to begging
			if( slideShowImageID<(0) ){
				slideShowImageID = (this.$slideShowImages.length -1);//reset slides
				lastSlideShowImageID = 0;
			}
		}
		this.renderSlide();
	};



//Rendering Functions ------------------------------------------------------
//Rendering Functions ------------------------------------------------------
//Rendering Functions ------------------------------------------------------
//Rendering Functions ------------------------------------------------------


//Show -- manipulare display
	//main screen
	this.render = function(){
		// need to position the screen properly
		this.$container.style.top = (this.$container.parentNode.offsetTop - (130)) +'px';
		this.$container.style.display ='block';
	};
	this.close = function(){
		this.$container.style.display ='none';
	};
	//slide show
	this.renderSlide = function(){
		// switch the image display attribute
		this.$slideShowImages[slideShowImageID].style.display = 'block';
		this.renederComment(slideShowImageID);
		// switch text to the new comment
		if(lastSlideShowImageID != null){
			this.$slideShowImages[lastSlideShowImageID].style.display = 'none';
			this.closeComment(lastSlideShowImageID);
		}
	};
	this.renederComment = function(id){
		this.$slideShowComments[id].style.display = 'block';
	};
	this.closeComment =  function(id){
		this.$slideShowComments[id].style.display = 'none';
	};



//HTML functions---------------------------------------------------------
//HTML functions---------------------------------------------------------
//HTML functions---------------------------------------------------------
//HTML functions---------------------------------------------------------
//HTML functions---------------------------------------------------------



//functions that alter html elements
	//editing slides
	this.makeSlideShowImgNodes = function(images){
		//Create all image divs
		images.forEach(function(imgurl){
			let img = document.createElement('IMG');
			img.setAttribute('src', imgurl);
			img.style.display = 'none';
			this.$slideShowCont.append(img);
		}.bind(this));
	};
	this.removeSlideShowImgNodes = function(){
		let parent = this.$slideShowCont;
		while (parent.querySelector('img')) {
	    	parent.removeChild( parent.querySelector('img') );
		}
	};

	this.makeSlideShowTxtNodes = function(comments){
		//Create all image divs
		comments.forEach(function(text){
			let txtNode = document.createElement('P');
			txtNode.innerHTML = text;
			txtNode.style.display = 'none';
			this.$slideShowCommentCont.append(txtNode);
		}.bind(this));
	};
	this.removeSlideShowTxtNodes = function(){
		let parent = this.$slideShowCommentCont;
		while (parent.querySelector('p')) {
	    	parent.removeChild( parent.querySelector('p') );
		}
	};

	//Editing the bannar
	this.makeBannarImageNode = function(pinObj){
		let image = document.createElementNS('http://www.w3.org/2000/svg','image');
		image.setAttributeNS("http://www.w3.org/1999/xlink",'xlink:href', pinObj.screenData.bannar );
		image.setAttributeNS(null,'width','350');//container has w=500
		//let it be automatic image.setAttributeNS(null,'height','200');
		image.setAttributeNS(null,'x','75');//center image in container
		image.setAttributeNS(null,'y','0');
		return image;
	};
	this.removeBannarImage = function(){
		this.$bannarImage.remove();
	};
	this.appendBannarImage = function(node){
		this.$bannarImageCont.append(node);
		this.$bannarImage = node;
	};
	this.setBannar = function(pinObj){
		this.$bannarText.innerHTML = pinObj.name;
		this.removeBannarImage();
		this.appendBannarImage(this.makeBannarImageNode(pinObj));
	};
}