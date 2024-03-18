/* To do:
 update CSS 
*/

let a = "";
let b = "";
let operator = "";
let secondNumber = false;
let decimal = false;
let expression = "";
let error = false;


window.addEventListener('DOMContentLoaded', ()=> {
    let functions = document.querySelectorAll('.function');
    functions.forEach( (value)=> {                      //Adding Click events for the function buttons
       value.addEventListener("click", () =>{
            if(a != "" && !secondNumber){               //Case where entering a number before an operator
                operator = value.innerHTML;             //Set operator to button text
                secondNumber = true;                    //Next input will affect the secondNumber
                updateDisplay();                        //Update the input field text
                decimal = false;                        //Re-enable the . button
            }else if(a == '' && !secondNumber){         //Case where the user starts with an operator
                a = '0';                                //Assume the user wants to start at 0
                operator = value.innerHTML; 
                secondNumber = true;
                updateDisplay(); 
                decimal = false;
            }else if (b != '' && secondNumber){         //If the user is entering a an operator when B has already been entered we evaluate the current expression
                a = evaluate().toString();              //Then set A to equal the answer, remove b's value, change the operator to the input, and update the display
                operator = value.innerHTML; 
                b = '';
                updateDisplay();
                if(a.indexOf('.') > -1){                //check for presence of . in a to determine if the decimal key should be enabled
                    decimal = true;
                }else{
                    decimal = false;
                }
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
        operator = "";
        expression = "";
        decimal = false;
        updateDisplay();
    })

    document.querySelector("#period").addEventListener("click", () =>{ 
        if(!decimal){
            if(!secondNumber){                          //Select case for modifying A
                a = a.concat('.');          //Concat the text value of the button to the value of A
                updateDisplay();                        //Update the input field text
            }else{                                      //Select case for modifying B
                b = b.concat('.');          //Concat the text value of the button to the value of B
                updateDisplay();                        //Update the input field text
            }
            decimal = true;
        }
    })


    document.querySelector('#backspace').addEventListener('click', () =>{ //Backspace/Clear button removes only the last character on the current number
                                                                        //Final case is for removing the operator if B is empty
        
        if(!secondNumber && a != ""){
            if(a.charAt(a.length - 1) === '.'){                              //inner if statement for determining if the character to be deleted is a decimal point
                decimal = false;                                        //If it is, the decimal boolean needs to be reset to re-enable the . key
            }
            a = a.slice(0, a.length -1);
            updateDisplay();
        }else if(secondNumber && b != ""){
            if(b.charAt(b.length - 1) === '.'){                              //inner if statement for determining if the character to be deleted is a decimal point
                decimal = false;                                        //If it is, the decimal boolean needs to be reset to re-enable the . key
            }
            b = b.slice(0, b.length - 1);
            updateDisplay();
        }else if(secondNumber && b == ""){
            operator = "";
            secondNumber = false;
            updateDisplay();
        }
    })

    document.querySelector("#equals").addEventListener('click', () =>{
        if(!error && b != ''){      //Perform evaluation only if there is no error and a second number has been entered
            a = evaluate();
            a = a.toString();
            b = "";
            operator = "";
            secondNumber = false;
            updateDisplay();
            if(a.indexOf('.') > -1){
                decimal = true;
            }else{
                decimal = false;
            }
        }
        
    })

    document.querySelector('#root').addEventListener('click', () =>{ //Root button automatically evaluates every time
        if(!secondNumber){                                           //If only one number has been entered, display the answer
            a = Number(a);
            a = Math.sqrt(a).toFixed(2).toString();
            updateDisplay();
            
        }else{                                                       //If an expression has been entered, evaluate it and display the square root of the answer
            a = Number(evaluate());
            a = Math.sqrt(a).toFixed(2).toString();
            b = '';
            operator = '';
            updateDisplay();
        }

        if(a.indexOf('.') > -1){                                     //In either case, check for . in a to see if the . key should be enabled
            decimal = true;
        }else{
            decimal = false;
        }
    })
        
});

function updateDisplay(){
    if(!error){                                                     //If no error, concat expression together and display it in the input field
        expression = "";
        expression = expression.concat(a, " ", operator, " ", b);
        document.querySelector('#inputField').value = expression;
        
    }else{
        document.querySelector('#inputField').value = expression;   //If there is an error first show error message then reset variables. Next input will clear the error
        a = "";
        b = "";
        operator = "";
        secondNumber = false;
        decimal = false;
        expression = "";
        error = false;
    }
} 

function evaluate(){                                                //Convert vars to numbers then evaulate based on the current operator
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
                if(b == 0){
                    error = true;
                    expression = "Divide by 0 error"
                    return(0);
                }
                return((a / b).toFixed(2));
            break;
        case "^":
                return(a ** b);
            break;
    }
}

