// Fonction pour créer une palette
function createPaddle(x, y, width, height) {
    return { x, y, width, height, dy: 0 };
}

// Fonction pour déplacer une palette
function movePaddle(paddle, canvasHeight) {
    paddle.y += paddle.dy;

    // Empêche la palette de sortir des limites du canevas
    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > canvasHeight) {
        paddle.y = canvasHeight - paddle.height;
    }
}

// Gère les touches pressées pour les palettes
function handleKeyDown(event, leftPaddle, rightPaddle) {
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
}

// Gère les touches relâchées pour les palettes
function handleKeyUp(event, leftPaddle, rightPaddle) {
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
}
