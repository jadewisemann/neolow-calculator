let display = document.getElementById("calc-result"),
  currentInput = "",
  operator = "",
  previousInput = "";

const buttons = document.querySelectorAll(".calc-button");

const updateDisplay = (value) => {
  display.textContent = value || "0";
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
    updateDisplay("0");
  },
  "=": () => {
    if (operator && previousInput && currentInput) {
      currentInput = calculate(previousInput, currentInput, operator);
      previousInput = "";
      operator = "";
    }
  },
  del: () => {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "";
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
    }
  },
  default: (value) => {
    currentInput = currentInput === "0" ? value : currentInput + value;
  },
};

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

    updateDisplay(currentInput || previousInput || "0");
  });
});
