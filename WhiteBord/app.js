//TODO
//  add in other proofs button to the menu
//	add in formal vs proof outline
//  add in save proof button functionality
//  add in links to other steps
//	add in links to other proofs
//	add in step names
//  pretty up format
	//background
	//header



//Proof object -------------------------------------------------------------------------------------------
//Proof object -------------------------------------------------------------------------------------------
//Proof object -------------------------------------------------------------------------------------------
//Proof object -------------------------------------------------------------------------------------------
function Proof(){

	let stepNumber = 0;
	//this.assumptions = steps[0];

	this.load = function(steps){
		let div;
		for (let i = 0; i < steps.length; i++) {
			div = $('<p class="proofstep" id="step'+i+'">'+ steps[i] +'</p>')	
			$('#whiteboardtext').append(div);
			$('#whiteboardtext').append( $('<hr>') );
		}
		$('#whiteboardtext').append($('<p id="placeholder"></p>'));
	};

	this.nextStep = function(){
		stepNumber  = stepNumber +1;
		if( stepNumber< $('.proofstep').length ){
			let step = $('#step' + stepNumber );
			step.show(animateTime);
			$('#whiteboardtext').children('hr').eq(stepNumber).show(animateTime);
			$('#whiteboardtext').animate({ 
				scrollTop: step.position().top + $('#whiteboardtext').scrollTop() - $('#stepcount').height()
			}, animateTime);
		}else{
			console.log('end of proof')
		}
	};

	this.start = function(){
		stepNumber = 0;//using this as a global varibale
		$('.proofstep').hide();
		$('#whiteboardtext hr').hide();
		$('.proofstep:first').show();
		$('#whiteboardtext hr:first').show();
		['#proofstep','#nextstep','#stepcount'].forEach(function(element) {$(element).hide()});		
	};

}
//MAKE PROOFS
//root 2
let root2Steps = [
	'Suppose that \\(x^2 = 2\\)<br>Now, assume by way of contradiction that &nbsp;\\( x \\hspace{0.5cm} \\epsilon \\hspace{0.5cm} Q \\kern-1.4ex Q   \\)',
	'Then we can write x as a fraction where,\\[x = \\dfrac{a}{b} \\]where \\( a \\hspace{0.5cm} \\epsilon \\hspace{0.5cm} N \\kern-1.7ex N \\), and \\( b \\hspace{0.5cm} \\epsilon \\hspace{0.5cm} N \\kern-1.7ex N \\)',
	'So from <a href="">step 1</a> we know that,\\[x^2 = 2 \\]Thus,\\[ x^2 = 2 = \\dfrac{a^2}{b^2} \\]',
	'Multiplying by \\(b^2\\) gives,\\[ a^2 = 2*b^2\\]',
	'This implys that a is even so there exists,\\(c \\hspace{0.5cm} \\epsilon \\hspace{0.5cm} N\\),	such that\\[ a = 2*c\\]',
	'Plugging this into the <a href="">equation from step 3</a> gives,\\[ a^2 = 4*c^2 = 2*b^2\\]',
	'Now we have,\\[ 4*c^2 = 2*b^2 \\]so,\\[ 2*c^2 = b^2 \\]this implys that b is even, so there exists,\\(d \\hspace{0.5cm} \\epsilon \\hspace{0.5cm} N\\),such that\\[ b = 2*d\\]',
	'Plugging this in for \\(b\\) gives us,\\[ 2*c^2 = 4*d^2 \\]So then,\\[ c^2 = 2*d^2 \\]Which means that c is even..',
	'so let\'s recap'
];
let evenSquSteps = [
	'Suppose that \\(x\\) is even',
	'This means that \\(k\\hspace{0.5cm} \\epsilon \\hspace{0.5cm} Z \\kern-1.4ex Z\\) such that \\( x = 2k \\)',
	'So,\\[x^2 = (2*k)^2 = 4*k^2\\]'
];

