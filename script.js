
let
  display = document.getElementById("calc-result"),
  currentInput = "",
  operator = "",
  previousInput = "";

const buttons = document.querySelectorAll(".calc-button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "ac") {
      currentInput = "";
      previousInput = "";
      operator = "";
      display.textContent = "0";
    } else if ( value === "=" && operator && previousInput !== "" && currentInput !== "") {
      currentInput = calculate(previousInput, currentInput, operator);
      display.textContent = currentInput;
      previousInput = "";
      operator = "";
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput !== "") {
        previousInput = currentInput;
        currentInput = "0";
        operator = value;
        display.textContent = "0";
      }
    } else if (value === "del") {
        currentInput !== "0" && currentInput.length > 1 ? (
        currentInput = currentInput.slice(0, -1),
        display.textContent = currentInput
      ) : (
        currentInput = "",
        display.textContent = "0"
      )
    } else if (currentInput === "0") {
      currentInput = value;
    }
    else {
      currentInput += value;
    }
    
    display.textContent = currentInput;
  });
});

function calculate(a, b, operator) {
  let result;
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }

  return result.toString();
}
