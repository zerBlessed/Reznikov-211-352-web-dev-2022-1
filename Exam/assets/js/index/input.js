//Изменение количества человек
function changeNumberOfPeople(event) {
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;
    let hours = form.elements["selectLength"].value;

    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }

    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}