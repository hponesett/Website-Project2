// DOM Elements
const returnButton = document.getElementById('returnButton');

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles for letter page
    particlesJS('particles-js-letter', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#ff1493' },
            shape: { type: 'heart' },
            opacity: {
                value: 0.6,
                random: false,
                animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
            },
            size: {
                value: 5,
                random: true,
                animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                outMode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detectOn: 'canvas',
            events: {
                onHover: { enable: true, mode: 'bubble' },
                onClick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                bubble: { distance: 200, size: 6 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Create initial heart animations
    createHeartAnimations();
    
    // Add event listener for return button
    returnButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

// Create heart animations
function createHeartAnimations() {
    // Create hearts at random intervals
    setInterval(() => {
        createHeartAnimation();
    }, 3000);
}

// Create a single heart animation
function createHeartAnimation() {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    document.body.appendChild(heart);
    
    // Remove the heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 3000);
} 