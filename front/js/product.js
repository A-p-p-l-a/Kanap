/* Récupération données stocké dans l'URL */

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

/* Appeler l'API */

 fetch(`http://127.0.0.1:3000/api/products/${id}`)
  .then ((response) => response.json())
  .then (product => {
    displayProduct(product);
    addSelect(product);
  }); 

/* Ajout des données du tableau(API) dans le code html */

const displayProduct = product => {
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`; 
    document.getElementById("description").innerHTML = `${product.description}`;
    document.getElementById("title").innerHTML = `${product.name}`;
    document.getElementById("price").innerHTML =  `${product.price}`;
    let select = document.getElementById("colors");
    product.colors.forEach(color => {
        let option = document.createElement("option");
        option.innerHTML=`${color}`;
        option.value=`${color}`;
        select.appendChild(option);
    });   
};

/* Fonction pour ajouter un produit dans le localStorage */

const addSelect = product => {
    let button = document.getElementById("addToCart");
    button.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let selectProduct = document.getElementById("colors");
        let quantityProduct = document.getElementById("quantity");
        const addToCart = {
            color : selectProduct.value,
            quantity : quantityProduct.value,
            _id: product._id
        }
        
        /* Vérifier si l'utilisateur a bien selectionné une couleur et mis un nombre d'article (different de 0) */

        if(cart == null){
            cart = [];
            if(addToCart.quantity > 0 && addToCart.color != ""){
                cart.push(addToCart);
                localStorage.setItem("cart",JSON.stringify(cart));
                /* window.location = 'index.html'; */
            } else{
                alert("veuillez choisir une couleur puis ajouter le nombre d'article(s) que vous voulez"); 
            };
        }

        /* Ajout des conditions pour incrémentation et ajout d'autre article */

        else if ((cart  != null) && (addToCart.quantity > 0 && addToCart.color != "")) {
            for(i=0; i < cart.length; i++) {
                
                /* Incrémenter le nombre d'article si l'article et la couleur sont égaux */
                
                if(cart[i]._id == product._id && cart[i].color == selectProduct.value){
                    return(
                        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantityProduct.value),
                        localStorage.setItem("cart",JSON.stringify(cart)),
                        (cart = JSON.parse(localStorage.getItem("cart")))
                         /* window.location = 'index.html' */
                    );  
                };
            } 
                /* Ajouter un autre article dans le localStorage si il n'y était pas */
            for(i=0; i < cart.length; i++) {  
                if((cart[i]._id == product._id && cart[i].color != selectProduct.value) || cart[i]._id != product._id) {
                    return(
                        cart.push(addToCart),
                        localStorage.setItem("cart",JSON.stringify(cart)),
                        (cart = JSON.parse(localStorage.getItem("cart")))
                        /* window.location = 'index.html' */
                    ); 
                };
                
            };
            
        };
        
    });
};