window.onload = function(event) {
  const numPad = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "backspace", "0", "."
  ];
    const operPad = [
      "*", "/", "-", "+"
    ];
    numPad.forEach((item) => {
      const el = document.createElement("div");
      el.classList.add('num');
      el.classList.toggle("material-icons", isNaN(item));
      el.classList.toggle("material-icons-numpad", isNaN(item));
      el.textContent = item;
      this.document.getElementById("calculator-body").querySelector(".numbers").appendChild(el);
      if(item.search(/[369]/) !== -1) {
        this.document.getElementById("calculator-body").querySelector(".numbers").appendChild(document.createElement("br"));
      }
    });

    operPad.forEach((item) => {
      const el = document.createElement("div");
      el.classList.add('op');
      el.textContent = item;
      this.document.getElementById("calculator-body").querySelector(".operators").appendChild(el);
    });


    const onClick = document.querySelectorAll(".num").forEach((item) => {
      item.addEventListener('click', (el) => {
        switch(el.target.innerText) {
          case 'backspace':
          document.querySelector(".screen").innerText = document.querySelector(".screen").innerText.toString().slice(0, -1);
          break;
          case '.':
          if(document.querySelector(".screen").innerText.includes(".") ) {
            let value = "";
            document.querySelector(".screen").innerText += value;
          } else {
            document.querySelector(".screen").innerText += ".";
          };
          break;
          default:
          let value = el.target.innerText;
          document.querySelector(".screen").innerText += value;
        }
      });
    });

    document.querySelectorAll(".op").forEach((item) => {
      item.addEventListener('click', (el) => {
        let value = el.target.innerText;
        document.querySelector(".screen").innerText += value;
      })
    })
}



function solve(){
  const operators = {
    '+': function(a, b) {
        return a + b;
    },
    '-': function(a, b) {
        return a - b;
    },
    '/': function(a, b) {
        return a / b;
    },
    '*': function(a, b) {
        return a * b;
    },
  }
  const str = document.querySelector(".screen").innerText;
  const op = ["+", '-', '*', '/'];
  function solvePart(str){
  for(let i=0; i<str.length; i++){
    for (let j=0;j<op.length;j++) {
      if(str[i] === op[j]){
        let num1 = parseFloat(str.slice(0, i));
        let newStr = str.substr(i+1);
        let num2 = parseFloat(newStr);
        let solution = Math.round((operators[op[j]](num1, num2) + Number.EPSILON) * 100) / 100;
        document.querySelector(".screen").innerText = solution;
        return solvePart(newStr);
      }
    }
  }
}
solvePart(str);
}
function clears() {
  document.querySelector(".screen").innerText = "";
}
