// Get canvas and 2D drawing context
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Get HTML elements for scores, start buttons, and settings
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const singlePlayerButton = document.getElementById('singlePlayerButton');
const multiplayerButton = document.getElementById('multiplayerButton');
const settingsButton = document.getElementById('settingsButton');
const scoreLimitElement = document.getElementById('scoreLimit');
const scoreLimitDisplay = document.getElementById('scoreLimitDisplay');
const ballColorElement = document.getElementById('ballColor');
const paddleColorElement = document.getElementById('paddleColor');
const backgroundColorElement = document.getElementById('backgroundColor');
const saveSettingsButton = document.getElementById('saveSettingsButton');
const settingsDialog = document.getElementById('settingsDialog');
const closeSettingsButton = document.querySelector('.close');

// Initialize game variables
let leftPaddle = createPaddle(10, canvas.height / 2 - 50, 10, 100);
let rightPaddle = createPaddle(canvas.width - 20, canvas.height / 2 - 50, 10, 100);
let ball = createBall(canvas.width / 2, canvas.height / 2, 10, 4, 4);
let leftScore = 0;
let rightScore = 0;
let gameLoopIntervalId;
let scoreLimit = 21;
let ballColor = '#FFFFFF';
let paddleColor = '#FFFFFF';
let backgroundColor = '#000000';

// Event listeners for settings
settingsButton.addEventListener('click', () => settingsDialog.style.display = 'block');
closeSettingsButton.addEventListener('click', () => settingsDialog.style.display = 'none');
window.addEventListener('click', (event) => {
    if (event.target === settingsDialog) {
        settingsDialog.style.display = 'none';
    }
});
scoreLimitElement.addEventListener('input', () => scoreLimitDisplay.textContent = scoreLimitElement.value);
saveSettingsButton.addEventListener('click', () => {
    scoreLimit = parseInt(scoreLimitElement.value, 10);
    ballColor = ballColorElement.value;
    paddleColor = paddleColorElement.value;
    backgroundColor = backgroundColorElement.value;
    settingsDialog.style.display = 'none';
});

// Start single player game
function startSinglePlayer() {
    resetGame();
    rightPaddle.isComputer = true;
    startGameLoop();
}

// Start multiplayer game
function startMultiplayer() {
    resetGame();
    rightPaddle.isComputer = false;
    startGameLoop();
}

// Reset game variables
function resetGame() {
    leftScore = 0;
    rightScore = 0;
    ball = createBall(canvas.width / 2, canvas.height / 2, 10, 4, 4);
    leftPaddle = createPaddle(10, canvas.height / 2 - 50, 10, 100);
    rightPaddle = createPaddle(canvas.width - 20, canvas.height / 2 - 50, 10, 100);
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
    clearInterval(gameLoopIntervalId);
}

// Start game loop
function startGameLoop() {
    gameLoopIntervalId = setInterval(() => {
        updateGame(leftPaddle, rightPaddle, ball, canvas, (leftPlayerScored) => {
            updateScores(leftPlayerScored);
            if (checkWinner(scoreLimit, leftScore, rightScore, gameLoopIntervalId)) {
                return;
            }
        });
        renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore);
    }, 1000 / 60);
}

// Add event listeners to start buttons
singlePlayerButton.addEventListener('click', startSinglePlayer);
multiplayerButton.addEventListener('click', startMultiplayer);

// Add event listener to handle paddle movement for multiplayer
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        rightPaddle.dy = -5;
    } else if (e.key === 'ArrowDown') {
        rightPaddle.dy = 5;
    } else if (e.key === 'w') {
        leftPaddle.dy = -5;
    } else if (e.key === 's') {
        leftPaddle.dy = 5;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        rightPaddle.dy = 0;
    } else if (e.key === 'w' || e.key === 's') {
        leftPaddle.dy = 0;
    }
});
