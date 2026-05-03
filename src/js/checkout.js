const checkoutItems = document.querySelector(".checkout-items");
const cartBadge = document.querySelector(".cart-badge");
const cartTotal = document.querySelector(".cart-total");
const checkoutButton = document.querySelector(".checkout-btn");
const checkoutMessage = document.querySelector(".checkout-message");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let groupedCart = [];

function updateCartBadge() {
  cartBadge.textContent = cart.length;
}

function groupCartItems() {
    groupedCart = [];

    for (let i = 0; i < cart.length; i++) {
        let existingItem = null;

        for (let j = 0; j < groupedCart.length; j++) {
            if (groupedCart[j].id === cart[i].id) {
                existingItem = groupedCart[j];
            }
        }

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const groupedItem = {
                id: cart[i].id,
                title: cart[i].title,
                price: cart[i].price,
                onSale: cart[i].onSale,
                discountedPrice: cart[i].discountedPrice,
                baseColor: cart[i].baseColor,
                image: cart[i].image,
                quantity: 1
            };
            groupedCart.push(groupedItem);
        }
    }
}

function getProductPrice(product) {
    if (product.onSale) {
        return product.discountedPrice;
    }
    return product.price;
}

function getCheckoutPriceHTML(product) {
    if (product.onSale) {
        return `
            <span class="old-price">$${product.price}</span>
            <span class="sale-price">$${product.discountedPrice}</span>
        `
    }
    return `$${product.price}`;
}

function displayCart() {

    groupCartItems();
    let cartHTML = "";

    for (let i = 0; i < groupedCart.length; i++) {
        cartHTML += `
                <section class="checkout-item" aria-label="Cart Item">
                    <img class="checkout-item-img" src="${groupedCart[i].image.url}" alt="${groupedCart[i].image.alt}" />

                    <div class="checkout-item-info">
                        <h2 class="checkout-item-title">${groupedCart[i].title}</h2>
                        <p class="checkout-item-meta">Colour: ${groupedCart[i].baseColor}</p>
                        <p class="checkout-item-price">Price: ${getCheckoutPriceHTML(groupedCart[i])}</p>
                        <div class="checkout-qty" role="group" aria-label="Quantity">
                            <button class="decrease-quantity" data-id="${groupedCart[i].id}" type="button" aria-label="Decrease quantity">-</button>
                            <span class="qty-value">${groupedCart[i].quantity}</span>
                            <button class="increase-quantity" data-id="${groupedCart[i].id}" type="button" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="remove-cart-item" data-id="${groupedCart[i].id}" type="button">Remove</button>
                    </div>
                </section>
            `;
    }

    checkoutItems.innerHTML = cartHTML;
}

updateCartBadge();
displayCart();
updateCartTotal();

checkoutItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-cart-item")) {
        const itemId = event.target.dataset.id;

        let remainingCartItems = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id !== itemId) {
                remainingCartItems.push(cart[i]);
            }
        }

        cart = remainingCartItems;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();
        updateCartTotal();
        displayCart();
    }

    if (event.target.classList.contains("increase-quantity")) {
        const itemId = event.target.dataset.id;

    for (let i = 0; i < groupedCart.length; i++) {
        if (groupedCart[i].id === itemId) {
            cart.push(groupedCart[i]);
            break;
        }
    }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();
        updateCartTotal();
        displayCart();
    }

    if (event.target.classList.contains("decrease-quantity")) {
        const itemId = event.target.dataset.id;

        for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].id === itemId) {
                cart.splice(i, 1);
                break;
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();
        updateCartTotal();
        displayCart();
    }
});

function updateCartTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += getProductPrice(cart[i]);
    }
    cartTotal.textContent = "$" + total.toFixed(2);
}

checkoutButton.addEventListener("click", function(event) {
    if (cart.length === 0) {
        event.preventDefault();
        checkoutMessage.textContent = "Your cart is empty. Please add a jacket before checkout.";
        checkoutMessage.classList.add("show");

        setTimeout(function() {
            checkoutMessage.classList.remove("show");
        }, 3000);
    }
});

updateCartTotal();