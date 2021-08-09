const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector(".screen-value");

  display.innerHTML = calculator.displayValue;
}

const keys = document.querySelector(".operations-numbers-wrapper");
keys.addEventListener("click", e => {
  const target = e.target;

  if (!target.matches("span")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.innerHTML);
    updateDisplay();
    return;
  }

  if (target.classList.contains("dot")) {
    inputDecimal(target.innerHTML);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("equal")) {
    handleOperator(target.inenrHTML);
    updateDisplay();
    return;
  }

  if (target.classList.contains("backspace")) {
    backspace();
    updateDisplay();
    return;
  }

  inputDigit(target.innerHTML);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function backspace() {
  if (calculator.displayValue !== "0") {
    let dValue = calculator.displayValue.slice(0, -1);
    calculator.displayValue = dValue;
    calculator.firstOperand = Number(dValue);
  }

  if (calculator.displayValue == "") {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
  }
}
