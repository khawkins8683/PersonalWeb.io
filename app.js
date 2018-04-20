//footer functions
function btnOpacityOn(){
    document.getElementById("backtotopbtn").style.opacity = ".75";
    document.getElementById("contactinfo").style.opacity = "1.0";
}

function btnOpacityOff(){
    document.getElementById("backtotopbtn").style.opacity = "0";
    document.getElementById("contactinfo").style.opacity = "0.3";
}

// get the starting height value for each section
var offSetMove= -200;
var abtTop = document.getElementById("aboutmesection").offsetTop + offSetMove;
var tutTop =  document.getElementById("tutoringsection").offsetTop + offSetMove;
var resTop =  document.getElementById("resumesection").offsetTop + offSetMove;
var downTop =  document.getElementById("downloadsection").offsetTop + offSetMove;

function setTextByID(size, idArray ){
    for(var i = 0; i < idArray.length; i++){
        document.getElementById(idArray[i]).style.fontSize = size + "px";
    }
}

//now set the windows on scrole event
window.addEventListener('scroll', function(){

    // we round here to reduce a little workload
    var current = Math.round(this.scrollY);

    //add class to nav item if scroll bar is in each section
    switch(true){
        case ((current > 0)&&(tutTop > current)):
            setTextByID(24, ["navAboutMe"] );
            setTextByID(17, ["navTutoring","navResume","navDownloads"] );
            break;

        case ((current > tutTop)&&(resTop > current)):
            setTextByID(24, ["navTutoring"] );
            setTextByID(17, ["navAboutMe","navResume","navDownloads"] );        
            break; 

        case  ((current > resTop)&&(downTop > current)):   
            setTextByID(24, ["navResume"] );
            setTextByID(17, ["navAboutMe","navTutoring","navDownloads"] );
            document.getElementById("navResume").style.fontSize = "24px";
            break; 

        case (current > downTop):
            setTextByID(24, ["navDownloads"] );
            setTextByID(17, ["navAboutMe","navTutoring","navResume"] );
            break;           
    }
}); 


function newSlideShow(imageID, fileList,captionList){

    var self = {
        slideShowId: imageID,
        picIndex: 1,
        imageList: fileList,
        captions: captionList,

        getImageElement: function(){
            //console.log("getting ID: "+self.slideShowId);
            return document.getElementById(self.slideShowId);
        },
        getTextElement: function(){
            //console.log("getting ID: "+self.slideShowId);
            return document.getElementById(self.slideShowId+"text");
        },
        getForwardArrow: function(){
            var slideShowCont =document.getElementById(self.slideShowId).parentNode;
            return slideShowCont.getElementsByClassName('forwardArrow')[0];;
        },
        getBackArrow: function(){
            var slideShowCont =document.getElementById(self.slideShowId).parentNode;
            return slideShowCont.getElementsByClassName('backArrow')[0];;
        },        
        imageFrame: function(){
            self.getImageElement().style.border = "3px solid white"; 
        },
        removeImageFrame: function(){
            self.getImageElement().style.border = "none"; 
        },
        colorForwardArrow: function(color){
            var arrow = self.getForwardArrow();
            arrow.getElementsByClassName('pointer')[0].style.backgroundColor = color;
        },
        colorBackArrow: function(color){
            var arrow = self.getBackArrow();
            arrow.getElementsByClassName('pointer')[0].style.backgroundColor = color;
        },        
        nextPic:function(){
            //get pic + text elements
            
            var pic = self.getImageElement();
            var picText = self.getTextElement();

            // console.log(self,pic,picText);
            //set them to new values
            picText.innerHTML = self.captions[ self.picIndex  ];
            pic.setAttribute("src","./Images/" + self.imageList[ self.picIndex ]);
            //bump up counter index and reset if needed
            self.picIndex++;
            if(self.picIndex > (self.imageList.length-1) ){ self.picIndex = 0; };    
        },  
        previousPic: function(){
            if(self.picIndex == 0 ){ 
                self.picIndex = (self.imageList.length-1)
            }else{
                self.picIndex--;
            }
            var pic = self.getImageElement();
            var picText = self.getTextElement();
            //set them to new values
            picText.innerHTML = self.captions[ self.picIndex  ];
            pic.setAttribute("src","./Images/"+self.imageList[ self.picIndex ]);
        }

    };

    //add the event listeners Image
    self.getImageElement().addEventListener("mouseover", self.imageFrame);
    self.getImageElement().addEventListener("mouseout", self.removeImageFrame);

    self.getImageElement().addEventListener("mouseover", function(){ self.colorForwardArrow("blue");  });
    self.getImageElement().addEventListener("mouseout", function(){ self.colorForwardArrow("red");  });

    self.getImageElement().addEventListener("click", self.nextPic);

    //Forward Arrow
    self.getForwardArrow().addEventListener("mouseover", self.imageFrame);
    self.getForwardArrow().addEventListener("mouseout", self.removeImageFrame);

    self.getForwardArrow().addEventListener("mouseover", function(){ self.colorForwardArrow("blue");  });
    self.getForwardArrow().addEventListener("mouseout", function(){ self.colorForwardArrow("red");  });

    self.getForwardArrow().addEventListener("click", self.nextPic);

    //Back Arrow
    self.getBackArrow().addEventListener("mouseover", self.imageFrame);
    self.getBackArrow().addEventListener("mouseout", self.removeImageFrame);

    self.getBackArrow().addEventListener("mouseover", function(){ self.colorBackArrow("blue");  });
    self.getBackArrow().addEventListener("mouseout", function(){ self.colorBackArrow("red");  });


    self.getBackArrow().addEventListener("click", self.previousPic);

    return self;
}

var picMeList = [
    "me.jpg",
    "meBackFlip.jpg",
    "meTree.jpg",
    "meRome.jpg",
    "meGraduate.jpg",
    "meAntCanyon.jpg",
    "meAfro.jpg"
];
var picMeText=[
    "Me happy!",
    "Me flipping!",
    "Me stuck on tree!",
    "Me in Rome!",
    "Me surviving!",
    "Me Arizonaing!",
    "Me in High School!"
];

var mePicSlideShow = newSlideShow('mepic', picMeList, picMeText);

var picIntList = [
    "meIntSki.png",
    "meIntBackFlip.jpg",
    "meIntPaint.jpg",
    "meIntClimb.jpg"
];
var picIntText=[
    "Cat skiing with my Dad in Steamboat Springs, Co.",
    "Trampolines were my childhood. This was a bouncy one at a carnival in Italy.",
    "I like to paint.  When I studied abroad in Itally I took Art:275 (water colors)",
    "Climbing is one of the best things to do in Tucson.  When it is hot, we climb at a cooler 9,000 ft elevation at the top of Mt. Lemmon"
];

var intPicSlideShow = newSlideShow('intpic', picIntList, picIntText);
