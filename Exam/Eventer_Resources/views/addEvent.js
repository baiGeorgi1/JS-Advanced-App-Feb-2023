import { html } from "../node_modules/lit-html/lit-html.js";
import { createEvent } from "../src/data/CRUD.js";
import { submitHandler } from "../src/data/utils.js";


const addTemplate = (onCreate) => html`
<section id="create">
    <div class="form">
        <h2>Add Event</h2>
        <form @submit="${onCreate}" class="create-form">
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />

            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

            <input type="text" name="date" id="date" placeholder="When?" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>
`;

export async function addEvent(ctx) {
    ctx.render(addTemplate(submitHandler(onCreate)));
    async function onCreate({
        name,
        imageUrl,
        category,
        description,
        date

    }) {
        if ([name,
            imageUrl,
            category,
            description,
            date
        ]
            .some(el => el == '')) {
            return alert('All field are required!');
        }
        await createEvent({
            name,
            imageUrl,
            category,
            description,
            date
        });
        ctx.page.redirect('/dashboard');
    };

}