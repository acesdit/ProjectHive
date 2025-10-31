const display = document.getElementById("display");

// Add text to display
function insert(value) {
  display.value += value;
}

// Add function with parentheses
function insertFunction(func) {
  if (func === "sqrt") display.value += "√(";
  else display.value += func + "(";
}

// Clear entire display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate and display result
function calculate() {
  let expression = display.value;

  // Replace symbols with proper JavaScript equivalents
  expression = expression
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/sin\(/g, "Math.sin(Math.PI/180*") // degrees to radians
    .replace(/cos\(/g, "Math.cos(Math.PI/180*")
    .replace(/tan\(/g, "Math.tan(Math.PI/180*")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(");

  try {
    let result = eval(expression);

    // Handle invalid results
    if (isNaN(result) || result === Infinity || result === -Infinity) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = "Error";
  }
}
