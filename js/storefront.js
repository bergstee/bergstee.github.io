/* SideQuest Co storefront.
   Catalog + prices come from the etsyapp store API; the server re-prices every
   line when checkout is created, so nothing here is trusted for money. */

const STORE_API = 'https://shop-api.steph-server.ca/store';
const CART_KEY = 'sqc_cart_v1';
const COUNTRY_KEY = 'sqc_country';


/* ------------------------------------------------------------- analytics */
/* Two layers:
   - Our own tracking is anonymous: a random per-tab id, no cookies, no IP.
   - GA4 mirrors the same events. Note GA4 DOES set first-party cookies, so the
     privacy notice has to say so; ad personalisation is off. */
const GA_MEASUREMENT_ID = 'G-3C9HQGPMNE';
const SESSION_KEY = 'sqc_session';

function sessionId() {
    try {
        let id = sessionStorage.getItem(SESSION_KEY);
        if (!id) {
            id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));
            sessionStorage.setItem(SESSION_KEY, id);
        }
        return id;
    } catch (e) {
        return 'no-storage';
    }
}

function track(eventType, detail) {
    const body = Object.assign({
        session_id: sessionId(),
        event_type: eventType,
        path: location.pathname,
        // Host only, since a full referring URL can carry the visitor's search terms.
        referrer: document.referrer ? new URL(document.referrer).host : '',
        currency: getCountry() === 'US' ? 'USD' : 'CAD',
    }, detail || {});
    try {
        // keepalive lets the request outlive the page (e.g. the checkout
        // redirect). sendBeacon can't be used here: a JSON content-type makes
        // it a preflighted cross-origin request, which beacons can't perform,
        // so the browser silently drops it.
        fetch(`${STORE_API}/api/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            keepalive: true,
            mode: 'cors',
        }).catch(() => {});
    } catch (e) {}
    if (window.gtag) {
        try { window.gtag('event', eventType, detail || {}); } catch (e) {}
    }
}

function initGA() {
    if (!GA_MEASUREMENT_ID) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    // Ad personalisation and cross-device signals off. Analytics only.
    window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });
}

/* ------------------------------------------------------------- currency */
function getCountry() {
    try {
        const saved = localStorage.getItem(COUNTRY_KEY);
        if (saved === 'US' || saved === 'CA') return saved;
    } catch (e) {}
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Kentucky|Boise|Juneau|Honolulu)/.test(tz)) return 'US';
    } catch (e) {}
    return 'CA';
}
function setCountry(c) {
    try { localStorage.setItem(COUNTRY_KEY, c); } catch (e) {}
    // Prices are quoted per country, so a cart priced in the other currency is stale.
    try { localStorage.removeItem(CART_KEY); } catch (e) {}
}
const ccyPrefix = (country) => (country === 'US' ? 'US$' : 'CA$');
function money(amount, country) {
    return ccyPrefix(country || getCountry()) + Number(amount || 0).toFixed(2);
}

/* ----------------------------------------------------------------- cart */
function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
}
function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    paintCartCount();
}
const cartCount = () => loadCart().reduce((n, l) => n + l.quantity, 0);
function paintCartCount() {
    document.querySelectorAll('[data-cart-count]').forEach(el => {
        el.textContent = ' (' + cartCount() + ')';
    });
}
const lineKey = (id, vars) => id + '|' + JSON.stringify(vars || {});

function addToCart(product, selection, unitPrice, quantity) {
    const cart = loadCart();
    const key = lineKey(product.listing_id, selection);
    const existing = cart.find(l => l.key === key);
    if (existing) existing.quantity += (quantity || 1);
    else cart.push({
        key, listing_id: product.listing_id, title: product.title,
        price: Number(unitPrice), image_url: product.image_url,
        quantity: quantity || 1, variations: selection || {},
    });
    saveCart(cart);
    track('add_to_cart', {
        listing_id: product.listing_id,
        category: product.category,
        value: Number(unitPrice),
        quantity: quantity || 1,
    });
}
function setQuantity(key, quantity) {
    let cart = loadCart();
    const line = cart.find(l => l.key === key);
    if (line) line.quantity = quantity;
    saveCart(cart.filter(l => l.quantity > 0));
}
function removeLine(key) { saveCart(loadCart().filter(l => l.key !== key)); }

/* -------------------------------------------------------------- catalog */
let _catalog = null;
async function getCatalog(country) {
    const c = country || getCountry();
    if (_catalog && _catalog.country === c) return _catalog;
    const res = await fetch(`${STORE_API}/api/products?country=${encodeURIComponent(c)}`);
    if (!res.ok) throw new Error('Could not load the shop');
    _catalog = await res.json();
    return _catalog;
}

/** Default selection: first value of each option group. */
function defaultSelection(product) {
    const sel = {};
    (product.properties || []).forEach(p => { sel[p.name] = p.values[0]; });
    return sel;
}
function matchVariant(product, selection) {
    if (!product.variants || !product.variants.length) return null;
    const names = (product.properties || []).map(p => p.name);
    return product.variants.find(v =>
        names.every(n => {
            const p = (v.props || []).find(x => x.name === n);
            return p && p.value === selection[n];
        })
    ) || null;
}
function priceFor(product, selection) {
    const v = matchVariant(product, selection);
    return v && v.price != null ? v.price : product.price;
}
function inStock(product, selection) {
    if (!product.variants || !product.variants.length) return true;
    const v = matchVariant(product, selection);
    return v ? v.in_stock !== false : false;
}

/* --------------------------------------------------------------- render */
function esc(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

function productCard(product, country) {
    const hasOpts = (product.properties || []).length > 0;
    const href = 'item.html?id=' + encodeURIComponent(product.listing_id);
    return `
    <article class="card" data-id="${esc(product.listing_id)}">
      <a class="card-img" href="${href}">
        ${product.image_url ? `<img src="${esc(product.image_url)}" alt="${esc(product.title)}" loading="lazy">` : ''}
      </a>
      <div class="card-body">
        <a class="card-title" href="${href}">${esc(product.title)}</a>
        <div class="card-fill"></div>
        <div class="card-price-row">
          <span class="card-price">${product.price_varies && !hasOpts ? 'from ' : ''}${money(product.price, country)}</span>
          <a href="#" class="link-quiet" data-quick="${esc(product.listing_id)}">Quick view</a>
        </div>
        <button class="btn btn-sm" data-act="${esc(product.listing_id)}">${hasOpts ? 'Choose options' : 'Add to cart'}</button>
      </div>
    </article>`;
}

/* ------------------------------------------------------------ quick view */
let _qvProduct = null, _qvSelection = null;

function openQuickView(product) {
    track('quick_view', { listing_id: product.listing_id, category: product.category, value: product.price });
    _qvProduct = product;
    _qvSelection = defaultSelection(product);
    let host = document.getElementById('qv-host');
    if (!host) {
        host = document.createElement('div');
        host.id = 'qv-host';
        document.body.appendChild(host);
    }
    paintQuickView();
    document.body.style.overflow = 'hidden';
}
function closeQuickView() {
    const host = document.getElementById('qv-host');
    if (host) host.innerHTML = '';
    _qvProduct = null;
    document.body.style.overflow = '';
}
function paintQuickView() {
    const p = _qvProduct;
    if (!p) return;
    const country = getCountry();
    const price = priceFor(p, _qvSelection);
    const available = inStock(p, _qvSelection);
    const opts = (p.properties || []).map(prop => `
        <label class="opt">${esc(prop.name)}
          <select data-qv-opt="${esc(prop.name)}">
            ${prop.values.map(v => `<option value="${esc(v)}"${_qvSelection[prop.name] === v ? ' selected' : ''}>${esc(v)}</option>`).join('')}
          </select>
        </label>`).join('');
    document.getElementById('qv-host').innerHTML = `
      <div class="qv-overlay" role="dialog" aria-modal="true" aria-label="${esc(p.title)}">
        <div class="qv-scrim" data-qv-close></div>
        <div class="qv-panel">
          ${p.image_url ? `<img src="${esc(p.image_url)}" alt="${esc(p.title)}">` : '<div></div>'}
          <div class="qv-body">
            <button class="qv-close" data-qv-close aria-label="Close">&times;</button>
            <h2>${esc(p.title)}</h2>
            <p class="qv-price">${money(price, country)}</p>
            <div class="opt-stack">${opts}</div>
            <div class="card-fill"></div>
            <button class="btn btn-block" data-qv-add ${available ? '' : 'disabled'}>${available ? 'Add to cart' : 'Sold out'}</button>
            <a href="item.html?id=${encodeURIComponent(p.listing_id)}" class="link-quiet" style="text-align:center;margin:12px auto 0;width:fit-content">View full details</a>
          </div>
        </div>
      </div>`;
}

document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-qv-opt]');
    if (sel && _qvProduct) {
        _qvSelection[sel.dataset.qvOpt] = sel.value;
        paintQuickView();
    }
});
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-qv-close]')) { e.preventDefault(); closeQuickView(); return; }
    const add = e.target.closest('[data-qv-add]');
    if (add && _qvProduct) {
        addToCart(_qvProduct, _qvSelection, priceFor(_qvProduct, _qvSelection), 1);
        add.textContent = 'Added ✓';
        setTimeout(closeQuickView, 700);
    }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQuickView(); });

/* ------------------------------------------------------------- checkout */
async function startCheckout(btn) {
    const cart = loadCart();
    if (!cart.length) return;
    if (btn) { btn.disabled = true; btn.textContent = 'Redirecting…'; }
    track('begin_checkout', {
        value: cart.reduce((t, l) => t + l.price * l.quantity, 0),
        quantity: cart.reduce((t, l) => t + l.quantity, 0),
    });
    try {
        const res = await fetch(`${STORE_API}/api/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country: getCountry(),
                session_id: sessionId(),
                items: cart.map(l => ({
                    listing_id: l.listing_id,
                    quantity: l.quantity,
                    variations: Object.keys(l.variations || {}).length ? l.variations : undefined,
                })),
            }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
        window.location.href = data.url;
    } catch (err) {
        alert(err.message || 'Sorry, checkout is unavailable right now.');
        if (btn) { btn.disabled = false; btn.textContent = 'Continue to checkout'; }
    }
}


