const choices = document.querySelectorAll('.choice-icon');
const playerScore = document.querySelector('.player-score');
const compScore = document.querySelector('.comp-score');
const playerChoiceIcon = document.querySelector('.player-selection');
const compChoiceIcon = document.querySelector('.comp-selection');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const roundDetails = document.querySelector('round-details');
const score = {
	player: 0,
	computer: 0,
};

function playGame(e) {
	restart.style.display = 'block';
	// Prevent game continuing once player or computer gets a score of 5
	if (score.player >= 5 || score.computer >= 5) {
		return;
	}
	// Get Choices
	const playerChoice = e.target.id;
	const computerChoice = getComputerChoice();
	// Get player and computer choice Icons for each round
	getChoiceIcons(playerChoice, computerChoice);
	// Display round details
	const roundWinner = getRoundWinner(playerChoice, computerChoice);
	showResult(roundWinner, computerChoice);
	// Show score
	playerScore.innerHTML = `<p>Player: ${score.player}</p>`;
	compScore.innerHTML = `<p>Computer: ${score.computer} </p>`;
	// Get game winner first to 5
	if (score.player >= 5 || score.computer >= 5) {
		getGameWinner();
	}
}

// Get the computers choice
function getComputerChoice() {
	const compChoices = ['rock', 'paper', 'scissors'];
	randChoice = compChoices[Math.floor(Math.random() * compChoices.length)];
	return randChoice;
}

// Show round choice icons
function getChoiceIcons(playerChoice, compChoice) {
	playerChoiceIcon.style.display = 'flex';
	compChoiceIcon.style.display = 'flex';
	playerChoiceIcon.innerHTML = `<i class="selection-icon far fa-light fa-hand-${playerChoice}"></i>`;
	compChoiceIcon.innerHTML = `<i class="selection-icon far fa-light fa-hand-${compChoice}"></i>`;
}

// Hide round choice icons
function hideChoiceIcons() {
	getChoiceIcons('', '');
	playerChoiceIcon.style.display = 'none';
	compChoiceIcon.style.display = 'none';
}

// Get round winner
function getRoundWinner(playerSelection, compSelection) {
	if (playerSelection === compSelection) {
		return 'draw';
	} else if (
		(playerSelection === 'rock' && compSelection === 'scissors') ||
		(playerSelection === 'paper' && compSelection === 'rock') ||
		(playerSelection === 'scissors' && compSelection === 'paper')
	) {
		return 'player';
	} else {
		return 'computer';
	}
}

// Set round score depending on round winner or a draw
function showResult(roundWinner, computerChoice) {
	if (roundWinner === 'player') {
		score.player++;
		//Show result
		result.innerHTML = `<h2 class="win">You Win</h2>
                        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
	} else if (roundWinner === 'computer') {
		score.computer++;
		result.innerHTML = `<h2 class="lose">You Lose</h2>
                        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
	} else {
		result.innerHTML = `<h2>A Draw</h2>
                        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>`;
	}
}

// Gets the winner of game (i.e first to five winner)
function getGameWinner() {
	if (score.player === 5) {
		result.innerHTML = `<h2 class="win"><strong>Player Wins The Game</strong></h2>`;
	} else if (score.computer === 5) {
		result.innerHTML = `<h2 class="lose"><strong>The Computer Wins The Game</strong></h2>`;
	}
}

// Restart game button functionality
function restartGame() {
	score.player = 0;
	score.computer = 0;
	playerScore.innerHTML = `Player: 0`;
	compScore.innerHTML = `Computer: 0`;
	hideChoiceIcons();
	result.innerHTML = `<h2>New Game</h2>
  <p>Let The Game Commence</p>`;
}

//Event listeners
choices.forEach((choice) => choice.addEventListener('click', playGame));
restart.addEventListener('click', restartGame);
