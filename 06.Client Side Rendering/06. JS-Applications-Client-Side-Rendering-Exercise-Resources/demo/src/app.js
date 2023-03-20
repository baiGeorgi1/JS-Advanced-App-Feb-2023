import navBarTemplate from "./templates/navBar.js";
import { getContacts } from "./api.js";
import contactListTemp from "./templates/contactListTemp.js";
import { render } from "./render.js";

const rootElement = document.getElementById('root');
const navBarResult = navBarTemplate();

render(navBarResult, rootElement);
// ----- USE TOP LEVEL AWAIT (no need to be async func) ONLY IN BROWSER------
const contacts = await getContacts();
render(contactListTemp(contacts), rootElement);






