import { products } from './temp.js';

function getSlugFromURL() {
    return new URLSearchParams(window.location.search).get('slug');
}

function updateProductContent() {
    const slug = getSlugFromURL();
    const product = products.find(p => p.id === slug);

    if (!product) {
        window.location.href = "/src/html/";
        return;
    }

    const setTextContent = (selector, value) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    };

    setTextContent(".product-title", product.title);
    setTextContent(".product-description", product.description);
    document.querySelectorAll(".product-price").forEach(el => el.textContent = `£${product.price}`);

    const productImage = document.querySelector(".product-image");
    if (productImage) {
        productImage.src = `../imgs/${product.image}`;
        productImage.alt = product.title || "Product Image";
    }
}

document.addEventListener("DOMContentLoaded", updateProductContent);
