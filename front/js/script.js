
fetch("http://127.0.0.1:3000/api/products")
  .then ((response) => response.json())
  .then (products => {
    displayProducts(products);
  });
  

const displayProducts = products => {
  const itemsElt = document.getElementById("items");
  let productsHtml = "";
  products.forEach(product => {
    productsHtml += getHtmlOneProduct(product)
  });
  itemsElt.innerHTML = productsHtml;
};

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
}









/* Créer un Tableau vide pour pouvoir mettre des données */

/* let itemsData; */

/* Appeler l'API puis mettre les données dans le tableau */

/* const fetchItems = async () => {
  await fetch("http://127.0.0.1:3000/api/products")
  .then ((response) => response.json())
  .then ((promise) => {
    itemsData = promise
  });
  
} */

/* Ajout du code html avec une fonction pour afficher les données récupérer de l'API */

/* const itemsDisplay= async () => {
  await fetchItems();
  document.getElementById("items").innerHTML = itemsData.map((item) => `
  <a href="product.html?id=${item._id}">
    <article>
      <img src="${item.imageUrl}" alt="${item.altTxt}">
      <h3 class="productName">${item.name}</h3>
      <p class="productDescription">${item.description}</p>
      <h3>${item.price} €</h3>
    </article>
  </a>
  `).join ("");
}; */

/* Exécuter la fonction pour afficher le code html */
/* 
itemsDisplay (); */