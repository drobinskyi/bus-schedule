async function loadBusesFromLviv() {
    try {
        const server = './data/buses-from-lviv.json';
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
            <td class="table-number">${el.number}</td>
            <td class="table-time">${el.time}</td>
        `
        tableBody.appendChild(oneBus);
        // let bus = document.querySelectorAll(".table-number");
        // directionColors(el.number, bus);
    });
    
};

// function directionColors(number, bus) {
//     for (let i = 0; i < bus.length; i++) {
//         switch (number) {
//         case "113":
//             i.style.color = "red"
//             break;
//         case "603":
//             i.style.color = "blue"
//             break;
//         default:
//             break;
//         }
//         console.log(bus);
        
//     }

//     console.log(number);
//     console.log(bus);
// };

loadBusesFromLviv();