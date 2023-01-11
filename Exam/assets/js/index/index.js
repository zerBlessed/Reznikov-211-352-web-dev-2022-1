window.onload = function () {
    downloadData();
    document.querySelector(".main-objects-list").onclick = clickMainObject;
    document.querySelector(".pagination").onclick = pageBtnHandler;
    document.querySelector(".search-btn").onclick = searchBtnHandler;
    document.querySelector(".search-field").oninput = searchFieldInput;
    document.querySelector(".btn-main-object").onclick = btnMainOnjectClick;
    document.querySelector("#selectLength").oninput = changeTotalPrice;
    document.querySelector("#time").oninput = changeTotalPrice;
    document.querySelector("#date").oninput = changeTotalPrice;
    document.querySelector("#option1").oninput = changeTotalPrice;
    document.querySelector("#option2").oninput = changeTotalPrice;
};