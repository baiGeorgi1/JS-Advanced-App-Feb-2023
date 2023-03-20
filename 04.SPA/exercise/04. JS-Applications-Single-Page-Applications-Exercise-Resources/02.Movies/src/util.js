//make live collection NodeList in array
const pages = [...document.querySelectorAll('.view-section')];


function hideAll() {
    pages.forEach(v => v.style.display = 'none');
}
export function showView(section) {
    hideAll();
    section.style.display = 'block';
}
export function createElement(type, text, parent, attribute) {
    const result = document.createElement(type);
    result.textContent = text;
    if (parent) {
        parent.appendChild(result);
    }
    if (attribute) {
        for (const key in attribute) {
            result.setAttribute(`${key}`, `${attribute[key]}`);
        }
    }
    return result;
}

export function spinner() {
    const element = createElement('p', 'Loading...');
    return element;
}
export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const messageCont = document.getElementById('welcome-msg');
    if (user) {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        messageCont.textContent = `Welcome, ${user.email}!`;
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
    }
}