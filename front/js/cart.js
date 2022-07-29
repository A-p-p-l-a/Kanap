let calcProduct = [];

let addProduct = JSON.parse(localStorage.getItem("product"));


const cartDisplay = async () => {
    
    if(addProduct){
        await addProduct;
        console.log(addProduct);
        cart__items.innerHTML = addProduct.map((item) => `
            <article class="cart__item" data-id="${item._id}" data-color="${item.colors}">
                <div class="cart__item__img">
                    <img src="${item.imageUrl}" alt="${item.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${item.name}</h2>
                        <p>${item.colors}</p>
                        <p>${item.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `).join(""); 
        calcTotal();
        removeProduct();
        addValueCart();
        
        
        
    };
    
};

cartDisplay();

const removeProduct = async (cartDisplay) => {
    await cartDisplay;
    let deleteProduct = document.querySelectorAll(".deleteItem");
    
    console.log(deleteProduct);
    deleteProduct.forEach((remove) => {
        console.log(remove.parentElement.parentElement.parentElement.parentElement);
        remove.addEventListener("click",() =>{
            

            let RemoveTotalProduct= addProduct.length;
            

            if(RemoveTotalProduct == 1){
                return ( 
                    localStorage.removeItem("product"),
                    location.href ="cart.html"
                );
            } else {
                calcRemoveProduct = addProduct.filter(el => {
                    if (remove.parentElement.parentElement.parentElement.parentElement.dataset.id !=el._id || remove.parentElement.parentElement.parentElement.parentElement.dataset.color != el.colors){
                        return true
                    }
                } );
                localStorage.setItem("product",JSON.stringify(calcRemoveProduct));
                location.href ="cart.html";
            }
            
        });
        
    });
    return;
};



const addValueCart = async (
    cartDisplay
    ) => {
    await cartDisplay;

    let add = document.querySelectorAll(".cart__item");
    
    console.log(add);
    add.forEach((changeValue) => {
        changeValue.addEventListener("change", () => {

           
            for( i=0; i< addProduct.length;i++){
                
                if(
                    addProduct[i]._id == changeValue.dataset.id && 
                    addProduct[i].colors == changeValue.dataset.color

                    ) {
                    return (
                        addProduct[i].quantity = document.querySelectorAll(".cart__item input")[i].value,
                        localStorage.setItem("product", JSON.stringify(addProduct)),
                        calcTotal()
         
                    );

                    

                };
                
            }
            
        })
        
    })
};


const calcTotal = async (
    cartDisplay,
    removeProduct,
    addValueCart
    ) => {
    await cartDisplay;
    await removeProduct;
    await addValueCart;
    let allPrice=[];
    let allQantity=[];

    let newTab = JSON.parse(localStorage.getItem("product"));
    let showQuantity = document.querySelectorAll(".itemQuantity");
    newTab.forEach((productTab) => {
        allPrice.push(productTab.price * productTab.quantity);
            allQantity.push(productTab.quantity);
        
    });
    console.log(allPrice);
    console.log(allQantity);
    totalQuantity.textContent = `${eval(allQantity.join("+"))}`;
    calcRemoveProduct=eval(allPrice.join("+"));
    totalPrice.textContent = calcRemoveProduct;
};


const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

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
        valueFirstName = a.target.value;
    } 

    });

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
            valueLastName = a.target.value;
        } 
    
});

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
        valueAddress = a.target.value;
        } 
    
});


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
            valueCity = a.target.value;
        } 
        
});

email.addEventListener("input", (a) => {
    if(a.target.value.length ==0) {
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
})