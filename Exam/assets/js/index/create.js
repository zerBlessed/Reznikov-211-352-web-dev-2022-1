 //create tooltip for th
function createTooltipTh(data) {
    let desc = document.createElement("th");
    desc.setAttribute("data-bs-toggle", "tooltip");
    desc.setAttribute("data-bs-placement", "top");
    desc.setAttribute("data-bs-custom-class", "custom-tooltip");
    desc.setAttribute("data-bs-title", data);
    return desc;
}

//create tooltip for td
function createTooltip(data) {
    let desc = document.createElement("td");
    desc.setAttribute("data-bs-toggle", "tooltip");
    desc.setAttribute("data-bs-placement", "top");
    desc.setAttribute("data-bs-custom-class", "custom-tooltip");
    desc.setAttribute("data-bs-title", data);
    return desc;
}

//Создание списка языков
function createLanguageList(guides) {
    let newList = [];
    let list = document.querySelector(".language-list");
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.setAttribute("href", "#");
    a.classList.add("dropdown-item")
    a.textContent = "Язык экскурсии";
    li.append(a);
    list.append(li);

    for (let guide of guides) {
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.setAttribute("href", "#");
        a.classList.add("dropdown-item")
        a.textContent = guide.language;
        li.append(a);

        if (!newList.includes(guide.language)) {
            newList.push(guide.language);
            list.append(li);
        }
    }
}

//Создание таблицы гидов
function createGuidesTable(guides, lang, minInput, maxInput) {
    let guidesTable = document.querySelector(".table-guides");
    guidesTable.innerHTML = "";
    document.querySelector(".language-list").innerHTML = "";
    createLanguageList(guides);

    for (let guide of guides) {
        let row = document.createElement("tr");
        row.classList.add("fs-6");
        let th = document.createElement("th"); //create icon
        th.setAttribute("scope", "row");
        th.classList.add("fs-1");
        th.classList.add("text-center");
        let icon = document.createElement("span");

        let nameGuide = document.createElement("td"); //create name
        nameGuide.classList.add("nameOfGuide");
        nameGuide.textContent = guide.name;
        row.append(nameGuide);

        let languageGuide = document.createElement("td"); //create language
        languageGuide.textContent = guide.language;
        row.append(languageGuide);

        let workExp = document.createElement("td"); //create work experience
        workExp.textContent = guide.workExperience;
        row.append(workExp);

        let price = document.createElement("td"); //create price per hour
        price.classList.add("priceOfGuide");
        price.textContent = guide.pricePerHour;
        row.append(price);

        let btnTd = document.createElement("td"); //create button place
        let btn = document.createElement("button");

        btn.classList.add("btn");
        btn.classList.add("btn-light");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Select";
        btn.setAttribute("data-guide-id", guide.id);
        btnTd.append(btn);
        btnTd.onclick = onClickGuide;
        row.append(btnTd);

        //Сравнение с фильтрами
        if ((lang == guide.language) && (minInput <= guide.workExperience) && (guide.workExperience <= maxInput)) guidesTable.append(row);
        else if ((lang == "Язык экскурсии") && (minInput <= guide.workExperience) && (guide.workExperience <= maxInput)) {
            guidesTable.append(row);
        }
    }
    if (document.querySelector(".table-guides").children.length == 0) {
        document.querySelector(".checkout-route").setAttribute("disabled", "");
    }
}

//Создание опыта работы
function createWorkExperience(data) {
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");

    maxInput.value = "";
    minInput.value = "";

    let min = 1000;
    let max = 0;

    for (let guide of data) {
        if (guide.workExperience < min) {
            min = guide.workExperience;
        }
        if (guide.workExperience > max) {
            max = guide.workExperience;
        }
    }

    maxInput.value = max;
    minInput.value = min;
}

//Создание маршрута
function createRoute(data) {
    let table = document.querySelector(".table-routes");
    let row = document.createElement("tr");
    let th = createTooltipTh(data.name); //create name
    th.setAttribute("scope", row);
    let numOfChars = 0;
    let name = "";
    for (let char of data.name) {
        if (numOfChars == 30) {
            name += "...";
            break;
        }
        name += char;
        numOfChars++
    }

    th.textContent = name;
    row.append(th);


    numOfChars = 0;
    let descWords = "";
    for (let char of data.description) {
        if (numOfChars == 20) break;
        descWords += char;
        numOfChars++;
    }
    let desc = createTooltip(data.description);

    desc.textContent = descWords + "...";
    row.append(desc);

    numOfChars = 0;
    let mainObjects = "";
    for (let char of data.mainObject) {

        if (numOfChars == 20) break;
        mainObjects += char;
        numOfChars++;
    }
    let mainObj = createTooltip(data.mainObject);
    mainObj.textContent = mainObjects + "...";
    row.append(mainObj);

    let btnTd = document.createElement("td");              //create button place
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-light");
    btn.classList.add("btn-for-guides");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("id", data.id);
    
    btn.textContent = "Select";
    btnTd.append(btn);
    btnTd.onclick = searchGuidesForRoute;
    row.append(btnTd);

    table.append(row);
}