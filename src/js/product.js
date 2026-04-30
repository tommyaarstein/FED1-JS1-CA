const productTitle = document.querySelector(".product-title");
const productColor = document.querySelector(".product-color");
const productDescription = document.querySelector(".product-description");
const productPrice = document.querySelector(".summary-price .product-price");
const productImage = document.querySelector(".gallery-figure img");
const productColorDot = document.querySelector(".product-color-dot")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");
const productUrl = "https://v2.api.noroff.dev/rainy-days/" + productId;

console.log(productId);

async function fetchSingleProduct() {
    try {
        const response = await fetch(productUrl);

        if (!response.ok) {
            throw new Error("Could not fetch product");
        }

        const result = await response.json();
        console.log(result.data);
        displaySingleProduct(result.data);
    } catch (error) {
        console.error("product error", error);
    }
}

fetchSingleProduct();

function displaySingleProduct(product) {
    productTitle.textContent = product.title;
    productColor.textContent = product.baseColor;
    productDescription.textContent = product.description
    productPrice.textContent = "$" + product.price;
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productColorDot.style.backgroundColor = product.baseColor;
}