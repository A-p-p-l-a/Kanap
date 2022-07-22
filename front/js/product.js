
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");



let productData = [];

const fetchProduct= async () => {
    await fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((promise)=> {
        productData = promise;
       
    });

}
fetchProduct();

const productDisplay= async () => {
    await fetchProduct();
    document.querySelector(".item__img").innerHTML =
    `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`; 
    document.getElementById("description").innerHTML =  
    `${productData.description}`;
    document.getElementById("title").innerHTML =  
    `${productData.name}`;
    document.getElementById("price").innerHTML =  
    `${productData.price}`;
    let select = document.getElementById("colors");
    productData.colors.forEach(color => {
        let option = document.createElement("option");
        option.innerHTML=`${color}`;
        option.value=`${color}`;
        select.appendChild(option);
    });
    addSelect(productData);
};

productDisplay ();

const addSelect = () => {
    let button = document.getElementById("addToCart");
    button.addEventListener("click", () => {
        let tab = JSON.parse(localStorage.getItem("product"));
        let selectProduct = document.getElementById("colors");
        let quantityProduct = document.getElementById("quantity");
        const addToTab = Object.assign({}, productData, {
            colors : `${selectProduct.value}`,
            quantity : `${quantityProduct.value}`
        });

        if(tab == null){
            tab = [];
            tab.push(addToTab);
            localStorage.setItem("product",JSON.stringify(tab));
        }
        else if (tab  != null) {
            for(i=0; i < tab.length; i++) {
                if(tab[i]._id == productData._id && tab[i].colors == selectProduct.value){
                    return(
                        tab[i].quantity= parseInt(tab[i].quantity) + parseInt(quantityProduct.value),
                        localStorage.setItem("product",JSON.stringify(tab)),
                        (tab = JSON.parse(localStorage.getItem("product"))),
                        window.location = 'cart.html'
                    );  
                }  
            }
            for(i=0; i < tab.length; i++) {
                if((tab[i]._id == productData._id && tab[i].colors != selectProduct.value) || tab[i]._id != productData._id) {
                    return(
                        tab.push(addToTab),
                        localStorage.setItem("product",JSON.stringify(tab)),
                        (tab = JSON.parse(localStorage.getItem("product"))),
                        window.location = 'cart.html'
                    ); 
                }
            }
        }
        window.location = 'cart.html';
    });
    return (tab= JSON.parse(localStorage.getItem("product")));
};