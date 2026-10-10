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

//Check xem o vi tri do co trong khong
function isEmpty(x, y) {
    if (x < 0 || x >= rowTable || y < 0 || y >= colTable) return true;
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
function checkDuongDi(x1, y1, x2, y2) {
    //Duyet theo duong ngang-doc-ngang
    //Duyet cot y qua toan bo bang va 2 ben ngoai bang
    for (var y = -1; y <= colTable; y++) {
        var duongNgang1 = checkDuongNgang(x1, y1, y);
        var duongDoc = checkDuongDoc(y, x1, x2);
        var duongNgang2 = checkDuongNgang(x2, y2, y);
        //Check diem giao nhau giua duongNgang1 va duongDoc
        //y = y1: trung cot o 1
        //x1 = x2, y = y2: trung o 2
        //isEmpty(x1, y): day la o trong
        var giaoNhau1 = (y === y1) || (x1 === x2 && y === y2) || isEmpty(x1, y);
        //Check diem giao nhau giua duongDoc va duongNgang2
        //y = y2: trung cot o 2
        //x2 = x1, y = y1: trung o 1
        //isEmpty(x2, y): day la o trong
        var giaoNhau2 = (y === y2) || (x2 === x1 && y === y1) || isEmpty(x2, y);
        //y = y1 va y = y2: an theo duong doc
        //y = y1 va x2 = x1, y = y1: an theo duong ngang
        //y = y2 va x1 = x2, y = y2: an theo duong ngang
        //isEmpty(x1, y) va y = y2: an theo chu L
        //isEmpty(x2, y) va y = y1: an theo chu L
        //isEmpty(x1, y) va isEmpty(x2, y): an theo chu U, Z
        if (duongNgang1 && giaoNhau1 && duongDoc && giaoNhau2 && duongNgang2){
            //o thu 1 - gd1 - gd2 - o thu 2
            return [{x: x1, y: y1}, {x: x1, y: y}, {x: x2, y: y}, {x: x2, y: y2}];
        }
    }

    //Duyet theo duong doc-ngang-doc
    //Duyet cot x qua toan bo bang va 2 ben ngoai bang
    for (var x = -1; x <= rowTable; x++) {
        var duongDoc1 = checkDuongDoc(y1, x1, x);
        var duongNgang = checkDuongNgang(x, y1, y2);
        var duongDoc2 = checkDuongDoc(y2, x2, x);
        //Check diem giao nhau giua duongDoc1 va duongNgang
        //x = x1: trung hang o 1
        //y1 = y2, x = x2: trung o 2
        //isEmpty(x, y1): day la o trong
        var giaoNhau1 = (x === x1) || (y1 === y2 && x === x2) || isEmpty(x, y1);
        //Check diem giao nhau giua duongNgang va duongDoc2
        //x = x2: trung hang o 2
        //y2 = y1, x = x1: trung o 1
        //isEmpty(x, y2): day la o trong
        var giaoNhau2 = (x === x2) || (y2 === y1 && x === x1) || isEmpty(x, y2);
        //x = x1 va x = x2: an theo duong ngang
        //x = x1 va y2 = y1, x = x1: an theo duong doc
        //x = x2 va y1 = y2, x = x2: an theo duong doc
        //isEmpty(x, y1) va x = x2: an theo chu L
        //isEmpty(x, y2) va x = x1: an theo chu L
        //isEmpty(x, y1) va isEmpty(x, y2): an theo chu U, Z
        if (duongDoc1 && giaoNhau1 && duongNgang && giaoNhau2 && duongDoc2){
            //o thu 1 - gd1 - gd2 - o thu 2
            return [{x: x1, y: y1}, {x: x, y: y1}, {x: x, y: y2}, {x: x2, y: y2}];
        }
    }
    return null;
}

function xuLyChonO(oDuocChon) {
    var x = parseInt(oDuocChon.dataset.x);
    var y = parseInt(oDuocChon.dataset.y);
    if (arrGame[x][y] === 0) return;
    if (oChonLan1 == null) {
        oChonLan1 = {x: x, y: y};
        oDuocChon.classList.add('tile-active');//them class doi mau vien o
    } else {
        var x1 = oChonLan1.x;
        var y1 = oChonLan1.y;
        if (arrGame[x][y] === arrGame[x1][y1] && (x !== x1 || y !== y1)) {
            var path = checkDuongDi(x1, y1, x, y);
            if (path != null) {
                arrGame[x][y] = 0;
                arrGame[x1][y1] = 0;
                veDuongAn(path);//ve duong noi cac toa do lai
                oChonLan1 = null;//reset luot chon de chon cap tiep theo
                document.getElementById('board').style.pointerEvents = 'none';
                setTimeout(function () {
                    createTableGame();//ve lai bang
                    document.getElementById('board').style.pointerEvents = 'auto';
                }, 400);
                return;
            }
        }
        //chon sai
        oChonLan1 = null;//reset luot chon
        createTableGame();//tao lai bang de bo hieu ung vien sang
    }
}

function veDuongAn(path) {
    var board = document.getElementById("board");
    board.style.position = "relative"; //co dinh bang

    //Can 1 bang svg phu len bang de ve duong an
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "line-svg");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none"; //cho phep click chuot vao bang
    svg.style.overflow = "visible"; //ve ra ngoai bang
    svg.style.zIndex = "100";
    //Tao duong ve
    var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("fill", "none"); //khong to nen
    polyline.setAttribute("stroke", "red"); //duong do
    polyline.setAttribute("stroke-width", "5px");
    //chuyen toa do o tren bang sang pixel
    var point = "";
    for (var i = 0; i < path.length; i++) {
        var p = path[i];//Lay ra toa do cua path(o1-gd1-gd2-o2)
        //x = padding(5) + cot y * 52(size o(50)+gap(2)) + dg thg lo vao nua o(25)
        //y = padding(5) + hang x * 52(size o(50)+gap(2)) + dg thg lo vao nua o(25)
        var pixelX = 5 + (p.y * 52) + 25;
        var pixelY = 5 + (p.x * 52) + 25;
        point += pixelX + "," + pixelY + " "; //toa do path dang: "x1,y1 x2,y2 ..."
    }
    polyline.setAttribute("points", point.trim());
    svg.appendChild(polyline);
    board.appendChild(svg);
}