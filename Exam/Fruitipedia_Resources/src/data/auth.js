
import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
};

// Change user Object variables
// login Page
export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}
//register Page
export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
}

// logOut

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}
