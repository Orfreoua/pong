// Récupère le canevas et le contexte de dessin 2D
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

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
    updateGame(leftPaddle, rightPaddle, ball, canvas);
    renderGame(context, leftPaddle, rightPaddle, ball, canvas);
}

// Appelle la boucle de jeu toutes les 16 ms (~60 fps)
setInterval(gameLoop, 1000 / 60);

// Écoute les événements de touches pressées
window.addEventListener('keydown', (event) => handleKeyDown(event, leftPaddle, rightPaddle));

// Écoute les événements de touches relâchées
window.addEventListener('keyup', (event) => handleKeyUp(event, leftPaddle, rightPaddle));
