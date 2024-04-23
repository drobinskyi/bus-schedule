const busesFromLvivList = './data/buses-from-lviv.json';
const busesToLvivList = './data/buses-to-lviv.json';

async function loadBusesFromLviv() {
    try {
        const server = busesFromLvivList;
        const response = await fetch(server);
        const responseResult = await response.json();
        let buses = responseResult.buses;
        displayBusesFromLviv(buses);
    } catch (error) {
        console.log(error);
    }
}

const tableBody = document.querySelector('.table-body');

function displayBusesFromLviv(buses) {
    tableBody.innerHTML = "";

    buses.forEach(el => {
        
        const oneBus = document.createElement('tr');
        oneBus.classList.add('table-row');
        oneBus.innerHTML = `
            <td class="table-number" style="color:${changeColor(el.number)};">${el.number}</td>
            <td class="table-time">${el.time}</td>
            <td class="table-note">${!el.note ? addNote(el.number) : el.note}</td>
        `
        tableBody.appendChild(oneBus);
    });  
};

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

loadBusesFromLviv();