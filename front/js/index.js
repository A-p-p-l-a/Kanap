const itemsDisplay= async () => {
    await fetchItems();
    document.getElementById("items").innerHTML = itemsData.map((item) => `
    <a href="#"><article><img src="${item.imageUrl}" alt="${item.altTxt}"></img><h3 class="productName">${item.name}</h3><p class="productDescription">${item.description}</p><h3>${item.price}</h3></article></a>`).join ("");
  };
  itemsDisplay ();