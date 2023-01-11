const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/";
const apiKey = "03e55284-570f-4c2b-8f70-61de93f32b2e";

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