//WHITEBOARD FUNTIONS -------------------------------------------------------------------------------------
//WHITEBOARD FUNTIONS -------------------------------------------------------------------------------------
//WHITEBOARD FUNTIONS -------------------------------------------------------------------------------------
function Whiteboard(){

	var self = this;//we add in event listeners and need to hold onto scope of this object
	let currentP = 0;//current scroll postion on the whiteboard

	let bkgMin = 780;//width of small screen
	let bkgMax = 1150;//width of big screen
	let scale = bkgMax/bkgMin;//used to scale dive to background image size
	//forwhiteboardtext
	let boardH = 305;//small gird width for div (whiteboardtext)
	let aspect = (595/boardH);//aspect ration for div (whiteboardtext)

	self.position = function(){
		//get scroll position and c
		let p = $('#whiteboardtext').scrollTop();
		let h = $('#whiteboardtext').height();

		//set step to top (current scroll position)
		$('#stepcount').css('top', p+'px');
		//set next button to bottom right
		$('#nextstep').css('top', p + (0.9*h) + 'px');	
	};

	self.heights = function(){

		let steps = $('.proofstep');
		let sectionDim = [];
		let hrH = $('hr').outerHeight();
		let hTotal = hrH;
		//now for each step lets get the min and max range
		for(let i=0; i<steps.length; i++){
			hTotal = hrH + hTotal + $('#step'+(i)).outerHeight(true);
			sectionDim.push(hTotal);
		}
		return sectionDim;
	};

	self.currentSection = function(){

		let secList = self.heights();
		let hMin = 0;
		let hMax =0;
		// this should be center of step
		let scrollP = $('#whiteboardtext').scrollTop() + $('#whiteboardtext').outerHeight(true)/6;
	
		for(let i=0; i<secList.length; i++){
			hMax = secList[i];
			if(hMin<=scrollP&&scrollP<=hMax){
				return (i);
			}else if(scrollP>secList[secList.length-1]){
				return secList.length-1;	
			}else{
				hMin = hMax;
			}
		}
	};

	self.grow = function(){
		//size the board
		['#whiteboardtext','header','#proofbuttons','#nextstep','#container','#stepcount'].forEach(function(element) {$(element).stop()});
		['header','#proofbuttons'].forEach(function(element) {$(element).hide(animateTime)});
		['#nextstep','#stepcount'].forEach(function(element) {$(element).show(animateTime)});

		$('#container').animate({ backgroundSize: bkgMax + 'px' }, animateTime);
		$('#whiteboardtext').css('overflowY','scroll');
		$('#whiteboardtext').animate({ 
			height: scale*boardH + 'px',
			width: scale*boardH*aspect + 'px',
			top: '75px',
			fontSize: '20px',
			scrollTop: currentP
		 }, animateTime, self.position );

		//now set the scroll events
		$('#whiteboardtext').scroll( self.position );
		$('#whiteboardtext').scroll(function(){$('#stepcount').text('Step ' + self.currentSection() + ':')});
	};

	self.shrink = function(){

		currentP = $('#whiteboardtext').scrollTop();
		['#whiteboardtext','header','#proofbuttons','#nextstep','#container','#stepcount'].forEach(function(element) {$(element).stop()});
		['header','#proofbuttons'].forEach(function(element) {$(element).show(animateTime)});
		['#nextstep','#stepcount'].forEach(function(element) {$(element).hide(animateTime)});

		$('#container').animate({ backgroundSize: '780px' }, animateTime);
		$('#whiteboardtext').css('overflowY','hidden');
		$('#whiteboardtext').animate({ 
			height: boardH + 'px',
			width:  boardH*aspect + 'px',
			top: 	'150px',
			fontSize: '12px',
			scrollTop: 0
		}, animateTime, );

		//now remove the scroll events 
		$('#whiteboardtext').off('scroll');
	};
}

//Global Varibables ---------------------------------------------------------------------------------
//General for animations
let animateTime = 500;
//BOOTSTRAP -------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

$(document).ready(function(){
//get the proof loaded into the whiteboard
	let wb = new Whiteboard();
	let proof = new Proof();
	proof.load(root2Steps);
	proof.start();
//add all event listeners
	//whiteboard
	$('#whiteboardtext').mouseenter(wb.grow);
	$('#whiteboardtext').mouseleave(wb.shrink);
	//buttons
	$('#nextstep').click(proof.nextStep);
	$('#startover').click(proof.start);
	//menu
	$('#otherproofs').mouseenter(function(){$('#dropdownct').css("display","block")});
	$('#otherproofs').mouseleave(function(){$('#dropdownct').css("display","none")});
});	