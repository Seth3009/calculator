buttons = Array.from(document.querySelectorAll('.num'));
optButtons = Array.from(document.querySelectorAll('.opt'));
resultButton = document.querySelector('.result');
clearButton = document.querySelector('.clear');
delButton = document.querySelector('.del');
display = document.querySelector('.display');
signButton = document.querySelector('.sign');
let prevNumber;
let currNumber;
let operator;
let isResult = false;

function updateNumber() {
  if(this.innerText === "." && display.value.includes(".")) return
  if(display.value.length < 11){
    display.value += this.innerText;
  } else {
    display.value = this.innerText;
  }
}

function clearAll(){
  currNumber = ''
  prevNumber = ''
  display.value = '';
  operator = undefined
  isResult = false;
}

function deleteNum(){
  currNumber = currNumber.slice(0, -1);
}

function numKey(num){
  if (num === '.' && currNumber.includes('.')) return
  if(!isResult){
    currNumber == undefined ? currNumber = num : currNumber = currNumber + num;
  } else {currNumber = num}
}

function optKey(opt){
  isResult = false;
  if(currNumber == '') return;
  if(prevNumber !== ''){
    operate()
  }
  operator = opt;
  prevNumber = currNumber;
  currNumber = '';
  
}

function operate(){
  let result;
  let numBefore = parseFloat(prevNumber);
  let numCurrent = parseFloat(currNumber);

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
    default:
      return;
  }
  currNumber = result;
  operator = undefined;
  prevNumber = '';
  isResult = true;
}

function getDisplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

function updateDisplay() {
  display.value = getDisplayNumber(currNumber)
}



buttons.forEach(button => button.addEventListener('click',() => {
  numKey(button.innerText);
  updateDisplay();
}));

optButtons.forEach(opt => opt.addEventListener('click', () => {
  optKey(opt.innerText);
  updateDisplay();
}));

resultButton.addEventListener('click', () => {
  operate();
  updateDisplay();
});

clearButton.addEventListener('click', () => {
  clearAll();
  updateDisplay();
})

delButton.addEventListener('click', () => {
  deleteNum();
  updateDisplay();
});

signButton.addEventListener('click', () => {
  currNumber = (parseFloat(currNumber) * -1).toString();
  updateDisplay();
})