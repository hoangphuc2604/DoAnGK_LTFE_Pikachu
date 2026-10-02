var tablePopup = document.getElementById('table-level');
function openLevelTable(){
    tablePopup.style.display = "flex";
}
function closeLevelTable(){
    tablePopup.style.display = "none";
}
function playgame(level){
    alert("Bạn đã chọn Level " + level + ". Sẵn sàng chơi thôi nào!");
    closeLevelTable();
}