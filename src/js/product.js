const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

console.log(productId);