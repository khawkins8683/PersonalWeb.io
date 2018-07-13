//footer functions
function btnOpacityOn(){
    document.getElementById("backtotopbtn").style.opacity = ".75";
    document.getElementById("contactinfo").style.opacity = "1.0";
}

function btnOpacityOff(){
    document.getElementById("backtotopbtn").style.opacity = "0.3";
    document.getElementById("contactinfo").style.opacity = "0.3";
}

//Build the Projects Section
function addProject(linkName, directoryName ){
    //Create a div and add it into the projects section
    //put hyperlink to new webpage inside of the div
    var prjCont = document.getElementById('projectList');
    console.log(prjCont);
    var item = document.createElement("LI");
    var link = document.createElement("A");
    link.innerHTML = linkName;
    link.setAttribute("href","./"+directoryName+"/index.html");
    item.appendChild(link);
    prjCont.appendChild(item);

    //now set the height
    var prjSection = document.getElementById('projectssection');
    var curHeight = prjSection.offsetHeight;
    console.log(prjSection,curHeight);
    prjSection.style.height = curHeight + 50 + "px";
    console.log(prjSection.offsetHeight);
}
addProject( "- Water Color Painting >>", "ImageStack");
addProject( "- Take the Newton Quizz! >>", "Math Quizz");

// get the starting height value for each section
var offSetMove= -200;
var abtTop = document.getElementById("aboutmesection").offsetTop + offSetMove;
var prjTop = document.getElementById("projectssection").offsetTop + offSetMove;
///*section sizing*/
// #aboutmesection{
//     padding-top: 200px;
//     height: 550px;
// }
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
        case ((current > 0)&&(prjTop > current)):
            setTextByID(24, ["navAboutMe"] );
            setTextByID(17, ["navTutoring","navProjects","navResume","navDownloads"] );
            break;
        case ((current > prjTop)&&(tutTop > current)):
            setTextByID(24, ["navProjects"] );
            setTextByID(17, ["navAboutMe","navResume","navDownloads"] );        
            break;
        case ((current > tutTop)&&(resTop > current)):
            setTextByID(24, ["navTutoring"] );
            setTextByID(17, ["navAboutMe","navProjects","navResume","navDownloads"] );        
            break; 
        case  ((current > resTop)&&(downTop > current)):   
            setTextByID(24, ["navResume"] );
            setTextByID(17, ["navAboutMe","navProjects","navTutoring","navDownloads"] );
            document.getElementById("navResume").style.fontSize = "24px";
            break; 
        case (current > downTop):
            setTextByID(24, ["navDownloads"] );
            setTextByID(17, ["navAboutMe","navProjects","navTutoring","navResume"] );
            break;           
    }
}); 

//Todo:: create the properstructure with java script and set up the css
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
            return slideShowCont.getElementsByClassName('forwardArrow')[0];
        },
        getBackArrow: function(){
            var slideShowCont =document.getElementById(self.slideShowId).parentNode;
            return slideShowCont.getElementsByClassName('backArrow')[0];
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
        },
        buildFooter: function(){
            var slcontainer = document.getElementById(self.slideShowId).parentNode;
            var text = slcontainer.getElementsByTagName("P")[0].valueOf().innerHTML;
            slcontainer.getElementsByTagName("P")[0].remove();

            var footer = document.createElement("div");
            footer.setAttribute("class", "slideshowfooter"); // and make sure myclass has some styles in css
            
            var forward = document.createElement("div");
            forward.setAttribute("class", "forwardArrow");
            forward.innerHTML = '<div class="pointer"><p> > </p></div>';

            var backward = document.createElement("div");
            backward.setAttribute("class", "backArrow");
            backward.innerHTML = '<div class="pointer"><p> < </p></div>';

            var sltext = document.createElement("div");
            sltext.setAttribute("class", "slideshowtext"); 
            sltext.innerHTML = "<p "+"id='"+self.slideShowId+"text'>"+ text +"</p>";

            footer.appendChild(backward);
            footer.appendChild(sltext);
            footer.appendChild(forward);
            slcontainer.appendChild(footer);
        }

    };

    //now add in the html constructor
    //Find the p section and replace with the slide show footer
    self.buildFooter();
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
