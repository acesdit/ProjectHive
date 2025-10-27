
// DOM Elements
const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
const charCount = document.getElementById('char-count');

// Event Listeners
convertBtn.addEventListener('click', checkAndConvert);
numberInput.addEventListener('input', handleInput);
numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAndConvert();
    }
});

// Handle input changes
function handleInput(e) {
    const length = e.target.value.length;
    charCount.textContent = `${length} digit${length !== 1 ? 's' : ''} entered`;
    // Reset result box when typing
    output.classList.remove('show', 'success', 'error');
}

// Set example value
function setExample(val) {
    numberInput.value = val;
    numberInput.focus();
    handleInput({ target: numberInput });
    checkAndConvert();
}

// Main conversion logic
function checkAndConvert() {
    output.classList.remove('show', 'success', 'error');
    const val = numberInput.value.trim();
    if (val === '') {
        showResult('Please enter a valid number', 'error');
        return;
    }
    const num = parseInt(val);
    if (isNaN(num) || num < 1) {
        showResult('Please enter a number greater than or equal to 1', 'error');
        return;
    }
    if (num > 3999) {
        showResult('Please enter a number less than or equal to 3999', 'error');
        return;
    }
    const roman = convertToRoman(num);
    showResult(`${num} → <span class="success">${roman}</span>`, 'success');
}

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];
    let result = '';
    for (let { value, numeral } of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    return result;
}

// Show result with animation
function showResult(message, type = null) {
    output.innerHTML = message;
    output.offsetHeight; // force reflow
    output.classList.add('show');
    if (type) output.classList.add(type);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    numberInput.focus();
    handleInput({ target: numberInput });
});

