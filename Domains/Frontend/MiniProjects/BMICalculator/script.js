const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result-container');

function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultContainer.innerHTML = 'Please enter valid height and weight.';
        return;
    }

    // BMI Calculation: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiFormatted = bmi.toFixed(2);

    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    resultContainer.innerHTML = `Your BMI is: <strong>${bmiFormatted}</strong><br>Category: <strong>${category}</strong>`;
}

calculateBtn.addEventListener('click', calculateBMI);