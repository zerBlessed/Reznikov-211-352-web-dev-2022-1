//Стоимость гида в час
function guideServiceCost() {
    let price = document.querySelector(".table-routes").getAttribute("data-pricePerHour");
    return price;
}

//Измение поля количества человек
function changeTotalPriceForPersons(event) {
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}
