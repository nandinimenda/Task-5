const products = [
  { id: 1, name: "Smartphone",          price: 499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9NSwB9QA5e4USwYnvtJ8Y-kV5dX_jcnMNmQ&s" },
  { id: 2, name: "Laptop",              price: 899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvc1jALTaoQwM1e6RyOnGERUh9ZVyE2zFU1A&s" },
  { id: 3, name: "Headphones",          price: 199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYQa85E--Otd4KtO33jM8rvaMpCes24twaQ&s" },
  { id: 4, name: "Smartwatch",          price: 149, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrs3861t6SjhSuV_1kHLbM9lOfNGVeCBjR-A&s" },
  { id: 5, name: "Bluetooth Speaker",   price: 89,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvccTUDzw6tPZQFuVtowTsK5yh7TwYBNE0w&s" },
  { id: 6, name: "Gaming Mouse",        price: 49,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiuF9P7FqrECWpKITttTYevKVHVrlzwDneg&s" },
  { id: 7, name: "Mechanical Keyboard", price: 99,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQUjvIges70HZekIWscF4j1iGRV3fcl6dkRg&s" },
  { id: 8, name: "Tablet",              price: 399, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgGe5WcPt8PAy2cwisG9_eyqN7CTUfFy-2A&s" }
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const $ = sel => document.querySelector(sel);
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));
const formatCurrency = n => $${n.toFixed(2)};

function displayProducts() {
  const container = $("#product-list");
  container.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
      <h3>${p.name}</h3>
      <p>${formatCurrency(p.price)}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const inCart  = cart.find(item => item.id === id);
  if (inCart) {
    inCart.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  displayCart();
  alert(${product.name} added to cart);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  displayCart();
}

function displayCart() {
  const container = $("#cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    $("#total").textContent = "";
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="product">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)} × ${item.qty}</p>
        <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  }).join("");
  $("#total").textContent = Total: ${formatCurrency(total)};
}

$("#checkout-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) return alert("Your cart is empty!");
  alert("Order placed successfully! Thank you for shopping with us.");
  cart = [];
  saveCart();
  displayCart();
  e.target.reset();
});

/* SPA-style section navigation */
document.querySelectorAll('nav a[data-section], .btn[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const trg = link.dataset.section;
    document.querySelectorAll('.section').forEach(sec =>
      sec.classList.toggle('active', sec.id === trg)
    );
    if (trg === "cart") displayCart();
    if (trg === "products") window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

displayProducts();
displayCart();
