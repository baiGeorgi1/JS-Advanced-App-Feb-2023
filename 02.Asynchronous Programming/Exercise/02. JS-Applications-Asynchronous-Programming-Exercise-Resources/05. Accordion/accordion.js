function solution() {
    const mainContainer = document.querySelector('#main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const moreUrl = 'http://localhost:3030/jsonstore/advanced/articles/details';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => Object.entries(data).forEach((element) => {
            const { _id, title } = element[1];
            const divAccord = document.createElement('div');
            divAccord.className = 'accordion';

            const divHead = document.createElement('div');
            divHead.className = 'head';

            const span = document.createElement('span');
            span.textContent = title;
            const button = document.createElement('button');
            button.className = 'button';
            button.setAttribute('id', `${_id}`);
            button.textContent = 'More';
            button.addEventListener('click', showMoreFunc);
            divAccord.appendChild(divHead);
            divAccord.appendChild(span);
            divAccord.appendChild(button);
            fetch(`${moreUrl}/${_id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return res.json();
                })
                .then(details => {
                    const divExtra = document.createElement('div');
                    divExtra.className = 'extra';
                    const p = document.createElement('p');
                    p.textContent = details.content;
                    divExtra.appendChild(p);
                    divAccord.appendChild(divExtra);
                });
            mainContainer.appendChild(divAccord);


        }));
    function showMoreFunc(e) {
        const parent = e.target.parentElement;
        const hidden = parent.querySelector('.extra');
        hidden.style.display = 'block';
        const btn = parent.querySelector('.button');
        btn.removeEventListener('click', showMoreFunc);
        btn.textContent = 'Less';
        btn.addEventListener('click', lessFunc);
    }
    function lessFunc(e) {
        const parent = e.target.parentElement;
        const hidden = parent.querySelector('.extra');
        hidden.style.display = 'none';
        const btn = parent.querySelector('.button');
        btn.removeEventListener('click', lessFunc);
        btn.textContent = 'More';
        btn.addEventListener('click', showMoreFunc);
    }
}
solution();