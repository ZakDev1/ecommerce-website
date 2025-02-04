function renderCart() {
    // Calculate total number of items
    const totalItems = CartState.state.items.reduce((total, item) => total + 1 * item.quantity, 0);

    // Set the total number of cart items and the total wherever required
    document.querySelectorAll(".cart-number").forEach(item => {
        item.textContent = totalItems
    })
    document.querySelectorAll("[data-cart-total]").forEach(el => {
        el.innerHTML = "£" + getCartTotal().toFixed(2)
    })

    // Get the cart sidebar, clear the items inside and append the new items
    const cartItemContainer = document.querySelector(".cart-item-container");

    if (!cartItemContainer) return;

    cartItemContainer.innerHTML = ""; 

    CartState.state.items.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-product">
                <img src="../imgs/featured1.jpg" alt="${item.name}" />
                <div class="cart-product-info">
                    <h1>${item.name}</h1>
                    <p>${item.quantity} x £${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" onclick="removeFromCart(${item.id})">
                <i class="fa-regular fa-circle-xmark"></i>
            </button>
        `;
        cartItemContainer.appendChild(cartItem);
    });
}


document.addEventListener("DOMContentLoaded", () => {

    // Add the active class to the page which is currently open
    const links = document.querySelectorAll(".nav-item"); 
    const currentURL = window.location.pathname + window.location.search; 
    

    links.forEach(link => {
        if (link.pathname + link.search === currentURL) {
            link.classList.add("active");
        }
    });
    

    // Setup a listener to the cartUpdated event
    CartState.eventTarget.addEventListener("cartUpdated", renderCart)

    // Render the cart when the page loads
    renderCart()

        // Setup the mobile menu sidebar, listen for the open and close buttons

        document.querySelector(".bars").addEventListener("click", function () {
            console.log("hello")
            const sidebar = document.querySelector(".mobile-sidebar")
            sidebar.classList.add("mobile-sidebar-active")
    
            document.querySelector(".mobile-sidebar-close").addEventListener("click", function() {
                sidebar.classList.remove("mobile-sidebar-active")
    
            })
        })
        

    // Setup the cart sidebar, listen for the open and close buttons
    const sidebarClose = document.querySelector(".cart-sidebar-close");
    if(!sidebarClose) return;
    sidebarClose.addEventListener("click", function () {
        const sidebar = document.querySelector(".cart-sidebar");
        sidebar.classList.remove("cart-sidebar-active");
    })
    
    document.querySelectorAll(".cart").forEach(item => {
        item.addEventListener("click", function () {
            console.log('hello')
            const sidebar = document.querySelector(".cart-sidebar");
            sidebar.classList.add("cart-sidebar-active");
        })
    })
});
