// var gameBord = document.querySelector(".gameBord");

var Cell = ()=>{
    this.init = false;
    this.Walls = 0x1111;
}

Cell.Walls = {
    up:0x1000
}

console.log(Cell.Walls);


// class Node {
//     constructor(element) {
//         this.element = element;
//         this.next2 = null;
//         this.next = null;
//     }
// }

// class LinkedList {
//     constructor() {
//         this.head = null;
//         this.size = 0;
//     }
//     add(element) {
//         // creates a new node 
//         var node = new Node(element);

//         // to store current node 
//         var current;

//         // if list is Empty add the 
//         // element and make it head 
//         if (this.head == null)
//             this.head = node;
//         else {
//             current = this.head;

//             // iterate to the end of the 
//             // list 
//             while (current.next) {
//                 current = current.next;
//             }

//             // add node
//             if(){ 
//             current.next = node;
//             }
//         }
//         this.size++;
//     }
// }

// const list = new LinkedList();


// function test() {
//     this.box = document.createElement("div");
//     this.box.classList.add("box");
//     this.visited = false;
//     this.a = function (x) {
//         this.id = x;
//     }
// }

// for (let i = 0; i < 8000; i++) {
//     let temp = new test();
//     temp.a(i);
//     gameBord.appendChild(temp.box);
//     list.add(temp);
// }

// var t = list.head;

// function run(currBox) {
//     if (!currBox.next) {
//         currBox.visited = true;      
//         return
//     }
//     run(currBox.next);
//     setTimeout(function(){
//         currBox.element.box.classList.add("visited"); 
//     },Math.floor(Math.random()*10000)); 
// }

// run(t);