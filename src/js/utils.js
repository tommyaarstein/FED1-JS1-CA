"use strict";

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

function updateCartBadge(itemCount) {
    const cartBadge = document.querySelector(".cart-badge");

    if (cartBadge) {
        cartBadge.textContent = itemCount;
    }
}