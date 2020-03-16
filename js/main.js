calcApp = document.getElementById('App')
calcApp.className = 'container mt-5 bg-secondary'

/* --------------------------------------------- Model Object --------------------------------------------- */

class Model {
    constructor(displayValue, displayFull, operandPressed) {
        this.displayValue = '0';        // this is what shows up on display
        this.displayFull = [];          // this is behind the scenes to do math
        this.operandPressed = false;    // bool for operand
        this.decimalPressed = false;    // bool for decimal
        this.lastIsEqual = false;       // bool for equal
    }
    setView(view) {
        this.view = view;
    }

    updateState(clickedID) {
        //To Do:
        //need to allow x + y + z. currently have to press equal
        //needs to allow multiple digits entered in on second number instead of immediate math - done somewhat
        //needs to show last digit put in when equals needs to be hit - done
        //need to implement decimal - done


        let theNumbers = '1234567890';
        let theOperands = '/*-+';

        let button = document.getElementById(clickedID)

        //if divided by zero, set everything back to base values
        if (this.displayValue === 'Infinity') {
            this.displayValue = '0';
            this.displayFull = [];
        }

        //this if is when the = is pressed
        if (button.innerHTML === '=') {
            if (this.displayFull.length === 1) {
                this.displayValue = this.displayFull[0];
            } else {
                this.view.controller.math(this.displayFull, this.displayValue);
            }
            // console.log('here6');
            this.lastIsEqual = true;

        //this allows user to change the operand after being pressed
        } else if (this.operandPressed && theOperands.includes(button.innerHTML)) {
            this.displayFull[1] = button.innerHTML;

        //this if is when multiple operands are pressed in a row
        } else if (this.displayFull.length === 2 && theOperands.includes(button.innerHTML)) {
            // console.log('what');
            this.view.controller.math(this.displayFull, this.displayValue);
            this.displayValue = this.displayFull[0];
            this.displayFull.push(button.innerHTML);
            this.operandPressed = true;
            this.decimalPressed = false;
            console.log(this.displayFull);
            // console.log('here1')

        //this if checks for operands
        } else if (theOperands.includes(button.innerHTML)) {
            if (!theOperands.includes(this.displayFull[this.displayFull.length - 1])) {
                this.operandPressed = true;
                this.decimalPressed = false;
                this.displayFull = this.view.controller.operand(this.displayFull, this.displayValue, button.innerHTML);
                // console.log('here2');
            }
            // console.log(this.operandPressed)
        }

        //this sets it so that if = is pressed and a new number is pressed, we take that new number as dispalyvalue
        else if (this.lastIsEqual) {
            this.displayValue = button.innerHTML;
            this.lastIsEqual = false;
        }

        //this is for the very first input - checks display value and what button is pressed
        else if (this.displayValue === '0' && theNumbers.includes(button.innerHTML)) {
            this.displayValue = button.innerHTML;
            // console.log('here3');
        }

        //this allows for multiple digits to be pressed
        else if (theNumbers.includes(button.innerHTML)) {

            if (this.operandPressed && !this.decimalPressed) {
                // console.log('made it');
                this.displayValue = button.innerHTML;
                this.operandPressed = false;
            } else {
                this.displayValue += button.innerHTML.charAt();
            }
            // console.log('here4');
        }

        //this checks for decimal pressed and for more than one pressed
        if (!this.decimalPressed && button.innerHTML === '.' && !this.operandPressed) {
            this.displayValue += '.';
            this.decimalPressed = true;
            // console.log('hereDecimal');
        }
        
        //doing decimal after operand is pressed
        if (!this.decimalPressed && button.innerHTML === '.' && this.operandPressed) {
            this.displayValue = '0.';
            this.decimalPressed = true;
        }

        //this calls clear function when needed
        if (button.innerHTML === 'C') {
            this.view.controller.clear();
            this.operandPressed = false;
            this.decimalPressed = false;
            // console.log('here5');
        }

        // console.log('hello')
        // console.log(this.displayFull)
        // console.log(this.displayValue)
        // console.log(this.displayFull)
        this.view.buildCalculator()
    }
}

