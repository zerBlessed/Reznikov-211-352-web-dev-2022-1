//Поиск гидов
async function searchingGuides(idRoute) {
    let nUrl = new URL(url + "routes/" + idRoute + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, "Язык экскурсии", 0, 50);
        createWorkExperience(data);
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

//Нажатие на "Select" в таблице маршрутов
function searchGuidesForRoute(event) {
    if (!event.target.classList.contains("btn-for-guides")) return;
    document.querySelector(".search-btn-guides").setAttribute("data-route-id", event.target.id);
    document.querySelector(".checkout-route").setAttribute("disabled", "");

    let nameOfRoute = document.querySelector(".guides").querySelector("p");
    nameOfRoute.textContent = "";
    nameOfRoute.scrollIntoView();

    let oldBtn = event.target.parentNode.parentNode.parentNode.querySelector(".btn-secondary");
    if (oldBtn) {
        oldBtn.classList.remove("btn-secondary");
        oldBtn.classList.add("btn-light");
    }
    
    event.target.classList.remove("btn-light");
    event.target.classList.add("btn-secondary");

    let str = "Доступные гиды по маршруту: ";
    let onClickRoute = event.target.parentNode.parentNode;
    nameOfRoute.textContent = str + onClickRoute.firstChild.getAttribute("data-bs-title");

    document.querySelector(".btn-language").textContent = "Язык экскурсии";
    searchingGuides(event.target.id);
}

//Поиск записей
async function searchBtnHandler() {
    let searchField = document.querySelector(".search-field").value;
    let nUrl = new URL(url + "routes");
    nUrl.searchParams.append("api_key", apiKey);
    let mainObj = document.querySelector(".btn-main-object");
    let newRoutes = [];

    try {
        if (searchField == "" && mainObj.textContent == "Основной объект") downloadData(); //Поиск без фильтров
        else {
            let response = await fetch(nUrl);
            let data = await response.json();
            let str = mainObj.textContent.slice(0, -4);

            for (let route of data) {
                if (mainObj.textContent == "Основной объект") {             //Поиск по вводимому полю
                    if (route.name.includes(searchField)) newRoutes.push(route);
                }
                else if (searchField == "" && mainObj.textContent != "Основной объект") { //Поиск по достопримечательности
                    if (route.mainObject.includes(str)) newRoutes.push(route);
                }
                else if (route.name.includes(searchField) && (route.mainObject.includes(str)) && mainObj.textContent != "Основной объект") {
                    newRoutes.push(route);   //Поиск по обоим полям
                }
            }
            createTableRouteElements(newRoutes);
        }
    } catch (error) {
        showAlert(error.message, "alert-danger");
    }
}

//При изменении поля 1-я страница становится активной
function searchFieldInput() {
    let oldBtn = document.querySelector(".active");
    oldBtn.classList.remove("active");
    document.querySelector(".page-item").classList.add("active");
}

//Поиск при смене языка
async function searchGuidesWithLanguageClick() {
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    let dataRouteId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let nUrl = new URL(url + "routes/" + dataRouteId + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}

//Поиск гидов с фильтрами
async function searchGuidesWithFilters(event) {
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    let nUrl = new URL(url + "routes/" + event.target.getAttribute("data-route-id") + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}