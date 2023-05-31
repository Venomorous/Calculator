class Calculator {
    constructor(historyTextElement, currentTextElement) {
        this.historyTextElement = historyTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    clear() {
        this.current = "";
        this.history = "";
        this.operation = undefined;
    }
    clearEntry() {
        this.current = "";
    }
    delete() {
        this.current = this.current.toString().slice(0, -1);
    }
    apendNumber(number) {
        if (number === "." && this.current.includes(".")) return;
        this.current = this.current.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.current === "") return;
        if (this.history !== "") {
            this.compute();
        }
        this.operation = operation;
        this.history = this.current;
        this.current = "";
    }
    reverseSign() {
        if (this.current === "") return;
        this.current = this.current * -1;
    }
    compute() {
        let computation;
        const prev = parseFloat(this.history);
        const current = parseFloat(this.current);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.current = computation;
        this.operation = undefined;
        this.history = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.current);
        if (this.operation != null) {
            this.historyTextElement.innerText = `${this.getDisplayNumber(
                this.history
            )} ${this.operation}`;
        } else {
            this.historyTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const clearButton = document.querySelector("[data-clear-enter]");
const historyTextElement = document.querySelector("[data-history]");
const currentTextElement = document.querySelector("[data-current]");
const reverseButton = document.querySelector("[data-reverse-sign]");

const calculator = new Calculator(historyTextElement, currentTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.apendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
    calculator.clearEntry();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
});

reverseButton.addEventListener("click", (button) => {
    calculator.reverseSign();
    calculator.updateDisplay();
});
