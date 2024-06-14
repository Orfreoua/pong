// Fonction pour mettre à jour les positions des objets
function updateGame(leftPaddle, rightPaddle, ball, canvas) {
    movePaddle(leftPaddle, canvas.height); // Déplace la palette gauche
    movePaddle(rightPaddle, canvas.height); // Déplace la palette droite
    moveBall(ball, canvas, leftPaddle, rightPaddle); // Déplace la balle
}
