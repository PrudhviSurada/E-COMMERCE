// fetch.js
let allProducts = [];

// Fetch all products once
async function fetchData() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error Fetching products:", error);
    }
}

// Display products dynamically
function displayProducts(products) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = ""; // Clear old products

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
                        <button type="button" class="btn btn-dark ms-3">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter products by category
document.getElementById("filterButtons").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const category = e.target.getAttribute("data-category");
        if (category === "") {
            displayProducts(allProducts); // Show all
        } else {
            const filtered = allProducts.filter(p => p.category === category);
            displayProducts(filtered);
        }
    }
});

fetchData();