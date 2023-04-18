import { html } from "../node_modules/lit-html/lit-html.js";
import { deleteEvent, getCounts, getEventById, getUserCounts, willGoing } from "../src/data/CRUD.js";
import { getUserData } from "../src/data/utils.js";

const eventDetailTemplate = (event, onDelete, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${event.imageUrl}" alt="example1" />
        <p id="details-title">${event.name}</p>
        <p id="details-category">
            Category: <span id="categories">${event.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${event.date}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <span>${event.description}</span>
            </div>
        </div>

        <h3>Going: <span id="go">${event.applications}</span> times.</h3>
        ${event.canEdit || event.canGo ? html`
        <div id="action-buttons">


            ${event.canEdit ? html`
            <a href="/dashboard/edit/${event._id}" id="edit-btn">Edit</a>
            <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            ${event.canGo ? html`
            <a @click=${onApply} href="javascript:void(0)" id="go-btn">Going</a>` : null}
        </div>` : null}
        }
    </div>
</section>
`;

//Rename funcs 
export async function eventInfoPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();
    const requests = [
        getEventById(id),
        getCounts(id)
    ];

    //const event = await getEventById(id);
    if (userData) {
        //  event.user = true;
        requests.push(getUserCounts(id, userData._id));
    }
    const [event, counter, willGo] = await Promise.all(requests);
    event.applications = counter;

    if (userData) {
        event.canEdit = userData._id == event._ownerId;
        event.canGo = event.canEdit == false && willGo == 0;
    }
    // if (userData && userData._id == event._ownerId) {
    //     event.canEdit = true;
    // }
    ctx.render(eventDetailTemplate(event, onDelete, onApply));
    async function onDelete() {
        const choise = confirm('DELETE!Are You sure?');
        if (choise) {
            await deleteEvent(id);
            ctx.page.redirect('/dashboard');
        }
    }
    async function onApply() {
        await willGoing(id);
        ctx.page.redirect('/dashboard/' + id);
    }
}
