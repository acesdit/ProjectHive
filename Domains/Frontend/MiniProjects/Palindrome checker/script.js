// DOM Elements
const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');
const charCount = document.getElementById('char-count');

// Event Listeners
textInput.addEventListener('input', handleInput);
checkButton.addEventListener('click', checkPalindrome);
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPalindrome();
    }
});

// Handle input changes
function handleInput(e) {
    const length = e.target.value.length;
    charCount.textContent = `${length} character${length !== 1 ? 's' : ''} typed`;
    
    // Reset result box when typing
    result.classList.remove('show', 'success', 'error');
}

// Set example text
function setExample(text) {
    textInput.value = text;
    textInput.focus();
    handleInput({ target: textInput });
    checkPalindrome();
}

// Main palindrome checking function
function checkPalindrome() {
    // Remove previous results
    result.classList.remove('show', 'success', 'error');
    
    // Get input value
    const input = textInput.value.trim();
    
    // Validate input
    if (input === '') {
        showResult('Please enter some text to check', 'error');
        return;
    }
    
    // Process the text
    const cleanText = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanText.split('').reverse().join('');
    const isPalindrome = cleanText === reversedText;
    
    // Prepare result message
    let message = '';
    if (isPalindrome) {
        message = `"${input}" is a palindrome! 🎉`;
        result.classList.add('success');
    } else {
        message = `"${input}" is not a palindrome`;
        result.classList.add('error');
    }
    
    showResult(message);
}

// Show result with animation
function showResult(message, type = null) {
    result.textContent = message;
    
    // Force a reflow to restart animation
    result.offsetHeight;
    
    // Add show class and optional type class
    result.classList.add('show');
    if (type) {
        result.classList.add(type);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    textInput.focus();
    handleInput({ target: textInput });
});