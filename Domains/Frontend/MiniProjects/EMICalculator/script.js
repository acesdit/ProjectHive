const loanAmountInput = document.getElementById('loan-amount');
const interestRateInput = document.getElementById('interest-rate');
const loanTermInput = document.getElementById('loan-term');
const calculateBtn = document.getElementById('calculate-btn');
const monthlyPaymentSpan = document.getElementById('monthly-payment');
const resultContainer = document.getElementById('result-container');

function calculateMonthlyPayment() {
    const principal = parseFloat(loanAmountInput.value);
    const annualInterestRate = parseFloat(interestRateInput.value);
    const years = parseFloat(loanTermInput.value);

    // Clear previous result or error messages
    monthlyPaymentSpan.textContent = '$0.00'; 
    resultContainer.style.display = 'none'; // Hide result initially

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(years) || principal <= 0 || annualInterestRate < 0 || years <= 0) {
        // Optionally display an error message
        // alert('Please enter valid positive numbers for all fields.');
        return; // Stop calculation if input is invalid
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = years * 12;

    // Handle edge case: 0% interest rate
    if (monthlyInterestRate === 0) {
         const monthlyPayment = principal / numberOfPayments;
         monthlyPaymentSpan.textContent = `$${monthlyPayment.toFixed(2)}`;
         resultContainer.style.display = 'block';
         return;
    }

    // Standard loan formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    if (isFinite(monthlyPayment)) {
        monthlyPaymentSpan.textContent = `$${monthlyPayment.toFixed(2)}`;
        resultContainer.style.display = 'block';
    } else {
         // Should not happen with valid inputs, but good to handle
         monthlyPaymentSpan.textContent = 'Error'; 
         resultContainer.style.display = 'block';
    }
}

calculateBtn.addEventListener('click', calculateMonthlyPayment);

// Optional: Calculate on input change as well
// [loanAmountInput, interestRateInput, loanTermInput].forEach(input => {
//     input.addEventListener('input', calculateMonthlyPayment);
// });