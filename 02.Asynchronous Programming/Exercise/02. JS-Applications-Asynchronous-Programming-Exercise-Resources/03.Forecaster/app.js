function attachEvents() {
    const town = document.querySelector('#location');
    const weatherBtn = document.querySelector('#submit');
    weatherBtn.addEventListener('click', getInfo);
    const deg = '\xB0';

    const weatherPic = {
        Sunny: '\u2600',
        "Partly sunny": '\u26C5',
        Overcast: '\u2601',
        Rain: '\u2614',
    };

    const current = document.querySelector('#current');
    console.log(current);
    async function getInfo() {
        document.querySelector('#forecast').style.display = 'block';
        const url = `http://localhost:3030/jsonstore/forecaster/locations/`;
        const res = await fetch(url);
        const data = await res.json();

        try {

            let cityId = data.find(el => el.name === town.value);
            if (!cityId) {
                throw new Error();
            }

            const currentInfo = `http://localhost:3030/jsonstore/forecaster/today/${cityId.code}`;
            const resCurrent = await fetch(currentInfo);
            const today = await resCurrent.json();
            let picture = weatherPic[today.forecast.condition];


            const div = document.createElement('div');
            div.className = 'forecast';
            const span1 = document.createElement('span');
            span1.className = 'condition symbol';
            span1.textContent = picture;

            const span2 = document.createElement('span');
            span2.className = 'condition';

            const span3 = document.createElement('span');
            span3.className = 'forecast-data';
            span3.textContent = `${today.name}`;

            const span4 = document.createElement('span');
            span4.className = 'forecast-data';
            span4.textContent = `${today.forecast.low}${deg}/${today.forecast.high}${deg}`;

            const span5 = document.createElement('span');
            span5.className = 'forecast-data';
            span5.textContent = `${today.forecast.condition}`;
            span2.appendChild(span3);
            span2.appendChild(span4);
            span2.appendChild(span5);

            div.appendChild(span1);
            div.appendChild(span2);

            current.appendChild(div);

            const upcomming = document.querySelector('#upcoming');
            const div1 = document.createElement('div');
            div1.className = 'forecast-info';
            const threeDayInfo = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityId.code}/forecast`;
            const resTomorrow = await fetch(threeDayInfo);
            const threeDays = await resTomorrow.json();

            upcomming.appendChild(div1);
            threeDays.forEach((e) => {
                const sp0 = document.createElement('span');
                sp0.className = 'upcomming';
                const sp1 = document.createElement('span');
                sp1.className = 'symbol';
                sp1.textContent = weatherPic[e.condition];
                const sp2 = document.createElement('span');
                sp2.className = 'forecast-data';
                sp2.textContent = `${e.low}${deg}/${e.high}${deg}`;
                const sp3 = document.createElement('span');
                sp3.className = 'forecast-data';
                sp3.textContent = `${e.condition}`;
                sp0.appendChild(sp1);
                sp0.appendChild(sp2);
                sp0.appendChild(sp3);
                div1.appendChild(sp0);
            });
        } catch (error) {
            current.style.display = 'block';
            let h0 = document.createElement('h2');
            h0.textContent = 'Error';
            current.appendChild(h0);
            upcomming.style.display = 'block';
            let h = document.createElement('h2');
            h.textContent = 'Error';
            upcomming.appendChild(h);
        }
    }
}

attachEvents();