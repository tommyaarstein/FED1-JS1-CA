# Rainy Days - JavaScript 1

A jacket webnshop developed for my JavaScript 1 course assignment at Noroff.

[View the live website](https://tommyaarstein.github.io/FED1-JS1-CA/)

## Description

Rainy Days is a fictuinal online shop selling jackets. The project focuses on using JavaScript to fetch products from an API and create an interactive shopping experience.

Product information comes from the Noroff Rainy Days API. The shopping cart is stored in the browser using localStorage.

I designed and developed the website myself.

Features include:

- Product listings with images, titles and prices.
- Discounted prices and sale labels.
- Search by product title
- Filters for men's and women's jackets.
- Individual product pages with information fetched using the product ID.
- Add-to-cart buttons with visual feedback.
- A shopping cart with quantity controls and item removal.
- A checkout summary with a calculated total.
- A confirmation page that clears the cart.
- Responsive layouts for desktop and mobile.

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- Noroff Rainy Days API
- localStorage

## Getting started

### Installing

Clone the repository:

```bash
git clone https://github.com/tommyaarstein/FED1-JS1-CA.git
```

Open the project folder:

```bash
cd FED1-JS1-CA
```

There are no packages to install and no build step.

### Running locally

Open the project in VS Code and use the Live Server extension to serve `index.html`.

Then you can also visit the page in your preferred browser using:

```text
http://localhost:3000
```

An internet connection is required to load products from the API.

## Usage

Browse the jackets, search by title or use the gender filters.

Open a product to view its details, or add it directly to the cart from the product listing.

On the checkout page, adjust quantities, remove products and review the total. Completing checkout opens the confirmation page and clrears the cart.

The checkout is a demonstration. No payment is processed and no real order is placed.

## Improvements for Portfolio 1

Based on teacher feedback, I moved repeated price formatting and cart badge updates into shared functions in `src/js/utils.js`.

- `formatPrice(price)` displays prices with a dollar sign and two decimal places.
- `updateCartBadge(itemCount)` updates the number shown beside the cart icon.

Product listings, product details and checkout now use the same price formatting function. Pages displaying the cart badge use the shared badge function.

The HTML pages load `utils.js` before their page-specific scripts.

This reduces repeated code and makes future changes easier to maintain.

## Contributing

This is an individual school assignment, so I am completing the implementation myself.

Feedback and suggestions are welcome through GitHub issues. Please describe the issue and include steps to reproduce it, along with your browser and screen size where relevant.

## Author

**Tommy Aarstein**

Front-end development student at Noroff, based in Tromsø, Norway.

- [Github](https://github.com/tommyaarstein)
- [Email](mailto:tommy@aarstein.no)

## Acknowledgements

- [Icons8](https://icons8.com/) for interface icons.