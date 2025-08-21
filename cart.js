function displayCart() {
    const container = document.getElementById("productsContainer");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        emptyCart();
        return;
    }

    // Cart items (left column)
    let cartItemsHTML = cart.map(product => `
        <div class="border p-3 mx-3 mt-0 d-flex align-items-center">
            <img src="${product.image}" style="height : 120px; object-fit: contain;" class="me-3">
            <div>
                <b>${product.title}</b>
                <p class="mb-0">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join("");

    // Order Summary (right column)
    let totalItems = cart.length;
    let productsTotal = cart.reduce((sum, item) => sum + item.price, 0);
    let shipping = totalItems * 5;
    let grandTotal = productsTotal + shipping;

    let orderSummaryHTML = `
        <div class="border rounded">
            <h5 class="bg-light p-3 border border-bottom">Order Summary</h5>
            
            <p class="text-secondary m-3">Products (${totalItems}) 
                <span class="float-end">$${productsTotal.toFixed(2)}</span>
            </p>
            <p class="text-secondary m-3">Shipping 
                <span class="float-end">$${shipping.toFixed(2)}</span>
            </p>
            <h5 class="m-3">Total 
                <span class="float-end">$${grandTotal.toFixed(2)}</span>
            </h5>
            <div class="p-3">
                <button type="button" class="btn btn-dark w-100" id="checkoutBtn">Go to Checkout</button>
            </div>
        </div>
    `;

    // Combine into 2-column layout
    container.innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <h4 class="mx-3 mb-0 bg-light p-3 border border-bottom-0">Item List</h4>
                ${cartItemsHTML}
            </div>
            <div class="col-md-4">
                ${orderSummaryHTML}
            </div>
        </div>
    `;
}

function emptyCart() {
    document.getElementById("productsContainer").innerHTML = `
        <div class="p-5 bg-light text-center rounded">
            <h3>Your Cart is Empty</h3>
            <a href="./index.html" class="btn btn-outline-dark mt-3"><-  Continue Shopping</a>
        </div>
    `;
}

displayCart();

//clearing the cart items
document.getElementById("checkoutBtn").addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
    emptyCart();
});


//increment and decrement functionality should be added
