
function btnOpacityOn(){
    document.getElementById("backtotopbtn").style.opacity = ".75";
    document.getElementById("contactinfo").style.opacity = "1.0";
}

function btnOpacityOff(){
    document.getElementById("backtotopbtn").style.opacity = "0";
    document.getElementById("contactinfo").style.opacity = "0.3";
}


function frameOn(){
    for(var i = 0; i<arguments.length; i++){    
        document.getElementById(arguments[i]).style.border = "3px solid white";
    }    
}

function frameOff(){
    for(var i = 0; i<arguments.length; i++){    
        document.getElementById(arguments[i]).style.border = "none";
    }    
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

var picMeIndex = 1;

function nextPicAboutMe() {

    var picText = document.getElementById("metext");
    var pic = document.getElementById("mepic");

    picText.innerHTML = picMeText[picMeIndex];
    pic.setAttribute("src","./Images/"+picMeList[picMeIndex]);

    picMeIndex++;
    if(picMeIndex > (picMeList.length-1) ){ picMeIndex=0; }
    

}


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

var picIntIndex = 1;

function nextPicInterests() {

    var picText = document.getElementById("inttext");
    var pic = document.getElementById("interestpic");

    picText.innerHTML = picIntText[picIntIndex];
    pic.setAttribute("src","./Images/"+picIntList[picIntIndex]);

    picIntIndex++;
    if(picIntIndex > (picIntList.length-1) ){ picIntIndex=0; }
    

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
    // if ((current > 0)&&(interTop > current)) {
    //     $("#navAboutMe").addClass("highlight");
    // } else{
    // 	$("#navAboutMe").removeClass("highlight");
    // }

    // if ((current > interTop)&&(resTop > current)) {
    //     $("#navTutoring").addClass("highlight");
    // } else{
    // 	$("#navTutoring").removeClass("highlight");
    // }

    // if ((current > resTop)&&(downTop > current)) {
    //     $("#navResume").addClass("highlight");
    // } else{
    // 	$("#navResume").removeClass("highlight");
    // }

    // if (current > downTop) {
    //     $("#navDownloads").addClass("highlight");
    // } else{
    // 	$("#navDownloads").removeClass("highlight");
    // }

