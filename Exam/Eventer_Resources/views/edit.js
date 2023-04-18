import { html } from "../node_modules/lit-html/lit-html.js";
import { editEvent, getEventById } from "../src/data/CRUD.js";
import { submitHandler } from "../src/data/utils.js";

const editTemplate = (event, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Event</h2>
        <form @submit="${onEdit}" class="edit-form">
            <input type="text" .value="${event.name}" name="name" id="name" placeholder="Event" />
            <input type="text" .value="${event.imageUrl}" name="imageUrl" id="event-image" placeholder="Event Image" />
            <input type="text" .value="${event.category}" name="category" id="event-category" placeholder="Category" />

            <textarea id="event-description" .value="${event.description}" name="description" placeholder="Description"
                rows="5" cols="50"></textarea>

            <label for="date-and-time">Event Time:</label>
            <input type="text" .value="${event.date}" name="date" id="date" placeholder="When?" />

            <button type="submit">Edit</button>
        </form>
    </div>
</section>
`;
//Rename funcs
export async function editEventPage(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);
    ctx.render(editTemplate(event, submitHandler(onEdit)));
    async function onEdit({
        name,
        imageUrl,
        category,
        description,
        date

    }) {
        if ([
            name,
            imageUrl,
            category,
            description,
            date
        ]
            .some(el => el == '')) {
            return alert('All field are required!');
        }
        await editEvent(id, {
            name,
            imageUrl,
            category,
            description,
            date
        });
        ctx.page.redirect(`/dashboard/${id}`);

    };


}