function fetchAndPopulateProducts(categoryId){
    // Fetch JSON data using fetch API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json').then(response=>response.json()).then(data=>{
        const category=data.categories.find( cat=>cat.category_name.toLowerCase()===categoryId);
        console.log(category)
        console.log(categoryId)
        const productsContainer=document.getElementById(categoryId);

        // Clear previous products
        productsContainer.innerHTML = '';

        category.category_products.forEach(product=>{
            const productCard=document.createElement("div");
            productCard.classList.add("card");

           //Element create product card
           productCard.innerHTML=`
           <div class="card">
        <div class="Imgwrap">
            <div id="ProductImg" class="ProductImg">
                <img src="${product.image}" alt="${product.title}" />
                <div class="FeatureTag">${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}</div>
                </div>
            </div>
              <div class="cardContent">
                <div id="" class="productNameSection">
                  <h3 id="ProductName">${product.title.slice(0,12)}</h3>
                  <i class="fa-solid fa-circle"></i>
                  <p id="ProductBrand">${product.vendor}</p>
                </div>
                <div class="priceSection">
                  <div id="Price">
                      <p id="discountPrice">Rs <span  >${product.compare_at_price}</span></p>
                      <p id="MRPprice"><span>${product.price}</span></p>
                  </div>
                  <p id="discount">${calculatePercentageOff(product.price, product.compare_at_price)}%<span>Off</span></p>
                </div>
                <button>Add to Cart</button>
              </div>
      </div>
      `
           productsContainer.appendChild(productCard);
           productsContainer.style.display="flex";

        })
    }).catch(error=>console.error("ERROR 404 !!!- ",error))
}


// Function to calculate percentage off
function calculatePercentageOff(price, compareAtPrice) {
    const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(percentageOff);
}

// Function to open category tab
function openCategory(evt, categoryName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.productsSection');
    tabContents.forEach(tabContent => {
        tabContent.style.display = 'none';
    });
    // Fetch and populate products for the selected category
    fetchAndPopulateProducts(categoryName);
    document.getElementById(categoryName).style.display = 'block';
}

// Show default category tab content on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('men').style.display = 'block';
    fetchAndPopulateProducts('men');
});