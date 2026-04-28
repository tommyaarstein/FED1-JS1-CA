
// --- DOM ELEMENTS ---
const productGrid = document.querySelector(".product-grid");

// --- STATE ---
let allJackets = [];

// --- FUNCTIONS ---
async function fetchJackets() {
    const url = 'https://v2.api.noroff.dev/rainy-days';

    productGrid.innerHTML = `
    <div class="loading-message">
        <div class="loading-spinner"></div>
        <p>Loading jackets...</p>
    </div>
    `;
    // await delayLoading();
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error! Status: ${response.status}");
        }
        const result = await response.json();

        allJackets = result.data;
        displayJackets();
    } catch (error) {
        console.error("Failed to fetch jackets:", error);
        productGrid.innerHTML = `
        <p class="error-message">Oh no!<br>We could not find any jackets. Please try refreshing the page.</p>
        `;
    }
}

function displayJackets() {
    let jacketsHTML = "";

    for (let i = 0; i < allJackets.length; i++) {
        jacketsHTML += `
            <article class="product-card">
            <a class="product-link" href="products/peder-jacket.html?id=${allJackets[i].id}">
            <img class="product-card img" src="${allJackets[i].image.url}" alt="${allJackets[i].image.alt}">
            <h2>${allJackets[i].title}</h2>
            </a>
            <p class="product-price">$${allJackets[i].price}</p>
            <button class="btn-primary add-to-cart-button" data-id="${allJackets[i].id}">Add to cart</button>
            </article>
        `;
    }
    productGrid.innerHTML = jacketsHTML;
    addButtonListeners();
}

function addButtonListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function () {
            console.log("Clicked product id:", addToCartButtons[i].dataset.id);
        });
    }
}

// function delayLoading() {
//     return new Promise(function(resolve) {
//         setTimeout(resolve, 5000);
//     });
// };

fetchJackets();