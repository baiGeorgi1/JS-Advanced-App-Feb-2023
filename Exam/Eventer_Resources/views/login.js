import { html } from "../node_modules/lit-html/lit-html.js";
import { login } from "../src/data/CRUD.js";
import { submitHandler } from "../src/data/utils.js";


const loginTemplate = (onLogin) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit="${onLogin}" class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;
export function loginPage(ctx) {
    ctx.render(loginTemplate(submitHandler(onLogin)));

    async function onLogin({ email, password }, form) {
        if (email == '' || password == '') {
            alert('All field are requred!');
        } else {
            await login(email, password);
            form.reset();
            ctx.page.redirect('/');
        }

    }
}