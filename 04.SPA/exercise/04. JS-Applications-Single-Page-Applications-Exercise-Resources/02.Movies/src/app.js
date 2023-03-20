
import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { logoutPage } from "./logout.js";
import { createPage } from "./createPage.js";
import { editPage } from "./editMovie.js";
import { detailPage } from "./movieInfo.js";
import { updateNav } from "./util.js";

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logoutPage,
    '/create': createPage
};

document.querySelector('nav').addEventListener('click', navigateFunc);
document.querySelector('#add-movie-button a').addEventListener('click', navigateFunc);
function navigateFunc(event) {
    if (event.target.tagName == 'A' && event.target.href) {
        event.preventDefault();
        const url = new URL(event.target.href);
        const view = routes[url.pathname];
        if (typeof view == 'function') {
            view();
        }
    }
}


updateNav();
homePage();