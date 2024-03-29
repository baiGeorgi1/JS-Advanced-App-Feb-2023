import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

const listTemplate = (data) => html`
<ul>
${data.map(town => html`<li>${town}</li>`)}
</ul>
`;

function getTowns(e) {
    e.preventDefault();

    const root = document.getElementById('root');
    const towns = document.getElementById('towns').value.split(', ');
    if (document.getElementById('towns').value) {
        const result = listTemplate(towns);

        render(result, root);
        document.getElementById('towns').value = '';

    }
}