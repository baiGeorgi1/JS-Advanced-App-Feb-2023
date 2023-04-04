import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../data/infos.js";
import { getUserData } from "../util.js";


// insert  ${books.length > 0 ? books.map(book => mybooksCard(book)) :
const myBooksTemplate = (books) => html`

`;
// insert  ${book.title}
const mybooksCard = (book) => html`

`;
export async function showMyBooksPage(ctx) {
    const id = await getUserData();
    const books = await getMyBooks(id._id);
    // console.log(books);
    ctx.render(myBooksTemplate(books));
}