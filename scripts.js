let a = "";
let b = "";
let operator = "";
let secondNumber = false;


window.addEventListener('DOMContentLoaded', ()=> {
    let functions = document.querySelectorAll('.function');
    functions.forEach( (value)=> {                      //Adding Click events for the function buttons
       value.addEventListener("click", () =>{
            if(a != "" && !secondNumber){   //Prevent operator from being entered before a number or after an operator has already been set
                operator = value.innerHTML;             //Set operator to button text
                secondNumber = true;                    //Next input will affect the secondNumber
                updateDisplay();                        //Update the input field text
            }
       });
    })

    let numbers = document.querySelectorAll('.numPad'); //Adding Click events for the numPad buttons
    numbers.forEach( (value)=> {
       value.addEventListener("click", () =>{
            if(!secondNumber){                          //Select case for modifying A
                a = a.concat(value.innerHTML);          //Concat the text value of the button to the value of A
                updateDisplay();                        //Update the input field text
            }else{                                      //Select case for modifying B
                b = b.concat(value.innerHTML);          //Concat the text value of the button to the value of B
                updateDisplay();                        //Update the input field text
            }
       });
    })

    
    document.querySelector("#clear").addEventListener("click", () =>{ //Clear button resets all global variables and updates display
        a = "";
        b = "";
        answer = "";
        operator = "";
        updateDisplay();
    })

    document.querySelector('#backspace').addEventListener('click', () =>{ //Backspace/Clear button removes only the last character on the current number
                                                                        //Final case is for removing the operator if B is empty
        if(!secondNumber && a != ""){
            a = a.slice(0, a.length -1);
            updateDisplay();
        }else if(secondNumber && b != ""){
            b = b.slice(0, b.length - 1);
            updateDisplay();
        }else if(secondNumber && b == ""){
            operator = "";
            secondNumber = false;
            updateDisplay();
        }
    })

    document.querySelector("#equals").addEventListener('click', () =>{
        a = evaluate();
        a = a.toString();
        b = "";
        operator = "";
        secondNumber = false;
        updateDisplay();
    })

    document.querySelector('#root').addEventListener('click', () =>{
        a = Number(a);
        a = Math.sqrt(a);
        updateDisplay();
        a = a.toString();
    })

})

function updateDisplay(){
    let displayText = "";
    displayText = displayText.concat(a, " ", operator, " ", b);
    let textDisplay = document.querySelector('#inputField');
    textDisplay.value = displayText;
} 

function evaluate(){
    a = Number(a);
    b = Number(b);

    switch(operator){
        case "+":
                return(a + b);
            break;
        case "-":
                return(a - b);
            break;
        case "*":
                return(a * b);
            break;
        case "/":
                return(a / b);
            break;
        case "^":
                return(a ** b);
            break;
    }
}

