function displayCart() {
    const container = document.getElementById("productsContainer");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        emptyCart();
        return;
    }

    // Cart items (left column)
    let cartItemsHTML = cart.map((product, index) => `
        <div class="border p-3 mx-3 mt-0 d-flex align-items-center">
            <img src="${product.image}" style="height:160px; object-fit:contain;" class="ms-4">
            <div class="flex-grow-1 text-center p-2">
                <h5>${product.title}</h5>
            </div>
            <div class="me-3">
                <div class="d-flex align-items-center justify-content-around">
                    <button class="btn btn-sm btn-outline-dark me-2" onclick="updateQuantity(${index}, 'decrement')">-</button>
                    <span>${product.quantity || 1}</span>
                    <button class="btn btn-sm btn-outline-dark ms-2" onclick="updateQuantity(${index}, 'increment')">+</button>
                </div>
                <p class="m-3">$${(product.price * (product.quantity || 1)).toFixed(2)}</p>
            </div>
        </div>
    `).join("");

    // Order Summary (right column)
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    let productsTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
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

    // Reattach checkout button event
    document.getElementById("checkoutBtn").addEventListener("click", () => {
        localStorage.removeItem("cart");
        alert("Thank you for your purchase!");
        emptyCart();
    });
}

function updateQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart[index];

    // If product has no quantity yet, set default = 1
    if (!product.quantity) product.quantity = 1;

    if (action === "increment") {
        product.quantity++;
    } else if (action === "decrement") {
        product.quantity--;
        // Remove item if quantity is 0 or less
        if (product.quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
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
