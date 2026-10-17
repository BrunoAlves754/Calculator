const numberBtn = document.querySelectorAll("button.btn")
const operatorBtn = document.querySelectorAll("button.operator")

const displayCurrentNumber = document.querySelector("#currentNumber")
const displayLastNumber = document.querySelector("#lastNumber")

//Additional buttons
const btnReset = document.querySelector('#reset')
const btnDelete = document.querySelector('#del')
const btnResult = document.querySelector('#res')

const selectTheme = document.querySelector('#theme')

let expression = ""
let currentValue = ""
let lastValue = ""
let currentOperator = ""

numberBtn.forEach((number, n) => {
    number.addEventListener('click', () => insertNumber(number))
})

operatorBtn.forEach((operator, o) => {
    operator.addEventListener('click', () => insertOperator(operator))
})

selectTheme.addEventListener("change", () => changeTheme())
btnReset.addEventListener('click', () => resetDisplay())
btnDelete.addEventListener('click', () => deleteCharacter())
btnResult.addEventListener('click', () => showResult())

function insertNumber(number) {
    displayCurrentNumber.innerHTML += number.innerHTML
    currentValue += number.value;
}

function insertOperator(operator) {

    if (lastValue !== "" && currentValue !== "") {
        showResult()
    }

    if (currentOperator !== "") return

    currentOperator = operator.value

    if (lastValue === "") {
        lastValue = currentValue
        currentValue = ""
    }

    displayLastNumber.innerHTML = lastValue + operator.innerHTML
    displayCurrentNumber.innerHTML = currentValue
}

function resetDisplay() {
    displayCurrentNumber.innerHTML = ''
    displayLastNumber.innerHTML = ''
    currentOperator = ''
    currentValue = ''
    lastValue = ''
}

function deleteCharacter() {
    currentValue = currentValue.slice(0, -1);
    displayCurrentNumber.innerHTML = currentValue;
}

function showResult() {

    if (
        currentValue === "" ||
        currentOperator === "" ||
        lastValue === ""
    ) return;

    let result = eval(lastValue + currentOperator + currentValue)
    lastValue = result

    displayLastNumber.innerHTML = result

    currentOperator = ""
    currentValue = ""
    displayCurrentNumber.innerHTML = ""
}


function changeTheme() {
    const selectedTheme = selectTheme.value;

    if (selectedTheme === "dark") {
        document.body.removeAttribute("data-theme");
    }
    else {
        document.body.setAttribute("data-theme", selectedTheme);
    }
}

