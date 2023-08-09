window.onload = function () {
  let display = document.querySelector(".display");
  let numberButtons = document.querySelectorAll(".number");
  let operatorButtons = document.querySelectorAll(".operator");
  let enterButton = document.getElementById("enter");
  let clearButton = document.getElementById("clear");

  let currentNumber = "";
  let storedNumber = "";
  let operator = "";
  let calculationCompleted = false; // Added flag

  numberButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (calculationCompleted) {
        // Check flag
        display.value = "";
        currentNumber = "";
        calculationCompleted = false; // Reset flag
      }
      display.value += this.value;
      currentNumber += this.value;
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.value !== "=") {
        operator = this.value;
        storedNumber = currentNumber;
        currentNumber = "";
        display.value = "";
        calculationCompleted = false; // Reset flag
      }
    });
  });

  enterButton.addEventListener("click", function () {
    if (storedNumber !== "" && currentNumber !== "" && operator !== "") {
      performCalculation();
      calculationCompleted = true; // Set flag
    }
  });

  clearButton.addEventListener("click", function () {
    display.value = "";
    currentNumber = "";
    storedNumber = "";
    operator = "";
    calculationCompleted = false; // Reset flag
  });

  function performCalculation() {
    let result;
    let num1 = parseFloat(storedNumber);
    let num2 = parseFloat(currentNumber);

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          display.value = "Error: Divide by 0";
          return;
        } else {
          result = num1 / num2;
        }
        break;
      default:
        return;
    }
    display.value = result;
    currentNumber = result.toString();
    storedNumber = "";
  }
};
