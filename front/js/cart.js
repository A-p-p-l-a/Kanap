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
    let deleteProduct = document.querySelectorAll(".cart__item .deleteItem");
    
    deleteProduct.forEach((remove) => {
        remove.addEventListener("click",() =>{
            

            let RemoveTotalProduct= addProduct.length;
            

            if(RemoveTotalProduct == 1){
                return ( 
                    localStorage.removeItem("product")
                );
            } else {
                calcRemoveProduct = addProduct.filter(el => {
                    if (remove.dataset.id !=el._id || remove.dataset.color != el.colors){
                        return true
                    }
                } );
                localStorage.setItem("product",JSON.stringify(calcRemoveProduct));
            }
            location.href ="cart.html";
        });
        
    });
    return;
};

const calcTotal = async (
    cartDisplay,
    removeProduct
    ) => {
    await cartDisplay;
    await removeProduct;
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

const addValueCart = async (cartDisplay) => {
    await cartDisplay;
    
    let add = document.querySelectorAll(".cart__item");
    
    console.log(add);
    add.forEach((changeValue) => {
        changeValue.addEventListener("change", () => {
            const Input = document.querySelector(".cart__item__content__settings__quantity input");
            /* let quantityProduct = document.getElementsByClassName("cart__item__content__settings__quantity .itemQuantity"); */
            
            console.log(Input);

            for( i=0; i< addProduct.length;i++){
                if(
                    addProduct[i]._id == changeValue.dataset.id && 
                    addProduct[i].colors == changeValue.dataset.color
                    ){
                    return addProduct[i].quantity++,
                    console.log("quantity++"),
                    localStorage.setItem("product", JSON.stringify(addProduct))
                    
                };
            }
        })
        
    })
};