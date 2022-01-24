const keys = document.querySelectorAll(".keys>div");
const display = document.querySelector(".display")
const numberRegex = /\d/g
const operationsRegex = /[×÷+\-]/g
const alternativeOperationsRegex = /\d+[×÷+\-]/g // made to deal with negative numbers
const equalRegex = /\d+[×÷+\-]\d+/g
let reset = false;


function check(key) {
    let display = document.querySelector(".display");

    if (display.textContent === "0" && key.match(numberRegex) !== null) {
        display.textContent = key;
    }

    else if (reset === true && 
    key.match(numberRegex) !== null && 
    display.textContent.match(alternativeOperationsRegex) === null) {
        display.textContent = key;
        reset = false;
    }

    else if ((key === "C") || (key === "clear" && display.textContent.length === 1)) {
        display.textContent = "0";
    }

    else if (key === "clear") {
        display.textContent = display.textContent.slice(0, -1);
    }

    else if 
    ((key.match(operationsRegex !== null)) && 
    (display.textContent.match(alternativeOperationsRegex === null))) {
        display.textContent += key;
    }

    else if (key.match(numberRegex) !== null) {
        display.textContent += key;
    }

    else if (key.match(operationsRegex) !== null &&
     display.textContent.match(alternativeOperationsRegex) === null ) {
        display.textContent += key;
    }

    else if (key === "=" && display.textContent.match(equalRegex) !== null) {
        let operator = display.textContent.replace(/\d/g, "");

        if (operator.length > 1) { // handle negative numbers
            operator = operator[1];
        }
        
        let firstNum = parseInt(display.textContent.slice(0, display.textContent.lastIndexOf(operator)));
        let secondNum = parseInt(display.textContent.slice(display.textContent.lastIndexOf(operator)+1));

        switch (operator) {
            case "÷": 
                if (secondNum == 0) {
                    display.textContent = display.textContent.slice(0, -1);
                    break;
                }
                else {
                    display.textContent = firstNum / secondNum;;
                    break;
                }
            case "×":
                display.textContent = firstNum * secondNum;
                break;
            case "+": 
                display.textContent = firstNum + secondNum;
                break;
            case "-":
                display.textContent = firstNum - secondNum;
                break;
        }
        reset = true;
    }
}

keys.forEach(function(key) {
    key.addEventListener("click", () => {
        if (key.textContent === "") {
            check("clear")
        }
        else {
            check(key.textContent);
        }
    })
})
