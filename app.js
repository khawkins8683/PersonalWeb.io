

function btnOpacityOn(){
    document.getElementById("backtotopbtn").style.opacity = ".75";
    document.getElementById("contactinfo").style.opacity = "1.0";
}

function btnOpacityOff(){
    document.getElementById("backtotopbtn").style.opacity = "0";
    document.getElementById("contactinfo").style.opacity = "0.3";
}


function frameOn(idInput){
    document.getElementById(idInput).style.border = "3px solid white";
}
function frameOff(idInput){
    document.getElementById(idInput).style.border = "none";
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
var abtTop = $("#aboutmesection").offset().top + offSetMove;
var interTop = $('#tutoringsection').offset().top+ offSetMove;
var resTop = $('#resumesection').offset().top+ offSetMove;
var downTop = $('#downloadsection').offset().top+ offSetMove;
//alert([abtBot,interBot,resBot,downBot]);

// have the nav menu track the scrolling
$(window).on('scroll',function(){

    // we round here to reduce a little workload
    var current = Math.round($(window).scrollTop());

    //add class to nav item if scroll bar is in each section

    if ((current > 0)&&(interTop > current)) {
        $("#navAboutMe").addClass("highlight");
    } else{
    	$("#navAboutMe").removeClass("highlight");
    }

    if ((current > interTop)&&(resTop > current)) {
        $("#navTutoring").addClass("highlight");
    } else{
    	$("#navTutoring").removeClass("highlight");
    }

    if ((current > resTop)&&(downTop > current)) {
        $("#navResume").addClass("highlight");
    } else{
    	$("#navResume").removeClass("highlight");
    }

    if (current > downTop) {
        $("#navDownloads").addClass("highlight");
    } else{
    	$("#navDownloads").removeClass("highlight");
    }

});