//Стоимость гида за час
function guideServiceCost() {
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;

    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    
    return price;
}