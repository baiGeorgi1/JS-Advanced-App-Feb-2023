import { html } from "../node_modules/lit-html/lit-html.js";
// <main>${content}</main> +  add footer
// change HREFs


export const navBarTemplate = (userData, content) => html`
    <header>
        <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
    
        <nav>
            <div>
                <a href="/dashboard">Events</a>
            </div>
            ${userData ? html` <div class="user">
                <a href="/addNewEvent">Add Event</a>
                <a href="/logout">Logout</a>
            </div>`: html`<div class="guest">
                <a href="/users/login">Login</a>
                <a href="/register">Register</a>
            </div>`}
        </nav>
    </header>
    <main>
        ${content}
    </main>
`;