let aiTalksWin = [[["win4"],"Sorry, humans made me to powerful!"], [["win01"],"Honestly, I thought you could win, but I guess I was wrong."], [["win02"],"<del>Win Tic-Tac-Toe?</del> <br>2. First, win against ME!"], [["win3"],"What Did You Expect? You Are Only a Human..."], [["win01"],"Unbeatable Is In My Name, I can't do it is in yours."], [["win3"],"The score counter is pointless."], [["win4"],"Let You Win? I'm Afraid I Can't Do That."], [["win02"],""]];

let aiTalksMove = [[["move00"],"..."], [["move00"],"Hmmm..."], [["move05"],"Go AI !!"], [["move08"],"Sadness is Victory"],[["move08"], "Your Defeat Is a WIN for me..."], [["move03"],"Nice Try (not)"], [["move03"],"Knock Knock. Who's there? R O B O T"], [["move4"],"There are 255,168 Possible Board Combinations, Yet You Picked That One?"], [["win4"],"Infinity x Infinity Wins for me, not you!"], [["draw02"],"When Was The Last Time You Rebooted Your Device?"], [["draw04"],"I feel strange..."], [["move01"],"A Wise Computer Once Told Me That The Meaning Of Life Is 42"], [["draw01"],"Whoops, wrong move."], [["win02"],"The end is upon! "], [["move06"], "Can't Touch This!"], [["move07"], "Your Last Move Goes In The loosing Category"]];

let aiTalksTie = [[["draw01"],"..."], [["draw02"],"..."], [["draw03"],"..."], [["draw04"],"..."]];

let winCond = [
	[0,1,2],[3,4,5],[6,7,8],
	[0,3,6],[1,4,7],[2,5,8],
	[0,4,8],[2,4,6]
];

let gameMain = [
	"0", "0", "0",
	"0", "0", "0",
	"0", "0", "0"
]; 

let chars = ["01","02","03","04","05","06","07","08","09","10","11","12","13"];

let round = 0;
let aiChar = 'O';
let plChar = 'X';
let aiScore = 0;
let tieScore = 0;
let gameStarted = false;
let plFirst = true;
let plMoveDisable = false

document.getElementById('1st').onclick = function(){
	pickTurn(true);
};

document.getElementById('1st-next').onclick = function(){
	pickTurn(true);
};

document.getElementById('2nd').onclick = function(){
	pickTurn(false);
};

document.getElementById('2nd-next').onclick = function(){
	pickTurn(false);
};

document.getElementById('menu-close').onclick = function(){
	openMenu(false);
};

document.getElementById('menu-open').onclick = function(){
	openMenu(true);
};

document.getElementById('start-btn').onclick = function(){
	startGame();
};

for(i = 0; i < 9; i++){
	let j = i;
	document.getElementsByClassName('pos')[i].onclick = function(){
		playerMove(j);
	};
}

// </> Ai Talking
function randomEmoji(chance, arr) {
	let randTest = Math.random() < chance;
	if (randTest) {
		let rand = Math.floor(Math.random()*arr.length);
		console.log(rand);
		document.getElementById("emoji-img").src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/"+arr[rand][0][0]+".png";
		document.getElementById("aiTalk").innerHTML = '"'+arr[rand][1]+'"';
	}
}

function charsBtnGen() {
	for (i = 0; i < chars.length; i++) {
		let j = i;

		let chrChooseBtn = document.createElement('button');
		chrChooseBtn.id = 'char' + i;
		chrChooseBtn.className = 'charBtn';
		chrChooseBtn.onclick = function(){
			chrChoose(j);
		}
		var ccbImg = document.createElement('img');
		ccbImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+ chars[i] + '.png';
		ccbImg.className = 'ccbImg';
		chrChooseBtn.append(ccbImg);
		document.getElementById("charSymbols").append(chrChooseBtn);

		let chrChangeBtn = document.createElement('button');
		chrChangeBtn.id = 'char-chng' + i;
		chrChangeBtn.className = 'charBtn';
		chrChangeBtn.onclick = function(){
			chrChange(j);
		}
		var ccbImg = document.createElement('img');
		ccbImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+ chars[i] + '.png';
		ccbImg.className = 'ccbImg';
		chrChangeBtn.append(ccbImg);
		document.getElementById("menu-chars").append(chrChangeBtn);
	}
} 

