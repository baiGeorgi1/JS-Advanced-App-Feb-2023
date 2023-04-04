import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteFruit, getFruitById } from "../data/infos.js";
import { getUserData } from "../util.js";

//can btn to work with right path
//@click="${onDelete}" href="javascript:void(0)"
const fruitDetailTemplate = (fruit, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>${fruit.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">${fruit.nutrition}</p>
            </div>
            ${fruit.canEdit ? html`
            <div id="action-buttons">
                <a href="/data/fruits/edit/${fruit._id}" id="edit-btn">Edit</a>
                <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>
            `: null}

        </div>
    </div>
</section>
`;

export async function fruitInfoPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();
    const fruit = await getFruitById(id);
    if (userData && userData._id == fruit._ownerId) {
        fruit.canEdit = true;
    }
    ctx.render(fruitDetailTemplate(fruit, onDelete));
    async function onDelete() {
        const choise = confirm('DELETE!Are You sure?');
        if (choise) {
            await deleteFruit(id);
            ctx.page.redirect('/data');
        }
    }
}