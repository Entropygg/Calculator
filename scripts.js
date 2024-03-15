let a = "";
let b = "";
let answer = "";
let operator = "";
let displayText = "";
let secondNumber = false;


window.addEventListener('DOMContentLoaded', ()=> {
    let functions = document.querySelectorAll('.function');
    functions.forEach( (value)=> {                      //Adding Click events for the function buttons
       value.addEventListener("click", () =>{
            if(displayText != "" && !secondNumber){   //Prevent operator from being entered before a number or after A has already been set
                operator = value.innerHTML;             //Set operator to button text
                secondNumber = true;                    //Next input will affect the secondNumber
                updateDisplay();                        //Update the input field text
            }
       });
    })

    let numbers = document.querySelectorAll('.numPad');
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

    
})

function updateDisplay(){
    displayText = "";
    displayText = displayText.concat(a, " ", operator, " ", b);
    let textDisplay = document.querySelector('#inputField');
    textDisplay.value = displayText;
} 

