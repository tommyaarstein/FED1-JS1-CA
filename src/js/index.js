"use strict";

// --- STATE ---
let allJackets = [];
let productPagePath = "products/peder-jacket.html";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- DOM ELEMENTS ---
const productGrid = document.querySelector(".product-grid");
const cartBadge = document.querySelector(".cart-badge");
const filterButtons = document.querySelectorAll(".filter-button");
const productSearch = document.querySelector(".product-search");
const cartToast = document.querySelector(".cart-toast");

// --- FUNCTIONS ---
async function fetchJackets() {
    const url = 'https://v2.api.noroff.dev/rainy-days';

    productGrid.innerHTML = `
    <div class="loading-message">
        <div class="loading-spinner"></div>
        <p>Loading jackets...</p>
    </div>
    `;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error! Status: ${response.status}");
        }
        const result = await response.json();

        allJackets = result.data;
        
        const categoryGender = productGrid.dataset.categoryGender;

        if (categoryGender) {
            let categoryJackets = [];

            for (let i = 0; i < allJackets.length; i++) {
                if (allJackets[i].gender === categoryGender) {
                    categoryJackets.push(allJackets[i]);
                }
            }
            displayJackets(categoryJackets);
        } else {
            displayJackets(allJackets);
        }
    } catch (error) {
        productGrid.innerHTML = `
        <p class="error-message">Oh no!<br>We could not find any jackets. Please try refreshing the page.</p>
        `;
    }
}

function setProductPagePath() {
    if (document.location.pathname.includes("index.html") || document.location.pathname === "/") {
        productPagePath = "pages/products/peder-jacket.html";
    }

    if (document.location.pathname.includes("/category/")) {
        productPagePath = "../products/peder-jacket.html";
    }
}

function getPriceHTML(product) {
    if (product.onSale) {
        return `
            <div class="product-price">
                <span class="old-price">$${product.price}</span>
                <span class="sale-price">$${product.discountedPrice}</span>
            </div>
        `;
    }
    return `<p class="product-price">$${product.price}</p>`;
}

function displayJackets(jacketsToDisplay) {
    let jacketsHTML = "";

    for (let i = 0; i < jacketsToDisplay.length; i++) {
      jacketsHTML += `
            <article class="product-card">
            ${jacketsToDisplay[i].onSale ? '<span class="sale-badge">Sale</span>' : ""}
            <a class="product-link" href="${productPagePath}?id=${jacketsToDisplay[i].id}">
            <img class="product-card-img" src="${jacketsToDisplay[i].image.url}" alt="${jacketsToDisplay[i].image.alt}">
            <h2>${jacketsToDisplay[i].title}</h2>
            </a>
            ${getPriceHTML(jacketsToDisplay[i])}
            <button class="btn-primary add-to-cart-button" data-id="${jacketsToDisplay[i].id}">Add to cart</button>
            </article>
        `;
    }
    productGrid.innerHTML = jacketsHTML;
    addButtonListeners();
}

function updateCartBadge() {
    cartBadge.textContent = cart.length;
}

// --- EVENT LISTENERS ---
function addFilterListeners() {
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            const selectedGender = filterButtons[i].dataset.gender;
            let filteredJackets = [];

            if (selectedGender === "all") {
                filteredJackets = allJackets;
            } else {
                for (let j = 0; j < allJackets.length; j++) {
                    if (allJackets[j].gender === selectedGender) {
                        filteredJackets.push(allJackets[j]);
                    }
                }
            }
            displayJackets(filteredJackets);
        });
    }
}

function addSearchListener() {
    if (!productSearch) {
        return;
    }

    productSearch.addEventListener("input", function() {
        const searchValue = productSearch.value.toLowerCase();
        let searchResults = [];

        for (let i = 0; i < allJackets.length; i++) {
            const jacketTitle = allJackets[i].title.toLowerCase();

            if (jacketTitle.includes(searchValue)) {
                searchResults.push(allJackets[i]);
            }
        }
        displayJackets(searchResults);
    });
}

function addButtonListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function () {
            const clickedProductId = addToCartButtons[i].dataset.id;

            for (let j = 0; j < allJackets.length; j++) {
                if (allJackets[j].id === clickedProductId) {
                    cart.push(allJackets[j]);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartBadge();
                }
            }

            if (cartToast) {
                cartToast.classList.add("show");

                setTimeout(function () {
                    cartToast.classList.remove("show");
                }, 2000);
            }
        });
    }
}

// --- INITIAL LOAD ---
setProductPagePath();
addFilterListeners();
updateCartBadge();
addSearchListener();
fetchJackets();