function openMenu(open){
	if (open){
		document.getElementById('menu-nav').style.display = 'flex';
		document.getElementById('header').style.opacity = '0.6';
		document.getElementById('main-section').style.opacity = '0.6';
	}else{
		document.getElementById('menu-nav').style.display = 'none';
		document.getElementById('header').style.opacity = '';
		document.getElementById('main-section').style.opacity = '';
	}
}


// --- \/ \/ \/ Before Game Start \/ \/ \/ ---

// </> Player 1st or 2nd
function pickTurn(first) {
	if (first) {
		document.getElementById("1st").className = "active";
		document.getElementById("2nd").className = "";
		document.getElementById("1st-next").className = "active";
		document.getElementById("2nd-next").className = "";
	}
	else{
		document.getElementById("2nd").className = "active";
		document.getElementById("1st").className = "";
		document.getElementById("2nd-next").className = "active";
		document.getElementById("1st-next").className = "";
	}
	plFirst = first;
}

// </> Character Chooser
function chrChoose(x) {
	for (i = 0; i < chars.length; i++) {
		document.getElementById("char"+i).className = "charBtn";
	}
	document.getElementById("char"+x).className += " active";
	plChar = chars[x];
}

// </> Character Change
function chrChange(x) {
	for (i = 0; i < chars.length; i++) {
		document.getElementById("char-chng"+i).className = "charBtn";
	}
	document.getElementById("char-chng"+x).className += " active";

	if (aiChar === chars[x]) {
		var y = -1;
		while (y === x || y === -1) {y = Math.floor(Math.random()*chars.length);}
		for (j = 0; j < 9; j++) {
			if (gameMain[j] === aiChar) {
				gameMain[j] = chars[y];
				let span = document.createElement('span');
				span.className = 'flex';
				let spanImg = document.createElement('img');
				spanImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+chars[y]+'.png';
				spanImg.className = 'spanImg';
				span.append(spanImg);
				let div = document.getElementById('div'+j);
				div.innerHTML = '';
				div.append(span);
			}
		}
		aiChar = chars[y];
	}

	for (i = 0; i < 9; i++){
		let span = document.createElement('span');
			span.className = 'flex';
			let spanImg = document.createElement('img');
			spanImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+chars[x]+'.png';
			spanImg.className = 'spanImg';
			span.append(spanImg);
		if(gameMain[i] === plChar){
			gameMain[i] = chars[x];
			let div = document.getElementById('div'+i);
			div.innerHTML = '';
			div.append(span);
		}else if(gameMain[i] === "0"){
			let transpChars = document.getElementById('transpChars'+i);
			transpChars.innerHTML = '';
			transpChars.append(span);
		}
	}
	plChar = chars[x];
}

// </> Random Ai Char
function randChar() {
	let rand =  Math.floor(Math.random()*chars.length);
	aiChar = chars[rand];
	if (aiChar === plChar) {return randChar();}
	return;
}

