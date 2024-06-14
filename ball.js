// Fonction pour créer une balle
function createBall(x, y, radius, dx, dy) {
    return { x, y, radius, dx, dy, speed: Math.sqrt(dx * dx + dy * dy) };
}

// Fonction pour déplacer la balle
function moveBall(ball, canvas, leftPaddle, rightPaddle) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Inverse la direction Y si la balle touche le bord supérieur ou inférieur du canevas
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Réinitialise la balle si elle sort du bord droit ou gauche
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        resetBall(ball, canvas);
    }

    // Vérifie les collisions avec les palettes
    if (checkCollision(ball, leftPaddle) || checkCollision(ball, rightPaddle)) {
        ball.dx *= -1;
    }
}

// Fonction pour réinitialiser la balle au centre
function resetBall(ball, canvas) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Fonction pour vérifier les collisions entre la balle et une palette
function checkCollision(ball, paddle) {
    return ball.x - ball.radius < paddle.x + paddle.width &&
           ball.x + ball.radius > paddle.x &&
           ball.y + ball.radius > paddle.y &&
           ball.y - ball.radius < paddle.y + paddle.height;
}
