function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR: Division by zero";
    }
    return a / b;
}

function operate(op, a, b) {
    if (a === ".") a = 0;
    if (b === ".") b = 0;
    a = +a;
    b = +b;
    let result;
    switch (op) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;
    }
    return result;
}

function displayValue(val) {
    const isOperator = opArr.includes(val);    
    if (val === "(-)") val = "-";
    const textNode = document.createTextNode(isOperator ? ` ${val} `: val);
    display.appendChild(textNode);
}

function processInput(input) {
    if (opArr.includes(input)) { // input is operator
        operator = input;
    }
    else { // input is number, negative sign (-), or decimal point (.)
        if (input === "(-)") input = "-";
        const lastChild = display.lastChild;
        if (!lastChild) { // input is the very first input
            num1 = input;
        }
        else { // other inputs already in display
            const lastValue = (lastChild.textContent).trim(); // the last input (before current one)
            const previousSibling = lastChild.previousSibling; // second-to-last input
            if (opArr.includes(lastValue) && previousSibling && !opArr.includes(previousSibling.textContent.trim())) { // the last input is operator AND NOT (-); user is inputting second number
                num2 = input;
            }
            else { // the last input is number, (-), or (.); user is inputting 2+ digit, negative, or decimal point number (for first or second number)
                if (num2 === undefined) { // user has not begun inputting second number - i.e., user is still inputting first number (it is a 2+ digit/negative/decimal number)
                    num1 += input;
                }
                else { // user has already begun inputting second number (it is a 2+ digit/negative/decimal number)
                    num2 += input;
                }
            }
        }
    }
}
// If lastValue = "-" but this refers to the negative sign (not minus):
// The negative sign is the very first part of num1 and num2
// If user has input the negative sign for num1, then there should be NO previous sibling (i.e., "-" is the first input in display)
// If user has input the negative sign for num2, then there should be a previous sibling AND that previous sibling should be an operator (not a number)

let num1, num2, operator;
const opArr = ["+", "-", "×", "÷"];
const display = document.querySelector(".display-screen");

const valueButtons = document.querySelectorAll(".value");
valueButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        let value = btn.textContent;
        processInput(value);
        displayValue(value);
    });
});

const equalsBtn = document.querySelector(".equals-btn");
equalsBtn.addEventListener("click", () => {
    display.textContent = "";
    let answer = operate(operator, num1, num2);
    if (Number(answer) === answer && answer % 1 !== 0) { // answer is floating point number
        answer = +(answer.toFixed(4)); // round to 4 d.p. (if more than 4 d.p.)
    }
    displayValue(answer);
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
    display.textContent = "";
    num1 = num2 = operator = undefined;
});

/*const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
    display.removeChild(display.lastChild);
});*/