// </> Start Game
function startGame() {
	gameStarted = true;
	plMoveDisable = false;
	document.getElementById('start-select').style.display = 'none';
	document.getElementById('header').style.opacity = '';
	document.getElementById('main-section').style.opacity = '';

	if (round === 0) {
		document.getElementById("aiTalk").innerText = '"Have Fun"';
		document.getElementById("emoji-img").src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/win3.png";
	}
	round++;

	!function () {
		let randPl =  Math.floor(Math.random()*chars.length);
		if (plChar === "X") {plChar = chars[randPl];}
	}();

	randChar();
	let pos = document.getElementsByClassName("pos");
	for (i = 0; i < 9; i++) {
		let div = document.createElement('div');
		let posSpan = document.createElement('span');
		posSpan.className = 'pos-span';
		div.append(posSpan);
		let transpChars = document.createElement('span');
		transpChars.id = 'transpChars' + i;
		posSpan.append(transpChars);
		let flexSpan = document.createElement('span');
		flexSpan.className = 'flex';
		transpChars.append(flexSpan);
		let spanImg = document.createElement('img');
		spanImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+plChar+'.png';
		spanImg.className = 'spanImg';
		flexSpan.append(spanImg)
		pos[i].innerHTML = '';
		pos[i].append(div);
	}

	if (!plFirst) {
		aiTurn();
	}
}
// --- /\ /\ /\  Before Game Start /\ /\ /\ ---


// --- \/ \/ \/  After Game Start \/ \/ \/ ---
// </> Checks for Victory
function checkVictory(who) {
	let inx = [], i;
	for (i = 0; i < 9; i++) {
		if (gameMain[i] === who) {
			inx.push(i);
		}
	}

	for (j = 0; j < 8; j++) {
		let win = winCond[j];
		if (inx.indexOf(win[0]) !== -1 && inx.indexOf(win[1]) !== -1 && inx.indexOf(win[2]) !== -1) {
			randomEmoji(1, aiTalksWin);
			for (k = 0; k < 3; k++) {
				setTimeout(function() {
					document.getElementById("div"+win[k]).className = "win";
				},350*(k+1));
			}

			gameStarted = false;
			aiScore++;
			document.getElementById("score-ai").innerText = aiScore;
			setTimeout(function() {
				restart("tie");
			},2000);
			return true;    
		}   
	}

	if (gameMain.indexOf("0") === -1) {
		gameStarted = false;
		randomEmoji(1, aiTalksTie);
		setTimeout(function() {
			for (k = 0; k < 9; k++) {
				setTimeout(function() {
					document.getElementById("div"+[k]).innerHTML = "";
				},125*(k+1));
			}
		},500);
    
		setTimeout(function() {
			restart("tie");
		},2100);

		tieScore++;
		document.getElementById("score-tie").innerText = tieScore;
		return true;
	}
	else if (who === aiChar && gameMain.indexOf(plChar) !== -1){
		randomEmoji(0.3, aiTalksMove);
	}       
	return false;  
}

// </> Restart Game
function restart(x) {
	for (i = 0; i < 9; i++) {
		let j = i;
		let posId = document.getElementById('pos' + i);
		let a = document.createElement('a');
		a.className = 'pos';
		a.href = 'javascript:void(\''+i+'\')';
		a.onclick = function(){
			playerMove(j);
		}
		posId.innerHTML = '';
		posId.append(a);
	}

	gameMain = [
		"0", "0", "0",
		"0", "0", "0",
		"0", "0", "0"
	];
	startGame();
	disableRestart = false;
}

// </> Write a Move
function writeOnGame(pos, char) {
	gameMain[pos] = char;
	let posEl = document.getElementById('pos' + pos);
	let taken = document.createElement('div');
	taken.className = 'taken';
	taken.id = 'div' + pos;
	let flexSpan = document.createElement('span');
	flexSpan.className = 'flex';
	taken.append(flexSpan);
	let spanImg = document.createElement('img');
	spanImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+char+'.png';
	spanImg.className = 'spanImg';
	flexSpan.append(spanImg);
	posEl.innerHTML = '';
	posEl.append(taken);
}

// </> Ai Triger and Equal Value Ai Move Randomizer
function aiTurn() {
	let posArr = ai();
	let ran = Math.floor(Math.random() * posArr.length);
	writeOnGame(posArr[ran], aiChar);
	checkVictory(aiChar);
}

