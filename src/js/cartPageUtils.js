function UpdateTotal() {

    // Get the total of the cart
    let subtotal = getCartTotal()

    // Apply discounts
    if (CartState.state.discountPercentage > 0) {
        subtotal -= subtotal * (CartState.state.discountPercentage / 100);
    }

    // Take off the discounts, if any
    subtotal -= CartState.state.discountAmount;

    // Get the amount the discount has taken off 
    const discountValue = getCartTotal() - subtotal
    
    // Apply the above values to the HTML
    document.getElementById("cart-discount").textContent = "-£" + discountValue.toFixed(2)
    document.getElementById("cart-total").textContent = "£" + subtotal.toFixed(2)

}

document.addEventListener("DOMContentLoaded", () => {   
 
    // Update the total when the page is loaded
    const cartItemContainer = document.querySelector(".cart-table-body");
    UpdateTotal()

    // Check if there are any discounts
    if(CartState.state.discountAmount > 0 || CartState.state.discountPercentage > 0) {
        // If there are discounts, remove the add coupon button and show the remove coupon button
        document.getElementById("coupon-form").classList.add("hidden")
        document.getElementById("remove-coupon").classList.remove("hidden")

        // Setup a listener to the remove coupon button
        document.getElementById("remove-coupon").addEventListener("click", function () {
            CartState.state.discountPercentage = 0
            CartState.state.discountAmount = 0
            UpdateTotal()

            // When the coupon is removed, show the add coupon button and hide the remove coupon button
            document.getElementById("coupon-form").classList.remove("hidden")
            document.getElementById("remove-coupon").classList.add("hidden")
        })
    }

    if (!cartItemContainer) return;

    // Add the cart items to the cart table
    CartState.state.items.forEach(item => {
        const cartItem = document.createElement("tr");

        cartItem.innerHTML = `
            <tr class="cart-item">
                <td>  
                    <div class="cart-item-misc">
                        <button class="cart-item-remove">
                            <i class="fa-regular fa-circle-xmark"></i>
                            </button>
                            <img src="../imgs/featured1.jpg" alt="${item.name}}" />
                    </div>          
                </td>
                <td>${item.name}</td>
                <td>£${item.price}</td>
                <td>
                    <input type="number" min="0" max="99" value="${item.quantity}" class="input-box"/>
                </td>
                <td>
                £${item.price * item.quantity}
              </td>
            </tr>
        `;
        cartItemContainer.appendChild(cartItem);
    });

    document.getElementById("coupon-form").addEventListener("submit", async function(e) { 
        e.preventDefault()

        const couponCode = document.getElementById("coupon-input").value.trim()
        const couponAlertContainer = document.querySelector(".cart-alert-message")
        const couponIcon = document.getElementById("cart-alert-icon")
        const couponMessage = document.getElementById("cart-alert-message")

        // Set fixed coupons, this should be replaced with a backend call
        const coupons = [ { code: "10OFF", value: 10, expired: false }, { code: "20OFF", value: 20, expired: true }, { code: "50OFF", value: 50, expired: false} ]

        // Clear the coupon message and icon ( the error message )
        couponIcon.innerHTML = ""
        couponMessage.innerText = ""

        // If theres no coupon return an error
        if(couponCode == "") {
            couponAlertContainer.classList.add("error")
            couponIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>'
            couponMessage.innerText = "Please enter a coupon"
            return
            
        }

        // If a coupon has already been added return an error
        if(CartState.state.discountPercentage > 0 || CartState.state.discountAmount > 0) {
            couponAlertContainer.classList.remove("success")
            couponAlertContainer.classList.add("error")
            couponIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>'
            couponMessage.innerText = "You have already entered a coupon"
            return
        }

        // If the coupon is expired return an error. If its successful return a message and apply the coupon
        const enteredCoupon = coupons.find(c => c.code == couponCode)
        if(enteredCoupon) {
            if(enteredCoupon.expired) {
                couponAlertContainer.classList.remove("success")
                couponAlertContainer.classList.add("error")
                couponIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>'
                couponMessage.innerText = "This coupon has expired"
                return
            } else {
                couponAlertContainer.classList.remove("error")
                couponAlertContainer.classList.add("success")
                couponIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
                couponMessage.innerText = "Coupon applied successfully"

                applyPercentageDiscount(enteredCoupon.value)
                UpdateTotal()

                document.getElementById("coupon-form").classList.add("hidden")
                document.getElementById("remove-coupon").classList.remove("hidden")
        
                document.getElementById("remove-coupon").addEventListener("click", function () {
                    CartState.state.discountPercentage = 0
                    CartState.state.discountAmount = 0
                    UpdateTotal()
        
                    document.getElementById("coupon-form").classList.remove("hidden")
                    document.getElementById("remove-coupon").classList.add("hidden")
                })
                
                return
            }
        } else {
            couponAlertContainer.classList.remove("success")
            couponAlertContainer.classList.add("error")
            couponIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>'
            couponMessage.innerText = "This coupon does not exist"
        }
    })

})