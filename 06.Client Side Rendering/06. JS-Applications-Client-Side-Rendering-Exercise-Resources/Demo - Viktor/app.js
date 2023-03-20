import { html, render } from '../../node_modules/lit-html/lit-html.js';


const greeting = () => html`<h2>Hello, Lit-HTML!</h2>`;
console.log(greeting);
render(greeting(), document.querySelector('main'));
