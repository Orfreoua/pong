const backgroundCanvas = document.getElementById('background');
const ctx = backgroundCanvas.getContext('2d');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

// Set background color to black
backgroundCanvas.style.backgroundColor = 'black';

const particlesArray = [];
const numberOfParticles = 50; // Reduced number of particles

// Define color ratios
const colorRatios = {
    red: 0.45,
    orange: 0.45,
    yellow: 0.1
};

// Color gradients for the fire effect
const colors = [
    'rgba(255, 69, 0, 0.6)', // red-orange
    'rgba(255, 140, 0, 0.4)', // orange
    'rgba(255, 215, 0, 0.2)'  // yellow
];

// Fire glow parameters
let fireGlowGradient = ctx.createRadialGradient(backgroundCanvas.width / 2, backgroundCanvas.height * 0.95, 0, backgroundCanvas.width / 2, backgroundCanvas.height * 0.95, backgroundCanvas.height * 0.5);
fireGlowGradient.addColorStop(0, 'rgba(255, 69, 0, 0.15)'); // red-orange start
fireGlowGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)'); // orange
fireGlowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)'); // yellow end

class Particle {
    constructor() {
        const colorChance = Math.random();

        if (colorChance < colorRatios.red) {
            this.color = colors[0]; // Red
        } else if (colorChance < colorRatios.red + colorRatios.orange) {
            this.color = colors[1]; // Orange
        } else {
            this.color = colors[2]; // Yellow
        }

        const spawnType = Math.random();

        if (spawnType < 0.33) { // 33% chance from left
            this.x = 0;
            this.y = Math.random() * backgroundCanvas.height;
            this.speedX = Math.random() * 0.5;
        } else if (spawnType < 0.66) { // 33% chance from right
            this.x = backgroundCanvas.width;
            this.y = Math.random() * backgroundCanvas.height;
            this.speedX = Math.random() * -0.5;
        } else { // 33% chance from bottom
            this.x = Math.random() * backgroundCanvas.width;
            this.y = backgroundCanvas.height;
            this.speedX = (Math.random() - 0.5) * 2; // Random horizontal speed
        }

        this.size = Math.random() * 5 + 1;
        this.baseSize = this.size; // Store base size for scintillation effect
        this.speedY = Math.random() * -0.4 - 0.05; // Slightly increased vertical speed
        this.opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1

        // Randomly set chaotic behavior (10% chance)
        this.chaotic = Math.random() < 0.1;
        if (this.chaotic) {
            this.speedX = (Math.random() - 0.5) * 4; // Higher random horizontal speed
            this.speedY = Math.random() * -2 - 0.1; // Higher random vertical speed
        }
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Scintillation effect
        if (!this.chaotic) {
            if (this.direction === 'up') {
                this.size += 0.05;
            } else {
                this.size -= 0.05;
            }

            // Reverse direction when size reaches base size or out of bounds
            if (this.size >= this.baseSize + 1 || this.size <= this.baseSize - 1) {
                this.direction = this.direction === 'up' ? 'down' : 'up';
            }
        }

        if (this.size > 0.1) this.size -= 0.005; // Significantly reduced size reduction

        // Ensure some particles have a chance to reach the top
        if (Math.random() < 0.05) { // 5% chance
            this.speedY = Math.random() * -1 - 0.1; // Faster upwards speed
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
    ctx.fillRect(0, backgroundCanvas.height * 0.5, backgroundCanvas.width, backgroundCanvas.height * 0.5);
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
    ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    drawFireGlow(); // Draw fire glow effect
    handleParticles();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;

    // Update fire glow gradient
    fireGlowGradient = ctx.createRadialGradient(backgroundCanvas.width / 2, backgroundCanvas.height * 0.95, 0, backgroundCanvas.width / 2, backgroundCanvas.height * 0.95, backgroundCanvas.height * 0.5);
    fireGlowGradient.addColorStop(0, 'rgba(255, 69, 0, 0.15)'); // red-orange start
    fireGlowGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.1)'); // orange
    fireGlowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)'); // yellow end
});