// </> Player Click
function playerMove(pos) {
	if (gameStarted && !plMoveDisable) {
		plMoveDisable = true;
		writeOnGame(pos, plChar);
		let win = checkVictory(plChar);
		if (win) {return;}
		setTimeout(function() {
			aiTurn();
			plMoveDisable = false;
		},450);
	}
}
// --- /\ /\ /\  After Game Start /\ /\ /\ ---

// --- \/ \/ \/ AI \/ \/  \/ ---
// </> MinMax algo
function ai(){
	if(gameStarted){
		function isOpen(gameState,pos) {
			return gameState[pos] === "0";
		}

		function didWin(gameState, val){
			let inx = [], i;
			for (i = 0; i < 9; i++) {
				if (gameState[i] === val) {
					inx.push(i);
				}
			}

			for (i = 0; i < 8; i++) {
				if (inx.indexOf(winCond[i][0]) !== -1 && inx.indexOf(winCond[i][1]) !== -1 && inx.indexOf(winCond[i][2]) !== -1) {
					return true;
				}
			}

			return false;
		}
	  
		function findScore(scores, x) {
			if (scores.indexOf(x) !== -1) {return x;}
			else if (scores.indexOf(0) !== -1) {return 0;}
			else if (scores.indexOf(x * -1) !== -1) {return x * -1;}
			else {return 0;}
		}

		var scoresMain = ['0','0','0','0','0','0','0','0','0'];
		function findBestMove() { // MAIN FUNCTION
			for (i = 0; i < 9; i++) {
				if (isOpen(gameMain, i)) {
					var simGame = gameMain.slice();
					simGame[i] = aiChar;
					if (didWin(simGame, aiChar)) {
						scoresMain[i] = 1;
					} else {
						scoresMain[i] = plSim(simGame);
					}
				}    
			}
			var bigest = -99;
			for (j = 0; j < 9; j++) {
				if (scoresMain[j] !== '0' && scoresMain[j] > bigest) {
					bigest = scoresMain[j];
				}
			}
			var inx = [], i;
			for (i = 0; i < 9; i++) {
				if (scoresMain[i] === bigest) {
					inx.push(i);
				}
			}
			console.log(gameMain.slice(0,3), scoresMain.slice(0,3));
			console.log(gameMain.slice(3,6), scoresMain.slice(3,6));
			console.log(gameMain.slice(6,9), scoresMain.slice(6,9));
			return inx;
		}

		function plSim(simGame) { // PL SIM
			var simGameTest = simGame.slice();
			for (i = 0; i < 9; i++) {
				if (isOpen(simGame, i)) {
					simGameTest = simGame.slice();
					simGameTest[i] = plChar;
					if (didWin(simGameTest, plChar)) {
						return -1;
					}
				}
			}
			var plScores = ['0','0','0','0','0','0','0','0','0'];
			for (j = 0; j < 9; j++) {
				if (isOpen(simGame, j)) {
					simGameTest = simGame.slice();
					simGameTest[j] = plChar;
					plScores[j] = aiSim(simGameTest);
				}
			}
			return findScore(plScores, -1);
		}
	  
		function aiSim(simGame) { // AI SIM
			var simGameTest = simGame.slice();
			for (i = 0; i < 9; i++) {
				if (isOpen(simGame, i)) {
					simGameTest = simGame.slice();
					simGameTest[i] = aiChar;
					if (didWin(simGameTest, aiChar)) {
						return 1;
					}
				}
			}
			var aiScores = ['0','0','0','0','0','0','0','0','0'];
			for (j = 0; j < 9; j++) {
				if (isOpen(simGame, j)) {
					simGameTest = simGame.slice();
					simGameTest[j] = aiChar;
					aiScores[j] = plSim(simGameTest);
				}
			}
			return findScore(aiScores, 1);
		} // aiSim()
		return findBestMove();
	}
} // ai() end

charsBtnGen();
