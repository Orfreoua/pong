function predictBallYPosition(ball, paddleX) {
    let predictedY = ball.y;
    let ballDirectionX = ball.dx;
    let ballDirectionY = ball.dy;

    while ((ballDirectionX > 0 && ball.x < paddleX) || (ballDirectionX < 0 && ball.x > paddleX)) {
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ballDirectionY *= -1; // Collision avec les murs supérieur et inférieur
        }
        
        ball.x += ballDirectionX;
        ball.y += ballDirectionY;
    }

    predictedY = ball.y;
    return predictedY;
}

function updateAIPaddle(aiPaddle, ball) {
    let paddleCenter = aiPaddle.y + aiPaddle.height / 2;
    let predictedY = predictBallYPosition(Object.assign({}, ball), aiPaddle.x);

    // Ajuster predictedY avec une marge d'erreur basée sur aiDifficulty
    let errorMargin = (10 - aiDifficulty) * 20; // Plus la marge d'erreur est élevée, plus la difficulté est faible
    predictedY += (Math.random() * errorMargin - errorMargin / 2);

    if (paddleCenter < predictedY - 35) {
        aiPaddle.dy = aiDifficulty; // Descendre avec une vitesse basée sur aiDifficulty
    } else if (paddleCenter > predictedY + 35) {
        aiPaddle.dy = -aiDifficulty; // Monter avec une vitesse basée sur aiDifficulty
    } else {
        aiPaddle.dy = 0; // Rester en place
    }
}

function updateGame(leftPaddle, rightPaddle, ball, canvas, updateScores) {
    // Update paddle positions
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // IA Logic for rightPaddle
    if (rightPaddle.isComputer) {
        updateAIPaddle(rightPaddle, ball);
    }

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(Math.min(leftPaddle.y, canvas.height - leftPaddle.height), 0);
    rightPaddle.y = Math.max(Math.min(rightPaddle.y, canvas.height - rightPaddle.height), 0);

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
        ball.x = leftPaddle.x + leftPaddle.width + ball.radius;
        ball.dx += Math.sign(ball.dx) * speedIncrement;
        ball.dy += Math.sign(ball.dy) * speedIncrement;
    }

    if (ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ball.radius;
        ball.dx += Math.sign(ball.dx) * speedIncrement;
        ball.dy += Math.sign(ball.dy) * speedIncrement;
    }

    // Ball out of bounds (score update)
    if (ball.x - ball.radius < 0) {
        updateScores(false);
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        updateScores(true);
        resetBall();
    }
}

// Check winner
function checkWinner(scoreLimit, leftScore, rightScore, gameLoopIntervalId) {
    if (leftScore >= scoreLimit || rightScore >= scoreLimit) {
        clearInterval(gameLoopIntervalId);
        gameLoopIntervalId = null;
        alert(leftScore >= scoreLimit ? "Le joueur de gauche gagne!" : "Le joueur de droite gagne!");
        return true;
    }
    return false;
}

// Update scores
function updateScores(leftPlayerScored) {
    if (leftPlayerScored) {
        leftScore++;
    } else {
        rightScore++;
    }
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;

    // Réinitialiser la balle après chaque point marqué
    resetBall();
}
