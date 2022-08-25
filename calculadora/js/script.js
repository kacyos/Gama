const previousOperationDisplay = document.getElementById("previous-operation");
const currentOperationDisplay = document.getElementById("current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationDisplay, currentOperationDisplay) {
    this.previousOperationDisplay = previousOperationDisplay;
    this.currentOperationDisplay = currentOperationDisplay;
    this.result = null;
    this.currentOperation = "";
  }

  // adiciona dígito no display da calculadora
  addDigit(digit) {
    // verifica se a operação já contém '.'
    if (digit === "." && this.currentOperationDisplay.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processa as operações da calculadora
  processOperation(operation) {
    // verifica se o valor de currentOperationDisplay é vazio
    if (this.currentOperationDisplay.innerText === "" && operation !== "C") {
      // Alterar a operação de calculadora
      if (this.previousOperationDisplay.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // pegar o valor atual e anterior
    let operationValue;
    const previous = parseFloat(this.previousOperationDisplay.innerText) || 0;
    const current = parseFloat(this.currentOperationDisplay.innerText) || 0;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.result = operationValue;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "+/-":
        this.processInvertnumberOperation();
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperation();
        break;

      default:
        return;
    }
  }

  // atualiza valores do display da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationDisplay.innerText += this.currentOperation;
    } else {
      // verifica se o valor de previous é zero
      if (previous === 0) {
        operationValue = current;
      }

      // adiciona o valor de current mais a operação no valor de previous
      this.previousOperationDisplay.innerText = `${operationValue} ${operation}`;
      this.currentOperationDisplay.innerText = "";
    }
  }

  // alterar a operação
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationDisplay.innerText =
      this.previousOperationDisplay.innerText.slice(0, -1) + operation;
  }

  // Deleta o último dígito
  processDelOperator() {
    this.currentOperationDisplay.innerText =
      this.currentOperationDisplay.innerText.slice(0, -1);
  }

  // Deleta a operação atual
  processClearCurrentOperation() {
    this.currentOperationDisplay.innerText = "";
  }

  // Deleta todas as operações
  processClearAllOperation() {
    this.processClearCurrentOperation();
    this.previousOperationDisplay.innerText = "";
  }

  processEqualOperation() {
    const operation = previousOperationDisplay.innerText.split(" ")[1];
    this.processOperation(operation);
  }

  processInvertnumberOperation() {
    this.currentOperationDisplay.innerText =
      this.currentOperationDisplay.innerText * -1;
  }
}

const calculator = new Calculator(
  previousOperationDisplay,
  currentOperationDisplay
);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (parseFloat(value) > 0 || value === ".") {
      calculator.addDigit(value);
    } else {
      calculator.processOperation(value);
    }
  });
});

const keymap = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "/": "/",
  "*": "*",
  "-": "-",
  "+": "+",
  "=": "=",

  Enter: "=",
  Backspace: "DEL",
  Delete: "CE",
  c: "C",
  C: "C",
  ",": ".",
  ".": ".",
};

document.addEventListener("keydown", (event) => {
  const key = event.key;

  const isAllowed = () => Object.keys(keymap).indexOf(key) !== -1;
  if (isAllowed()) {
    if (parseFloat(key) > 0 || keymap[key] === ".") {
      calculator.addDigit(keymap[key]);
    } else {
      calculator.processOperation(keymap[key]);
    }
  }
});
