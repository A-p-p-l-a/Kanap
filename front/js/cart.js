/* Créer des tableau vide pour pouvoir mettre des données */

let tabResume = [];

/* Récupération du localStorage */

let cart = JSON.parse(localStorage.getItem("cart"));

let orderProduct = JSON.parse(localStorage.getItem("order"));

/* Ajout code html avec les données de l'API */
const cartDisplay = async () => {   
    if(cart && cart != 0){
        for(i=0; i < cart.length; i++){
            // créer un tableau id pour pouvoir aller chercher les donnée dans l'API
            const id = cart[i]._id
            //Récupération des données dans l'API avec le tableau id
            await fetch(`http://127.0.0.1:3000/api/products/${id}`)
            .then((response) => response.json())
            .then((promise)=> {
                product = promise;    
            });
            // Ajouter les données manquant du localstorage dans un tableau different
            const addToTab = Object.assign({}, cart[i], {
                price : product.price,
                name : product.name,
                imageUrl : product.imageUrl,
                altTxt : product.altTxt    
            });
            // insérer le tableau addToTab dans le tableau qu'on créé précédement
            tabResume.push(addToTab);
            const itemsElt = document.getElementById("cart__items");
            let productHtml = "";
            tabResume.forEach((product, index) => {
                productHtml +=`
                    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                        <div class="cart__item__img">
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${product.name}</h2>
                                <p>${product.color}</p>
                                <p>${product.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            }),
            itemsElt.innerHTML = productHtml;   
        };
        calcTotal();
        removeProduct();
        addValueCart();  
    } 
    
    //Si le panier est vide, afficher l'information
    
    else{
        const itemsElt = document.getElementById("cartAndFormContainer");
        itemsElt.innerHTML = "<h1>Votre panier est vide</h1>";
    }
};
    
/* Exécuter la fonction pour afficher les données dans le code html */

cartDisplay();

/* Gestion du bouton supprimer */

const removeProduct = async () => {
    await cartDisplay;
    let deleteProduct = document.querySelectorAll(".deleteItem");
    deleteProduct.forEach((remove, index) => {
        remove.addEventListener("click",() =>{
            const itemsElt = document.getElementsByClassName("cart__item"); 
            const itemToRemove = Array.prototype.find.call(itemsElt, elt => elt.dataset.id === cart[index]._id && elt.dataset.color === cart[index].color);
            const itemContainer = document.getElementById("cart__items");
            itemContainer.removeChild(itemToRemove);
            const newCart = cart.filter(elt => !(elt._id === itemToRemove.dataset.id && elt.color === itemToRemove.dataset.color));
            localStorage.setItem("cart", JSON.stringify(newCart));
            cart = newCart;
            tabResume= tabResume.filter(elt => !(elt._id === itemToRemove.dataset.id && elt.color === itemToRemove.dataset.color)); 
            calcTotal();
            if(cart.length == 0){
                return ( 
                    localStorage.removeItem("cart"),
                    location.href ="index.html"
                );
            }
        });
        
    });
    return;
};

/* Gestion du nombre d'article */

const addValueCart = async () => {
    let add = document.querySelectorAll(".cart__item");
    add.forEach((changeValue) => {
        changeValue.addEventListener("change", (event) => {
            // utiliser findIndex qui permet de trouver l'index du produit à mettre à jour dans le panier
            const productIndex = cart.findIndex((el) => el._id === changeValue.dataset.id && el.color == changeValue.dataset.color);
            if (productIndex > -1) {
                if(event.target.value <= 0){ 
                    event.target.value = 1; 
                } 
                if(event.target.value > 100){
                    event.target.value = 100;
                }
                cart[productIndex].quantity = event.target.value,
                tabResume[productIndex].quantity = event.target.value,
                localStorage.setItem("cart", JSON.stringify(cart)),
                calcTotal()
            }  
        })      
    })
};

/* Calculer le total d'articles et quantités */

const calcTotal = () => { 
    let totalPrice = 0;
    let totalQuantities = 0;
    cart.forEach((productTab) => { 
        const product = tabResume.find(el => el._id === productTab._id);
        const quantity = parseInt(productTab.quantity);
        const price = parseInt(product.price);
        totalPrice += (price * quantity);
        totalQuantities += quantity;
    });
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice;
    const totalQuantityElement = document.getElementById('totalQuantity');
    totalQuantityElement.textContent = totalQuantities;
};

/* Gestion du formulaire */

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

//input Prenom

   firstName.addEventListener("input", function(a){
    valueFirstName;
    if(a.target.value.length == 0) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = null;
    } else if (a.target.value.length < 3 ){
        firstNameErrorMsg.innerHTML = "Erreur: Le prénom doit contenir au minimum 3 caractères";
        valueFirstName = null;
    }
     else if (a.target.value.length > 50 ){
        firstNameErrorMsg.innerHTML = "Erreur: Le prénom doit contenir moins de 50 caractères";
        valueFirstName = null;
    }
    if(a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/)) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = a.target.value;
    } 
    if(!a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/) 
    && a.target.value.length > 2
    && a.target.value.length < 50
    ) {
        firstNameErrorMsg.innerHTML = "Erreur: Caractère non pris en charge";
        valueFirstName = null;
    } 
    
    });

//input Nom

lastName.addEventListener("input", function(a){
    valueLastName;
    if(a.target.value.length == 0) {
            lastNameErrorMsg.innerHTML = "";
            valueLastName = null;
    } else if (a.target.value.length < 3 ){
            lastNameErrorMsg.innerHTML = "Erreur: Le nom doit contenir au minimum 3 caractères";
            valueLastName = null;
    } else if (a.target.value.length > 50 ){
            lastNameErrorMsg.innerHTML = "Erreur: Le nom doit contenir moins de 50 caractères";
            valueLastName = null;
    }
    if(a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/)) {
            lastNameErrorMsg.innerHTML = "";
            valueLastName = a.target.value;
    } 
    if(!a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/) 
        && a.target.value.length > 2
        && a.target.value.length < 50
    ) {
            lastNameErrorMsg.innerHTML = "Erreur: Caractère non pris en charge";
            valueLastName = null;
        } 
        
});

//input Adresse

address.addEventListener("input", function(a){
    valueAddress;
    if(a.target.value.length == 0) {
        addressErrorMsg.innerHTML = "";
        valueAddress = null;
    } else if (a.target.value.length < 8 ){
        addressErrorMsg.innerHTML = "Erreur: Adresse incomplète";
        valueAddress = null;
    } else if (a.target.value.length > 100 ){
        addressErrorMsg.innerHTML = "Erreur: L'adresse doit contenir moins de 100 caractères";
        valueAddress = null;
    }
    if(a.target.value.match(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`' \-]{8,100}$/)) {
        addressErrorMsg.innerHTML = "";
        valueAddress = a.target.value;
    } 
    if(!a.target.value.match(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`' \-]{8,100}$/) 
        && a.target.value.length > 7
        && a.target.value.length < 100
    ) {
        addressErrorMsg.innerHTML = "Erreur: Caractère non pris en charge";
        valueAddress = null;
        } 
        
});

//input Ville

city.addEventListener("input", function(a){
    valueCity;
    if(a.target.value.length == 0) {
            cityErrorMsg.innerHTML = "";
            valueCity = null;
    } else if (a.target.value.length < 3 ){
            cityErrorMsg.innerHTML = "Erreur: Le nom doit contenir au minimum 3 caractères";
            valueCity = null;
    } else if (a.target.value.length > 50 ){
            cityErrorMsg.innerHTML = "Erreur: Le nom doit contenir moins de 50 caractères";
            valueCity = null;
    }
    if(a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/)) {
            cityErrorMsg.innerHTML = "";
            valueCity = a.target.value;
    } 
    if(!a.target.value.match(/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\- ]{3,50}$/) 
        && a.target.value.length > 2
        && a.target.value.length < 50
    ) {
            cityErrorMsg.innerHTML = "Erreur: Caractère non pris en charge";
            valueCity = null;
        } 
        
});

//input email

email.addEventListener("input", (a) => {
    if(a.target.value.length == 0) {
        emailErrorMsg.innerHTML = "";
        valueEmail = null;
    }
    else if(a.target.value.match(/^[a-zA-Z0-9]{2,}[\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9]{2,}[\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9]{4,}[-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{2,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/)){
        emailErrorMsg.innerHTML = "";
        valueEmail = a.target.value;
    }
    if(!a.target.value.match(/^[a-zA-Z0-9]{2,}[\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9]{2,}[\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9]{4,}[-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{2,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/)){
        emailErrorMsg.innerHTML = "Erreur: email incorrect, exemple: mon-email@mon-domain.com";
        valueEmail = null;
    }
    
});

/* Gestion du bouton pour commander */

cartAndFormContainer.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    /* Si les valeurs du formulaire ne sont pas null */
    
    if( valueFirstName && valueLastName && valueAddress && valueCity && valueEmail){
        const cart = JSON.parse(localStorage.getItem("cart"));
        let orderId =[];
        cart.forEach((order) => {
                orderId.push(order._id);    
        });
        const data={
            contact:{
                firstName : valueFirstName,
                lastName : valueLastName,
                address : valueAddress,
                city : valueCity,
                email : valueEmail
            },
            products: orderId
        }
        
        /* Appel l'API pour la method POST */
        
        fetch("http://127.0.0.1:3000/api/products/order",{
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body:JSON.stringify(data)
        }).then((res)=>res.json()).then((promise)=> {
            let responseServ = promise;
            
            const dataOrder= {
                contact: responseServ.contact,
                order: responseServ.orderId,
                products: cart,
                quantity: totalQuantity.textContent,
                total: totalPrice.textContent
            }
        
            if(orderProduct==null){
                orderProduct=[];
                orderProduct.push(dataOrder);
                localStorage.setItem("order",JSON.stringify(orderProduct));
            } else if (orderProduct!=null){
                orderProduct.push(dataOrder);
                localStorage.setItem("order",JSON.stringify(orderProduct));
            }
            
            /* Supprimer le panier et rediriger l'utilisateur ver la page confirmation avec le numéro de commande */
            
            localStorage.removeItem("cart");
            location.href =`confirmation.html?orderId=${responseServ.orderId}`
        });
    } 
    
    /* Si le formulaire n'est pas correctement rempli */

    else{
        alert("veuillez remplir correctement le formulaire");
    }
});
 
