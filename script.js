let currentOperation = "";
const history = [];

function getValues() {
    const a = parseFloat(document.getElementById("input1").value) || 0;
    const b = parseFloat(document.getElementById("input2").value) || 0;
    return { a, b };
}

function setOperation(op) {
    currentOperation = op;
    const indicator = document.getElementById("operationIndicator");

    if (op === "add") indicator.textContent = "Addition (+)";
    else if (op === "subtract") indicator.textContent = "Subtraction (−)";
    else if (op === "multiply") indicator.textContent = "Multiplication (×)";
    else if (op === "divide") indicator.textContent = "Division (÷)";
    else if (op === "power") indicator.textContent = "Exponentiation (^)"; // fixed
    else if (op === "sqrt") indicator.textContent = "Square Root (√)";
    else if (op === "sin") indicator.textContent = "Sine (sin)";
    else if (op === "cos") indicator.textContent = "Cosine (cos)";
    else if (op === "tan") indicator.textContent = "Tangent (tan)";
}

function calculate() {
    const { a, b } = getValues();
    let result;

    if (currentOperation === "add") result = a + b;
    else if (currentOperation === "subtract") result = a - b;
    else if (currentOperation === "multiply") result = a * b;
    else if (currentOperation === "divide") result = b === 0 ? "Cannot divide by zero" : a / b;
    else if (currentOperation === "power") result = Math.pow(a, b); // fixed
    else if (currentOperation === "sqrt") result = Math.sqrt(a);
    else if (currentOperation === "sin") result = Math.sin(a);
    else if (currentOperation === "cos") result = Math.cos(a);
    else if (currentOperation === "tan") result = Math.tan(a);
    else result = "Select an operation";

    document.getElementById("resultDisplay").textContent = result;

    if (typeof result === "number") history.push(`${currentOperation}: ${result.toFixed(6)}`);
    else history.push(`${currentOperation}: ${result}`);
    
    updateHistory();
}

function updateHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history.slice(-10).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

// Keyboard support
document.addEventListener("keydown", e => {
    if (e.key === "Enter") calculate();
    else if (e.key === "+") setOperation("add");
    else if (e.key === "-") setOperation("subtract");
    else if (e.key === "*") setOperation("multiply");
    else if (e.key === "/") setOperation("divide");
});


function updateHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.slice(-10).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            const value = item.split(": ")[1];
            document.getElementById("resultDisplay").textContent = value;
        });

        list.appendChild(li);
    });
}
