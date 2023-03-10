// Dígitos que ja estão sendo calculados ou ja estão sendo usados
const previousOperationText = document.querySelector("#previous-operation");
// Dígitos que estão sendo inseridos no calculo 
const currentOperationText = document.querySelector("#current-operation");
// seleciona todos os botões
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText){
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // add digit to calculator screen
  addDigit(digit) {
    // check if current operations already hs a dot
    if(digit === '.' && this.currentOperationText.innerText.includes(".")){
      // caso o digito ponto ja tenha sido utilizado ele nao deixa inserir outro ponte
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calculator operations
  processOperation(operation) {
    // check if current is empty / ou se esta sendo usado a função "C"
    if(this.currentOperationText.innerText === "" && operation !== "C") {
      // change operations
      if(this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      // não retorna nenhuma ação para evitar o erro
      return;
    }

    // Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperations();
        break;
      case "CE":
        this.processaClearCurrentOperation();
        break;
      case "C":
        this.processaClearOperation();
        break;
      case "=":
        this.processaEqualOperation();
        break;
      default:
        return;
    }
  }

  // Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ){
    // console.log(operationValue, operation, previous, current);
    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // check if value is zero, if it is just add current value
      if(previous === 0) {
       operationValue = current;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"]

    if(!mathOperations.includes(operation)) {
      return;
    }
    //  Apaga o ultimo operador utilizado no calculo
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Função DELETE - Delete the last digit
  processDelOperations() {
    this.currentOperationText.innerText =
    this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear current operation
  processaClearCurrentOperation() {
    this.currentOperationText.innerText = '';
  }

  // Clear all operation
  processaClearOperation() {
    this.currentOperationText.innerText = '';
    this.previousOperationText.innerText = '';
  }

  // Process an operation
  processaEqualOperation()  {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === '.') {
      calc.addDigit(value);
    } else {
      calc.processOperation(value)
    }
  });
});

