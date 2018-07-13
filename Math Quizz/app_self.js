
function Question(qText,answersIn,commentsIn,points){
	let self={
		answers: answersIn,
		comments: commentsIn,
		question: qText,
		correct: answersIn[0],
		points: points,
		answerResponce: {},
		correctQ: function(guess){
			let bool = (guess === self.correct);
			return bool;
		},
		randomAnswers: function(){
			let answers = self.answers;
			for(let i=0; i<answers.length; i++){
				let newIndex = Math.round( Math.random()*(answers.length-1) );
				let v1 = answers[i];
				let v2 = answers[newIndex];
				answers[i] = v2;
				answers[newIndex] = v1;
			}	
			return answers;
		}
	}
	for(let i in commentsIn){
		self.answerResponce[answersIn[i]]=commentsIn[i];
	}
	return self;
}

var newton1 = Question(
	"Who proved the Barrow conjecture?",
	["Newton","Godel","Liebiniz","Eistein"],
	["correct","way before his time","thats not how you spell Leibniz","no, eistein himself said he sucked at math"],
	5
);

var newton2 = Question(
	"Why did Newton leave Cambridge in 1665?",
	["Bubonic Plague","He was bullied","Nexton fell Ill","Had a nervous breakdown"],
	["correct","probably but not why he left","Luckilly newton didn't catch it!","not this time"],
	5
);

var newton3 = Question(
	"Who was Newtons nemisis",
	["Robert Hook","Wolfgang Liebiniz","Issac Barrows","King Charles II"],
	["correct","no but they did have quite the rivalry","no Barrows was a mentor","no, somebody had to knight him"],
	5
);

var newton4 = Question(
	"What topic did Newton write most about?",
	["Religion","Optics","Mathematics","Physics"],
	["correct","no but he did create the color 'indigo' because he wanted 7 colors","no but all time #3 mathematitian","no but all time #1 physisist"],
	5
);

var newton5 = Question(
	"What was Newtons earliest predicted Apocolyps date?",
	["2060","3000","1400","2012"],
	["correct"," sooner ! yikes! ","no thats before he was born","that was the Mayans bro!"],
	5
);

var newton6 = Question(
	"Newtons mother thought he should become a _____________?",
	["Farmer","Prostitute","Lawyer","Scientist"],
	["correct"," o god no ","not social enough for that","she took some convincing"],
	5
);




function UserQuiz(qList,id){
	self={
		questions: qList,
		currentQ: 0,
		quizDiv: function(){
			let div = document.getElementById(id);
			return div;
		}, 
		score: 0,//should be read only
		clearQuestions: function(){
			var mainDiv = self.quizDiv();
			var children = mainDiv.children;
			var num =children.length;
			var deleteList = [];
			//console.log("Found " + num + " Children",children,"\n",children[0]);
			for(let i=0; i<num; i++){
				//console.log("i : " + i);
				if(children[i].getAttribute("class")==="answerbtn"||children[i].getAttribute("class")==="answertxt"){
					deleteList.push(i);
				}	
			}
			deleteList.reverse();
			for(let i = 0; i<deleteList.length; i++){
				mainDiv.removeChild(children[ deleteList[i] ] );
			}
		},
		newQuestion: function(id){
			//delete all previous buttons in the window
			self.clearQuestions();//since self is running an event listener we need the self hekd word
			let qObj = self.questions[id];
			let qNum = self.questions.length;
			let answers = qObj.randomAnswers();
			//now randomly order the questions
			let mainDiv = self.quizDiv();
			let title = document.createElement("H1");
			title.setAttribute("class", "answertxt");
			title.innerHTML = qObj.question;
			mainDiv.appendChild(title);

			let points = document.createElement("H3");
			points.innerHTML = "Current score: " + self.score;
			points.setAttribute("class", "answertxt");
			mainDiv.appendChild(points);

			for(let i=0; i<answers.length; i++){
				let btn = document.createElement("BUTTON");
				btn.innerHTML = answers[i];
				btn.setAttribute("class", "answerbtn");
				btn.onclick = function(){
					//if correct go to next question
					let nextQ = qObj.correctQ(answers[i]);
					let endQ = (self.currentQ>=(qNum-1));//loosing self scope here???
					switch(true){
						case (nextQ&&endQ):
							//display the final page
							self.score = self.score + qObj.points;
							self.clearQuestions();
							points = document.createElement("H3");
							points.innerHTML = "Good Job Final Score: " + self.score;
							points.setAttribute("class", "answertxt");
							mainDiv.appendChild(points);
							//console.log("score page under construction score is: ",self.score);
							break;
						case (nextQ&&(!endQ)):	
							self.currentQ = self.currentQ+1;
							self.score = self.score + qObj.points;
							self.newQuestion(self.currentQ);
							//Call next question
							break;
						case (!nextQ):
							this.style.background = "red";
							this.innerHTML = qObj.answerResponce[answers[i]];
							qObj.points = qObj.points - 2;
							//color red and
							console.log("god your dum");
							break;	

					}
				
				//if last page go to points
				//if wrong substract points and color red
				//console.log("Hello " + answers[i]);
				}
				mainDiv.appendChild(btn);
			}
		}

	}
	return self;
}

let qz = new UserQuiz([newton1,newton2,newton3,newton4,newton5,newton6],"quiz1");
function startMathQuiz(){
	qz.newQuestion(0);
}