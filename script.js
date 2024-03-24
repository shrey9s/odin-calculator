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
        return "Math ERROR";
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
    const textNode = document.createTextNode(isOperator ? ` ${val} ` : val);
    display.appendChild(textNode);
}

function setValues(eqn) {
    const eqnParts = eqn.split(" ");
    [num1, operator, num2] = [eqnParts[0], eqnParts[1], eqnParts[2]]
}

let num1, num2, operator;
const opArr = ["+", "-", "×", "÷"];
const display = document.querySelector(".display-screen");

const valueButtons = document.querySelectorAll(".value");
valueButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!display.textContent.includes("ERROR")) { // prevent user from inputting any values if display is showing error (they have to click AC)
            displayValue(btn.textContent);
        }
    });
});

const equalsBtn = document.querySelector(".equals-btn");
equalsBtn.addEventListener("click", () => {
    if (display.textContent != "") { // if user clicks "=" w/o inputting anything, do nothing
        const equation = display.textContent;
        setValues(equation); // sets num1, num2, operator
        display.textContent = "";
        if (operator === undefined) { // user only inputs first #
            displayValue((num1.includes("-")) ? "Syntax ERROR" : num1); // if user uses (-) as minus
        }
        else if (num1 === "-") {
            let ans;
            if (operator === "+" || operator === "-") ans = operate("×", -1, (operator + num2));
            else ans = "Syntax ERROR";
            displayValue(ans);
        }
        else if (num1 === "" && (operator === "×" || operator === "÷")) {
            displayValue("Syntax ERROR");
        }
        else if (num2 === "" || num2 === "-") { // user inputs first # and operator only || user only inputs (-) for second #
            displayValue("Syntax ERROR");
        }
        else {
            let answer = operate(operator, num1, num2);
            if (Number(answer) === answer && answer % 1 !== 0) { // answer is floating point number
                answer = +(answer.toFixed(4)); // round to 4 d.p. (if more than 4 d.p.)
            }
            displayValue(answer);
        }
    } 
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




