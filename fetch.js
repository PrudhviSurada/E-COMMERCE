let allProducts = [];

// Fetch products
async function fetchData() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();

        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display products on the home page
function displayProducts(products) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card m-2" style="width: 23rem; height: 33rem;">
                <img src="${product.image}" class="card-img-top h-50 p-3" alt="Product Image">
                <div class="card-body">
                    <h5 class="card-title text-center">${product.title.substring(0, 13)}...</h5>
                    <p class="card-text text-center">${product.description.substring(0, 90)}...</p>
                    <hr>
                    <p class="text-center">$${product.price}</p>
                    <hr>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-dark ms-5">Details</button>
                        <a href="./cart.html"><button type="button" class="btn btn-dark ms-3 addCartBtn" data-id="${product.id}" id="productId">Add to Cart</button></a>
                    </div>
                </div>
            </div>
        `;
    });
}

//Adding filtering functionality
document.getElementById("filterButtons").addEventListener("click", (e) => { 
    if(e.target.tagName === "BUTTON") {
        const category = e.target.getAttribute("data-category");
        if(category === "") {
            displayProducts(allProducts);
        }
        else {
            const filteredProducts = allProducts.filter(p => p.category === category);
            displayProducts(filteredProducts)
        }
    }
}
);
fetchData();


// cart.js
// Add product to cart
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addCartBtn")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = allProducts.find(p => p.id === productId);

        if (product) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.title.substring()} added to cart!`);
        }
    }
});