var canvas = document.getElementById("myCanvas");

var mainDiv = document.getElementById("ans");


var x = document.getElementById("progress-color");
var qDiv;
var progress = 0;
var ansArray=[];
var num1,num2;
var score = 0;
var ans;
var opp = ["+","-"];
var ctx = canvas.getContext("2d");
ctx.font = "60px Smartie CAPS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Fun MATH", canvas.width / 2, canvas.height / 2);


function removeChild(){
    if(mainDiv.hasChildNodes()){
        while (mainDiv.firstChild) {
            mainDiv.firstChild.remove();
        }
    }
}

function calc(){
    num1 = Math.floor(Math.random() * 20 + 1);
    num2 = Math.floor(Math.random() * 20 + 1);
    let oppSelector = Math.floor(Math.random()*2);
    if(oppSelector == 0){
        ans = num1 + num2;
    }
    else{
        if(num1<num2){
            let temp = num2;
            num1 = num2;
            num2=temp;
            ans = num1 - num2;
        }
        ans = num1 - num2;
    }
    qDiv.innerHTML = num1 + opp[oppSelector] + num2;
}

function general() {
    if(ansArray.length>0){
        removeChild();
    }

    ansArray = [];
    qDiv = document.createElement("div");
    qDiv.classList.add("qDiv");
    calc();
    

    for (var i = 0; i < 4; i++) {
        let rnd = Math.floor(Math.random() * 20);
        var box;
        if (i == 0) {
            box = gnerateBox(ans);
        }
        else{
            box = gnerateBox(rnd);
        }

        ansArray.push(box);
    }

    //mix the array
    for (let i = 0; i < ansArray.length; i++) {
        let rnd = Math.floor(Math.random() * ansArray.length);
        let temp = ansArray[i].innerHTML;
        ansArray[i].innerHTML = ansArray[rnd].innerHTML;
        ansArray[rnd].innerHTML = temp;
    }

    for (var i = 0; i < ansArray.length; i++) {
        ansArray[i].addEventListener("click", check);
    }

    mainDiv.appendChild(qDiv);
    ansArray.map(displayBox);
}

function displayBox(div) {
    mainDiv.appendChild(div);
}

function gnerateBox(number) {
    var box = document.createElement("div");
    box.classList.add("ansBox");
    box.innerHTML = number;
    return box;
}

function check(event) {
    var test = parseInt(event.target.innerHTML);
    if (test == ans) {
        progress+=20;
        score += 10;
        x.style.width = progress+"px";
        x.innerHTML = score;
        removeChild();
        general();
    } else {
        event.target.classList.add("wrong");
        setTimeout(function(){
            event.target.classList.remove("wrong");
        },1000);
    }
}

general();