var i, firstval, secval, operation, result;
var firstinput = true;
    firstValCheck = true;   
    tempval = '';               //For deciding whether to clear the screen or just add the text
var buttons = [];

for (i=0; i<10; i++) {                   //assigning gid to variables num1-num9;
    window['num' + i] = gid('num'+i);
    buttons.push(window['num' + i]);
}

for (j=0; j<buttons.length; j++){        //adding an EventListener to each digit button
    evlsit(buttons[j], j)
    console.log(buttons[j])
}

operationRecord('plusbtn', 'plus', '+');
operationRecord('minusbtn', 'minus', '-');
operationRecord('multbtn', 'mult', 'x');
operationRecord('dividebtn', 'divide', '/');

gid('clrbtn').addEventListener("click", () => {
    gid('opfield').innerHTML = 'clear';
    gid('resfield').innerHTML = 0;
    firstinput = true;
})

gid('eqbtn').addEventListener("click", () => {
    sendVal();
    if (operation == "plus") {
        result = Number(firstval) + Number(secval);
        gid('resfield').innerHTML = result;
        //console.log(result)
    }

    else if (operation == "minus") {
        result = Number(firstval) - Number(secval);
        gid('resfield').innerHTML = result;
    }

    else if (operation == "mult") {
        result = Number(firstval) * Number(secval);
        gid('resfield').innerHTML = result;
    }

    else if (operation == "divide") {
        result = Number(firstval) / Number(secval);
        gid('resfield').innerHTML = result;
    }

    firstinput = true;
})

copyResult();

function gid(id) {
    if (typeof id == 'object') return id
    else return document.getElementById(id)
}

function evlsit(id, value) {               //A function for shortening addEventListener call
    id.addEventListener("click", () => {
        if (firstinput == true){
            gid('opfield').innerHTML = value;
            firstinput = false;
        }
        else {
            gid('opfield').innerHTML += value;
        }
        tempval += value.toString();
        console.log(tempval)
    })
}

function operationRecord(id, opid, sign){
    gid(id).addEventListener("click", () => {
        sendVal();
        operation = opid;
        gid('opfield').innerHTML += ' ' + sign + ' ';
    })
}

function sendVal(){
    if (firstValCheck == true) {
        firstval = tempval;
        tempval = '';
        firstValCheck = false;
    }
    else {
        secval = tempval;
        tempval = '';
        firstValCheck = true;
    }
}

function copyResult(){
    var copyTextareaBtn = gid('resfield');

    copyTextareaBtn.addEventListener('click', function(event) {
      var copy_text = gid('resfield');
      var range = document.createRange();
      range.selectNode(copy_text);
      window.getSelection().addRange(range);
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    });
}

