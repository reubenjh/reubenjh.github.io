document.addEventListener('DOMContentLoaded', start)

// Variables
let firstNum = ''
let secondNum = ''
let arfunc = ''
let ans = ''
let entries = []
let history = ''

function start() {
    addListenersToNumbers();
    addListenersToFunctions();
    addListenersToClears();
    addListenersToEquals();
}

function addListenersToNumbers() {
    let numbers = document.getElementsByClassName("number");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", numClick);
    }
}

function numClick() {
    if (arfunc == '') {
        if (history != '') {
            entries = []
            setHist()
            ans = ''
            firstNum += event.target.innerHTML;
            document.getElementById("display").value = firstNum;
        } 
        
        else {
        firstNum += event.target.innerHTML;
        document.getElementById("display").value = firstNum;
        }   
    } 
    
    else {
        secondNum += event.target.innerHTML;
        document.getElementById("display").value = secondNum;
    }
}

function addListenersToFunctions() {
    let functions = document.getElementsByClassName("function");
    for (let i = 0; i < functions.length; i++) {
        functions[i].addEventListener("click", funcClick);
    }
}

function funcClick() {
    // Error handling people clicking an arfunc with no firstNum
    if (firstNum == '' && history == '') {
        return;
    }

    // Chaining calculations & showing history after an equals
    else if (arfunc == '' && history != '' && ans != '') {
        firstNum = ans
        arfunc = event.target.innerHTML;
        history = ''
        entries = []
        entries.push(firstNum)
        entries.push(arfunc)
        setHist()
    }

    // Showing history
    else if (arfunc == '') {
        arfunc = event.target.innerHTML;
        entries.push(firstNum)
        entries.push(arfunc)
        setHist()
    }

    // Chaining calculations & showing history without pressing equals
    else if (arfunc != '' && secondNum != '') {
        ans = String(calculate(firstNum, secondNum, arfunc))
        document.getElementById("display").value = ans
        arfunc = event.target.innerHTML;
        entries.push(secondNum)
        entries.push(arfunc)
        setHist()
        firstNum = ans
        secondNum = ''
    }

    // Switching which arfunc to use
    else if (arfunc != '' && secondNum == '') {
        arfunc = event.target.innerHTML;
        entries[entries.length-1] = arfunc
        setHist()
    }
}

function addListenersToEquals() {
    document.getElementsByClassName('equals')[0].addEventListener('click', eqClick);
}

function eqClick() {
    // Error handling people clicking equals with no firstNum
    if (firstNum == '') {
        return;
    }
    
    // Error handling people clicking equals with no arfunc
    else if (arfunc == '' && secondNum == '') {
        ans = firstNum
        document.getElementById("display").value = ans
        entries.push(firstNum)
        setHist()
        firstNum = ''
    }
    // Regular calculate
    else if (secondNum != '') {
        ans = String(calculate(firstNum, secondNum, arfunc))
        document.getElementById("display").value = ans
        entries.push(secondNum)
        setHist()
        firstNum = ''
        secondNum = ''
        arfunc = ''
    }
}

function setHist() {
    let newHist = ''
    for (let i = 0; i < entries.length; i++) {
        newHist += entries[i] + ' '
    }
    history = newHist
    document.getElementById("history").value = history;
}

function calculate(firstNum, secondNum, arfunc){
    switch (arfunc) {
        case '+':
            return Number(firstNum)+Number(secondNum);
            break;
        case '-':
            return Number(firstNum)-Number(secondNum);
            break;
        case 'x':
            return Number(firstNum)*Number(secondNum);
            break;
        case '/':
            return Number(firstNum)/Number(secondNum);
            break;
    }
}

function addListenersToClears() {
    document.getElementsByClassName('clear')[0].addEventListener('click', clearEntryClick);
    document.getElementsByClassName('clear')[1].addEventListener('click', allClearClick);
}

function clearEntryClick() {
    if (secondNum == '') {
        firstNum = ''
        document.getElementById("display").value = '0';

    } else {
        secondNum = ''
        document.getElementById("display").value = '0';
    }
}

function allClearClick() {
    firstNum = ''
    secondNum = ''
    arfunc = ''
    history = ''
    ans = ''
    entries = []
    document.getElementById("display").value = '0';
    document.getElementById("history").value = '';
}