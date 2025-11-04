// Particle Effect System
// This creates floating particles in the background

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            // Create canvas if it doesn't exist
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.className = 'particle-canvas';
            document.body.appendChild(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || 'rgba(255, 215, 0, 0.5)',
            particleSize: options.particleSize || 3,
            speed: options.speed || 0.5,
            ...options
        };

        this.resize();
        this.init();
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.options.speed,
            vy: (Math.random() - 0.5) * this.options.speed,
            size: Math.random() * this.options.particleSize + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.fillStyle = this.options.particleColor.replace('0.5', particle.opacity);
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleSystem('particleCanvas', {
            particleCount: 60,
            particleColor: 'rgba(255, 215, 0, 0.4)',
            particleSize: 3,
            speed: 0.3
        });
    });
} else {
    new ParticleSystem('particleCanvas', {
        particleCount: 60,
        particleColor: 'rgba(255, 215, 0, 0.4)',
        particleSize: 3,
        speed: 0.3
    });
}