/* --------------------------------------------- Controller Object --------------------------------------------- */

class Controller {
    constructor(model) {
        this.model = model
    }

    clear() {
        this.model.displayValue = '0'
        this.model.displayFull = []
    }

    operand(displayArray, number, operator) {
        if (displayArray[0] === undefined) {
            displayArray.push(number)
            displayArray.push(operator)
            return displayArray
        } else {
            displayArray.push(operator)
            return displayArray
        }
    }

    math(arr, str) {
        if (arr[1] === '+') {
            // console.log(arr, 'hello')
            this.model.displayValue = (Number(arr[0]) + Number(str)).toString()
            // console.log('here+')
        }
        if (arr[1] === '-') {
            this.model.displayValue = (Number(arr[0]) - Number(str)).toString()
        }
        if (arr[1] === '*') {
            this.model.displayValue = (Number(arr[0]) * Number(str)).toString()
        }
        if (arr[1] === '/') {
            this.model.displayValue = (Number(arr[0]) / Number(str)).toString()
        }
        this.model.displayFull = [this.model.displayValue]
    }
}

/* --------------------------------------------- View Object --------------------------------------------- */

class View {

    constructor(controller) {
        this.controller = controller
    }

    //function to create an element
    createElement(elementType, tagClass, id, textContent) {
        let element = document.createElement(elementType);
        element.id = id;
        element.className = tagClass;
        element.innerHTML = textContent;
        // console.log(element);
        return element;
    }

    checkValue() {
        console.log('test')
    }

    buildCalculator() {
        //set an array to loop over when building the element
        let buttonsArr = ['', '', '', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
        let buttonsCount = 0;

        calcApp.innerHTML = ''

        let header = this.createElement('div', 'text-center', 'headerDiv', '<h1>Calculator App</h1>')
        calcApp.appendChild(header)

        let mainRow = this.createElement('div', 'container row pt-5', 'mainRow', '');
        calcApp.appendChild(mainRow);

        let leftFiller = this.createElement('div', 'col-lg-4', 'leftFiller', '');
        mainRow.appendChild(leftFiller)

        let calcDiv = this.createElement('div', 'col-lg-4 col-sm-12 bg-white', 'calcDiv', '');
        mainRow.appendChild(calcDiv)

        let rightFiller = this.createElement('div', 'col-lg-4', 'rightFiller', '');
        mainRow.appendChild(rightFiller)

        for (let i = 0; i < 6; i++) {
            let row = this.createElement('div', 'row', '', '')
            calcDiv.appendChild(row)

            if (i === 0) {
                row.className += ' bg-success'
            }

            for (let j = 0; j < 4; j++) {

                //first if sets display, first elif sets 3 empty boxes done seperately to remove hover, last elif sets all of the buttons
                if (j === 0 && i === 0 && buttonsCount === 0) {
                    let col = this.createElement('h1', 'col text-right border border-success bg-white m-3', 'calcDisplay', this.controller.model.displayValue)
                    row.appendChild(col)

                } else if (buttonsCount < 3 && i > 0) {
                    let col = this.createElement('h3', 'col-3 text-center border mt-2 border-success ', 'col' + buttonsArr[buttonsCount], buttonsArr[buttonsCount])
                    row.appendChild(col)
                    buttonsCount++
                    col.addEventListener('click', function () { model.updateState(this.id) })

                } else if (buttonsCount >= 3) {
                    let col = this.createElement('h3', 'col-3 text-center border hoverClass border-success ', 'col' + buttonsArr[buttonsCount], buttonsArr[buttonsCount])
                    row.appendChild(col)
                    if (buttonsArr[buttonsCount] === 'C') {
                        col.className += ' mt-2'
                    }
                    buttonsCount++
                    col.addEventListener('click', function () { model.updateState(this.id) })

                }
            }
        }
    }

}

/* --------------------------------------------- Calculator Objects  --------------------------------------------- */

let model = new Model()
let controller = new Controller(model)
let view = new View(controller)
model.setView(view)
view.buildCalculator(); 