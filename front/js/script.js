let itemsData = [];

fetchItems = async () => {
  await fetch("http://127.0.0.1:3000/api/products")
  .then ((response) => response.json())
  .then ((promise) => {
    itemsData = promise
    console.log(itemsData);
  });
  
}

