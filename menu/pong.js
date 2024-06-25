// Jeu Pong
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
let player1Score = 0;
let player2Score = 0;

const paddle1 = {
    x: 30,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const paddle2 = {
    x: canvas.width - 30 - paddleWidth,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    dx: 5 * (Math.random() < 0.5 ? 1 : -1),
    dy: 5 * (Math.random() < 0.5 ? 1 : -1)
};

const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

function movePaddles() {
    if (keys.w) {
        paddle1.dy = -6;
    } else if (keys.s) {
        paddle1.dy = 6;
    } else {
        paddle1.dy = 0;
    }

    if (keys.ArrowUp) {
        paddle2.dy = -6;
    } else if (keys.ArrowDown) {
        paddle2.dy = 6;
    } else {
        paddle2.dy = 0;
    }

    paddle1.y += paddle1.dy;
    paddle2.y += paddle2.dy;

    if (paddle1.y < 0) {
        paddle1.y = 0;
    } else if (paddle1.y + paddle1.height > canvas.height) {
        paddle1.y = canvas.height - paddle1.height;
    }

    if (paddle2.y < 0) {
        paddle2.y = 0;
    } else if (paddle2.y + paddle2.height > canvas.height) {
        paddle2.y = canvas.height - paddle2.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x - ball.radius < paddle1.x + paddle1.width && 
        ball.x + ball.radius > paddle1.x &&
        ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > paddle2.x && 
        ball.x - ball.radius < paddle2.x + paddle2.width &&
        ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.dx *= -1;
    }

    if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
    }

    if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5 * (Math.random() < 0.5 ? 1 : -1);
    ball.dy = 5 * (Math.random() < 0.5 ? 1 : -1);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleParticles();

    ctx.fillStyle = 'white';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.font = '30px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

function update() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

function startGame(opponentType, level, gameMode) {
    document.getElementById('menu').style.display = 'none';
    
    if (opponentType === 'Computer') {
        initGameAgainstComputer(level, gameMode);
    } else {
        initMultiplayerGame(gameMode);
    }
}

function initMultiplayerGame(gameMode) {
    if (gameMode === 'Boosted') {
        // Préparer les modifications pour le mode Boosted
    }
    update();
}

function initGameAgainstComputer(level, gameMode) {
    paddle1.x = 30; // Afficher le paddle du joueur

    if (gameMode === 'Boosted') {
        // Préparer les modifications pour le mode Boosted
    }

    function moveComputerPaddle() {
        if (ball.y < paddle2.y + paddle2.height / 2) {
            paddle2.dy = -6;
        } else {
            paddle2.dy = 6;
        }

        paddle2.y += paddle2.dy;

        if (paddle2.y < 0) {
            paddle2.y = 0;
        } else if (paddle2.y + paddle2.height > canvas.height) {
            paddle2.y = canvas.height - paddle2.height;
        }
    }

    function updateGame() {
        movePaddles(); // Assurer que le joueur peut bouger son paddle
        moveComputerPaddle();
        moveBall();
        draw();
        requestAnimationFrame(updateGame);
    }

    updateGame();
}