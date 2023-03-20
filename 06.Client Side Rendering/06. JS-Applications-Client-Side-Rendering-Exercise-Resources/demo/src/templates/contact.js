const contactTemplate = (contact) => `
<div class="card" style="width: 18rem;">
  <img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${contact.person}</h5>
    <p class="card-text">${contact.phone}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
export default contactTemplate;