import { showView, createElement, spinner } from "./util.js";

const homeSection = document.querySelector('#home-page');
const catalog = homeSection.querySelector('#movie .card-deck.d-flex.justify-content-center');
export function homePage() {
    showView(homeSection);
    displayMovies();
}

function displayMovies() {
    catalog.replaceChildren();
    const url = 'http://localhost:3030/data/movies';
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            Object.values(data).forEach((e) => {
                const mainDiv = createElement('div', '', catalog, { 'class': 'card mb-4', 'id': `${e._ownerId}` });
                createElement('img', '', mainDiv, { 'class': 'card-img-top', 'src': `${e.img}` });
                const nameDiv = createElement('div', '', mainDiv, { 'class': 'card-body' });
                createElement('h4', `${e.title}`, nameDiv, { 'class': 'card-title' });
                const divFooter = createElement('div', '', mainDiv, { 'class': 'card-footer' });
                const a = createElement('a', '', divFooter, { 'href': '#movie-section' });
                const detailBtn = createElement('button', 'Details', a, { 'class': 'btn btn-info', 'type': 'button' });
            });
        });


}





