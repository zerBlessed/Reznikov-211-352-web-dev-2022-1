//Открытие модального окна просмотра заявки
function clickOnEye(event) {
    if (!event.target.classList.contains("bi-eye-fill")) return;
    let modal = document.querySelector("#showTask");
    modal.querySelector("#exampleModalLabel").textContent = "Заявка номер " + event.target.parentNode.parentNode.id;

    let guideId = event.target.parentNode.parentNode.getAttribute("data-guide-id");
    let guideFio = modal.querySelector("#name");
    nameOfGuide(guideId).then((response) => guideFio.value = response);

    let routeName = modal.querySelector("#route");
    routeName.value = event.target.parentNode.parentNode.children[1].textContent;

    let date = modal.querySelector("#date");
    date.setAttribute("readonly", "");
    let strDate = event.target.parentNode.parentNode.children[2].textContent.split(".");
    let trueDate = new Date(strDate[2] + "-" + strDate[1] + "-" + strDate[0]);
    date.value = trueDate.toJSON().slice(0, 10);

    let time = modal.querySelector("#time");
    time.setAttribute("readonly", "");
    let timeRoute = event.target.parentNode.parentNode.getAttribute("data-time");
    time.value = timeRoute;

    let duration = modal.querySelector("#selectLength");
    duration.setAttribute("disabled", "");
    let durationRoute = event.target.parentNode.parentNode.getAttribute("data-duration");
    duration.value = durationRoute;

    let personsRange = modal.querySelector("#customRange2");
    personsRange.setAttribute("readonly", "");
    personsRange.setAttribute("disabled", "");

    let personsText = modal.querySelector("#number-people");
    personsText.setAttribute("readonly", "");
    personsText.setAttribute("disabled", "");
    let persons = event.target.parentNode.parentNode.getAttribute("data-persons");
    personsRange.value = persons;
    personsText.value = persons;

    let options = modal.querySelector(".options");
    options.innerHTML = "";
    options.textContent = "Дополнительные опции: ";
    let switches = modal.querySelectorAll(".form-switch");
    for (let swit of switches) {
        swit.innerHTML = "";
    }
    let option1 = document.createElement("input");
    option1.setAttribute("type", "text");
    option1.classList.add("form-control-plaintext");
    option1.setAttribute("readonly", "");
    option1.value = "Скидка для школьников и студентов (15% скидка)";
    let routeOptionF = event.target.parentNode.parentNode.getAttribute("data-option1");
    if (routeOptionF == "true") options.append(option1);

    let option2 = document.createElement("textarea");
    option2.setAttribute("type", "text");
    option2.classList.add("form-control-plaintext");
    option2.setAttribute("readonly", "");
    option2.value = "Тематические сувениры для посетителей (+500 рублей за каждого посетителя)";
    let routeOptionS = event.target.parentNode.parentNode.getAttribute("data-option2");
    if (routeOptionS == "true") options.append(option2);

    let price = modal.querySelector("#price");
    let priceRoute = event.target.parentNode.parentNode.children[3].textContent;
    price.value = priceRoute;
    modal.querySelector(".back-btn").classList.add("d-none");
    let createBtn = modal.querySelector(".create-btn");
    createBtn.setAttribute("data-bs-dismiss", "modal");
    createBtn.classList.remove("create-change-task");
    createBtn.textContent = "Готово";
}

//Открытие модального окна удаления заявки  
function clickOnTrash(event) {
    if (!event.target.classList.contains("bi-trash-fill")) return;
    let idTask = event.target.parentNode.parentNode.id;
    document.querySelector(".delete").setAttribute("data-task-id", idTask);
}

