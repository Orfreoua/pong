// Fonction pour dessiner un rectangle (utilisé pour les palettes)
function drawRect(context, x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Fonction pour dessiner un cercle (utilisé pour la balle)
function drawBall(context, x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Fonction pour dessiner le score
function drawScore(context, leftScore, rightScore, canvas) {
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(leftScore, canvas.width / 4, canvas.height / 5);
    context.fillText(rightScore, 3 * canvas.width / 4, canvas.height / 5);
}

// Fonction pour dessiner tous les objets
function renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore) {
    drawRect(context, 0, 0, canvas.width, canvas.height, 'black'); // Dessine le fond noir
    drawRect(context, leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, 'white'); // Dessine la palette gauche
    drawRect(context, rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, 'white'); // Dessine la palette droite
    drawBall(context, ball.x, ball.y, ball.radius, 'white'); // Dessine la balle
    drawScore(context, leftScore, rightScore, canvas); // Dessine les scores
}
