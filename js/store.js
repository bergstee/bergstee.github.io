// SideQuest Co retail store front.
// Catalog comes live from the etsyapp API; the cart lives in localStorage.
// Prices shown here are display-only — the server re-prices everything from
// its own database when the Stripe Checkout session is created.

const STORE_API = 'https://shop-api.steph-server.ca/store';
const CART_KEY = 'sqc_cart_v1';

// ---------------------------------------------------------------- cart state
function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
}
function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    updateCartBadge();
}
function cartCount() {
    return loadCart().reduce((n, l) => n + l.quantity, 0);
}
function updateCartBadge() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = cartCount() > 0 ? `(${cartCount()})` : '';
}
function lineKey(listingId, variations) {
    return listingId + '|' + JSON.stringify(variations || {});
}
function addToCart(product, quantity, variations) {
    const cart = loadCart();
    const key = lineKey(product.listing_id, variations);
    const existing = cart.find(l => l.key === key);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            key,
            listing_id: product.listing_id,
            title: product.title,
            price: parseFloat(product.price),
            image_url: product.image_url,
            quantity,
            variations: variations || {}
        });
    }
    saveCart(cart);
}
function setQuantity(key, quantity) {
    let cart = loadCart();
    const line = cart.find(l => l.key === key);
    if (line) line.quantity = quantity;
    cart = cart.filter(l => l.quantity > 0);
    saveCart(cart);
}

// --------------------------------------------------------------- catalog api
async function fetchProducts() {
    const res = await fetch(`${STORE_API}/api/products`);
    if (!res.ok) throw new Error('Could not load products');
    return (await res.json()).products;
}

// ------------------------------------------------------------------ checkout
async function startCheckout(country) {
    const cart = loadCart();
    if (cart.length === 0) return;
    const btn = document.getElementById('checkout-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Redirecting…'; }
    try {
        const res = await fetch(`${STORE_API}/api/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country,
                items: cart.map(l => ({
                    listing_id: l.listing_id,
                    quantity: l.quantity,
                    variations: Object.keys(l.variations || {}).length ? l.variations : undefined
                }))
            })
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
        window.location.href = data.url;
    } catch (err) {
        alert(err.message || 'Sorry, checkout is unavailable right now.');
        if (btn) { btn.disabled = false; btn.textContent = 'Checkout'; }
    }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
