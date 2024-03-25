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
        console.log("check 1 works");
    }
    else if ((num1.includes("-") && num1.lastIndexOf("-") !== 0) || (num1.includes(".") && num1.indexOf(".") !== num1.lastIndexOf("."))) { // if num1 has >1 (-) or (.)
        res = "Syntax ERROR";
        console.log("check 7.1 works");
    }
    else if ((num2.includes("-") && num2.lastIndexOf("-") !== 0) || (num2.includes(".") && num2.indexOf(".") !== num2.lastIndexOf("."))) { // if num2 has >1 (-) or (.)
        res = "Syntax ERROR";
        console.log("check 7.2 works");
    }
    else if (num1 === "" && (operator === "×" || operator === "÷")) { // user only inputs operator (×/÷) and second #
        res = "Syntax ERROR";
        console.log("check 2 works");
    }
    else if (num1 === "-" && num2 === "-") {
        res = "Syntax ERROR";
        console.log("check 6 works");
    }
    else if (num1 === "-") { // user only inputs (-) for first #
        res = (operator === "+" || operator === "-") ? operate("×", -1, (operator + num2)) : "Syntax ERROR";
        console.log("check 3 works");
    }
    else if (num2 === "" || num2 === "-") { // user inputs first # and operator only || user only inputs (-) for second #
        res = "Syntax ERROR";
        console.log("check 4 works");
    }
    else {
        res = operate(operator, num1, num2);
        if (Number(res) === res && res % 1 !== 0) { // result is floating point number
            res = +(res.toFixed(4)); // round to 4 d.p. (if more than 4 d.p.)
        }
        console.log("check 5 works");
    }
    return res;
}

let num1, num2, operator, result;
const opArr = ["+", "-", "×", "÷"];
const display = document.querySelector(".display-screen");

const valueButtons = document.querySelectorAll(".value");
valueButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnValue = btn.textContent;
        const displayContent = display.textContent;
        const containsOp = displayContent.slice(1) // if user only inputs (-) for the first # (so it is mistaken for an operator)
                                         .split(" ")
                                         .some((val) => opArr.includes(val)); // checks if there is already an operator (not incl. (-))
        if (opArr.includes(btnValue) && containsOp) { // if user inputs a second/third/etc. operator
            result = getResult(displayContent);
            display.textContent = "";
            displayValue(result); // display result from previous operation
        }
        if (!(display.textContent).includes("ERROR")) { // prevents user from inputting any values if display is showing error (they have to click AC)
            displayValue(btnValue);
        }
    });
});

const equalsBtn = document.querySelector(".equals-btn");
equalsBtn.addEventListener("click", () => {
    if (display.textContent != "") { // if user clicks "=" w/o inputting anything, do nothing
        const equation = display.textContent;
        result = getResult(equation); // sets num1, num2, operator and returns the result
        display.textContent = "";   
        displayValue(result);
    }
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
    display.textContent = "";
    num1 = num2 = operator = result = undefined;
});

/*const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
    display.removeChild(display.lastChild);
});*/




