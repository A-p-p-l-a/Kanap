/* Récupération données stocké dans l'URL */

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

/* Ajout des données de l'URL dans le code html */

const order= document.getElementById("orderId").innerHTML= orderId;
