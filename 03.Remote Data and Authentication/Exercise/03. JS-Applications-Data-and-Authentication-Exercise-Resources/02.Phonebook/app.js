function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadFunc);
    document.getElementById('btnCreate').addEventListener('click', createFunc);
    const ulPhonebook = document.getElementById('phonebook');
    function loadFunc() {
        ulPhonebook.textContent = '';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                Object.entries(data).forEach((token) => {
                    const li = createElement('li', `${token[1].person}: ${token[1].phone}`, ulPhonebook);
                    li.setAttribute('id', token[0]);
                    const deleteBtn = createElement('button', 'Delete', li);
                    deleteBtn.addEventListener('click', deleteFunc);
                });
            });

    }
    function createElement(type, text, appender) {
        const result = document.createElement(type);
        result.textContent = text;
        appender.appendChild(result);
        return result;
    }
    function deleteFunc(event) {
        const parent = event.target.parentElement;
        deleteUrl = `http://localhost:3030/jsonstore/phonebook/${parent.id} `;
        fetch(deleteUrl, {
            method: 'DELETE'
        })
            .then(response => response.json());
        parent.remove();

    }
    function createFunc() {
        const personField = document.getElementById('person');
        const phoneFiled = document.getElementById('phone');
        if (personField.value == '' || phoneFiled.value == '') {
            alert('Must to fill all fields!');
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ person: personField.value, phone: phoneFiled.value })
        })
            .then(res => res.json());
        personField.value = '';
        phoneFiled.value = '';
        loadBtn.click();
    }
}
attachEvents();