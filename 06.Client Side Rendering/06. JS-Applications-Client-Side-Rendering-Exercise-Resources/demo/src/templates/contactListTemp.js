import contactTemplate from "./contact.js";
const contactListTemp = (contacts) => `
<div class = "contact-list" style = "display : flex;  justify-content : space-around">
${contacts.map(x => contactTemplate(x)).join('')}
</div>
`;
export default contactListTemp;