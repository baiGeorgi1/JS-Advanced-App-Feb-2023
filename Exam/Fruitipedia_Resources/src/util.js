//CHANGE func names (not nessesery)

const itemName = 'userData';
// GET userData
export function getUserData() {
    return JSON.parse(localStorage.getItem(itemName));
}

// SET userData
export function setUserData(data) {
    return localStorage.setItem(itemName, JSON.stringify(data));
}

//clear data
export function clearUserData() {
    localStorage.removeItem(itemName);
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        callback(data, form);
    };
}
export function searchHandler(callback) {
    return function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = formData.get('search');

        callback(data, form);
    };
}
