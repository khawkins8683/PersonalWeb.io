// set an event listener on the widow
// get all the sections

//var scroll = $(window).scrollTop();


function getSectionPositions(scrollSectionIDs){

	let heightList = [];
	//let scrollPos = $(window).scrollTop();

	for(let i=0; i<scrollSectionIDs.length; i++){
		//get the element offset width
		let div = $('#'+scrollSectionIDs[i]);
		heightList.push(div.offset().top);
		console.log(scrollSectionIDs[i] ,div.offset().top);
	}
	return heightList;
}

let scrollSectionIDs = ['aboutme','resume','simba','contactme'];
let heightList = getSectionPositions(scrollSectionIDs);

function setNavScroll(){
	let sec ="";
	let li = null;
	let scrollPos = $(window).scrollTop();
	//console.log('scroll Positon: ',scrollPos);
	//get the current section
	for(let i = 0; i<scrollSectionIDs.length-1; i++){
		
		if(scrollPos>heightList[i]&&scrollPos<heightList[i+1]){
			//add high light to nav sec
			sec = scrollSectionIDs[i];
			li  = $('.'+ sec);
			//li.addClass('navhighlight');
			console.log('In Section ',sec);

		}else if(scrollPos>heightList[heightList.length-1]){
			sec = scrollSectionIDs[heightList.length-1];
			li  = $('.'+ sec);
			console.log('In Section ',sec);
		}
	}

	for(let i = 0; i<scrollSectionIDs.length; i++){
		if(scrollSectionIDs[i]===sec){
			li.addClass('navhighlight')
		}else{
			$('.'+ scrollSectionIDs[i]).removeClass('navhighlight');
		}
	}


}

/*
else{
			//remove highlight from all nav sections
			for(let j = 0; j<scrollSectionIDs.length; j++){
				if(scrollSectionIDs[j] != sec){
					$('.'+ scrollSectionIDs[j]).removeClass('navhighlight');
				}
			}
		}*/

$(window).scroll( setNavScroll );