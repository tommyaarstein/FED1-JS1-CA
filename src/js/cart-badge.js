const cartBadge = document.querySelector(".cart-badge");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cartBadge) {
    cartBadge.textContent = cart.length;
}