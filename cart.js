// cart.js

// === Utility Functions ===

// Get cart from localStorage (or start empty)
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save updated cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// === DOM Elements ===
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// === Render Cart ===
function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="text-gray-300 text-center text-lg">Your cart is empty.</p>
    `;
    cartTotal.textContent = "Ksh 0";
    cartCount.textContent = 0;
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const cartItem = document.createElement("div");
    cartItem.className = "flex items-center bg-white/10 p-4 rounded-xl shadow-md justify-between";

    cartItem.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
        <div>
          <h3 class="text-xl font-bold">${item.name}</h3>
          <p class="text-gray-300">Ksh ${item.price.toLocaleString()}</p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <button class="decrease bg-gray-600 px-2 py-1 rounded-lg hover:bg-gray-500" data-id="${item.id}">-</button>
        <span class="font-bold">${item.quantity}</span>
        <button class="increase bg-gray-600 px-2 py-1 rounded-lg hover:bg-gray-500" data-id="${item.id}">+</button>
        <button class="remove text-red-500 text-lg ml-4 hover:text-red-400" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update totals
  cartTotal.textContent = `Ksh ${total.toLocaleString()}`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// === Handle Clicks (Increase, Decrease, Remove) ===
cartItemsContainer.addEventListener("click", (e) => {
  const cart = getCart();
  const id = parseInt(e.target.dataset.id);

  if (e.target.classList.contains("increase")) {
    const product = cart.find((item) => item.id === id);
    if (product) product.quantity++;
  } 
  else if (e.target.classList.contains("decrease")) {
    const product = cart.find((item) => item.id === id);
    if (product && product.quantity > 1) product.quantity--;
  } 
  else if (e.target.closest(".remove")) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
});

// === Checkout Button ===
document.getElementById("checkout-btn").addEventListener("click", () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  // You can redirect to checkout.html or payment page here.
});

// === Initialize ===
document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
