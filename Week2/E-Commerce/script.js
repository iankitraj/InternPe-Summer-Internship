/* ================= PRODUCTS ================= */
const products = [
    { id: 1, name: "Men Running Shoes", price: 1999, cat: "Men", rating: 4.5, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
    { id: 2, name: "Casual Sneakers", price: 2499, cat: "Men", rating: 4.4, img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" },
    { id: 3, name: "Women Party Dress", price: 2299, cat: "Women", rating: 4.6, img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
    { id: 4, name: "Women Handbag", price: 1899, cat: "Fashion", rating: 4.3, img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" },
    { id: 5, name: "Kids Shoes", price: 1499, cat: "Kids", rating: 4.2, img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" },
    { id: 6, name: "Smart Watch", price: 2999, cat: "Electronics", rating: 4.4, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
    { id: 7, name: "Wireless Headphones", price: 1999, cat: "Electronics", rating: 4.5, img: "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg" },
    { id: 8, name: "Sunglasses", price: 999, cat: "Fashion", rating: 4.1, img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg" },
    { id: 9, name: "Formal Shirt", price: 1599, cat: "Men", rating: 4.3, img: "https://hamercop.com/cdn/shop/files/3507_6_800x.jpg?v=1728468025" },
    { id: 10, name: "Summer Dress", price: 1799, cat: "Women", rating: 4.5, img: "https://images.pexels.com/photos/35438040/pexels-photo-35438040.jpeg" },
    { id: 11, name: "Kids T-shirt", price: 799, cat: "Kids", rating: 4.0, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDzEG7IAYoSES2X1ROkmglyE8Qzjh4cLWWQ&s" },
    { id: 12, name: "Bluetooth Speaker", price: 1499, cat: "Electronics", rating: 4.4, img: "https://www.coconutlife.in/cdn/shop/files/jpeg-optimizer_DSC07249copy.jpg?v=1701510661" }
];

/* ================= CART ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAFE CART COUNT ================= */
function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    el.innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}
updateCartCount();

/* ================= PRODUCT PAGE ================= */
const productList = document.getElementById("product-list");
if (productList) renderProducts(products);

function renderProducts(list) {
    if (!productList) return;
    productList.innerHTML = "";
    list.forEach(p => {
        productList.innerHTML += `
        <div class="card fade">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <div class="rating">⭐ ${p.rating}</div>
            <p class="price">₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else {
        const p = products.find(p => p.id === id);
        cart.push({ ...p, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* ================= SEARCH (SAFE) ================= */
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

if (searchInput && categorySelect) {
    searchInput.addEventListener("input", filterAll);
    categorySelect.addEventListener("change", filterAll);
}

function filterAll() {
    const q = searchInput.value.toLowerCase();
    const c = categorySelect.value;

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(q) &&
        (c === "all" || p.cat === c)
    );
    renderProducts(filtered);
}

/* ================= CART PAGE ================= */
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    if (!cartItemsDiv || !totalPriceEl) return;

    function renderCart() {
        cartItemsDiv.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<h2>Your cart is empty 🛒</h2>";
            totalPriceEl.innerText = 0;
            return;
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p class="cart-price">₹${item.price} × ${item.qty} = ₹${itemTotal}</p>
                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            </div>`;
        });

        totalPriceEl.innerText = total;
    }

    window.changeQty = (index, change) => {
        cart[index].qty += change;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    window.removeItem = index => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    renderCart();
});

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

/* APPLY SAVED THEME */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

/* ================= USER ACCOUNT DROPDOWN ================= */
function toggleMenu() {
    const dropdown = document.getElementById("userDropdown");
    if (!dropdown) return;

    dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
}

/* CLOSE DROPDOWN WHEN CLICK OUTSIDE */
window.addEventListener("click", (e) => {
    const menu = document.querySelector(".user-menu");
    const dropdown = document.getElementById("userDropdown");

    if (!menu || !dropdown) return;

    if (!menu.contains(e.target)) {
        dropdown.style.display = "none";
    }
});
/* ================= CHECKOUT ================= */
function placeOrder(event) {
    event.preventDefault(); // stop default form submission

    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const email = document.getElementById("email");

    // extra safety check
    if (!name.value || !address.value || !email.value) {
        alert("Please fill all details");
        return;
    }

    // clear cart
    localStorage.removeItem("cart");

    // redirect to success page
    window.location.href = "success.html";
}
