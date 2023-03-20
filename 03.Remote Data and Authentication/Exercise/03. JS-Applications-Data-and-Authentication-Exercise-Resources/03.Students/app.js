const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', submitFunc);
const url = 'http://localhost:3030/jsonstore/collections/students';
const tBody = document.querySelector('tbody');
fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        Object.values(data).forEach((e) => {
            const tr = createElement('tr', '', '', { 'id': `${e._id}` });
            createElement('td', `${e.firstName}`, tr);
            createElement('td', `${e.lastName}`, tr);
            createElement('td', `${e.facultyNumber}`, tr);
            createElement('td', `${e.grade}`, tr);
            tBody.appendChild(tr);
        });
    });
function createElement(type, text, parent, attribute) {
    const result = document.createElement(type);
    result.textContent = text;
    if (attribute) {
        for (const prop in attribute) {
            result.setAttribute(prop, attribute[prop]);
        }
    }
    if (parent) {
        parent.appendChild(result);
    }
    return result;

}

function submitFunc(e) {
    e.preventDefault();
    const form = document.getElementById('form');
    let formData = new FormData(form);
    const fName = formData.get('firstName');
    const lName = formData.get('lastName');
    const facultNum = formData.get('facultyNumber');
    const grade = formData.get('grade');
    if (fName == '' || lName == '' || facultNum == '' || grade == '') {
        alert('All fields must be filled!');
    } else if (isNaN(grade) || isNaN(facultNum)) {
        alert('Grade and Faculty number must be numbers!');
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName: fName, lastName: lName, facultyNumber: facultNum, grade })
    })
        .then(res => res.json);


}
