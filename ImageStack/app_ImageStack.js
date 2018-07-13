function range(min,max){
	var array = [];
	for(var i=min; i<=max; i++){
		array.push(i)
	}
	return array;
}

function newImageStack(imageList,contID){

	var self = {

		id: contID,
		edge: 20,
		flipDistance: 10,
		imageWidth: 400,
		draggerOffSet: 25,
		nextLayer: 1,
		baseLayer: 0,
		imageNumber: imageList.length,

		//Dom grabbers
		getContainerNode: function(){
			return document.getElementById(self.id)
		},
		getImageNode: function(index){
			var nodes = self.getContainerNode().getElementsByClassName("stackImage level"+index);
			return nodes[0];
		},
		//this didn't work as an ID unless you use document.getElementById
		//had to change ID to Class
		getDraggerNode: function(){
			var nodes = document.getElementById(self.id).getElementsByClassName("dragger");
			return nodes[0];
		},
		changeDraggerWidth: function(newPosition){
			self.getDraggerNode().style.left = (newPosition-self.draggerOffSet)+"px";
		},
		changeImageWidth: function(imID,width){
			var image = self.getImageNode(imID);
			image.style.width = width + "px";
		},
		changeImageZIndex: function(zIndex,imageID){
			var image = self.getImageNode(imageID);
			image.style.zIndex = zIndex;
		},
		colorDragger: function(color){
			var dragger = self.getDraggerNode();
			dragger.style.backgroundColor = color;
		},
		setNewZIndex: function(){

			var set0List = range(0,self.imageNumber-1);//.splice(self.nextLayer,1);
			for(var i =0; i<set0List.length; i++){
				self.changeImageZIndex(-1,set0List[i])
			}
			self.changeImageZIndex(1,self.nextLayer);
			self.changeImageZIndex(0,self.baseLayer);



		},

		flipToNextImage: function(){

			//change image index
			self.baseLayer = self.nextLayer;
			//wrap next layer to beggining if at the end
			if(self.nextLayer>=(self.imageNumber-1)){
				self.nextLayer = 0;
			} else {
				self.nextLayer = self.nextLayer + 1;
			}

			//Change zIndex
			self.setNewZIndex();

			//now set thde base layer to full and the top layer to edge
			self.changeImageWidth(self.nextLayer,self.edge);
			self.changeImageWidth(self.baseLayer,self.imageWidth);
			self.changeDraggerWidth(self.edge);
		},

		flipToPreviousImage: function(){

			self.nextLayer = self.baseLayer;
			if(self.baseLayer<=0){
				self.baseLayer = self.imageNumber - 1;
			} else {
				self.baseLayer = self.baseLayer - 1;
			}

			//Change zIndex
			self.setNewZIndex();

			//now set thde base layer to full and the top layer to edge
			self.changeImageWidth(self.nextLayer,self.imageWidth - self.edge);
			self.changeImageWidth(self.baseLayer,self.imageWidth);
			self.changeDraggerWidth(self.imageWidth - self.edge);

		},
		
		imageSlide: function(mouseClickEvent){
			var x = mouseClickEvent.clientX;
			if(x>self.flipDistance && x<(self.imageWidth-self.flipDistance)){
				console.log("imageSlide Event: in picture");
				// mouse is in image area
				self.changeImageWidth(self.nextLayer,x);
				self.changeDraggerWidth(x);
			} else if (x>=(self.imageWidth-self.flipDistance)) {
				//mouse is at right edge
				console.log("imageSlide Event: at right edge flipping to next " + x);
				self.stopPainting();
				self.flipToNextImage();
			} else if(x<=self.flipDistance){
				//mouse is at left edge
				console.log("imageSlide Event: at left edge flipping to previous");
				self.stopPainting();
				self.flipToPreviousImage();
			} else {
				//thow an error
				self.stopPainting();
				console.log(["unable to Identify clientX value",x]);
				//reset to original
			}

		},
		stopPainting: function(){
			//self.clicked = false;
			//was window.
			//self.getDraggerNode()
			window.removeEventListener("mousemove",self.imageSlide/*.bind(self)*/);			
		},
		startPainting: function(){
			//self.getDraggerNode()
			window.addEventListener("mousemove",self.imageSlide/*.bind(self)*/);			
		}

	}
	//set container attributes
	//do I really need This??
	//self.getContainerNode().style.postion = "relative";
	var draggerDiv = document.createElement("div");
	draggerDiv.setAttribute("class","dragger");
	var brushImg = document.createElement("img");
	brushImg.setAttribute("src","./Images/paintBrush.svg");
	draggerDiv.appendChild(brushImg);
	self.getContainerNode().appendChild(draggerDiv);
	//First build the image and dragger divs
	for(var i=0; i<self.imageNumber; i++){

		var imageDiv = document.createElement("div");
        imageDiv.setAttribute("class", "stackImage level" + i);

        var newImage = document.createElement("img");
        newImage.setAttribute("src", imageList[i]);
        newImage.style.width = self.imageWidth+"px";
        imageDiv.appendChild(newImage);

        self.getContainerNode().appendChild(imageDiv);

	}
	//Get images in correct stack order 
	self.setNewZIndex();
	self.changeImageWidth(self.nextLayer, 75);
	self.changeDraggerWidth(75);


	//now add event listeners to the dragger
	self.getDraggerNode().addEventListener("mouseup", self.stopPainting );
	self.getDraggerNode().addEventListener("mousedown", self.startPainting );
	return self;
}

var testOBJ = newImageStack(
	["./Images/paint0.jpg",
	"./Images/paint1.jpg",
	"./Images/paint2.jpg",
	"./Images/paint3.jpg",
	"./Images/paint4.jpg"],
	"container");
