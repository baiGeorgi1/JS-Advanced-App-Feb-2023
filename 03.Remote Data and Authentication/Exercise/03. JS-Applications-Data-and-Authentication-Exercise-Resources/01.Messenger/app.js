const url = 'http://localhost:3030/jsonstore/messenger';
const messages = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postFunc);
    document.getElementById('refresh').addEventListener('click', reloadFunc);
}

function reloadFunc() {
    const allComments = [];
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } return response.json();
        })
        .then(data => {
            Object.values(data).forEach((token) => {
                allComments.push(`${token.author}: ${token.content}`);
            });
            messages.value = allComments.join('\n');
        });
}

function postFunc() {
    const [author, content] = [document.querySelector('#controls input[name="author"]'), document.querySelector('#controls input[name="content"]')];
    if (author !== '' && content.value !== '') {
        request(url, { author: author.value, content: content.value });
        author.value = '';
        content.value = '';
    } else {
        alert('Empty fields!');
    }
}
function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        };
    }
    fetch(url, option)
        .then(response => response.json);
}

attachEvents();