/* -------------------------------------------------------------- header nav */
/* Which story collections sit in the top nav. Leave empty to pick the largest
   automatically; list names to curate them by hand, e.g.
   const NAV_CATEGORIES = ['ACOTAR', 'Fourth Wing', 'Bluey']; */
const NAV_CATEGORIES = [];
const NAV_MAX = 3;
// Generic buckets make poor nav items: they say nothing about what's inside.
const NAV_EXCLUDE = ['Home & Gifts', 'Bookish'];

/** Renders the "Shop + collections" nav into any [data-nav] element. */
function paintNav(categories) {
    const host = document.querySelector('[data-nav]');
    if (!host) return;
    let picks;
    if (NAV_CATEGORIES.length) {
        picks = NAV_CATEGORIES
            .map(name => categories.find(c => c.name === name))
            .filter(Boolean);
    } else {
        picks = categories
            .filter(c => !NAV_EXCLUDE.includes(c.name))
            .sort((a, b) => b.count - a.count)
            .slice(0, NAV_MAX);
    }
    host.innerHTML = '<a href="shop.html">Shop</a>' +
        picks.map(c => `<a href="shop.html?c=${encodeURIComponent(c.name)}">${esc(c.name)}</a>`).join('');
}

/* ------------------------------------------------- header/footer wiring */
function initChrome() {
    paintCartCount();
    const country = getCountry();
    document.querySelectorAll('[data-ccy]').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.ccy === country));
        b.addEventListener('click', () => {
            if (b.dataset.ccy === getCountry()) return;
            setCountry(b.dataset.ccy);
            location.reload();
        });
    });
    const duty = document.querySelector('[data-duty-note]');
    if (duty) duty.hidden = country !== 'US';

    const search = document.querySelector('[data-search]');
    if (search) {
        search.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = search.value.trim();
                location.href = 'shop.html' + (q ? '?q=' + encodeURIComponent(q) : '');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    initGA();
    track('page_view');
});
