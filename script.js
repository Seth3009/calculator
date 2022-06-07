buttons = Array.from(document.querySelectorAll('.num'));
optButtons = Array.from(document.querySelectorAll('.opt'));
resultButton = document.querySelector('.result');
clearButton = document.querySelector('.clear');
delButton = document.querySelector('.del');
display = document.querySelector('.display');
let tempNumber;
let operator;

function updateDisplay() {
  if(this.innerText === "." && display.value.includes(".")) return
  if(display.value.length < 11 && operator == ''){
    display.value += this.innerText;
  } else {
    display.value = this.innerText;
  }
}

function clearAll(){
  display.value = '';
  tempNumber = 0;
  operator = ''
}

function deleteNum(){
  display.value = display.value.slice(0, -1);
}

function numKey(){

}

function optKey(){
  tempNumber = display.value;
  display.value = '';
  operator = this.innerText;
  if(display.value = '') return;
  if(tempNumber !== ''){
    operate()
  }

  console.log(tempNumber);

}

function operate(){
  let result;
  let numBefore = parseFloat(tempNumber);
  let numCurrent = parseFloat(display.value);

  if(isNaN(numBefore) || isNaN(numCurrent)) return;
  switch (operator) {
    case "+":
      result= numBefore + numCurrent;
      break;
    case "-":
      result= numBefore - numCurrent;
      break;
    case "*":
      result= numBefore * numCurrent;
      break;
    case "÷":
      result= numBefore / numCurrent;
      break;
      case "^":
        result= Math.pow(numBefore, numCurrent);
        break;
    default:
      return;
  }
  display.value = result;
  tempNumber = result;
  console.log(tempNumber);
}



buttons.forEach(button => button.addEventListener('click',updateDisplay));
optButtons.forEach(opt => opt.addEventListener('click', optKey));
resultButton.addEventListener('click',operate);
clearButton.addEventListener('click', clearAll)
delButton.addEventListener('click', deleteNum);