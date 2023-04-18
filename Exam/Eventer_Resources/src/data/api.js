import { clearUserData, getUserData } from "./utils.js";


const HOST = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const userInfo = getUserData();

    if (userInfo) {
        options.headers['X-Authorization'] = userInfo.accessToken;
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(HOST + url, options);
        let result;

        if (response.status !== 204) {
            result = await response.json();
        }
        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            const err = result;
            throw err;
        }
        return result;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');