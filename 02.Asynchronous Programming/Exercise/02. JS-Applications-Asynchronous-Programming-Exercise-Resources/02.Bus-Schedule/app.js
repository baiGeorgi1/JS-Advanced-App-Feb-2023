function solve() {
    const label = document.querySelector('#info span');
    const departBtn = document.querySelector('#depart');
    const ariveBtn = document.querySelector('#arrive');
    departBtn.addEventListener('click', depart);
    ariveBtn.addEventListener('click', arrive);


    let stopId = { next: 'depot' };

    async function depart() {
        if (!status.ok) {
            label.textContent = 'Error';
            departBtn.disabled = true;
            ariveBtn.disabled = true;

        }

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;
        const response = await fetch(url);
        stopId = await response.json();
        label.textContent = `Next stop ${stopId.name}`;
        departBtn.disabled = true;
        ariveBtn.disabled = false;
        console.log(stopId);

    }

    function arrive() {
        label.textContent = `Arriving at ${stopId.name}`;
        departBtn.disabled = false;
        ariveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();