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

// Fonction pour dessiner tous les objets
function renderGame(context, leftPaddle, rightPaddle, ball, canvas) {
    drawRect(context, 0, 0, canvas.width, canvas.height, 'black'); // Dessine le fond noir
    drawRect(context, leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, 'white'); // Dessine la palette gauche
    drawRect(context, rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, 'white'); // Dessine la palette droite
    drawBall(context, ball.x, ball.y, ball.radius, 'white'); // Dessine la balle
}
