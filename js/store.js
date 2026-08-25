// SideQuest Co retail store front.
// Catalog comes live from the etsyapp API; the cart lives in localStorage.
// Prices shown here are display-only — the server re-prices every line from
// its own database (and the Etsy variant matrix) when checkout is created.

const STORE_API = 'https://shop-api.steph-server.ca/store';
const CART_KEY = 'sqc_cart_v1';
const COUNTRY_KEY = 'sqc_country';

// ------------------------------------------------------------------ country
// US buyers are quoted in USD (duty prepaid); Canadians in CAD.
function getCountry() {
    try {
        const saved = localStorage.getItem(COUNTRY_KEY);
        if (saved === 'US' || saved === 'CA') return saved;
    } catch (e) {}
    // Best-effort guess from the browser's timezone; the shopper can change it.
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Kentucky|Boise|Juneau|Honolulu)/.test(tz)) return 'US';
    } catch (e) {}
    return 'CA';
}
function setCountry(c) {
    try { localStorage.setItem(COUNTRY_KEY, c); } catch (e) {}
    // Prices are country-specific, so a cart priced in the other currency is stale.
    try { localStorage.removeItem(CART_KEY); } catch (e) {}
}
function currencyLabel(country) { return country === 'US' ? 'USD' : 'CAD'; }
function money(amount, country) {
    return `${currencyLabel(country)} $${Number(amount).toFixed(2)}`;
}

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
function addToCart(product, quantity, variations, unitPrice) {
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
            price: Number(unitPrice != null ? unitPrice : product.price),
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
async function fetchProducts(country) {
    const res = await fetch(`${STORE_API}/api/products?country=${encodeURIComponent(country || getCountry())}`);
    if (!res.ok) throw new Error('Could not load products');
    return await res.json();   // {country, currency, products}
}

/** Price for a chosen combination, falling back to the product's base price. */
function variantPrice(product, selection) {
    if (!product.variants || product.variants.length === 0) return product.price;
    const names = (product.properties || []).map(p => p.name);
    const match = product.variants.find(v =>
        names.every(n => {
            const p = (v.props || []).find(x => x.name === n);
            return p && p.value === selection[n];
        })
    );
    return match && match.price != null ? match.price : product.price;
}

/** Is the chosen combination in stock? */
function variantInStock(product, selection) {
    if (!product.variants || product.variants.length === 0) return true;
    const names = (product.properties || []).map(p => p.name);
    const match = product.variants.find(v =>
        names.every(n => {
            const p = (v.props || []).find(x => x.name === n);
            return p && p.value === selection[n];
        })
    );
    return match ? match.in_stock !== false : false;
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
