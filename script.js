
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".basic_operator");
const secondary_operators = document.querySelectorAll(".secondary_operator")
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const zero = document.querySelector("#zero");
const negative = document.querySelector("#negative");
const expresion = document.querySelector(".expresion");
const dot = document.querySelector("#dot");

let previousNum = 0;
let currentOperator = "+";

function disable(button) {
    button.disabled = true;
    button.classList.add("disabled");
}

function enable(button) {
    button.disabled = false;
    button.classList.remove("disabled");
}

function round(num) {
    return Math.round(num * 1000) / 1000; 
}

function toggleButtons(func) {
    numbers.forEach(number => {
        func(number);
    });

    secondary_operators.forEach(so => {
        func(so);
    });

    func(equals);
    func(backspace);
}

function isNumber(x) {
    return !(isNaN(Number(x)));
}

function isOperator(char) {
    return char == "+" | char == "-" | char == "/" | char == "*"; 
}

dot.addEventListener("click", () => {
    display.textContent += ".";
    disable(dot);
})

negative.addEventListener("click", () => {
    display.textContent = Number(display.textContent) * -1;
});

backspace.addEventListener("click", () => {
    if ((display.textContent).length != 1) {
        if ((display.textContent).slice(-1) == ".") {
            enable(dot);
        }
        display.textContent = (display.textContent).slice(0, -1);
        return
    }
    if ((expresion.textContent).length > 0) {
        display.textContent = expresion.textContent;
        expresion.textContent = ""; 
        return;
    } 
    display.textContent = "0";
});

clear.addEventListener("click", () => {
    toggleButtons(enable);
    previousNum = 0;
    currentOperator = "+";
    display.textContent = "0";
    expresion.textContent = "";
});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        enable(zero);
        if (display.textContent == "0") {
            display.textContent = number.textContent;
            return;
        }
        display.textContent += number.textContent;
    });
});

equals.addEventListener("click", () => {
    
    let num = Number(display.textContent);
    previousNum = operate(previousNum, num, currentOperator);
    expresion.textContent += num + " = " + previousNum;

    toggleButtons(disable);

    display.textContent = 0;
})

operators.forEach(operator => {
    operator.addEventListener("click", () => {

        toggleButtons(enable);

        let num = Number(display.textContent);
        previousNum = operate(previousNum, num, currentOperator);

        currentOperator = operator.textContent;
        expresion.textContent = previousNum + " " + currentOperator + " ";
        if (currentOperator == "/") disable(zero);
        display.textContent = "0"; 
    })
})

function add(num1, num2) {
    return round(num1 + num2);
}

function divide(num1, num2) {
    return round(num1 / num2);
}

function subtract(num1, num2) {
    return round(num1 - num2);
}

function multiply(num1, num2) {
    return round(num1*num2);
}

function operate(num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    }
    if (operator == "-") {
        return subtract(num1, num2);
    }
    if (operator == "*") {
        return multiply(num1, num2);
    }
    if (operator == "/") {
        return divide(num1, num2);
    }
}
