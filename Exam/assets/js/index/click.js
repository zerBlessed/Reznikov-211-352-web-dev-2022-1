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

//Нажатие на "Select" в списке гидов
function onClickGuide(event) {
    if (!event.target.classList.contains("btn")) return;
    let oldBtn = document.querySelector(".btn-guide");
    if (oldBtn) {
        oldBtn.classList.remove("btn-guide");
        oldBtn.classList.remove("btn-secondary");
        oldBtn.classList.add("btn-light");
    }

    event.target.classList.add("btn-guide");
    event.target.classList.remove("btn-light");
    event.target.classList.add("btn-secondary");

    document.querySelector(".checkout-route").removeAttribute("disabled");
    document.querySelector(".checkout-route").scrollIntoView();
}

//При изменении поля 1-я страница становится активной
function btnMainOnjectClick() {
    let oldBtn = document.querySelector(".active");
    oldBtn.classList.remove("active");
    document.querySelector(".pagination").firstChild.firstChild.classList.add("active");
}

//Смена языка
function btnLanguageClick(event) {
    if (!event.target.classList.contains("dropdown-item")) return;
    document.querySelector(".btn-language").textContent = event.target.textContent;
    searchGuidesWithLanguageClick();
}

//Открытие модального окна с оформлением заявки
function checkoutRoute(event) {
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let date = new Date();
    
    date.setDate(date.getDate() + 1);
    form.querySelector("#date").value = date.toJSON().slice(0, 10);
    form.querySelector("#date").setAttribute("min", date.toJSON().slice(0, 10));

    let name = "";
    let price = 0;

    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }

    form.elements["name"].value = name;
    form.elements["route"].value = route[1];

    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

//Оформление заявки
async function sendRequest(event) {
    if (!event.target.classList.contains("create-btn")) return;
    let formForSend = new FormData();
    let guideId = document.querySelector(".btn-guide").getAttribute("data-guide-id");
    let routeId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let form = document.querySelector("#create-task-form");

    formForSend.append("guide_id", guideId);
    formForSend.append("route_id", routeId);
    formForSend.append("date", form.elements["date"].value);
    formForSend.append("time", form.elements["time"].value);
    formForSend.append("duration", form.elements["selectLength"].value);
    formForSend.append("persons", form.elements["customRange2"].value);
    formForSend.append("price", form.elements["price"].value);
    formForSend.append("optionFirst", (form.elements["option1"].checked) ? 1 : 0);
    formForSend.append("optionSecond", (form.elements["option2"].checked) ? 1 : 0);

    let nUrl = new URL(url + "orders");
    nUrl.searchParams.append("api_key", apiKey);

    if (form.elements["time"].validity.valid) { //Проверка валидности времени
        try {
            event.target.setAttribute("type", "button");
            let modal = document.querySelector("#addTask");
            var modalInstance = bootstrap.Modal.getInstance(modal);

            modalInstance.hide();
            let response = await fetch(nUrl, {
                method: "POST",
                body: formForSend,
            });
            
            let data = await response.json();
            if (data.error) showAlert(data.error, "alert-danger");
            else showAlert("Заявка успешно оформлена", "alert-success");
        } catch (error) {
            showAlert(error.message, "alert-danger");
        }
    } else {
        event.target.setAttribute("type", "submit");
    }
}