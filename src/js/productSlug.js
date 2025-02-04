import { products } from './temp.js'

function getSlugFromURL() {
    // Get the slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

function updateProductContent() {
    const slug = getSlugFromURL();

    // Find the products that matches the slug
    const product = products.find(p => p.id === slug);

    // If theres a product then update the content, if no product return to the home page
    if (product) {
        document.querySelector(".product-title").innerText = product.title;
        document.querySelector(".product-description").innerText = product.description;
        document.querySelector(".product-image").src = `../imgs/${product.image}`;
        document.querySelectorAll(".product-price").forEach(element => {
            element.innerText = "£" + product.price
        })
    } else {
        window.location.href = "/src/html/";
    }
}

// Setup the listener when the page loads
document.addEventListener("DOMContentLoaded", updateProductContent);