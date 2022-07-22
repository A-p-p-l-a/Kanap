let itemsData = [];

fetchItems = async () => {
  await fetch("http://127.0.0.1:3000/api/products")
  .then ((response) => response.json())
  .then ((promise) => {
    itemsData = promise
    console.log(itemsData);
  });
  
}


const itemsDisplay= async () => {
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
};

itemsDisplay ();