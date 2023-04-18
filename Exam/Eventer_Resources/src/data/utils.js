const userInfo = 'userData';

export function getUserData() {
    return JSON.parse(localStorage.getItem(userInfo));
}
export function setUserData(data) {
    return localStorage.setItem(userInfo, JSON.stringify(data));
}
export function clearUserData() {
    localStorage.removeItem(userInfo);
}
export function submitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        callback(data, form);
    };
}