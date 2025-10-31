// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const timerLabel = document.getElementById('timerLabel');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const sessionCount = document.getElementById('sessionCount');
const modeTabs = document.querySelectorAll('.mode-tab');
const workDurationInput = document.getElementById('workDuration');
const shortBreakInput = document.getElementById('shortBreakDuration');
const longBreakInput = document.getElementById('longBreakDuration');
const soundBtns = document.querySelectorAll('.sound-btn');
const volumeSlider = document.getElementById('volumeSlider');
const progressCircle = document.querySelector('.progress-ring-circle');

// Timer State
let currentMode = 'work';
let timeLeft = 25 * 60; // seconds
let totalTime = 25 * 60;
let timerInterval = null;
let isRunning = false;
let sessions = 0;
let currentSound = null;
let audioContext = null;

// Durations (in minutes)
const durations = {
    work: 25,
    short: 5,
    long: 15
};

// Mode labels
const modeLabels = {
    work: {
        running: 'Stay focused! 💪',
        paused: 'Ready to focus?',
        completed: 'Great work! Time for a break 🎉'
    },
    short: {
        running: 'Enjoy your break 🌸',
        paused: 'Take a short break?',
        completed: 'Break over! Back to work 💪'
    },
    long: {
        running: 'Relax and recharge 🌙',
        paused: 'Time for a long break?',
        completed: 'Feeling refreshed? Let\'s go! ✨'
    }
};

// Initialize
function init() {
    updateDisplay();
    setupEventListeners();
    loadSettings();
    initAudioContext();
}

// Audio Context Setup
function initAudioContext() {
    // Audio will be simulated with visual feedback
    // In production, you would load actual audio files
}

// Setup Event Listeners
function setupEventListeners() {
    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    modeTabs.forEach(tab => {
        tab.addEventListener('click', () => switchMode(tab.dataset.mode));
    });
    
    workDurationInput.addEventListener('change', () => {
        durations.work = parseInt(workDurationInput.value);
        if (currentMode === 'work' && !isRunning) {
            resetTimer();
        }
    });
    
    shortBreakInput.addEventListener('change', () => {
        durations.short = parseInt(shortBreakInput.value);
        if (currentMode === 'short' && !isRunning) {
            resetTimer();
        }
    });
    
    longBreakInput.addEventListener('change', () => {
        durations.long = parseInt(longBreakInput.value);
        if (currentMode === 'long' && !isRunning) {
            resetTimer();
        }
    });
    
    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleSound(btn));
    });
    
    volumeSlider.addEventListener('input', () => {
        // Volume control (visual feedback)
    });
}

// Load Settings
function loadSettings() {
    // Settings are stored in the durations object and inputs
    workDurationInput.value = durations.work;
    shortBreakInput.value = durations.short;
    longBreakInput.value = durations.long;
}

// Switch Mode
function switchMode(mode) {
    if (isRunning) {
        stopTimer();
    }
    
    currentMode = mode;
    
    // Update active tab
    modeTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.mode === mode) {
            tab.classList.add('active');
        }
    });
    
    resetTimer();
}

// Toggle Timer
function toggleTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

// Start Timer
function startTimer() {
    isRunning = true;
    startBtn.querySelector('.btn-text').textContent = 'Pause';
    startBtn.querySelector('.btn-icon').textContent = '⏸';
    startBtn.classList.add('running');
    timerLabel.textContent = modeLabels[currentMode].running;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgress();
        
        if (timeLeft === 0) {
            completeTimer();
        }
    }, 1000);
}

// Stop Timer
function stopTimer() {
    isRunning = false;
    startBtn.querySelector('.btn-text').textContent = 'Start';
    startBtn.querySelector('.btn-icon').textContent = '▶';
    startBtn.classList.remove('running');
    timerLabel.textContent = modeLabels[currentMode].paused;
    clearInterval(timerInterval);
}

// Reset Timer
function resetTimer() {
    stopTimer();
    timeLeft = durations[currentMode] * 60;
    totalTime = timeLeft;
    updateDisplay();
    updateProgress();
    timerLabel.textContent = modeLabels[currentMode].paused;
}

// Complete Timer
function completeTimer() {
    stopTimer();
    
    if (currentMode === 'work') {
        sessions++;
        sessionCount.textContent = sessions;
    }
    
    timerLabel.textContent = modeLabels[currentMode].completed;
    
    // Play completion sound (visual feedback)
    playCompletionAnimation();
    
    // Auto-switch to break after work session
    if (currentMode === 'work') {
        setTimeout(() => {
            // Every 4 work sessions, take a long break
            if (sessions % 4 === 0) {
                switchMode('long');
            } else {
                switchMode('short');
            }
        }, 3000);
    }
}

// Update Display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update Progress Circle
function updateProgress() {
    const progress = (totalTime - timeLeft) / totalTime;
    const circumference = 2 * Math.PI * 120; // radius is 120
    const offset = circumference - (progress * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

// Add SVG gradient definition
const svg = document.querySelector('.progress-ring');
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
gradient.setAttribute('id', 'gradient');
gradient.setAttribute('x1', '0%');
gradient.setAttribute('y1', '0%');
gradient.setAttribute('x2', '100%');
gradient.setAttribute('y2', '100%');

const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop1.setAttribute('offset', '0%');
stop1.setAttribute('stop-color', '#ff6b9d');

const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop2.setAttribute('offset', '100%');
stop2.setAttribute('stop-color', '#fecfef');

gradient.appendChild(stop1);
gradient.appendChild(stop2);
defs.appendChild(gradient);
svg.insertBefore(defs, svg.firstChild);

// Toggle Sound
function toggleSound(btn) {
    const sound = btn.dataset.sound;
    
    soundBtns.forEach(b => b.classList.remove('active'));
    
    if (currentSound === sound) {
        currentSound = null;
    } else {
        btn.classList.add('active');
        currentSound = sound;
        playAmbientSound(sound);
    }
}

// Play Ambient Sound (Simulated)
function playAmbientSound(sound) {
    // In production, load and play actual audio files
    console.log(`Playing ${sound} sounds...`);
    
    // Visual feedback
    const soundLabels = {
        rain: '🌧️ Rain sounds playing...',
        birds: '🐦 Bird chirps playing...',
        waves: '🌊 Ocean waves playing...',
        fire: '🔥 Fireplace crackling...'
    };
    
    // You could show a notification here
}

// Play Completion Animation
function playCompletionAnimation() {
    // Add sparkle effect
    const card = document.querySelector('.timer-card');
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'pulse 0.6s ease-in-out';
    }, 10);
    
    // Create confetti effect
    createConfetti();
}

// Create Confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#fecfef', '#ffb6c1', '#ffa07a', '#98d8c8'];
    const container = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
    } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetTimer();
    }
});

// Initialize app
init();