// DOM Elements
const questionContainer = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('scoreDisplay');
const homeButton = document.getElementById('homeButton');

// Game State
let currentQuestionIndex = 0;
let score = 0;

// Questions Data
const questions = [
    {
        question: "Where did we first chat?",
        options: ["Telegram", "Instagram", "Facebook", "TikTok"],
        correctAnswer: "Telegram"
    },
    {
        question: "What's my nickname you ever called?",
        options: ["Mg", "Honey", "Baby", "Sweetie"],
        correctAnswer: "Mg"
    },
    {
        question: "What color do I always wear?",
        options: ["Black", "White", "Pink", "Blue"],
        correctAnswer: "White"
    },
    {
        question: "What's our anniversary date?",
        options: ["21.3.2025", "21.3.2024", "21.4.2025", "21.4.2024"],
        correctAnswer: "21.3.2025"
    },
    {
        question: "Who says 'I love you' first most often?",
        options: ["You", "Me", "Both equally", "Neither of us"],
        correctAnswer: "Me"
    }
];

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles for game
    particlesJS('particles-js-game', {
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

    // Start the game
    startGame();
    
    // Add event listener for home button
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

// Start the game
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Show the current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option elements
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(optionElement);
    });
}

// Check if the answer is correct
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Update score if correct
    if (isCorrect) {
        score++;
        createHeartAnimation();
    }
    
    // Highlight the selected option
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.textContent === selectedOption) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (option.textContent === currentQuestion.correctAnswer && !isCorrect) {
            option.classList.add('correct');
        }
    });
    
    // Disable all options to prevent multiple selections
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Move to the next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1500);
}

// Show the final score
function showScore() {
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    
    // Update score display
    scoreDisplay.textContent = `${score}/${questions.length}`;
    
    // Update score message based on performance
    const scoreMessage = document.querySelector('.score-message');
    if (score === questions.length) {
        scoreMessage.textContent = "Perfect! You know us so well, Mama! 💘";
    } else if (score >= questions.length * 0.7) {
        scoreMessage.textContent = "Great job! You know us pretty well! 💖";
    } else {
        scoreMessage.textContent = "You're still learning about us! 💕";
    }
    
    // Create heart confetti animation
    createHeartConfetti();
}

// Create heart animation for correct answers
function createHeartAnimation() {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 80 + 10 + '%';
    heart.style.top = Math.random() * 80 + 10 + '%';
    document.body.appendChild(heart);
    
    // Remove the heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Create heart confetti animation
function createHeartConfetti() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-animation';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(heart);
        
        // Remove the heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
} 