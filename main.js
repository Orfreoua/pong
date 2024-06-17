const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const singlePlayerButton = document.getElementById('singlePlayerButton');
const multiplayerButton = document.getElementById('multiplayerButton');

let leftScore = 0;
let rightScore = 0;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let leftPaddle = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
let rightPaddle = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
let ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, 4, 4);

let gameLoopIntervalId = null;

function gameLoop() {
    if (!checkWinner()) {
        updateGame(leftPaddle, rightPaddle, ball, canvas, updateScores);
        renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore);
    }
}

function startSinglePlayer() {
    resetGame();
    rightPaddle.isComputer = true;
    if (gameLoopIntervalId === null) {
        gameLoopIntervalId = setInterval(gameLoop, 1000 / 60);
    }
}

function startMultiplayer() {
    resetGame();
    rightPaddle.isComputer = false;
    if (gameLoopIntervalId === null) {
        gameLoopIntervalId = setInterval(gameLoop, 1000 / 60);
    }
}

function resetGame() {
    leftScore = 0;
    rightScore = 0;
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;

    leftPaddle = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
    rightPaddle = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
    ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, 4, 4);
}

window.addEventListener('keydown', (event) => handleKeyDown(event, leftPaddle, rightPaddle));
window.addEventListener('keyup', (event) => handleKeyUp(event, leftPaddle, rightPaddle));

singlePlayerButton.addEventListener('click', startSinglePlayer);
multiplayerButton.addEventListener('click', startMultiplayer);

function updateScores(leftPlayerScored) {
    if (leftPlayerScored) {
        leftScore++;
    } else {
        rightScore++;
    }
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

function checkWinner() {
    if (leftScore >= 21 || rightScore >= 21) {
        const winner = leftScore >= 21 ? 'Left Player' : 'Right Player';
        context.fillStyle = 'white';
        context.font = '36px Arial';
        context.fillText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2);

        clearInterval(gameLoopIntervalId);
        gameLoopIntervalId = null;

        return true;
    }
    return false;
}
