//set file and number transfers for move calculations
let ftr = {'a':1,'b':2,	'c':3,	'd':4,	'e':5,	'f':6,	'g':7,	'h':8};
let rtf = {	1:'a',	2:'b',	3:'c',	4:'d',	5:'e',	6:'f',	7:'g',	8:'h'};

function slotPostion(fNum,rNum){
	if(fNum>8||fNum<1||rNum<1||rNum>8){
		console.log('invalid position ', fNum,rNum);
		return [];
	}
	else if(typeof fNum === 'string'){
		return fNum+'_'+rNum;
	}else{
		return rtf[fNum]+'_'+rNum;
	}
}
//---------------------------------------------------------------------------------------------------------
///Objects for pieces -------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//first define the prototype apply function
function applyPrototype(parent,child){
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}
//now define the Piece prototype
function Piece(color){
	this.color = color;
	this.type = 'protyotype';
}
Piece.prototype.currentLocation = 'a1';//if location is false piece is dead
Piece.prototype.possibleMoves = function(gameMap){    };//will be overwritten by specific piece
Piece.prototype.idSplit = function(){
		let color, type;
		[color, type] = this.id.split('_');
		return {c:color, t:type};
};
Piece.prototype.positionSplit = function(){
		let rank, file;
		[file,rank] = this.currentLocation.split('_');
		return {r:Number(rank), f:file};
};
//game map should return piece object for each slot
Piece.prototype.moveDirection = function(nextRank, gameMap, depth = 8, canTake = true){
	//this can be simplified 
	let moveD, moveD2, slotCheck;
	let slotList = [];
	let pieceColor = this.color;
	let r = this.positionSplit().r;
	let f = this.positionSplit().f;
	moveD = ftr[f];
	moveD2 = r;
	//what if the piece starts at 1 or 8 file/rank
	//While the check piece is still on the board
	let inBoard = true;
	while(  inBoard  ){
		//calculate new slot location
		moveD = moveD + nextRank[0];
		moveD2 = moveD2 + nextRank[1];
		slotCheck = slotPostion(moveD,moveD2);
		//check to make sure we are on the board
		if( (moveD>8||moveD<1)||(moveD2>8||moveD2<1)  ){
			inBoard = false;
			return slotList;
		}
		//now check for a piece in slot location (slotCheck)
		if(slotCheck in gameMap){
			//the slot has a piece, see what color
			let color = gameMap[slotCheck].idSplit().c;
			if(color === pieceColor ){
				//same piece cannot move here
				return slotList;
			}else{
				//oposite color, add this slot and return
				if(canTake){slotList.push(slotCheck);}//if piece can take oponet (pawns cant if in front)
				return slotList;
			}
		// no pieces in slot, check for next slot
		}else{
			slotList.push(slotCheck);
			//exit for king + pawn
			if(slotList.length>=depth){
				return slotList;
			}
		}
	}
	return slotList;
}

Object.defineProperties(Piece.prototype,{
	id: {
		get: function(){return this.color + '_' + this.type;}
	},
	div: {
		get: function(){return $('#'+ this.id);}
	}
});
//now king prototype
function King(color){
	this.color = color;
	this.type = 'king';
	this.castleQ = true;
}
applyPrototype(Piece, King);
//redefine the active slots method
King.prototype.possibleMoves = function(gameMap, newTurn ){
	let slotList = [];
	//file
	slotList = slotList.concat( this.moveDirection( [0,1], gameMap, 1 ) );
	slotList = slotList.concat( this.moveDirection( [0,-1], gameMap,1 ) );
	//rank
	slotList = slotList.concat( this.moveDirection( [1,0], gameMap, 1) );
	slotList = slotList.concat( this.moveDirection( [-1,0], gameMap, 1 ) );
	//diagonals
	slotList = slotList.concat( this.moveDirection( [1,1], gameMap, 1 ) );
	slotList = slotList.concat( this.moveDirection( [1,-1], gameMap, 1 ) );	
	slotList = slotList.concat( this.moveDirection( [-1,-1], gameMap,1 ) );
	slotList = slotList.concat( this.moveDirection( [-1,1], gameMap, 1) );

	if(this.castleQ){
		console.log('possible castle');
		let kingLocation = this.currentLocation;
		let rookLocations = [];
		let middleSlotList = [];
		let movePositions = [];
		let king = this;
		let rook = {};
		let slotdiv = {};
		if(this.color === 'light'){
			rookLocations = ['a_1','h_1'];
			middleSlotList = [['b_1','c_1','d_1'],['f_1','g_1']];
			movePositions = [ ['c_1','d_1'] , ['g_1','f_1'] ];//king, rook
		}else if(this.color === 'dark'){
			rookLocations = ['a_8','h_8'];
			middleSlotList = [['b_8','c_8','d_8'],['f_8','g_8']];
			movePositions = [ ['c_8','d_8'] , ['g_8','f_8'] ];
		}
		for(let i = 0; i<rookLocations.length; i++){
			//check corner for a rook
			if( gameMap[rookLocations[i]] instanceof Rook ){
				rook = gameMap[rookLocations[i]];
				//if there is a rook in corner check move status
				if(rook.castleQ){
					//if rook hasn't been moved check for any blocking pieces
					if(EmptyLocations(middleSlotList[i], gameMap)){
						slotdiv = $('#' + movePositions[i][0] );
						console.log('castle postion for king ', movePositions[i][0], slotdiv);
						slotdiv.addClass('chighligth');
						let rookID = rook.id;
						slotdiv.on('click',function(){
							board.move( king.id , movePositions[i][0] );//move king
							board.move( rookID , movePositions[i][1] );//move rook
							newTurn.call();//call the new turn function
							slotdiv.removeClass('chighligth');
						});
					}
				}
			}
		}
	}
	return slotList;	
}

