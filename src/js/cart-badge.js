"use strict";

// --- STATE ---
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- DOM ELEMENTS ---
const cartBadge = document.querySelector(".cart-badge");

// --- FUNCTIONS ---
function updateCartBadge() {
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// --- INITIAL LOAD ---
updateCartBadge();
