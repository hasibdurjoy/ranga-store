/* load products function  */

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
/* calling loadProducts function to load data  */
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("single-product");
    div.classList.add("text-center");
    div.innerHTML = `
    <div class="card h-100 ">
      <img src=${image} class="card-img-top product-image p-4" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p>Category: ${product.category}</p>
        <p>Rating : ${product.rating.rate} ( Total Review : ${product.rating.count} )</p>
        <h3>Price: $ ${product.price}</h3>
      </div>
      <div class="p-3 d-flex justify-content-around">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart <i class="fas fa-shopping-cart"></i></button>
        <button id="details-btn" class="btn btn-primary"><i class="fas fa-info-circle"></i> Details</button></div>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
    document.getElementById('loading-spinner').style.display = 'none';
  }
};

/* addto cart function  */
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

/* getInputValue function  */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

