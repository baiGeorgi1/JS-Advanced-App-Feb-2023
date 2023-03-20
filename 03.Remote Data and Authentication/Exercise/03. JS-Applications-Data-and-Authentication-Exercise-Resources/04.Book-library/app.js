const losdBtn = document.getElementById('loadBooks');
const url = 'http://localhost:3030/jsonstore/collections/books';
const tBody = document.getElementsByTagName('tbody')[0];
const formElement = document.getElementsByTagName('form')[0];
const submitBtn = formElement[2];
submitBtn.setAttribute('id', 'submit');

losdBtn.addEventListener('click', loadBooks);

formElement.addEventListener('submit', ((e) => {
    e.preventDefault();
    const title = formElement[0].value;
    const author = formElement[1].value;
    if (title == '' || author == '') {
        alert('All fields must to be filled!');
    } else {
        submitBtn.addEventListener('click', () => {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author: `${author}`, title: `${title}` })
            })
                .then(res => res.json());
        });
    }
    formElement[0].value = '';
    formElement[1].value = '';

});)

async function loadBooks() {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`HTTP request error! Status: ${response.status}`);
        }
        const data = await response.json();
        const entries = Object.entries(data);
        tBody.innerHTML = '';

        for (let [key, { author, title }] of entries) {
            const tr = document.createElement('tr');
            const tdTitle = document.createElement('td');
            tdTitle.textContent = title;
            const tdAuthor = document.createElement('td');
            tdAuthor.textContent = author;

            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);

            const tdBtn = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', editFunc);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteFunc);
            tdBtn.appendChild(editBtn);
            tdBtn.appendChild(deleteBtn);

            tr.appendChild(tdBtn);

            tBody.appendChild(tr);
            function editFunc(e) {

            }
            function deleteFunc(e) {
                e.preventDefault();
                fetch(`${url}/${key}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json());

                tr.remove();
            }
        }
        return data;
    } catch (error) {

    }
}



function generateElem(type, text, parent, atribute) {
    const result = document.createElement(type);
    result.textContent = text;
    if (atribute) {
        for (const key in atribute) {
            result.setAttribute(key, atribute[key]);
        }
    }
    if (parent) {
        parent.appendChild(result);
    }
    return result;
}