var rnd ;
var fileRnd;
var audioDiv = document.querySelector(".audio");
var numbersDiv = document.querySelector(".numbers");


function newAudio() {
    rnd=Math.floor(Math.random() * 11);
    fileRnd= "../audio/" + rnd + ".wav";
    var numFile = document.createElement("audio");
    numFile.setAttribute("src", fileRnd);
    audioDiv.appendChild(numFile);
    audioDiv.innerHTML+="<button onclick='playAudio()'>Play</button>";
}

function playAudio(){
    audioDiv.children[0].play();
}

function boxNumbers() {
    for (let i = 0; i < 11; i++) {
        numbersDiv.innerHTML+="<div class='numBox'>"+i+"</div>";
        if(i==4){
            numbersDiv.innerHTML+="<br>";
        }
    }
    for(let i=0;i<numbersDiv.children.length;i++){
        numbersDiv.children[i].addEventListener("click",cheackAnswer);
    }
}

function clearScreen(){
    audioDiv.querySelectorAll("*").forEach(n => n.remove());
    numbersDiv.querySelectorAll("*").forEach(n => n.remove());
}

function cheackAnswer(){
    if (this.innerHTML == rnd){
        clearScreen();
        start();
        setTimeout(playAudio,600);
    }
    else{
        let x = this;
        x.classList.add("wrong");
        setTimeout(function(){
            x.classList.remove("wrong");
        },900);
    }
}

function start(){
    newAudio();
    boxNumbers(); 
}

start();