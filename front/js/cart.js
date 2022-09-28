/* Créer des tableau vide pour pouvoir mettre des données */

let tabResume = [];

/* Récupération du localStorage */

let cart = JSON.parse(localStorage.getItem("cart"));

let orderProduct = JSON.parse(localStorage.getItem("order"));

/* Ajout code html avec les données du tableau(API) cart */
const cartDisplay = async () => {   
    if(cart){
        for(i=0; i < cart.length; i++){
            // créer un tableau id pour pouvoir aller chercher les donnée dans l'API
            const id = cart[i]._id
            //Récupération des données dans l'API avec le tableau id
            await fetch(`http://127.0.0.1:3000/api/products/${id}`)
            .then((response) => response.json())
            .then((promise)=> {
                product = promise;    
            }); 
            const addToTab = Object.assign({}, cart[i], {
                price : product.price,
                name : product.name,
                imageUrl : product.imageUrl,
                altTxt : product.altTxt    
            });
            tabResume.push(addToTab);
            const itemsElt = document.getElementById("cart__items");
            let productHtml = "";
            tabResume.forEach(product => {
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
    };  
};
    
/* Exécuter la fonction pour afficher les données dans le code html */

cartDisplay();

/* Gestion du bouton supprimer */

const removeProduct = async (cartDisplay) => {
    await cartDisplay;
    let deleteProduct = document.querySelectorAll(".deleteItem");
    deleteProduct.forEach((remove) => {
        remove.addEventListener("click",() =>{
            let RemoveTotalProduct= cart.length;
            
            /* Si il y a seulement 1 article, supprimer le localStorage */
            
            if(RemoveTotalProduct == 1){
                return ( 
                    localStorage.removeItem("cart"),
                    window.location = 'index.html'
                )
                
            } 

            /* Sinon supprimer seulement l'article avec l'id */
            
            else {
                calcRemoveProduct = cart.filter(el => {
                if (remove.parentElement.parentElement.parentElement.parentElement.dataset.id !=el._id || remove.parentElement.parentElement.parentElement.parentElement.dataset.color != el.color){
                    return true
                    }
                } ); 
                
                localStorage.setItem("cart",JSON.stringify(calcRemoveProduct));
                (cart = JSON.parse(localStorage.getItem("cart")));
                 remove.parentElement.parentElement.parentElement.parentElement.remove(); 
                               
            }   
        });  
    });
    return;
};

/* Gestion du nombre d'article */

const addValueCart = async (cartDisplay) => {
    await cartDisplay;
    let add = document.querySelectorAll(".cart__item");
    add.forEach((changeValue) => {
        changeValue.addEventListener("change", () => { 
            for( i=0; i< cart.length;i++){ 
                if(
                    cart[i]._id == changeValue.dataset.id && 
                    cart[i].color == changeValue.dataset.color
                    ) {
                        if(document.querySelectorAll(".cart__item input")[i].value <= 0){
                            return ( 
                                document.querySelectorAll(".cart__item input")[i].value = 1,
                                cart[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                                tabResume[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                                localStorage.setItem("cart", JSON.stringify(cart)),
                                calcTotal()
                            );
                        } 
                        if(document.querySelectorAll(".cart__item input")[i].value > 100){
                            return ( 
                                document.querySelectorAll(".cart__item input")[i].value = 100,
                                cart[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                                tabResume[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                                localStorage.setItem("cart", JSON.stringify(cart)),
                                calcTotal()
                            );
                        } 
                        return (
                        cart[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                        tabResume[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                        localStorage.setItem("cart", JSON.stringify(cart)),
                        calcTotal()     
                    );
                }
                               
            }   
        })      
    })
};

/* Calculer le total d'articles et quantités */

const calcTotal = async (cartDisplay, removeProduct, addValueCart) => {
    await cartDisplay;
    await removeProduct;
    await addValueCart;
    let allPrice=[];
    let allQantity=[];
    let showQuantity = document.querySelectorAll(".itemQuantity");
    cart.forEach((productTab) => {
        allQantity.push(productTab.quantity);   
    });
    tabResume.forEach((priceTab) => {
        allPrice.push(priceTab.price * priceTab.quantity);
    });
    totalQuantity.textContent = `${eval(allQantity.join("+"))}`;
    calcRemoveProduct=`${eval(allPrice.join("+"))}`;
    totalPrice.textContent = calcRemoveProduct;
    
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
 
