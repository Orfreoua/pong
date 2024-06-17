function createBall(x, y, radius, dx, dy) {
    return { x, y, radius, dx, dy, speed: Math.sqrt(dx * dx + dy * dy) };
}

function moveBall(ball, canvas, leftPaddle, rightPaddle, updateScores) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.x + ball.radius > canvas.width) {
        resetBall(ball, canvas);
        updateScores(true);
    }

    if (ball.x - ball.radius < 0) {
        resetBall(ball, canvas);
        updateScores(false);
    }

    if (checkCollision(ball, leftPaddle) || checkCollision(ball, rightPaddle)) {
        ball.dx *= -1;
    }
}

function resetBall(ball, canvas) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function checkCollision(ball, paddle) {
    return ball.x - ball.radius < paddle.x + paddle.width &&
           ball.x + ball.radius > paddle.x &&
           ball.y + ball.radius > paddle.y &&
           ball.y - ball.radius < paddle.y + paddle.height;
}
