/* Récupération données stocké dans l'URL */

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

/* Créer un Tableau vide pour pouvoir mettre des données */

let productData = [];

/* Appeler l'API puis mettre les données dans le tableau */

const fetchProduct= async () => {
    await fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((promise)=> {
        productData = promise;      
    });
}

/* Exécuter la fonction pour avoir le tableau */

fetchProduct();

/* Ajout des données du tableau(API) dans le code html */

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

/* Exécuter la fonction pour afficher les données dans le code html */

productDisplay ();

/* Fonction pour ajouter un produit dans le localStorage */

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

        /* Vérifier si l'utilisateur a bien selectionné une couleur et mis un nombre d'article (different de 0) */

        if(tab == null){
            tab = [];
            if(addToTab.quantity > 0 && addToTab.colors != ""){
                tab.push(addToTab);
                localStorage.setItem("product",JSON.stringify(tab));
                window.location = 'index.html';
            } else{
                alert("veuillez choisir une couleur puis ajouter le nombre d'article(s) que vous voulez"); 
            }
        }

        /* Ajout des conditions pour incrémentation et ajout d'autre article */

        else if (tab  != null) {
            for(i=0; i < tab.length; i++) {
                
                /* Incrémenter le nombre d'article si l'article et la couleur sont égaux */
                
                if(tab[i]._id == productData._id && tab[i].colors == selectProduct.value){
                    return(
                        tab[i].quantity= parseInt(tab[i].quantity) + parseInt(quantityProduct.value),
                        localStorage.setItem("product",JSON.stringify(tab)),
                        (tab = JSON.parse(localStorage.getItem("product"))),
                        window.location = 'index.html'
                    );  
                }  
            }

            /* Ajouter un autre article dans le localStorage si il n'y était pas */

            for(i=0; i < tab.length; i++) {
                if((tab[i]._id == productData._id && tab[i].colors != selectProduct.value) || tab[i]._id != productData._id) {
                    return(
                        tab.push(addToTab),
                        localStorage.setItem("product",JSON.stringify(tab)),
                        (tab = JSON.parse(localStorage.getItem("product"))),
                        window.location = 'index.html'
                    ); 
                }
            }
        }
        
       
    });
    
    return (tab= JSON.parse(localStorage.getItem("product")));
};