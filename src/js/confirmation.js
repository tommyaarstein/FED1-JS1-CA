const cartBadge = document.querySelector(".cart-badge");

localStorage.removeItem("cart");

cartBadge.textContent = 0;