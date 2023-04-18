import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from '../views/homePage.js';
import { getUserData } from './data/utils.js';
import { navBarTemplate } from '../views/navBar.js';
import { loginPage } from '../views/login.js';
import { logout } from './data/CRUD.js';
import { registerPage } from '../views/register.js';
import { dashBoardPage } from '../views/dashboard.js';
import { addEvent } from '../views/addEvent.js';
import { eventInfoPage } from '../views/eventInfo.js';
import { editEventPage } from '../views/edit.js';

const root = document.getElementById('wrapper');
page(decorateContext);
page('index.html', '/');
page('/users/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);

page('/', homePage);
page('/dashboard', dashBoardPage);
page('/dashboard/:id', eventInfoPage);
page('/addNewEvent', addEvent);
page('/dashboard/edit/:id', editEventPage);


page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}
function renderView(content) {
    const userData = getUserData();
    render(navBarTemplate(userData, content), root);
}
function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}