
/* Appeler l'API */

fetch("http://127.0.0.1:3000/api/products")
  .then ((response) => response.json())
  .then (products => {
    displayProducts(products);
  }) .catch(() => alert("impossible de récupérer les donées"));
  
/* Ajout des données de l'API dans le html */  

const displayProducts = products => {
  const itemsElt = document.getElementById("items");
  let productsHtml = "";
  products.forEach(product => {
    productsHtml += getHtmlOneProduct(product)
  });
  itemsElt.innerHTML = productsHtml;
};

/* code html à inclure */

const getHtmlOneProduct = product => {
  return `
    <a href="product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        <h3>${product.price} €</h3>
      </article>
    </a>
  `;
};