import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFruit, getFruitById } from "../data/infos.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (fruit, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fruit</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" .value=${fruit.name} name="name" id="name" placeholder="Fruit Name" />
            <input type="text" .value=${fruit.imageUrl} name="imageUrl" id="Fruit-image"
                placeholder="Fruit Image URL" />
            <textarea id="fruit-description" .value=${fruit.description} name="description" placeholder="Description"
                rows="10" cols="50"></textarea>
            <textarea id="fruit-nutrition" .value=${fruit.nutrition} name="nutrition" placeholder="Nutrition" rows="10"
                cols="50"></textarea>
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;
export async function editFruitPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getFruitById(id);
    console.log(fruit);
    ctx.render(editTemplate(fruit, createSubmitHandler(onEdit)));
    async function onEdit({
        name,
        imageUrl,
        description,
        nutrition

    }) {
        if ([name,
            imageUrl,
            description,
            nutrition
        ]
            .some(el => el == '')) {
            return alert('All field are required!');
        }
        await editFruit(id, {
            name,
            imageUrl,
            description,
            nutrition
        });
        ctx.page.redirect(`/data/fruits/${fruit._id}`);

    };


}