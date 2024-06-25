<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de Pong</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
        }
        canvas {
            border: 1px solid white;
        }
        #menu, #confirmation {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #menu {
            top: 10px;
            right: 10px;
        }
        #confirmation {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
        }
        #playButton, #exitButton {
            margin: 5px;
            padding: 10px;
            font-size: 20px;
            cursor: pointer;
            background-color: gray;
            border: none;
            color: white;
            border-radius: 5px;
        }
        #playButton:hover, #exitButton:hover {
            background-color: darkgray;
        }
        #yesButton, #noButton {
            margin: 10px;
            padding: 10px;
            font-size: 20px;
            cursor: pointer;
            background-color: gray;
            border: none;
            color: white;
            border-radius: 5px;
        }
        #yesButton:hover, #noButton:hover {
            background-color: darkgray;
        }
    </style>
</head>
<body>
    <div id="menu">
        <button id="playButton">🔈</button>
        <button id="exitButton">❌</button>
    </div>
    <div id="confirmation">
        <p>Are you sure you want to exit?</p>
        <button id="yesButton">YES</button>
        <button id="noButton">NO</button>
    </div>
    <canvas id="background"></canvas>
    <script>
        // Animation de fond
        const canvas = document.getElementById('background');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 50;

        // Define color ratios
        const colorRatios = {
            red: 0.45,
            orange: 0.45,
            yellow: 0.1
        };

        // Color gradients for the fire effect
        const colors = [
            'rgba(255, 69, 0, 0.6)',
            'rgba(255, 140, 0, 0.4)',
            'rgba(255, 215, 0, 0.2)'
        ];

        // Fire glow parameters
        let fireGlowGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.95, 0, canvas.width / 2, canvas.height * 0.95, canvas.height * 0.5);
        fireGlowGradient.addColorStop(0, 'rgba(255, 69, 0, 0.15)');
        fireGlowGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)');
        fireGlowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

        class Particle {
            constructor() {
                const colorChance = Math.random();

                if (colorChance < colorRatios.red) {
                    this.color = colors[0];
                } else if (colorChance < colorRatios.red + colorRatios.orange) {
                    this.color = colors[1];
                } else {
                    this.color = colors[2];
                }

                const spawnType = Math.random();

                if (spawnType < 0.33) {
                    this.x = 0;
                    this.y = Math.random() * canvas.height;
                    this.speedX = Math.random() * 0.5;
                } else if (spawnType < 0.66) {
                    this.x = canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.speedX = Math.random() * -0.5;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                    this.speedX = (Math.random() - 0.5) * 2;
                }

                this.size = Math.random() * 5 + 1;
                this.baseSize = this.size;
                this.speedY = Math.random() * -0.4 - 0.05;
                this.opacity = Math.random() * 0.5 + 0.5;

                this.chaotic = Math.random() < 0.1;
                if (this.chaotic) {
                    this.speedX = (Math.random() - 0.5) * 4;
                    this.speedY = Math.random() * -2 - 0.1;
                }
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (!this.chaotic) {
                    if (this.direction === 'up') {
                        this.size += 0.05;
                    } else {
                        this.size -= 0.05;
                    }

                    if (this.size >= this.baseSize + 1 || this.size <= this.baseSize - 1) {
                        this.direction = this.direction === 'up' ? 'down' : 'up';
                    }
                }

                if (this.size > 0.1) this.size -= 0.005;

                if (Math.random() < 0.05) {
                    this.speedY = Math.random() * -1 - 0.1;
                }
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function drawFireGlow() {
            ctx.fillStyle = fireGlowGradient;
            ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);
        }

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0.1) {
                    particlesArray.splice(i, 1);
                    i--;
                    particlesArray.push(new Particle());
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFireGlow();
            handleParticles();
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            fireGlowGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.95, 0, canvas.width / 2, canvas.height * 0.95, canvas.height * 0.5);
            fireGlowGradient.addColorStop(0, 'rgba(255, 69, 0, 0.15)');
            fireGlowGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)');
            fireGlowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        });

        // Musique
        document.addEventListener('DOMContentLoaded', function() {
            const playButton = document.getElementById('playButton');
            const audio = new Audio('dotamain.mp3');
            let isPlaying = false;

            playButton.addEventListener('click', function() {
                if (!isPlaying) {
                    audio.play().then(() => {
                        console.log('La musique est en train de jouer');
                        isPlaying = true;
                        playButton.textContent = '🔇';
                    }).catch(error => {
                        console.error('Erreur de lecture audio :', error);
                    });
                } else {
                    audio.pause();
                    isPlaying = false;
                    playButton.textContent = '🔈';
                }
            });
        });

        // Jeu de Pong
        const gameCanvas = document.createElement('canvas');
        const gameCtx = gameCanvas.getContext('2d');
        gameCanvas.width = 800;
        gameCanvas.height = 600;
        document.body.appendChild(gameCanvas);

        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballRadius = 7;

        let paddle1 = { x: 30, y: gameCanvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
        let paddle2 = { x: gameCanvas.width - 30 - paddleWidth, y: gameCanvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
        let ball = { x: gameCanvas.width / 2, y: gameCanvas.height / 2, radius: ballRadius, dx: 5, dy: 5 };

        let player1Score = 0;
        let player2Score = 0;

        let keysPressed = {};

        window.addEventListener('keydown', function(e) {
            keysPressed[e.key] = true;
        });

        window.addEventListener('keyup', function(e) {
            delete keysPressed[e.key];
        });

        function movePaddles() {
            if (keysPressed['w'] && paddle1.y > 0) {
                paddle1.dy = -6;
            } else if (keysPressed['s'] && paddle1.y + paddle1.height < gameCanvas.height) {
                paddle1.dy = 6;
            } else {
                paddle1.dy = 0;
            }

            if (keysPressed['ArrowUp'] && paddle2.y > 0) {
                paddle2.dy = -6;
            } else if (keysPressed['ArrowDown'] && paddle2.y + paddle2.height < gameCanvas.height) {
                paddle2.dy = 6;
            } else {
                paddle2.dy = 0;
            }

            paddle1.y += paddle1.dy;
            paddle2.y += paddle2.dy;
        }

        function moveBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y - ball.radius < 0 || ball.y + ball.radius > gameCanvas.height) {
                ball.dy *= -1;
            }

            if (ball.x - ball.radius < paddle1.x + paddle1.width && 
                ball.x + ball.radius > paddle1.x &&
                ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
                ball.dx *= -1;
                ball.dx *= 1.05; // Augmenter la vitesse de la balle après chaque collision
            }

            if (ball.x + ball.radius > paddle2.x && 
                ball.x - ball.radius < paddle2.x + paddle2.width &&
                ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
                ball.dx *= -1;
                ball.dx *= 1.05; // Augmenter la vitesse de la balle après chaque collision
            }

            if (ball.x - ball.radius < 0) {
                player2Score++;
                resetBall();
            }

            if (ball.x + ball.radius > gameCanvas.width) {
                player1Score++;
                resetBall();
            }
        }

        function resetBall() {
            ball.x = gameCanvas.width / 2;
            ball.y = gameCanvas.height / 2;
            ball.dx = 5 * (Math.random() < 0.5 ? 1 : -1);
            ball.dy = 5 * (Math.random() < 0.5 ? 1 : -1);
        }

        function draw() {
            gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

            gameCtx.fillStyle = 'white';
            gameCtx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
            gameCtx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

            gameCtx.beginPath();
            gameCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            gameCtx.fillStyle = 'white';
            gameCtx.fill();
            gameCtx.closePath();

            gameCtx.font = '30px Arial';
            gameCtx.fillText(player1Score, gameCanvas.width / 4, 50);
            gameCtx.fillText(player2Score, 3 * gameCanvas.width / 4, 50);
        }

        function update() {
            movePaddles();
            moveBall();
            draw();
            requestAnimationFrame(update);
        }

        function startGame(opponentType, level, gameMode) {
            document.getElementById('menu').style.display = 'none';
            gameCanvas.style.display = 'block';
            
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
            paddle1.x = 30;

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
                } else if (paddle2.y + paddle2.height > gameCanvas.height) {
                    paddle2.y = gameCanvas.height - paddle2.height;
                }
            }

            function updateGame() {
                movePaddles();
                moveComputerPaddle();
                moveBall();
                draw();
                requestAnimationFrame(updateGame);
            }

            updateGame();
        }

        document.getElementById('exitButton').addEventListener('click', function() {
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.style.display = 'flex';
        });

        document.getElementById('yesButton').addEventListener('click', function() {
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.style.display = 'none';
            gameCanvas.style.display = 'none';
            document.getElementById('menu').style.display = 'flex';
        });

        document.getElementById('noButton').addEventListener('click', function() {
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.style.display = 'none';
        });
    </script>
</body>
</html>
