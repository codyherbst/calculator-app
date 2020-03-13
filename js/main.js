calcApp = document.getElementById('App')
calcApp.className = 'container mt-5 bg-secondary'

//build the UI first before anything acts on it. this is a must

/* --------------------------------------------- Model Object --------------------------------------------- */

class Model {
    constructor(displayValue, displayFull) {
        this.displayValue = '0';
        this.displayFull = []
    }
    setView(view) {
        this.view = view;
    }

    updateState(clicked_id) {
        let theNumbers = '1234567890'
        let theOperands = '/*-+'

        let button = document.getElementById(clicked_id)

        if (button.innerHTML === '=' || this.displayFull.length === 2) {
            this.displayFull.push(button.innerHTML)
            this.view.controller.math(this.displayFull)
            // console.log('here4')
        }
        else if (theOperands.includes(button.innerHTML)) {
            this.displayFull = this.view.controller.operand(this.displayFull, this.displayValue, button.innerHTML)
            // console.log('here3')
        }
        else if (this.displayValue === '0' && theNumbers.includes(button.innerHTML)) {
            this.displayValue = button.innerHTML
            // console.log('here1')
        }
        else if (theNumbers.includes(button.innerHTML)) {
            // console.log('HEY')
            this.displayValue += button.innerHTML.charAt()
            // console.log('here2')
        }
        if (button.innerHTML === 'C') {
            this.view.controller.clear();
            // console.log('here5')
        }
        // console.log('hello')
        // console.log(this.displayFull)
        // console.log(this.displayValue)
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

    operand(arr, str, operator) {
        if (arr[0] === undefined) {
            arr.push(str)
            arr.push(operator)
            return arr
        } else {
            arr.push(operator)
            return arr
        }
    }

    math(arr) {
        if (arr[1] === '+') {
            this.model.displayValue = Number(arr[0]) + Number(arr[2])
            console.log('here+')
        }
        if (arr[1] === '-') {
            this.model.displayValue = arr[0] - arr[2]
        }
        if (arr[1] === '*') {
            this.model.displayValue = arr[0] * arr[2]
        }
        if (arr[1] === '/') {
            this.model.displayValue = arr[0] / arr[2]
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

        document.getElementById('App').innerHTML = ''

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

            for (let j = 0; j < 4; j++) {

                if (j === 0 && i === 0 && buttonsCount === 0) {
                    let col = this.createElement('h3', 'col text-right border', 'calcDisplay', this.controller.model.displayValue)
                    row.appendChild(col)

                } else if (i > 0) {
                    let col = this.createElement('h3', 'col-3 text-center border hoverClass mb-0', 'col' + buttonsArr[buttonsCount], buttonsArr[buttonsCount])
                    row.appendChild(col)
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