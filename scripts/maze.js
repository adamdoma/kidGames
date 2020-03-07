var mainDiv = document.querySelector(".main");
var body = document.getElementsByName("body");
document.onkeydown = keyTest;
var br = document.createElement("br");
const rows = 20;
const colmuns = 20;
var id = 0;
var maxCells = 0;
var iUser = 0;
var jUser = 0;

var boxes = [];
var Box = function () {
    this.box = document.createElement("div");
    this.direction = [false, false, false, false];
    this.visited = false;
    this.id = null;
    this.i = null;
    this.j = null;
}

function User(box) {
    var img = document.createElement("img");
    img.classList.add("user");
    img.setAttribute("src", "../imgs/user.gif");
    box.appendChild(img);
}

function populateArray() {
    let tempArr = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmuns; j++) {
            var test = new Box();
            test.box.classList.add("box");
            test.box.classList.add("bottomLine", "rightLine");
            test.i = i;
            test.j = j;
            test.id = id;

            if (i == 0) {
                test.direction[0] = true;
            }
            if (i + 1 == rows) {
                test.box.classList.remove("bottomLine");
                test.direction[3] = true;
            }
            if (j == 0) {
                test.direction[2] = true;
            }
            if (j + 1 == colmuns) {
                test.box.classList.remove("rightLine");
                test.direction[1] = true;
            }
            id++;
            tempArr.push(test);
        }
        boxes.push(tempArr);
        tempArr = [];
    }
}

function addBoxesToMainDiv() {
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            boxes[i][j].box.addEventListener("onkeydown", keyTest);
            mainDiv.appendChild(boxes[i][j].box);
        }
        mainDiv.appendChild(document.createElement("br"));
    }
}


//------------------------------פונקציות עזר--------------------------------------
function boxDirection(box) {
    let temp = [];
    for (let i = 0; i < box.direction.length; i++) {
        if (box.direction[i] == false) {
            temp.push(i);
        }
    }
    if (temp.length > 0) {
        return temp;
    }
    return false;
}

function hasNeighbor(box) {
    for (let i = 0; i < box.direction.length; i++) {
        if (box.direction[i] == false) {
            return true;
        }
    }
    return false;
}

function outOfBounds(i, j) {
    if ((i < 0 || j < 0) || (i + 1 > rows || j + 1 > colmuns)) {
        return true;
    }
    return false;
}

//---------------------------------------------------------------------------------
let startPoint = false;
function rec(arr, i, j) {
    if (maxCells <= rows * colmuns) {
        if ((i < 0 || j < 0) || (i + 1 > rows || j + 1 > colmuns)) {
            return;
        }
        if (arr[i][j].visited) {
            return;
        }
        arr[i][j].box.classList.add("mouseOver");
        arr[i][j].visited = true;
        maxCells++;

        while (hasNeighbor(arr[i][j])) {
            let x = boxDirection(arr[i][j]);
            let rnd = x[Math.floor(Math.random() * x.length)];
            if (x !== false) {
                if (rnd == 0) {
                    arr[i][j].direction[rnd] = true;
                    arr[i - 1][j].direction[3] = true;
                    if (!arr[i - 1][j].visited) {
                        arr[i - 1][j].box.classList.remove("bottomLine");
                    }
                    rec(arr, i - 1, j);

                } else if (rnd == 1) {
                    arr[i][j].direction[rnd] = true;
                    if (!arr[i][j + 1].visited) {
                        arr[i][j].box.classList.remove("rightLine");
                    }
                    arr[i][j + 1].direction[2] = true;
                    rec(arr, i, j + 1);

                } else if (rnd == 2) {
                    arr[i][j].direction[rnd] = true;
                    arr[i][j - 1].direction[1] = true;
                    if (!arr[i][j - 1].visited) {
                        arr[i][j - 1].box.classList.remove("rightLine");
                    }
                    rec(arr, i, j - 1);

                } else if (rnd == 3) {
                    arr[i][j].direction[rnd] = true;
                    if (!arr[i + 1][j].visited) {
                        arr[i][j].box.classList.remove("bottomLine");
                    }
                    arr[i + 1][j].direction[0] = true;
                    rec(arr, i + 1, j);
                }
            }
        }
        arr[i][j].box.classList.add("final");
        if(!startPoint){
            arr[0][0].box.classList.add("startPoint");
            arr[rows-1][colmuns-1].box.classList.add("endPoint");
            startPoint = true;
        }
    }
    
}

function start() {
    populateArray();
    addBoxesToMainDiv();
}

function Maze() {
    rec(boxes, 0, 0);
}

function keyTest(e) {
    if (e.code == "ArrowRight") {
        boxes[iUser][jUser].box.removeChild(boxes[iUser][jUser].box.childNodes[0]);
        if(jUser+1<colmuns){
            if (!boxes[iUser][jUser].box.classList.contains("rightLine")) {
                jUser++;
            }
        }
        User(boxes[iUser][jUser].box);
    }
    if (e.code == "ArrowUp") {
        boxes[iUser][jUser].box.removeChild(boxes[iUser][jUser].box.childNodes[0]);
        if (iUser > 0) {
            if (!boxes[iUser - 1][jUser].box.classList.contains("bottomLine")) {
                iUser--;
            }
        }
        User(boxes[iUser][jUser].box);
    }

    if (e.code == "ArrowDown") {
        boxes[iUser][jUser].box.removeChild(boxes[iUser][jUser].box.childNodes[0]);
        if(iUser+1 < rows){
            if (!boxes[iUser][jUser].box.classList.contains("bottomLine")) {
                iUser++;
            }
        }
        User(boxes[iUser][jUser].box);
    }

    if (e.code == "ArrowLeft") {
        boxes[iUser][jUser].box.removeChild(boxes[iUser][jUser].box.childNodes[0]);
        if (jUser > 0) {
            if (!boxes[iUser][jUser - 1].box.classList.contains("rightLine")) {
                jUser--;
            }
        }
        User(boxes[iUser][jUser].box);
    }

}
start();
Maze();
User(boxes[0][0].box);