// Récupère le canevas et le contexte de dessin 2D
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Récupère les éléments HTML pour les scores
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');

// Initialise les scores
let leftScore = 0;
let rightScore = 0;

// Définit les dimensions des palettes et de la balle
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

// Crée les objets pour les palettes et la balle
const leftPaddle = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
const rightPaddle = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
const ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, 4, 4);

// Fonction principale de la boucle de jeu
function gameLoop() {
    if (!checkWinner()) { // Vérifie s'il n'y a pas de gagnant
        updateGame(leftPaddle, rightPaddle, ball, canvas, updateScores);
        renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore);
    }
}

// Appelle la boucle de jeu toutes les 16 ms (~60 fps)
setInterval(gameLoop, 1000 / 60);

// Écoute les événements de touches pressées
window.addEventListener('keydown', (event) => handleKeyDown(event, leftPaddle, rightPaddle));

// Écoute les événements de touches relâchées
window.addEventListener('keyup', (event) => handleKeyUp(event, leftPaddle, rightPaddle));

// Fonction pour mettre à jour les scores
function updateScores(leftPlayerScored) {
    if (leftPlayerScored) {
        leftScore++;
    } else {
        rightScore++;
    }
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

// Fonction pour vérifier s'il y a un gagnant
function checkWinner() {
    if (leftScore >= 21 || rightScore >= 21) {
        const winner = leftScore >= 21 ? 'Left Player' : 'Right Player';
        context.fillStyle = 'white';
        context.font = '36px Arial';
        context.fillText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2);
        return true;
    }
    return false;
}
