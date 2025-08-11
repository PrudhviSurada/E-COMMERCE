async function fetchData() {
    for(let i=1;i<=20;i++) {
    try {                           
        const response=await fetch("https://fakestoreapi.com/products/"+i);
        const product=await response.json();
        document.getElementById("img"+i).src=`${product.image}`;
        document.getElementById("title"+i).innerHTML=`${product.title.substring(0,13)}...`;
        document.getElementById("des"+i).innerHTML=`${product.description.substring(0,90)}...`;
        document.getElementById("price"+i).innerHTML=`$ ${product.price}`;
        }
    catch(error) {
        console.error("Error Fetching product:",error);
        }
}
}
fetchData();