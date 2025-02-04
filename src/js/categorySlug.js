import { products } from './temp.js'

function getSlugFromURL() {
    // Get the slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

let currentPage = 1;
const itemsPerPage = 12; 


// Paginate the products ( split up the products onto separate pages )
function getPaginatedProducts(products) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
}

function updatePaginationUI(totalItems) {
    const start = (totalItems > 0) ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const end = Math.min(start + itemsPerPage - 1, totalItems);

    document.querySelectorAll("[data-pagination-info]").forEach(el => {
        el.innerHTML = `Showing ${start} - ${end} of ${totalItems} results`;
    });
}

function insertProducts(filteredProducts) {
    const productContainer = document.querySelector(".products")

    // Clear the product container
    productContainer.innerHTML = ""

    // Insert the products into the container 
    filteredProducts.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("product-card");
    
        cartItem.innerHTML = `
            <div class="product-card" onclick="window.location.href = 'product.html?slug=${item.id}'">
                <img class="featured1" src="../imgs/${item.image}" alt="${item.title}"/>
                <div class="product-card-text">
                    <h1 class="product-title">${item.title}</h1>
                    <h1 class="product-gender">${item.categories[0].charAt(0).toUpperCase() + item.categories[0].slice(1)}</h1>
                    <p class="product-price">£${item.price}</p>
                </div>
            </div>
        `;
        productContainer.appendChild(cartItem);
    });
}


function updateProductContent(filteredProducts) {
    // Update the category count
    document.getElementById("accessories-count").textContent = "(" + products.filter(item => item.categories.includes("accessories")).length + ")"
    document.getElementById("men-count").textContent = "(" + products.filter(item => item.categories.includes("men")).length + ")"
    document.getElementById("women-count").textContent = "(" + products.filter(item => item.categories.includes("women")).length + ")"
    
    
    insertProducts(filteredProducts)
    updatePaginationUI(filteredProducts.length);


    // Get the best seller container
    const bestSellerContainer = document.getElementById("best-sellers");

    const bestSellerCount = products.filter(item => item.bestSeller).length;

    // Apply the best seller items into the container
    products.forEach((item, index) => {
        if(item.bestSeller) {
            const bestSellerItem = document.createElement("div");
            bestSellerItem.classList.add("best-seller");
    
            bestSellerItem.innerHTML = `
                <div class="best-seller">
                    <img src="../imgs/featured1.jpg" alt="Best Seller">
                    <div>
                        <h1>${item.title}</h1> <!-- Use dynamic title -->
                        <p>£${item.price}</p> <!-- Use dynamic price -->
                    </div>
                </div>
            `;
    
            bestSellerContainer.appendChild(bestSellerItem);

            // Apply the divider between the best seller items, ignoring the last item
            if (index !== bestSellerCount - 1) {
                const divider = document.createElement("div");
                divider.classList.add("divider-long");
                bestSellerContainer.appendChild(divider);
            }
        }
    });
    

}

document.addEventListener("DOMContentLoaded", () => {
    // Get the slug when the page loads
    const slug = getSlugFromURL();

    // Paginate the products where the slug matches the categories of any products
    const filteredProducts = getPaginatedProducts(slug ? products.filter(item => item.categories.includes(slug)) : products);

    updateProductContent(filteredProducts);

    // Setup a listener for the search box
    document.getElementById("search-form").addEventListener("submit", (e) => {
        // Prevent Default ( the page refreshing when the form is submitted )
        e.preventDefault()

        // Get the search input
        const searchInput = document.getElementById("search-input").value.trim()

        // Filter the products based on the search item
        const searchedProducts = filteredProducts.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()))

        // Update the products
        insertProducts(searchedProducts)

    })
});