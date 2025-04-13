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
        loadSchedule(buses);
    } catch (error) {
        console.log(error);
    }
}

// Посилання на DOM-елементи
const tableBody = document.querySelector('.table-body');
const directionFromLvivBtn = document.querySelector('.direction-from-lviv');
const directionToLvivBtn = document.querySelector('.direction-to-lviv');
const directionAnimation = document.querySelector('.direction-selected');
const modalWindow = document.querySelector('.modal');


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

// Масив маршрутів
let arraySchedule = [];
function loadSchedule(data) {
    arraySchedule = data;
}

// Відображення списку маршрутів
function displayBuses(buses) {
    tableBody.innerHTML = "";

    buses.forEach(el => {  
        const oneBus = document.createElement('tr');
        oneBus.classList.add('table-row');

        function showDeparture() {
            const departureInfo = `
                <td class="table-departure">
                    ${el.alternative_departure_city ? el.alternative_departure_city : el.departure_city}<br>
                    <span class="table-departure-time">${el.departure_time ? el.departure_time : ""}</span>
                </td>
            `
            return departureInfo;
        }

        function showNote() {
            const noteInfo = `
                <td class="table-note">${el.note ? el.note : ""}</td>
            `
            return noteInfo;
        }

        oneBus.innerHTML = `
            <td class="table-number" style="color:${changeColor(el.number)};">${el.number}</td>
            <td class="table-time">${el.time}</td>
            
            ${el.departure_time ? showDeparture() : showNote()}
        `
//          ${el.note ? '<i class="fa-solid fa-circle-exclamation"></i>' : ''} треба якось це вписати

        tableBody.appendChild(oneBus);

        oneBus.addEventListener('click', () => {
            selectRoad(el.id)
        });
    });
};

// Вибір маршруту
function selectRoad(id) {
    let array = arraySchedule;
    let result;
    result = array.filter((val) => {
        return val.id == id;
    })[0];
    routeModal(result);
}

// Відображення модального вікна
function routeModal(data) {
    modalWindow.setAttribute("style", "display: flex");
    modalWindow.innerHTML = `
        <div class="modal-window">
            <div class="modal-header">
                <div class="modal-header-number"><span>${data.number}</span></div>
                <div class="modal-header-cities">
                    <p>${(data.departure_city ? data.departure_city : 'Львів').toUpperCase()}</p>
                    <p>${(data.arrive_city ? data.arrive_city : 'Львів').toUpperCase()}</p>
                </div>
            </div>
            <div class="modal-content">
                <div class="modal-note">
                    ${data.note ? data.note : ""}
                </div>
                <div class="modal-list">
                    <table class="modal-table">
                        <tbody class="modal-table-body">
                        </tbody>
                    </table>
                </div>
            </div>
            <button type="button" class="button modal-close">Закрити</button>
        </div>
    `
    // Список зупинок
    const modalTableBody = document.querySelector('.modal-table-body');
    data.list ? showBusStopsList(data.list) : "";
    function showBusStopsList(stopsList) {
        stopsList.forEach(el => {
            const busStop = document.createElement('tr');
            busStop.classList.add('modal-table-row');
            busStop.innerHTML = `
                <td class="modal-table-time">${el.time ? el.time : ""}</td>
                <td class="modal-table-marker"><div class="bus-stop-marker"></div></td>
                <td class="modal-table-stop">${el.bus_stop}</td>
            `
            modalTableBody.appendChild(busStop);
        })
    }

    // Колір таблички з номером
    const modalNumber = document.querySelector('.modal-header-number');
    modalNumber.setAttribute("style", `background-color: ${changeColor(data.number)}`);

    // Закриття модального вікна
    const closeModal = document.querySelector('.modal-close');
    closeModal.addEventListener('click', () => {
        modalWindow.setAttribute("style", "display: none");
    });
}

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

loadBuses(busesFromLvivList);