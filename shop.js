// shop.js

// Example product data
const products = [
  { id: 1, name: "iPhone 12", category: "phone", price: 75000, image: "img/products/iphone12.jpg" },
  { id: 2, name: "HP EliteBook", category: "laptop", price: 68000, image: "img/products/hp.jpg" },
  { id: 3, name: "Samsung Galaxy S22", category: "phone", price: 90000, image: "img/products/s22.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
  { id: 4, name: "Dell Latitude 7420", category: "laptop", price: 72000, image: "img/products/dell.jpg" },
];

// Select elements
const shopGrid = document.getElementById("shop-grid");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter-category");

// Render products
function renderProducts(items) {
  shopGrid.innerHTML = "";
  if (items.length === 0) {
    shopGrid.innerHTML = `<p class="text-gray-300 col-span-full text-center">No products found.</p>`;
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "bg-white/10 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
        <p class="text-gray-300 mb-2 capitalize">${product.category}</p>
        <p class="text-green-400 font-semibold mb-3">Ksh ${product.price.toLocaleString()}</p>
         <button 
          class="add-to-cart bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg w-full transition"
          data-id="${product.id}">
          Add to Cart
        </button>
    `;
    shopGrid.appendChild(card);
  });
}

// Filter + Search Logic
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = filterSelect.value;

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);

}

// Event listeners
searchInput.addEventListener("input", filterProducts);
filterSelect.addEventListener("change", filterProducts);



// Handle add to cart
shopGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }
});

// Initial load
renderProducts(products);

