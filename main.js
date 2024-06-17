// Récupère le canevas et le contexte de dessin 2D
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Récupère les éléments HTML pour les scores et les boutons de démarrage
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const singlePlayerButton = document.getElementById('singlePlayerButton');
const multiplayerButton = document.getElementById('multiplayerButton');
const settingsButton = document.getElementById('settingsButton');
const scoreLimitElement = document.getElementById('scoreLimit');
const scoreLimitDisplay = document.getElementById('scoreLimitDisplay');

// Récupère les éléments de la boîte de dialogue
const settingsDialog = document.getElementById('settingsDialog');
const closeModal = document.getElementsByClassName('close')[0];
const saveSettingsButton = document.getElementById('saveSettingsButton');

// Initialise les scores
let leftScore = 0;
let rightScore = 0;

// Définit les dimensions des palettes et de la balle
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

// Crée les objets pour les palettes et la balle
let leftPaddle = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
let rightPaddle = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
let ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, 4, 4);

// Variable pour stocker l'ID de l'intervalle de la boucle de jeu
let gameLoopIntervalId = null;

// Variable pour stocker le score à atteindre
let scoreLimit = parseInt(scoreLimitElement.value);

// Met à jour l'affichage du score à atteindre
scoreLimitElement.addEventListener('input', () => {
    scoreLimit = parseInt(scoreLimitElement.value);
    scoreLimitDisplay.textContent = scoreLimit;
});

// Ouvre la boîte de dialogue des réglages
settingsButton.onclick = function() {
    settingsDialog.style.display = "block";
}

// Ferme la boîte de dialogue des réglages
closeModal.onclick = function() {
    settingsDialog.style.display = "none";
}

// Sauvegarde les réglages et ferme la boîte de dialogue
saveSettingsButton.onclick = function() {
    settingsDialog.style.display = "none";
}

// Ferme la boîte de dialogue si l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == settingsDialog) {
        settingsDialog.style.display = "none";
    }
}

// Fonction principale de la boucle de jeu
function gameLoop() {
    if (!checkWinner()) { // Vérifie s'il n'y a pas de gagnant
        updateGame(leftPaddle, rightPaddle, ball, canvas, updateScores);
        renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore);
    }
}

// Fonction pour démarrer le mode Single Player
function startSinglePlayer() {
    resetGame(); // Réinitialise le jeu
    rightPaddle.isComputer = true; // Active le mode joueur contre ordinateur pour la palette de droite
    if (gameLoopIntervalId === null) {
        gameLoopIntervalId = setInterval(gameLoop, 1000 / 60); // Démarre la boucle de jeu si elle n'est pas déjà en cours
    }
}

// Fonction pour démarrer le mode Multijoueur
function startMultiplayer() {
    resetGame(); // Réinitialise le jeu
    rightPaddle.isComputer = false; // Désactive le mode joueur contre ordinateur pour la palette de droite
    if (gameLoopIntervalId === null) {
        gameLoopIntervalId = setInterval(gameLoop, 1000 / 60); // Démarre la boucle de jeu si elle n'est pas déjà en cours
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    leftScore = 0;
    rightScore = 0;
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;

    leftPaddle = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
    rightPaddle = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
    ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, 4, 4); // Crée une nouvelle balle avec la vitesse initiale
}

// Écoute les événements de touches pressées
window.addEventListener('keydown', (event) => handleKeyDown(event, leftPaddle, rightPaddle));

// Écoute les événements de touches relâchées
window.addEventListener('keyup', (event) => handleKeyUp(event, leftPaddle, rightPaddle));

// Ajoute un écouteur d'événement pour le bouton Single Player
singlePlayerButton.addEventListener('click', startSinglePlayer);

// Ajoute un écouteur d'événement pour le bouton Multijoueur
multiplayerButton.addEventListener('click', startMultiplayer);

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
    if (leftScore >= scoreLimit || rightScore >= scoreLimit) { // Utilise la variable scoreLimit pour vérifier le gagnant
        const winner = leftScore >= scoreLimit ? 'Left Player' : 'Right Player';
        context.fillStyle = 'white';
        context.font = '36px Arial';
        context.fillText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2);

        // Arrête la boucle de jeu
        clearInterval(gameLoopIntervalId);
        gameLoopIntervalId = null;

        return true;
    }
    return false;
}
