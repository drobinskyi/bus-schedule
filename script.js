// Посилання на дані
const busesFromLvivList = './data/buses-from-lviv.json';
const busesToLvivList = './data/buses-to-lviv.json';

// Асинхронна функція
async function loadBuses(list) {
    try {
        const response = await fetch(list);
        const responseResult = await response.json();
        let buses = responseResult.buses;
        displayBuses(buses);
    } catch (error) {
        console.log(error);
    }
}

// Посилання на DOM-елементи
const tableBody = document.querySelector('.table-body');
const directionFromLvivBtn = document.querySelector('.direction-from-lviv');
const directionToLvivBtn = document.querySelector('.direction-to-lviv');
const directionAnimation = document.querySelector('.direction-selected');

// Зміна напрямку маршрутів
directionFromLvivBtn.addEventListener('click', () => {
    loadBuses(busesFromLvivList);
    directionFromLvivBtn.classList.add('direction-text-selected');
    directionToLvivBtn.classList.remove('direction-text-selected');
    directionAnimation.setAttribute("style", "transform: translateX(0px)");
});

directionToLvivBtn.addEventListener('click', () => {
    loadBuses(busesToLvivList);
    directionToLvivBtn.classList.add('direction-text-selected');
    directionFromLvivBtn.classList.remove('direction-text-selected');
    directionAnimation.setAttribute("style", "transform: translateX(100%)");
});

// Відображення списку маршрутів
function displayBuses(buses) {
    tableBody.innerHTML = "";

    buses.forEach(el => {  
        const oneBus = document.createElement('tr');
        oneBus.classList.add('table-row');

        function showDeparture() {
            const departureInfo = `
                <td class="table-departure">
                    ${el.departure_city ? el.departure_city : ""}<br>
                    <span class="table-departure-time">${el.departure_time ? el.departure_time : ""}</span>
                </td>
            `
            return departureInfo;
        }

        function showNote() {
            const noteInfo = `
                <td class="table-note">${el.note ? el.note : addNote(el.number)}</td>
            `
            return noteInfo;
        }

        oneBus.innerHTML = `
            <td class="table-number" style="color:${changeColor(el.number)};">${el.number}</td>
            <td class="table-time" title="${el.note ? el.note : addNote(el.number)}">${el.time}</td>
            ${el.departure_city ? showDeparture() : showNote()}
        `
        tableBody.appendChild(oneBus);
    });   
};

// Зміна кольорів маршрутів
function changeColor(busNumber) {
    switch (busNumber) {
        case "109":
            return "#b3001b";
            break;
        case "113":
            return "#febe10";
            break;
        case "113 A":
            return "#a770a0";
            break;
        case "118":
            return "#767b63";
            break;
        case "132":
            return "#ff7f00";
            break;
        case "202":
            return "#007d6a";
            break;
        case "603":
            return "#2e8b57";
            break;
        case "604 A":
            return "#5c8cbf";
            break;
        case "604 Б":
            return "#627478";
            break;
        case "614":
            return "#2b57ac";
            break;
        default:
            return "#33302a";
            break;
        }
}

// Стандартні примітки
function addNote(busNumber) {
    switch (busNumber) {
        case "109":
            return "Крім суботи і неділі";
            break;
        case "113":
            return "Крім неділі";
            break;
        default:
            return "";
            break;
        }
}

loadBuses(busesFromLvivList);