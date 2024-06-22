let initialBallSpeed = 4;
let speedIncrement = 0.5;

// Define ball object creation function
function createBall(x, y, radius) {
    let dx = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1); // Randomize initial direction
    let dy = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1); // Randomize initial direction
    return { x, y, radius, dx, dy };
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1); // Randomize initial direction
    ball.dy = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1); // Randomize initial direction
    ball.speedIncrement = initialBallSpeed;
}
