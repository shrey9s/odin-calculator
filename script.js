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
    let res;
    switch (op) {
        case "+":
            res = add(a, b);
            break;
        case "-":
            res = subtract(a, b);
            break;
        case "×":
            res = multiply(a, b);
            break;
        case "÷":
            res = divide(a, b);
            break;
    }
    return res;
}

function displayValue(val) {
    const isOperator = opArr.includes(val);
    if (val === "(-)") val = "-";
    const textNode = document.createTextNode(isOperator ? ` ${val} ` : val);
    display.appendChild(textNode);
}

function getResult(eqn) {
    let res;
    const eqnParts = eqn.split(" ");
    [num1, operator, num2] = [eqnParts[0], eqnParts[1], eqnParts[2]];
    if (operator === undefined) { // user only inputs first # -> return that #
        if ((num1.includes("-") && num1.lastIndexOf("-") !== 0) || (num1.includes(".") && num1.indexOf(".") !== num1.lastIndexOf("."))) { // if num1 has >1 (-) or (.)
            res = "Syntax ERROR";
        }
        else {
            res = num1;
        }
    }
    else if ((num1.includes("-") && num1.lastIndexOf("-") !== 0) || (num1.includes(".") && num1.indexOf(".") !== num1.lastIndexOf("."))) { // if num1 has >1 (-) or (.)
        res = "Syntax ERROR";
    }
    else if ((num2.includes("-") && num2.lastIndexOf("-") !== 0) || (num2.includes(".") && num2.indexOf(".") !== num2.lastIndexOf("."))) { // if num2 has >1 (-) or (.)
        res = "Syntax ERROR";
    }
    else if (num1 === "" && (operator === "×" || operator === "÷")) { // user only inputs operator (×/÷) and second #
        res = "Syntax ERROR";
    }
    else if (num1 === "-" && num2 === "-") {
        res = "Syntax ERROR";
    }
    else if (num1 === "-") { // user only inputs (-) for first #
        res = (operator === "+" || operator === "-") ? operate("×", -1, (operator + num2)) : "Syntax ERROR";
    }
    else if (num2 === "" || num2 === "-") { // user inputs first # and operator only || user only inputs (-) for second #
        res = "Syntax ERROR";
    }
    else {
        res = operate(operator, num1, num2);
        if (Number(res) === res && res % 1 !== 0) { // result is floating point number
            res = +(res.toFixed(4)); // round to 4 d.p. (if more than 4 d.p.)
        }
    }
    return res; // number or string
}

function resetCalc() {
    equalsClicked = false;
    display.textContent = "";
    num1 = num2 = operator = result = undefined;
    deleteBtn.addEventListener("click", deleteValue); // re-enable DEL button
}

function deleteValue() {
    const lastChild = display.lastChild;
    if (lastChild !== null && !(lastChild.textContent).includes("ERROR")) { // prevents user from deleting any ERROR messages (they have to click AC to clear)
        display.removeChild(lastChild);
    }
}

let num1, num2, operator, result;
const opArr = ["+", "-", "×", "÷"];
const display = document.querySelector(".display-screen");

const valueButtons = document.querySelectorAll(".value");
valueButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnValue = btn.textContent;
        const displayContent = display.textContent;
        if (equalsClicked && !displayContent.includes("ERROR")) {
            if (!opArr.includes(btnValue)) { // Number/(-)/(.)
                resetCalc() 
            } else { // Operator
                equalsClicked = false;
                deleteBtn.addEventListener("click", deleteValue);
            }
        }
        /*
            If user clicks a NUMBER/(-)/(.) directly after clicking = (instead of AC first)
                -> resetCalc() (same as clicking AC but starting with btnValue in display)

            If user clicks an OPERATOR directly after clicking = 
                -> only reset equalsClicked to false and re-enable DEL button (not reset everything)
            
            But ONLY if the result after clicking = is NOT an ERROR message
                -> if ERROR, all value buttons + DEL button are disabled and user has to click AC to reset calculator
        */
        const containsOp = displayContent.slice(1) // if user only inputs (-) for the first # (so it is not mistaken for an operator)
                                         .split(" ")
                                         .some((val) => opArr.includes(val)); // checks if there is already an operator in display (not incl. (-))
        if (opArr.includes(btnValue) && containsOp) { // if user inputs a second/third/etc. operator
            result = getResult(displayContent);
            display.textContent = "";
            displayValue(result); // display result from previous operation
        }
        if (!(display.textContent).includes("ERROR")) { // prevents user from inputting any values if display is showing ERROR (they have to click AC)
            displayValue(btnValue); // display current input
        }
    });
});

let equalsClicked = false;
const equalsBtn = document.querySelector(".equals-btn");
equalsBtn.addEventListener("click", () => {
    if (display.textContent !== "") { // if user clicks "=" w/o inputting anything, do nothing
        equalsClicked = true;
        const equation = display.textContent;
        if (!equation.includes("ERROR")) {result = getResult(equation);} // if user clicks = again after an ERROR
        display.textContent = "";
        displayValue(result);
        deleteBtn.removeEventListener("click", deleteValue); // disable DEL button (user has to click AC to clear)
    }
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", resetCalc);

const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", deleteValue);







