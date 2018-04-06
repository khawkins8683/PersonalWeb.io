function btnOpacityOn(){
    document.getElementById("backtotopbtn").style.opacity = ".75";
    document.getElementById("contactinfo").style.opacity = "1.0";
}

function btnOpacityOff(){
    document.getElementById("backtotopbtn").style.opacity = "0";
    document.getElementById("contactinfo").style.opacity = "0.3";
}





// get the starting height value for each section
var abtTop = $("#aboutmesection").offset().top;
var interTop = $('#tutoringsection').offset().top;
var resTop = $('#resumesection').offset().top;
var downTop = $('#downloadsection').offset().top;
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