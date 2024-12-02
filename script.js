let displayEquation = document.getElementById("calc-equation");
let displayResult = document.getElementById("calc-result");

let currentInput = "";
let operator = "";
let previousInput = "";

const updateDisplays = () => {
  displayEquation.textContent = `${previousInput || ""} ${operator || ""} ${currentInput || ""}`.trim() || "0";
  displayResult.textContent = currentInput || "0";
};

const calculate = (a, b, operator) => {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      return b !== 0 ? (a / b).toString() : "Error";
    default:
      return "0";
  }
};

const actions = {
  ac: () => {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplays();
  },
  "=": () => {
    if (operator && previousInput && currentInput) {
      currentInput = calculate(previousInput, currentInput, operator);
      previousInput = "";
      operator = "";
      updateDisplays();
    }
  },
  del: () => {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "";
    updateDisplays();
  },
  operator: (value) => {
    if (currentInput) {
      if (previousInput && operator) {
        previousInput = calculate(previousInput, currentInput, operator);
      } else {
        previousInput = currentInput;
      }
      currentInput = "";
      operator = value;
      updateDisplays();
    }
  },
  default: (value) => {
    currentInput = currentInput === "0" ? value : currentInput + value;
    updateDisplays();
  },
};

const buttons = document.querySelectorAll(".calc-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "ac" || value === "=" || value === "del") {
      actions[value]();
    } else if (["+", "-", "*", "/"].includes(value)) {
      actions.operator(value);
    } else {
      actions.default(value);
    }
  });
});
