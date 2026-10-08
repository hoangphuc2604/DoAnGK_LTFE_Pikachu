var tablePopup = document.getElementById('table-level');
var mainGame = document.getElementById('main-game');
var gameScreen = document.getElementById('game-screen');
function openLevelTable(){
    tablePopup.style.display = "flex";
}
function closeLevelTable(){
    tablePopup.style.display = "none";
}
function playgame(level){
    closeLevelTable();
    mainGame.style.display = "none";
    gameScreen.style.display = "block";
    document.getElementById("num-level").innerHTML = level;
    createArr();
    createTableGame();
}

function backMenu(){
    gameScreen.style.display = "none";
    mainGame.style.display = "block";
}

var rowTable = 9;
var colTable = 16;
var arrGame = [];
var oChonLan1 = null;

function createArr() {
    arrGame = [];
    for (var i = 0; i < rowTable; i++) {
        var row = [];
        for (var j = 0; j < colTable; j++) {
            var imgPikachu = Math.floor(Math.random() * 16) + 1;
            row.push(imgPikachu);
        }
        arrGame.push(row);
    }
}

function createTableGame() {
    var board = document.getElementById("board");
    board.innerHTML = "";
    for (var i = 0; i < rowTable; i++) {
        for (var j = 0; j < colTable; j++) {
            var o = document.createElement("div");
            var value = arrGame[i][j];
            o.dataset.x = i;
            o.dataset.y = j;
            if (value === 0){
                o.className = "tile tile-empty";
            } else {
                o.className = "tile";
                o.innerHTML = value;
                o.onclick = function() {
                    xuLyChonO(this)
                };
            }
            board.appendChild(o);
        }
    }
}

//Check xem duong an co bi con nao chan khong
function isEmpty(x, y) {
    if (x < 0 || x >= rowTable || y> 0 || y >= rowTable) return true;
    if (arrGame[x][y] === 0) return true;
}

//Check duong ngang xem duong an co trong khong
function checkDuongNgang(x, y1, y2) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    for (var y = min + 1; y < max; y++) {
        if (!isEmpty(x, y)) return false;
    }
    return true;
}

//Check duong doc xem duong an co trong khong
function checkDuongDoc(y, x1, x2) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min + 1; x < max; x++) {
        if (!isEmpty(x, y)) return false;
    }
    return true;
}

//Tim duong di, o 1 co toa do x1,y1, o 2 co toa do x2, y2
function checkDuongDi(x1, x2, y1, y2) {
    //Duyet theo duong ngang-doc-ngang
    //Duyet cot y qua toan bo bang va 2 ben ngoai bang
    for (var y = -1; y <= colTable; y++) {
        var duongNgang1 = checkDuongNgang(x1, y1, y);
        var duongDoc = checkDuongDoc(y, x1, x2);
        var duongNgang2 = checkDuongNgang(x2, y2, y);
        //Check diem giao nhau giua duongNgang1 va duongDoc
        //y = y1: trung cot o 1
        //x1 = x2, y = y2:
        var giaoNhau1 = (y === y1) || (x1 === x2 && y === y2) || isEmpty(x1, y);
    }
}

function xuLyChonO(oDuocChon) {
    var x = parseInt(oDuocChon.dataset.x);
    var y = parseInt(oDuocChon.dataset.y);
    if (arrGame[x][y] === 0) return;
    if (oChonLan1 == null) {
        oChonLan1 = {x: x, y: y};
        oDuocChon.classList.add('tile-active');
    } else {
        var x1 = oChonLan1.x;
        var y1 = oChonLan1.y;
        if (arrGame[x][y] === arrGame[x1][y1] && (x !== x1 || y !== y1)) {
            arrGame[x][y] = 0;
            arrGame[x1][y1] = 0;
        }
        oChonLan1 = null;
        createTableGame();
    }
}