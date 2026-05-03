const productTitle = document.querySelector(".product-title");
const productColor = document.querySelector(".product-color");
const productDescription = document.querySelector(".product-description");
const productPrice = document.querySelector(".summary-price .product-price");
const productImage = document.querySelector(".gallery-figure img");
const productThumbs = document.querySelectorAll(".gallery-thumbs img");
const productColorDot = document.querySelector(".product-color-dot")
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");
const productUrl = "https://v2.api.noroff.dev/rainy-days/" + productId;
const addToCartButton = document.querySelector(".add-to-cart");
const cartBadge = document.querySelector(".cart-badge")
const productContent = document.querySelector(".product-content");
const productExtraInfo = document.querySelector(".product-extra-info");
const singleProductLoading = document.querySelector(".single-product-loading");
const cartToast = document.querySelector(".cart-toast");
const productSizes = document.querySelector(".size-options")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

productContent.style.display = "none";
productExtraInfo.style.display = "none";

async function fetchSingleProduct() {
    try {
        const response = await fetch(productUrl);

        if (!response.ok) {
            throw new Error("Could not fetch product");
        }

        const result = await response.json();
        displaySingleProduct(result.data);
    } catch (error) {
        singleProductLoading.innerHTML = `
        <p class="error-message">Oh no!<br>We could not find this jacket. Please try refreshing the page.</p>
        `;
    }
}

fetchSingleProduct();

function getSingleProductPriceHTML(product) {
    if (product.onSale) {
        return `
            <span class="old-price">$${product.price}</span>
            <span class="sale-price">$${product.discountedPrice}</span>
        `;
    }
    return `$${product.price}`;
}

function displaySingleProduct(product) {
    productTitle.textContent = product.title;
    productColor.textContent = product.baseColor;
    productDescription.textContent = product.description
    productPrice.innerHTML = getSingleProductPriceHTML(product);
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productColorDot.style.backgroundColor = product.baseColor;

    let sizesHTML ="";

    for (let i = 0; i < product.sizes.length; i++) {
        sizesHTML += `<button type="button">${product.sizes[i]}</button>`;
    }

    productSizes.innerHTML = sizesHTML;
    
    for (let i = 0; i < productThumbs.length; i++) {
        productThumbs[i].src = product.image.url;
        productThumbs[i].alt = product.image.alt;
    }

    addToCartButton.addEventListener("click", function() {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();

        if (cartToast) {
            cartToast.classList.add("show");

            setTimeout(function() {
                cartToast.classList.remove("show");
            }, 2000);
        }
    });
    singleProductLoading.style.display = "none";
    productContent.style.display = "grid";
    productExtraInfo.style.display = "block";
}

function updateCartBadge() {
    cartBadge.textContent = cart.length;
}

updateCartBadge();