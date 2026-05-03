"use strict";

// --- DOM ELEMENTS ---
const cartBadge = document.querySelector(".cart-badge");

// --- INITIAL LOAD ---
localStorage.removeItem("cart");

cartBadge.textContent = 0;
