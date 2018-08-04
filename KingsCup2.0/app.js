//mate list
//game over page
//input + button styling
//rules too long
//beer glass gheight, set in one spot
//disable cards once they are flipped

// utility
function randomList(numMax){

		let numberList = [];
		for(let i=1; i<=numMax; i++){
			numberList.push(i);
		}
		//console.log("numlenght",numberList.length);
		//now for each element preform a random swap
		for(let i=0; i<numberList.length; i++){
			let num1 = numberList[i];
			let index2 = Math.round(Math.random()*numberList.length);
			if(index2>numMax-1){
				index2 = numMax-1;
			}else if(index2<0){
				index2 = 0;
			}
		//console.log(index2);
			let num2 = numberList[index2];
			numberList[i]=num2;
			numberList[index2]=num1;
		}

		return numberList;
}



function wait(ms){
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while(d2-d < ms);
}

///-----------------------------------------------Card-------------------

let cHeight = 100;
let cWidth = (45.5/69)*cHeight;

function Card(suit, faceValue, index){

	let filpQ = true;
	let cardBackLink = "./Images/back.png";
	let cardFrontLink = "./Images/" + faceValue + "_of_" + suit + ".png";
	
	let imageDiv = document.createElement('IMG');
	imageDiv.classList.add("cardst");
	imageDiv.style.height = cHeight +"px";
	imageDiv.setAttribute("src",cardBackLink);

	let [ycord, xcord] = tableContainer.positionList(index);
	imageDiv.style.top = ycord + "px";
	imageDiv.style.left = xcord + "px";
	tableContainer.mainDiv().appendChild(imageDiv);

	this.cardType = faceValue;
	this.gameDescription = descriptions[faceValue];
	this.gameImage = "./Images/" + faceValue + ".jpg";
	this.flip = function(){
		filpQ = !filpQ;
		if(filpQ){
			imageDiv.setAttribute("src",cardBackLink);
		}else{
			imageDiv.setAttribute("src",cardFrontLink);
		}
	};//change card image
	this.imageDiv = function(){
		return imageDiv;
	};
}


//special cards;
//king - needs to be able to poor + set rule
//queen - needs to be set as the question master
descriptions = {
	"2": "Two has and always will be the classic 'you'. This means that whoever picks the 2 card gets to choose anybody they want in the game to drink.,",
	"3": "Three is another staple in Kings Cup, 'me'. Pick a 3 and you have to drink",
	"4": "The four card incorporates the ladies by telling them they are 'whores' and have to drink",
	"5": "Bust a jive. One of the best. The person who picks the card has to do a dance move. Then the next person has to do that dance move and add to it. This continues until someone screws up and has to drink. Any time you can get drunken uncoordinated people dancing you have to do it",
	"6": "Six is 'dicks' All the guys prove that yes they are packing by drinking.",
	"7": "Seven equals 'heaven'. All players reach for the sky. The last person has to drink. Great card when people aren’t paying attention or someone is too drunk to realize a seven was picked.",
	"8": "Eight is 'mate'. The player who picks the card chooses another player to be their mate. This means when one of them drinks they both drink. Perfect for letting the fine girl across the table know you are interested.",
	"9": "Nine can either be one of the best or worst cards depending on how creative the group is. It is called 'bust a rhyme'. The simple version has the player who picked the card say a word and everybody has to say a word that rhymes with it. Say for example the word is bite. Other players would say fight, kite, tight, right, ect. This goes on until somebody cannot think of a word that rhymes. \nThe advanced version is a lot better if the group is talented. It is the same concept but instead of single words rhyming, everyone rhymes entire sentences",
	"10": "Ten is 'categories'. The player who picked the card chooses a category. Then everyone goes around and says something that fits in the category. Good categories to use include types of liquor, sex positions, and types of cereal (there are tons of different cereals). Whoever cannot think of anything in the category has to drink.",
	"jack": "Jack is the game 'never have I ever'. Everybody puts up 3 to 5 fingers. To start the person who picked the card says something they have never done. Then if you have done it you put your finger down. The game continues around the circle as players continue with more 'never have I ever.' The first person with all of their fingers down loses and has to drink. ",
	"queen": "Queen is 'questions'. The player who picks the card starts by asking anyone a question. This player then asks anyone else a question. This process continues until someone fails to ask a question. Questions should be as absurd and vulgar as possible to trip up other players into either laughing or answering the question.",
	"king": "The player who picks a King gets to 'make a rule'. The rule can be anything but must always be followed until another King is picked and the rule is replaced by another. If the rule is not followed the person who broke the rule has to drink.",
	"ace": "In the standard version, an ace is 'waterfall'. This starts with everyone chugging. Then the person who picked the card can stop whenever he/she wants. This allows the next person to stop when he/she wants and so on and so on. This version is classic because it does a great job of getting everyone plastered. While also providing opportunities to berate people who suck at chugging."
}


