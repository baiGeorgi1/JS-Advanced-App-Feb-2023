import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchEngine } from "../data/infos.js";
import { searchHandler } from "../util.js";




const searchTemplate = (onClick, result) => html`
<section id="search">
    <div class="form">
        <h2>Search</h2>
        <form @submit=${onClick} class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        ${result.length > 0 ? result.map(e => founded(e)) : html`
        <p class="no-result">No result.</p>
        `}

    </div>
</section>
`;

const founded = (found) => html`
<div class="fruit">
    <img src="${found.imageUrl}" alt="example1" />
    <h3 class="title">${found.name}</h3>
    <p class="description">${found.description}</p>
    <a class="details-btn" href="/data/fruits/${found._id}">More Info</a>
</div>
`;

export async function searchFunc(ctx) {
    let found = [];

    ctx.render(searchTemplate(searchHandler((onClick)), found));

    async function onClick(word, form) {

        if (word === '') {
            alert('No empty field!');
        } else {
            found = await searchEngine(word);
            form.reset();
            ctx.render(searchTemplate(onClick, found));
        }
    }
}

