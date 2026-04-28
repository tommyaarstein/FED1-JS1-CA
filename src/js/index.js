
// --- DOM ELEMENTS ---
const productGrid = document.querySelector(".product-grid");

// --- STATE ---
let allJackets = [];

// --- FUNCTIONS ---
async function fetchJackets() {
    const url = 'https://v2.api.noroff.dev/rainy-days';

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
        resultsContainer.innerHTML = '<p class="error-message">Could not load games. Please try refreshing the page.</p>';
    }
}

function displayJackets() {
    let jacketsHTML = "";

    for (let i = 0; i < allJackets.length; i++) {
        jacketsHTML += `
            <article class="product-card">
            <img class="product-card img" src="${allJackets[i].image.url}" alt="${allJackets[i].image.alt}">
            <h2>${allJackets[i].title}</h2>
            <p class="product-price">$${allJackets[i].price}</p>
            <p>${allJackets[i].gender}</p>
            </article>
        `;
    }
    productGrid.innerHTML = jacketsHTML;
}

fetchJackets();