//// containers ----------------------------------------------------------------
let mateContainer = {
	containerDiv: function(){
		return document.getElementsByClassName("matecontainer")[0];
	},
	addMate: function(index,mate1, mate2){
		let cont = mateContainer.containerDiv();
		let tMax = cont.offsetHeight;
		let step = tMax/8;
		let mateDiv = document.createElement('P');
		mateDiv.classList.add('matest');
		mateDiv.style.top = (2*(index-1)*step) + "px";
		mateDiv.innerHTML = mate1 + " <==> " + mate2;
		cont.appendChild(mateDiv);
	},
}
let beerContainer = {

	//should be hidden
	imageHight: 400,
	emptyDiv: function(){
		return document.getElementsByClassName("emptyglass")[0];
	},
	fullDiv: function(){
		return document.getElementsByClassName("fullglass")[0];
	},
	//should be public
	poor: function(){
		let curHeight = beerContainer.emptyDiv().offsetHeight;
		console.log(curHeight);
		if(curHeight>0){
			beerContainer.emptyDiv().style.height = curHeight - beerContainer.imageHight/4 + "px";
		}else{
			beerContainer.emptyDiv().style.height = beerContainer.imageHight + "px";
		}
	}
}
//I need card image height and card image width


let tableContainer = {
	rows: 4,
	columns: function(){
		return 52 / (tableContainer.rows);
	},
	
	mainDiv: function(){
		return document.getElementsByClassName('table')[0];
	},
	height: function(){
		return tableContainer.mainDiv().offsetHeight;
	},
	width: function(){
		return tableContainer.mainDiv().offsetWidth;
	},

	ySpacing: function(){ 
		return (tableContainer.height() - tableContainer.rows * cHeight) / (tableContainer.rows + 1);
	},

	xSpacing: function(){ 
		return (tableContainer.width() - tableContainer.columns() * cWidth) / (tableContainer.columns() + 1);
	},
	positionList: function(index){
		let wList = [];
		let hList = [];
		let curH = 0;
		let curW = 0;
		for (let r = 0; r<tableContainer.rows; r++){

			curH = cHeight*r + tableContainer.ySpacing()*(r+1);
			curW = 0;

			for(let c=0; c<tableContainer.columns(); c++){

				curW = ( cWidth*c + tableContainer.xSpacing()*(c+1));

				hList.push(curH);
				wList.push(curW);
				//console.log(curH,curW);
				
			}
		}
		//console.log("Length ",hList.length);
		return [ hList[index-1], wList[index-1] ];

	}
}


let gameContainer = {
	mainDiv: function(){
		return document.getElementsByClassName('game')[0];
	},
	hide: function(){
		gameContainer.mainDiv().style.display = "none";
		tableContainer.mainDiv().style.display = "block";
	},
	show: function(){
		gameContainer.mainDiv().style.display = "block";
		tableContainer.mainDiv().style.display = "none";
	},
	description: function(txt){
		let p = gameContainer.mainDiv().getElementsByTagName("P")[0];
		p.innerHTML = txt;
	},
	image: function(url){
		let img = gameContainer.mainDiv().getElementsByTagName("IMG")[0];
		img.src = url;
	},
	ruleInput: function(){
		let inputNode = document.createElement('INPUT');
		inputNode.className = 'rule';
		inputNode.type = 'text';
		inputNode.value = 'enter in a rule';
		gameContainer.mainDiv().appendChild(inputNode);
	},
	mateInput: function(){
		let inputNode = document.createElement('INPUT');
		inputNode.className = 'mate';
		inputNode.type = 'text';
		inputNode.value = 'enter in a drinking mates name';
		gameContainer.mainDiv().appendChild(inputNode);
	},
	deleteInput: function(){
		let node = gameContainer.mainDiv().getElementsByTagName('INPUT')[0];
		gameContainer.mainDiv().removeChild(node);
	}
}

