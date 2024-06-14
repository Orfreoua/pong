const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

const leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: 4
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;

    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.x + ball.radius > canvas.width) {
        resetBall();
    }

    if (ball.x - ball.radius < 0) {
        resetBall();
    }

    const leftPaddleCollision = ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
                                ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height;
    const rightPaddleCollision = ball.x + ball.radius > rightPaddle.x &&
                                 ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height;

    if (leftPaddleCollision || rightPaddleCollision) {
        ball.dx *= -1;
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function update() {
    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
    moveBall();
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, 'white');
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, 'white');
    drawBall(ball.x, ball.y, ball.radius, 'white');
}

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            leftPaddle.dy = -5;
            break;
        case 's':
            leftPaddle.dy = 5;
            break;
        case 'ArrowUp':
            rightPaddle.dy = -5;
            break;
        case 'ArrowDown':
            rightPaddle.dy = 5;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 's':
            leftPaddle.dy = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            rightPaddle.dy = 0;
            break;
    }
});
