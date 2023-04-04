import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/navBar.js";
import { getUserData } from "./util.js";

import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/auth.js";
// import { bookInfoPage } from "./views/detailBook.js";
// import { editBookPage } from "./views/editBook.js";
// import { showMyBooksPage } from "./views/showMyBooks.js";
import { homePage } from "./views/homePage.js";
import { dashboardPage } from "./views/dashBoardPage.js";
import { addFruit } from "./views/addFruit.js";
import { fruitInfoPage } from "./views/detailFruit.js";
import { editFruitPage } from "./views/editFruit.js";
import { searchFunc } from "./views/searchPage.js";

//TODO change render root dependig on project Html structure
const root = document.getElementById('wrapper'); // make the right Path

page(decorateContext);
page('index.html', '/'); // starting HTML
page('/', homePage);
page('/data', dashboardPage);
page('/data/fruits', addFruit);
page('/search', searchFunc);
page('/data/fruits/:id', fruitInfoPage);
page('/data/fruits/edit/:id', editFruitPage);


page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);


page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}
function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}