let messageContainer = {
	mainDiv: function(){
		return document.getElementsByClassName('messagebord')[0];
	},
	addRule: function(txt){
		let listNode = messageContainer.mainDiv().getElementsByTagName('UL')[0];
		let element = document.createElement('LI');
		element.innerHTML = txt;
		listNode.appendChild(element);
	},
	setQuestionMaster: function(name){
		messageContainer.mainDiv().getElementsByTagName('H2')[0].innerHTML = name;
	}
}

//we need to set an on click event of each card

function Game(){

	let userList = [];
	let faceList = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];
	let suitList = ["diamonds","spades","hearts","clubs"];
	let slotList = randomList(52);
	let i = 0;// used for slot # when creating card objects
	let playerIndex = 0;//used to keep track of current player
	let kingNum = 0;
	let mateNum = 0;

	this.addUser =function(){
		let name = document.getElementsByClassName('namein')[0].value;
		console.log('name');
		userList.push(name);
		let node = tableContainer.mainDiv();
		let nameNode = document.createElement('P');
		nameNode.innerHTML = name;
		document.getElementsByClassName('namein')[0].value = 'nextPlayer';
		node.appendChild(nameNode);
	};
	this.nextUser = function(name){
		let nameDiv = document.getElementsByClassName('promptbord')[0].getElementsByTagName('H2')[0];
		nameDiv.innerHTML = name;
	};
	this.nextRound = function(){
		playerIndex = (playerIndex+1)%(userList.length);
		this.nextUser(userList[playerIndex]);
		gameContainer.hide();
		let rule = gameContainer.mainDiv().getElementsByClassName('rule')[0];
		if(typeof rule != "undefined"  ){
			messageContainer.addRule(rule.value);
			gameContainer.deleteInput();
		}
		let mate = gameContainer.mainDiv().getElementsByClassName('mate')[0];
		if(typeof mate != "undefined"  ){
			mateContainer.addMate(mateNum, userList[playerIndex],mate.value);
			gameContainer.deleteInput();
		}
	};
	this.startGame = function(){
		//start next user
		this.nextUser(userList[playerIndex]);
		//clear the table div
		let tableDiv = tableContainer.mainDiv();
		while (tableDiv.hasChildNodes()) {
    		tableDiv.removeChild(tableDiv.lastChild);
		}//populate table div with all cards
		for(let f = 0; f < faceList.length; f++){
			let face = faceList[f];
			for(let s = 0; s < suitList.length; s++){
				let suit = suitList[s];
				//wait(50);
				//console.log("new card");
				let cardObj = new Card(suit,face,slotList[i]);
				i = i + 1;
				cardObj.imageDiv().onclick = function(){
					cardObj.flip();
					gameContainer.description(cardObj.gameDescription);
					gameContainer.image(cardObj.gameImage);
					gameContainer.show();
					//now bring up the game widow
					if(cardObj.cardType === "king"){ 
						beerContainer.poor(); 
						kingNum = kingNum + 1;
						if(kingNum>=4){
							console.log('gameover');
						}
						gameContainer.ruleInput();
					} else if(cardObj.cardType === "queen"){
						messageContainer.setQuestionMaster(userList[playerIndex]);
					} else if (cardObj.cardType === "8"){
						console.log('mate');
						mateNum = mateNum + 1;
						gameContainer.mateInput();
					}

				};
			}
		}
	};




}









kingsCup = new Game();





 







