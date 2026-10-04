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
            var imgPikachu = Math.floor(Math.random() * 5) + 1;
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