function EmptyLocations(slotList,gameMap){
	let testList = [];
	for(let i=0; i<slotList.length; i++){
		//console.log(slotList[i],gameMap);
		if(slotList[i] in gameMap){return false;}
	}
	return true;
}

function Queen(color){
	this.color = color;
	this.type = 'queen';
}
applyPrototype(Piece, Queen);
Queen.prototype.possibleMoves = function(gameMap){
	let slotList = [];
	//file
	slotList = slotList.concat( this.moveDirection( [0,1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [0,-1], gameMap ) );
	//rank
	slotList = slotList.concat( this.moveDirection( [1,0], gameMap) );
	slotList = slotList.concat( this.moveDirection( [-1,0], gameMap ) );
	//diagonals
	slotList = slotList.concat( this.moveDirection( [1,1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [1,-1], gameMap ) );	
	slotList = slotList.concat( this.moveDirection( [-1,-1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [-1,1], gameMap ) );	
	return slotList;	
}

function Rook(color,id){
	this.color = color;
	this.type = 'rook'+id;
	this.castleQ = true;
}
applyPrototype(Piece, Rook);
Rook.prototype.possibleMoves = function(gameMap){
	let slotList = [];
	//file
	slotList = slotList.concat( this.moveDirection( [0,1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [0,-1], gameMap ) );
	//rank
	slotList = slotList.concat( this.moveDirection( [1,0], gameMap) );
	slotList = slotList.concat( this.moveDirection( [-1,0], gameMap ) );
	return slotList;
}

function Bishop(color,id){
	this.color = color;
	this.type = 'bishop'+id;
	//this.id = this.color+'_'+this.kind+id;
}
applyPrototype(Piece, Bishop);
Bishop.prototype.possibleMoves = function(gameMap){
	slotList = [];
	//diagonals
	slotList = slotList.concat( this.moveDirection( [1,1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [1,-1], gameMap ) );	
	slotList = slotList.concat( this.moveDirection( [-1,-1], gameMap ) );
	slotList = slotList.concat( this.moveDirection( [-1,1], gameMap ) );
	return slotList;
}

function Knight(color,id){
	this.color = color;
	this.type = 'knight'+id;
}
applyPrototype(Piece, Knight);
Knight.prototype.possibleMoves = function(gameMap){
	let slotList = [];
	let slotListFinal = [];
	let p = this.positionSplit();//should be a Piece method
	let r = p.r;
	let f = ftr[p.f];
	//now see if the 8 Squares are on the board
	let slotTest = [  [f+2, r+1], [f+2, r-1], [f-2, r+1], [f-2, r-1], [f+1, r+2], [f+1, r-2], [f-1, r+2], [f-1, r-2] ];
	for(let i = 0; i<slotTest.length; i++){
		slotList = slotList.concat( slotPostion(slotTest[i][0], slotTest[i][1]) );
	}
	//now if there is no same colored piece on the slot, add it to the final slot list
	for(let i = 0; i<slotList.length; i++){
		if(slotList[i] in gameMap){
			//there is a piece check the color
			let color = gameMap[ slotList[i] ].idSplit().c;
			if(color != this.color){
				slotListFinal.push( slotList[i] );
			}
		}else{
			//no piece here
			slotListFinal.push( slotList[i] );
		}
	}
	return slotListFinal;
}

function Pawn(color,id){
	this.color = color;
	this.type = 'pawn'+id;
}
applyPrototype(Piece, Pawn);
//does not handle onpoisont
//does not handle last file move
Pawn.prototype.possibleMoves = function(gameMap){

	let p = this.positionSplit();
	let r = p.r;
	let f = ftr[p.f];//f is now a number 1<= n <=8
	let files = [f-1,f+1]; //check left and right file
	let rankD = 1;//move light pieces forward
	let depth = 1;
	//set move direction and depth (if first move)
	if(this.color ==='dark'){//move dark pieces backward
		rankD = -1;
		if(r === 7){
			depth =2;//move piece forward 2 if first move
		}
	}else{
		rankD = 1;
		if(r === 2){
			depth =2;//move piece forward 2 if first move
		}
	}
	let nextR = (r + rankD);//define next rank value
	let testP = '';
	let slotList = [];
	//check forward motion
	slotList = slotList.concat( this.moveDirection([0,rankD], gameMap, depth, false) );
	//check attacking squares
	for(let i =0; i<files.length; i++){
		if( (files[i]<=8&&files[i]>0) && (nextR<=8&&nextR>0) ){
			//file exists
			testP = slotPostion(files[i], nextR );
			//if there is q piece of oposite location at the square
			if(testP in gameMap){
				//there is a piece, lets check the color
				let pieceObj = gameMap[testP];
				if(pieceObj.color != this.color){
					//piece is enemy add to the list
					slotList.push(testP);
				}
			}
		}
	}
	return slotList;
}

//---------------------------------------------------------------------------------------------------------
/// create pieces -------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
function makePieceHTML(type, color , id){
	let img = $('<img>');
	img.addClass('piece');
	img.attr('id' , color +'_'+ type + id);
	img.attr('src', './Images/'+  type + '_' + color + '.png' );
	$('#board').append(img);
}

let typeList = ['light','dark'];
let pieceObjs = []; 

for(let i=0; i<typeList.length; i++){

	pieceObjs.push( new King( typeList[i]) );	
	pieceObjs.push( new Queen( typeList[i]) );

	makePieceHTML('king' , typeList[i] , '');
	makePieceHTML('queen' , typeList[i], '' );

	//create div
	for(let j=1; j<=2; j++){
		//create div
		makePieceHTML('rook', typeList[i] , j );
		//create the object
		pieceObjs.push( new Rook(typeList[i],j) );
	}
	for(let j=1; j<=2; j++){
		//create div
		makePieceHTML('bishop', typeList[i] , j );			
		//create the object
		pieceObjs.push( new Bishop(typeList[i],j) );
	}
	for(let j=1; j<=2; j++){
		//create div
		makePieceHTML('knight', typeList[i] , j );			
		//create the object
		pieceObjs.push( new Knight(typeList[i],j) );
	}
	for(let j=1; j<=8; j++){
		//create div
		makePieceHTML('pawn', typeList[i] ,j );			
		//create the object
		pieceObjs.push( new Pawn(typeList[i],j) );
	}
}
//---------------------------------------------------------------------------------------------------------
/// object for slots -------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
function Slot(rank, file){
	//these should be read only
	this.file = file;
	this.rank = rank;
	this.id = this.file +'_'+  this.rank;

	this.coordinates = function(){
		return this.div.position();
	};

	this.highLight = function(){
		this.div.addClass('highLight');
	};

	this.removeHighLight = function(){
		this.div.removeClass('highLight');
	};
}
Object.defineProperty(Slot.prototype,'div',{
	get: function(){return $('#' + this.id);}
});
//---------------------------------------------------------------------------------------------------
//------create slots---------------------------------------------------------------------------------
//------------------------------------
let rank = [1,2,3,4,5,6,7,8];
let file = ['a','b','c','d','e','f','g','h'];
let light = false;
let slotObjs = [];

for(let r=0; r<rank.length; r++){

	let row = $('<div></div>');
	row.addClass('row');
	light = !light;

	for(let f = 0; f<file.length; f++){

		let ran = (rank.length - rank[r] + 1);
		let div = $('<div id="'+ file[f] +'_'+ran +'""></div>');
		slotObjs.push( new Slot(ran, file[f])  );
		div.addClass('slot');

		if(light){
			div.addClass('light');
		}else{
			div.addClass('dark');
		}
		light = !light;
		row.append(div);
	}
	$('#board').append(row);
}
//---------------------------------------------------------------------------------------------------------
/// object for board -------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
let aniTime = 1000;//animation time for moves

function Board(){

	let self = this;
	let fileList = ['a','b','c','d','e','f','g','h'];
	let pList = ['rook1','knight1','bishop1','queen','king','bishop2','knight2','rook2'];

	self.slots = {};//this is the link to the slot objects
		for(let i = 0; i<slotObjs.length; i++){
			self.slots[ slotObjs[i].id  ] = slotObjs[i];
		}

	self.pieces = {};//this is the link to the piece objects
		for(let i = 0; i<pieceObjs.length; i++){
			self.pieces[ pieceObjs[i].id  ] = pieceObjs[i];
		}

	self.pieceList = function(color){

		let outPut = [];
		let pieceObj = {};
		for(let i in self.pieces){

			pieceObj = self.pieces[i];
			if(pieceObj.color === color){
				outPut.push(pieceObj);
			}

		}
		return outPut;
	}
	//slot id is the same as the index id
	self.gameMap = function(){
		let map = {};
		for (let i in self.pieces) {
			map[self.pieces[i].currentLocation] = self.pieces[i];
		}
		return map;
	}
	//move a piece to a slot
	self.move = function(pieceID,slotID,playerMove=true){//playermove is option to see if we should flag castling
		//get the piece + slot obj
		let p = self.pieces[pieceID];
		let s = self.slots[slotID];
		//check piece type to tip castle flag
		if( (p instanceof King || p instanceof Rook)&&playerMove ){p.castleQ = false;}
		//this is the only parameter we need
		p.currentLocation = slotID;//set new piece location
		//physically move the piece
		p.div.animate({
			top: s.coordinates().top + 'px',
			left:  s.coordinates().left +'px'
		}, aniTime);
	};
	//move all pieces to starting locations
	self.startPositions = function(){
		for(let i=1; i<=8; i++){
			self.move( 'light_'+'pawn'+i , fileList[i-1]+'_' + 2 , false );//false => non player move
			self.move( 'dark_'+'pawn'+i , fileList[i-1]+'_' + 7, false  );
			self.move( 'light_' + pList[i-1] , fileList[i-1]+'_' + 1, false  );
			self.move( 'dark_' + pList[i-1] , fileList[i-1]+'_'+ 8 , false  );
		}
	};
};

//---------------------------------------------------------------------------------------------------------
/// object for game controle -------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------


function Game(board){

	let self = this;
	let turn = 'light';
	let previousSlots = [];

	self.newGame = function(){
		board.startPositions();
		self.addPieceClick(turn);
	};
	//start a new turn
	self.newTurn = function(){//set new click events + switch color
		self.removePieceClick('light');
		self.removePieceClick('dark');
		self.removeSlotClick();
		if(turn==='light'){//switch color
			turn = 'dark'
		}else{
			turn = 'light'
		}
		//add click events to the pieces for next turn
		self.addPieceClick(turn);
	};	
	self.removeSlotClick = function(){
		for(i in board.slots){
			board.slots[i].div.off('click');
			board.slots[i].removeHighLight();
		}
	};
	//remove all piece click events for a particular color
	self.removePieceClick = function(color){
		let pieceListRemove = board.pieceList(color);
		for(let i = 0; i<pieceListRemove.length; i++){
			pieceListRemove[i].div.off('click');
		}		
	};
	//add a click event to all pieces of a certain color
	self.addPieceClick = function(color){
		//for all light or dark pieces
		let pieceList = board.pieceList(color);
		for(let i = 0; i<pieceList.length; i++){
			let pieceObj = pieceList[i];
			pieceObj.div.on('click',function(){
				self.removeSlotClick();//first remove all previous slot click evenets and highlights
				let moveSlotList = pieceObj.possibleMoves( board.gameMap(), self.newTurn );//new turn passed for castling
				let slot = {};
				for(let j = 0; j<moveSlotList.length; j++){
					slot = board.slots[moveSlotList[j]];
					slot.highLight();//for each possible slot highlight					
					//now if the slot has a piece on it
					if(slot.id in board.gameMap() ){//add a click event to the piece  in slot.id
						let setPieceToClick = board.gameMap()[slot.id];
						setPieceToClick.div.on('click',function(){
							board.move(pieceObj.id , setPieceToClick.currentLocation );//move piec to this slot
							//kill the piece
							setPieceToClick.div.hide(aniTime);
							setPieceToClick.currentLocation = false;
							self.newTurn();
						});
					}else{
						slot.div.on('click',function(){//if clicked move piece to slot and start new turn
							board.move(pieceObj.id , this.getAttribute('ID'));//slot.id//somehow slot is loosing scop e
							self.newTurn();
						});
					}
				}//end of for loop for possible moves
			});//end of piece click event
		}//end of for loop for adding piece click events
	};				

}	
//--------------------------------------------------------------------------------------------------------------
//---------------------------------------
//-------------start game---------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
let board = new Board();
let game = new Game(board);
game.newGame();