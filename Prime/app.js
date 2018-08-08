function GetInput(){
	let input = document.getElementById('inputnumber');
	return Number( input.value );
}


function PrimeList(n){
	//step 1 create an array 1-n
	numList = [];
	primeList = [];
	for(let i=2; i<=n; i++){
		numList.push(i);
	}
	//now start with prime 1
	currentPrime = 2;
	while(currentPrime<numList[numList.length-1]){
		currentPrime = numList[0];
		number = numList[0];
		let i = 0;
		while(number<=numList[numList.length-1]){
			let divQ = number%currentPrime;
			if(divQ===0){
				//number is not prime, delete it!
				numList.splice(i, 1);
			}
			i = i+1;
			number = numList[i];		
		}
		primeList.push(currentPrime);
	}	
	return primeList;
}
function PrimeFactor(n){
	let pList = PrimeList(n);
	console.log('pList calculated');
	let factorList = [];
	let factoring = true;
	let numCur = n;
	i=0;
	while(factoring){
		if(numCur%pList[i]===0){
			numCur = numCur/pList[i];
			factorList.push(pList[i]);
			console.log('adding: ', pList[i]);
		}else if(numCur===1){
			return factorList;
		}else {
			i++;
		}
		//console.log(factorList);
	}
	
}

		/*else if(pList.indexOf(numCur)!=-1){
			factoring = false;
			factorList.push(numCur);
			console.log('prime detected: ',numCur);
		}*/
function PrimeFactorInput(){
	let n = GetInput();
	let p = document.getElementById('answer');
	let factor = PrimeFactor(n);
	p.innerHTML = "Prime factors: " + factor; 
	//console.log(n);
}