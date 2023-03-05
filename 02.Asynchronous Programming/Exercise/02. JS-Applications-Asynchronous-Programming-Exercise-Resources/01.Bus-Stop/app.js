async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopName = document.querySelector('#stopName');
    const busses = document.querySelector('#buses');

    try {
        const response = await fetch(url);
        if (response.status !== 200 || stopId == '') {
            let error = new Error();
            error.status = response.status;
            error.statusText = response.statusText;
            busses.replaceChildren();
            throw error;
        }
        const data = await response.json();
        busses.replaceChildren();
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach((b) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            busses.appendChild(li);
        });
    } catch (error) {
        stopName.textContent = 'Error';

    }
}