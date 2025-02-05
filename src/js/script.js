function renderCart() {
    const { items } = CartState.state;
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    // Update cart number and total price
    document.querySelectorAll(".cart-number").forEach(el => el.textContent = totalItems);
    document.querySelectorAll("[data-cart-total]").forEach(el => el.textContent = `£${getCartTotal().toFixed(2)}`);

    const cartItemContainer = document.querySelector(".cart-item-container");
    if (!cartItemContainer) return;

    cartItemContainer.innerHTML = items.map(item => `
        <div class="cart-item">
            <div class="cart-product">
                <img src="../imgs/featured1.jpg" alt="${item.name}" />
                <div class="cart-product-info">
                    <h1>${item.name}</h1>
                    <p>${item.quantity} x £${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    `).join("");

    // Add event listeners for removing items
    cartItemContainer.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const currentURL = window.location.pathname + window.location.search;

    // Highlight active navigation item
    document.querySelectorAll(".nav-item").forEach(link => {
        if (link.pathname + link.search === currentURL) {
            link.classList.add("active");
        }
    });

    // Handle mobile sidebar toggling
    function toggleSidebar(selector, isOpen) {
        const sidebar = document.querySelector(selector);
        if (sidebar) sidebar.classList.toggle("mobile-sidebar-active", isOpen);
    }

    document.querySelector(".bars")?.addEventListener("click", () => toggleSidebar(".mobile-sidebar", true));
    document.querySelector(".mobile-sidebar-close")?.addEventListener("click", () => toggleSidebar(".mobile-sidebar", false));

    // Handle cart sidebar toggling
    document.querySelectorAll(".cart").forEach(item => {
        item.addEventListener("click", () => toggleSidebar(".cart-sidebar", true));
    });

    document.querySelector(".cart-sidebar-close")?.addEventListener("click", () => toggleSidebar(".cart-sidebar", false));

    // Listen for cart updates
    CartState.eventTarget.addEventListener("cartUpdated", renderCart);
    
    // Initial render
    renderCart();
});
