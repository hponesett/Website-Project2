// DOM Elements
const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const dateInput = document.getElementById('dateInput');
const unlockButton = document.getElementById('unlockButton');
const errorMessage = document.getElementById('errorMessage');
const envelope = document.querySelector('.envelope');
const envelopeContent = document.querySelector('.envelope-content');
const countdownDisplay = document.getElementById('countdownDisplay');
const audioPlayer = document.getElementById('audioPlayer');
const calendarGrid = document.querySelector('.calendar-grid');

// Constants
const CORRECT_DATE = '21325';
const ANNIVERSARY_DATE = new Date('2025-04-21T00:00:00');

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Lock screen particles
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff69b4'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff69b4',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Main content particles
    particlesJS('particles-js-main', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff69b4'
            },
            shape: {
                type: 'heart'
            },
            opacity: {
                value: 0.7,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 6,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff69b4',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Create continuous heart confetti animation
    setInterval(createHeartConfetti, 5000);
    
    // Create continuous floating hearts
    setInterval(createFloatingHearts, 2000);
    
    // Initialize calendar
    initializeCalendar();
    
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Start background music
    audioPlayer.volume = 0.3;
    audioPlayer.play().catch(error => {
        console.log('Audio autoplay failed:', error);
    });

    // Add event listeners
    unlockButton.addEventListener('click', checkDate);
    dateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkDate();
        }
    });
    
    // Add envelope click event
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            createHeartConfetti();
        }
    });
    
    // Add close button to letter
    const letter = document.querySelector('.letter');
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '❌';
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling to envelope
        envelope.classList.remove('open');
    });
    letter.appendChild(closeButton);
    
    // Add audio controls
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.innerHTML = `
        <button id="toggleAudio">🔊</button>
        <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.5">
    `;
    document.body.appendChild(volumeControl);
    
    const toggleAudio = document.getElementById('toggleAudio');
    const volumeSlider = document.getElementById('volumeSlider');
    
    toggleAudio.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            toggleAudio.textContent = '🔊';
        } else {
            audioPlayer.pause();
            toggleAudio.textContent = '🔈';
        }
    });
    
    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value;
    });
});

// Check if the entered password is correct
function checkDate() {
    const enteredPassword = dateInput.value.trim();
    console.log('Entered password:', enteredPassword);
    console.log('Expected password:', CORRECT_DATE);
    
    if (enteredPassword === CORRECT_DATE) {
        // Correct password - unlock the love story
        console.log('Password correct! Unlocking...');
        lockScreen.classList.remove('active');
        mainContent.classList.add('active');
        errorMessage.style.display = 'none';
        
        // Start playing music
        audioPlayer.volume = 0.5;
        audioPlayer.play().catch(e => console.log('Audio playback failed:', e));
        
        // Create heart confetti
        createHeartConfetti();
    } else {
        // Incorrect password - show error message
        console.log('Password incorrect!');
        errorMessage.style.display = 'block';
        dateInput.classList.add('shake');
        setTimeout(() => {
            dateInput.classList.remove('shake');
        }, 500);
    }
}

// Calendar Initialization
function initializeCalendar() {
    const calendar = document.querySelector('.calendar-grid');
    const daysInMonth = 31; // March has 31 days
    const firstDay = 5; // March 1, 2025 is a Saturday (0 = Sunday, 1 = Monday, etc.)

    // Clear existing content
    calendar.innerHTML = '';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendar.appendChild(emptyDay);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        if (i === 21) { // Anniversary day
            dayElement.classList.add('anniversary');
        }
        calendar.appendChild(dayElement);
    }
}

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const timeDifference = ANNIVERSARY_DATE - now;
    
    if (timeDifference <= 0) {
        countdownDisplay.innerHTML = '<h3>Happy Anniversary!</h3><p>Today is our special day! 💖</p>';
        return;
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Format with leading zeros for single digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    countdownDisplay.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-value">${days}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${formattedHours}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${formattedMinutes}</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${formattedSeconds}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
}

// Create floating hearts animation
function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create heart confetti animation
function createHeartConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'heart-confetti';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        confettiContainer.appendChild(heart);
    }
    
    // Remove confetti container after animation completes
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
} 