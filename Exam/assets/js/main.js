const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/";
const apiKey = "03e55284-570f-4c2b-8f70-61de93f32b2e";

//Выходные дни
const holidays = [
    "01-01",
    "02-23",
    "03-08",
    "05-09",
    "09-01",
    "06-12",
    "05-01",
];

//Уведомления
function showAlert(error, color) {
    let alerts = document.querySelector(".alerts");
    let alert = document.createElement("div");

    alert.classList.add("alert", "alert-dismissible", color);
    alert.setAttribute("role", "alert");
    alert.append(error);

    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn-close");

    alert.classList.add("position-sticky");
    alert.classList.add("end-50");
    alert.classList.add("my-0");

    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");

    alert.append(btn);
    alerts.append(alert);

    setTimeout(() => alert.remove(), 4000);
}

//Скидка за выходной или праздничный день
function isThisDayOff() {
    let form = document.querySelector("#create-task-form");
    let isHoliday = new Date(form.elements["date"].value);
    let YearMonthDay = isHoliday.toJSON().slice(0, 10).split("-");
    let MonthDay = YearMonthDay[1] + "-" + YearMonthDay[2];
    let plus = 1;

    if ((isHoliday.getDay() == 0) || (isHoliday.getDay() == 6) || (holidays.includes(MonthDay))) {
        plus = 1.5;
    }

    return plus;
}

//Количество человек
function numberOfVisitors() {
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    let plus = 0;

    if (number <= 5) plus = 0;
    else if ((number > 5) && (number <= 10)) plus = 1000;
    else if ((number > 10) && (number <= 20)) plus = 1500;
    return plus;
}

//Время дня
function isItMorningOrEvening() {
    let form = document.querySelector("#create-task-form");
    let time = parseInt(form.elements["time"].value.split(":")[0]);
    let plus = 0;

    if ((time >= 9) && (time < 12)) plus = 400;
    else if ((time >= 20) && (time <= 23)) plus = 1000;
    return plus;
}

//Количество часов
function hoursNumber() {
    let form = document.querySelector("#create-task-form");
    let hours = form.elements["selectLength"].value;

    return hours;
}

//Выбор первой опции
function checkOptionFirst() {
    let option = document.querySelector("#option1");
    let price = 1;

    if (option.checked) {
        price = 0.85;
    }

    return price;
}

//Выбор второй опции
function checkOptionSecond() {
    let option = document.querySelector("#option2");
    let price = 0;
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;

    if (option.checked) {
        price = 500 * number;
    }

    return price;
}

//Изменение цены (стоимость заявки)
function changeTotalPrice(event) {
    let form = document.querySelector("#create-task-form");
    let price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}