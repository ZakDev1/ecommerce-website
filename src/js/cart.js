const CartState = (() => {
    const storageKey = "cart";
    const eventTarget = new EventTarget();

    // Either load the cart from local storage or setup a new array if local storage isn't present
    const initialState = JSON.parse(localStorage.getItem(storageKey)) || { 
        items: [], 
        discountAmount: 0,  
        discountPercentage: 0, 
    };

    // Setup a reactive state which sends an event when the state is updated to the listener setup in script.js
    function createReactiveState(obj) {
        return new Proxy(obj, {
            set(target, key, value) {
                target[key] = value;
                localStorage.setItem(storageKey, JSON.stringify(CartState.state));
                eventTarget.dispatchEvent(new Event("cartUpdated"));
                return true;
            }
        });
    }

    // Create the reactive state
    const state = createReactiveState(initialState);

    // Return the state and event target so it can be used in other files
    return { state, eventTarget };
})();

// Setup the functions which are being used in other files
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProductIndex = CartState.state.items.findIndex(item => item.id === product.id);

    // If the product is already in the cart, update the quantity, else add the new product and update the total quantity
    if (existingProductIndex !== -1) {
        const updatedItems = [...CartState.state.items];
        updatedItems[existingProductIndex].quantity += 1;  
        
        CartState.state.items = updatedItems;
    } else {
        product.quantity = 1;
        CartState.state.items = [...CartState.state.items, product];  
    }
}


function removeFromCart(productId) {
    // Check if the product is already in the cart
    const cartItem = CartState.state.items.find(item => item.id === productId);
    const existingProductIndex = CartState.state.items.findIndex(item => item.id === productId);

    // If the product is already in the cart remove 1 from the total quantity, else remove the product
    if(cartItem.quantity > 1) {
        const updatedItems = [...CartState.state.items]
        updatedItems[existingProductIndex].quantity -= 1
        CartState.state.items = updatedItems
    } else {
        CartState.state.items = CartState.state.items.filter(item => item.id !== productId)
    }
}

// Clear the cart
function clearCart() {
    CartState.state.items = []
    localStorage.removeItem("cart")
}

// Get the total of the cart
function getCartTotal() {
    let subtotal = CartState.state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return Math.max(0, subtotal); 
}

// Apply discounts
function applyFixedDiscount(amount) {
    CartState.state.discountAmount = amount;
}

function applyPercentageDiscount(percent) {
    CartState.state.discountPercentage = percent;
}

// Remove discounts
function removeFixedDiscount() {
    CartState.state.discountAmount = 0;
}

function removePercentageDiscount() {
    CartState.state.discountPercentage = 0;
}

