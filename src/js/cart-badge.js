"use strict";

// --- STATE ---
const cart = JSON.parse(localStorage.getItem("cart")) || [];


// --- INITIAL LOAD ---
updateCartBadge(cart.length);
