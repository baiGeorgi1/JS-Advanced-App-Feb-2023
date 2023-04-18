import { html } from "../node_modules/lit-html/lit-html.js";
import { getAllEvents } from "../src/data/CRUD.js";


const nothing = html`<h4>No Events yet.</h4>`;
const dashBoardTemplate = (events) => html`
<h2>Current Events</h2>
<section id="dashboard">
    ${events.length > 0 ? events.map(e => eventTemplate(e)) : nothing}
</section>
`;

const eventTemplate = (event) => html`
<div class="event">
    <img src="${event.imageUrl}" alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/dashboard/${event._id}">Details</a>
</div>
`;

export async function dashBoardPage(ctx) {
    const events = await getAllEvents();
    ctx.render(dashBoardTemplate(events));
}