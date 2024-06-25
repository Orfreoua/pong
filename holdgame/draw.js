// Render game state
function renderGame(context, leftPaddle, rightPaddle, ball, canvas, leftScore, rightScore) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = paddleColor;
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ballColor;
    context.fill();

    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(leftScore, canvas.width / 4, 50);
    context.fillText(rightScore, 3 * canvas.width / 4, 50);
}