//Открытие модального окна редактирования заявки
function clickOnPen(event) {
    if (!event.target.classList.contains("bi-pencil-square")) return;
    let modal = document.querySelector("#showTask");
    modal.querySelector("#exampleModalLabel").textContent = "Редактирование заявки";
    let guideId = event.target.parentNode.parentNode.getAttribute("data-guide-id");
    let taskId = event.target.parentNode.parentNode.id;
    modal.querySelector(".create-btn").setAttribute("data-task-id", taskId);
    let guideFio = modal.querySelector("#name");
    let priceHour = document.querySelector(".table-routes");
    nameOfGuide(guideId).then((response) => guideFio.value = response);

    let routeName = modal.querySelector("#route");
    routeName.value = event.target.parentNode.parentNode.children[1].textContent;

    let date = modal.querySelector("#date");
    date.removeAttribute("readonly");
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    date.setAttribute("min", newDate.toJSON().slice(0, 10));
    let strDate = event.target.parentNode.parentNode.children[2].textContent.split(".");
    let trueDate = new Date(strDate[2] + "-" + strDate[1] + "-" + strDate[0]);
    date.value = trueDate.toJSON().slice(0, 10);

    let time = modal.querySelector("#time");
    time.removeAttribute("readonly");
    let timeRoute = event.target.parentNode.parentNode.getAttribute("data-time");
    time.value = timeRoute;

    let duration = modal.querySelector("#selectLength");
    duration.removeAttribute("disabled");
    let durationRoute = event.target.parentNode.parentNode.getAttribute("data-duration");
    duration.value = durationRoute;

    let personsRange = modal.querySelector("#customRange2");
    personsRange.removeAttribute("readonly");
    personsRange.removeAttribute("disabled");
    personsRange.oninput = changeTotalPriceForPersons;
    let personsText = modal.querySelector("#number-people");
    let persons = event.target.parentNode.parentNode.getAttribute("data-persons");
    personsRange.value = persons;
    personsText.value = persons;

    modal.querySelector(".options").innerHTML = "";
    
    let option1 = modal.querySelector(".form-switch-option1");
    option1.innerHTML = "";
    let switchInput1 = document.createElement("input");
    switchInput1.classList.add("form-check-input");
    switchInput1.setAttribute("type", "checkbox");
    switchInput1.setAttribute("role", "switch");
    switchInput1.setAttribute("id", "option1");
    switchInput1.oninput = changeTotalPrice;
    let switchLabel1 = document.createElement("label");
    switchLabel1.classList.add("form-check-label");
    switchLabel1.setAttribute("for", "option1");
    switchLabel1.textContent = "Использовать скидку для школьников и студентов";
    let routeOptionF = event.target.parentNode.parentNode.getAttribute("data-option1");
    if (routeOptionF == "true") {
        switchInput1.checked = true;
        switchInput1.setAttribute("readonly", "");
        switchInput1.setAttribute("disabled", "");
    } else {
        switchInput1.checked = false;
        switchInput1.removeAttribute("readonly");
        switchInput1.removeAttribute("disabled");
    } 
    option1.append(switchInput1);
    option1.append(switchLabel1);

    let option2 = modal.querySelector(".form-switch-option2");
    option2.innerHTML = "";
    let switchInput2 = document.createElement("input");
    switchInput2.classList.add("form-check-input");
    switchInput2.setAttribute("type", "checkbox");
    switchInput2.setAttribute("role", "switch");
    switchInput2.setAttribute("id", "option2");
    switchInput2.oninput = changeTotalPrice;
    let switchLabel2 = document.createElement("label");
    switchLabel2.classList.add("form-check-label");
    switchLabel2.setAttribute("for", "option2");
    switchLabel2.textContent = "Тематические сувениры для посетителей";
    let routeOptionS = event.target.parentNode.parentNode.getAttribute("data-option2");
    if (routeOptionS == "true") {
        switchInput2.checked = true;
        switchInput2.setAttribute("readonly", "");
        switchInput2.setAttribute("disabled", "");
    } else {
        switchInput2.checked = false;
        switchInput2.removeAttribute("readonly");
        switchInput2.removeAttribute("disabled");
    } 
    option2.append(switchInput2);
    option2.append(switchLabel2);

    let price = document.querySelector("#price");
    let priceRoute = event.target.parentNode.parentNode.children[3].textContent;
    price.value = priceRoute;

    modal.querySelector(".back-btn").classList.remove("d-none");
    let createBtn = modal.querySelector(".create-btn");
    createBtn.removeAttribute("data-bs-dismiss");
    createBtn.textContent = "Сохранить";
    createBtn.classList.add("create-change-task");
}

//Удаление заявки
async function deleteTask(event) {
    if (!event.target.classList.contains("delete")) return;
    let idTask = event.target.getAttribute("data-task-id");

    let nUrl = new URL(url + "orders/" + idTask);
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl, {
            method: "DELETE",
        });
        let data = await response.json();
        document.querySelector(".page-link").classList.add("active");
        if (data.error) showAlert(data.error, "alert-danger");
        else showAlert("Заявка успешно удалена", "alert-success");
        downloadData();
    } catch (error) {
        console.log(error.message);
    }
}

//Сохранение отредактированной заявки
async function saveNewTask(event) {
    if (!event.target.classList.contains("create-change-task")) return;
    let formForSend = new FormData();
    let form = document.querySelector("#create-task-form");
    
    formForSend.append("date", form.elements["date"].value);
    formForSend.append("time", form.elements["time"].value);
    formForSend.append("duration", form.elements["selectLength"].value);
    formForSend.append("persons", form.elements["customRange2"].value);
    formForSend.append("price", form.elements["price"].value);
    formForSend.append("optionFirst", (form.elements["option1"].checked) ? 1 : 0);
    formForSend.append("optionSecond", (form.elements["option2"].checked) ? 1 : 0);

    let taskId = event.target.getAttribute("data-task-id");
    let nUrl = new URL(url + "orders/" + taskId);
    nUrl.searchParams.append("api_key", apiKey);

    if (form.elements["time"].validity.valid) { //Проверка валидности времени
        try {
            event.target.setAttribute("type", "button");
            let modal = document.querySelector("#showTask");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            
            let response = await fetch(nUrl, {
                method: "PUT",
                body: formForSend,
            });
            let data = await response.json();
            if (data.error) showAlert(data.error, "alert-danger");
            else showAlert("Заявка успешно изменена", "alert-success");
            downloadData();
            console.log(data);
        } catch (error) {
            showAlert(error.message, "alert-danger");
        }
    } else {
        event.target.setAttribute("type", "submit");
    }
}