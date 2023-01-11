//Создание заявки
function createRoute(data, number) {
    let table = document.querySelector(".table-routes");
    let row = document.createElement("tr");
    
    row.setAttribute("id", data.id);
    row.setAttribute("data-guide-id", data.guide_id);
    row.setAttribute("data-time", data.time);
    row.setAttribute("data-duration", data.duration);
    row.setAttribute("data-persons", data.persons);
    row.setAttribute("data-option1", data.optionFirst);
    row.setAttribute("data-option2", data.optionSecond);

    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = number;
    row.append(th);

    let name = document.createElement("td");
    nameOfRoute(data.route_id).then((response) => name.textContent = response);
    row.append(name);

    let dateRoute = document.createElement("td");
    dateee = new Date(data.date);
    DayMonthYear = dateee.toJSON().slice(0, 10).split("-");
    dateRoute.textContent = DayMonthYear[2] + "." + DayMonthYear[1] + "." + DayMonthYear[0];
    row.append(dateRoute);

    let priceRoute = document.createElement("td");
    priceRoute.textContent = data.price;
    row.append(priceRoute);

    let actions = document.createElement("td");
    actions.classList.add("d-flex");
    actions.classList.add("flex-wrap");
    let eye = document.createElement("i");
    eye.classList.add("bi");
    eye.classList.add("bi-eye-fill");
    eye.classList.add("mx-2");
    eye.setAttribute("data-bs-toggle", "modal");
    eye.setAttribute("data-bs-target", "#showTask");
    eye.onclick = clickOnEye;
    actions.append(eye);

    let pen = document.createElement("i");
    pen.classList.add("bi");
    pen.classList.add("bi-pencil-square");
    pen.classList.add("mx-2");
    pen.setAttribute("data-bs-toggle", "modal");
    pen.setAttribute("data-bs-target", "#showTask");
    pen.onclick = clickOnPen;
    actions.append(pen);

    let trash = document.createElement("i");
    trash.classList.add("bi");
    trash.classList.add("bi-trash-fill");
    trash.classList.add("ms-2");
    trash.setAttribute("data-bs-toggle", "modal");
    trash.setAttribute("data-bs-target", "#deleteTask");
    trash.onclick = clickOnTrash;
    actions.append(trash);
    row.append(actions);

    table.append(row);
}