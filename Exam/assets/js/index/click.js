//Нажатие на достопримечательность
function clickMainObject(event) {
    let mainObject = document.querySelector(".btn-main-object");
    mainObject.textContent = event.target.textContent;
    searchBtnHandler();
}

//Переход на другую страницу
function pageBtnHandler(event) {
    if (!event.target.classList.contains("page-link")) return;
    let searchField = document.querySelector(".search-field").value;
    let oldBtn = document.querySelector(".active");
    oldBtn.classList.remove("active");
    console.log(oldBtn.textContent);
    event.target.classList.add("active");
    searchBtnHandler();
}

//При изменении поля 1-я страница становится активной
function btnMainOnjectClick() {
    let oldBtn = document.querySelector(".active");
    oldBtn.classList.remove("active");
    document.querySelector(".pagination").firstChild.firstChild.classList.add("active");
}