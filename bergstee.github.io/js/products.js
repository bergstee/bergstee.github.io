const products = [
    {
        title: "Library Sign | Personalized Library Street Sign",
        price: 13.00,
        currency: "CAD",
        imageUrl: "../images/products/product-1.jpg",
        etsyUrl: "https://www.etsy.com/listing/1850504444"
    },
    {
        title: "Mountain Range Reading Ring | Book Ring | Page Holder",
        price: 12.00,
        currency: "CAD",
        imageUrl: "../images/products/product-2.jpg",
        etsyUrl: "https://www.etsy.com/listing/1863235779"
    },
    {
        title: "Suriel / Ghost / Grim Reaper Figurine",
        price: 14.50,
        currency: "CAD",
        imageUrl: "../images/products/product-3.jpg",
        etsyUrl: "https://www.etsy.com/listing/1847220462"
    },
    {
        title: "Book Straightener Sign | Fourth Wing Shelf Sign",
        price: 17.50,
        currency: "CAD",
        imageUrl: "../images/products/product-4.jpg",
        etsyUrl: "https://www.etsy.com/listing/1841546048"
    },
    {
        title: "Andarna / Fourth Wing Articulated Dragon Figurine",
        price: 19.99,
        currency: "CAD",
        imageUrl: "../images/products/product-5.jpg",
        etsyUrl: "https://www.etsy.com/listing/1821004084"
    },
    {
        title: "Just One More Chapter Reading Ring",
        price: 14.99,
        currency: "CAD",
        imageUrl: "../images/products/product-6.jpg",
        etsyUrl: "https://www.etsy.com/listing/1836729930"
    },
    {
        title: "Bookshelf Dragon / Wyvern / Abraxos",
        price: 19.99,
        currency: "CAD",
        imageUrl: "../images/products/product-7.jpg",
        etsyUrl: "https://www.etsy.com/listing/1827247265"
    },
    {
        title: "TBR Mini Bookshelf with Suriel",
        price: 39.99,
        currency: "CAD",
        imageUrl: "../images/products/product-8.jpg",
        etsyUrl: "https://www.etsy.com/listing/1777366994"
    },
    {
        title: "Bluey Inspired Gnomes",
        price: 10.50,
        currency: "CAD",
        imageUrl: "../images/products/product-9.jpg",
        etsyUrl: "https://www.etsy.com/listing/1754000188"
    },
    {
        title: "Rhysand / High Lord of the Night Court",
        price: 17.00,
        currency: "CAD",
        imageUrl: "../images/products/product-10.jpg",
        etsyUrl: "https://www.etsy.com/listing/1787614902"
    },
    {
        title: "Tamlin's Tears To Go Cup / Keychain",
        price: 11.99,
        currency: "CAD",
        imageUrl: "../images/products/product-11.jpg",
        etsyUrl: "https://www.etsy.com/listing/1832403145"
    },
    {
        title: "Dragon Flexi Toy | Articulated 3D Print",
        price: 9.99,
        currency: "CAD",
        imageUrl: "../images/products/product-12.jpg",
        etsyUrl: "https://www.etsy.com/listing/1847269646"
    },
    {
        title: "ACOTAR Dresser | Archeron Sisters Mini Dresser",
        price: 28.00,
        currency: "CAD",
        imageUrl: "../images/products/product-13.jpg",
        etsyUrl: "https://www.etsy.com/listing/1765716672"
    },
    {
        title: "Jelly Jubilee Figurine / Starlight Fancy",
        price: 16.00,
        currency: "CAD",
        imageUrl: "../images/products/product-14.jpg",
        etsyUrl: "https://www.etsy.com/listing/1791383902"
    },
    {
        title: "Dragon Wings Reading Ring",
        price: 12.00,
        currency: "CAD",
        imageUrl: "../images/products/product-15.jpg",
        etsyUrl: "https://www.etsy.com/listing/1861610053"
    },
    {
        title: "Snake Flexi Toy | Lunar New Year Snake",
        price: 19.99,
        currency: "CAD",
        imageUrl: "../images/products/product-16.jpg",
        etsyUrl: "https://www.etsy.com/listing/1859417541"
    }
];

function createProductCards() {
    const productsGrid = document.querySelector('.product-grid');
    productsGrid.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card group p-4';
        card.innerHTML = `
            <div class="relative overflow-hidden mb-4">
                <div class="relative pb-[125%] bg-gray-50 loading-pattern">
                    <div class="absolute inset-0 flex items-center justify-center animate-pulse-subtle">
                        <svg class="w-8 h-8 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <img 
                        src="${product.imageUrl}" 
                        alt="${product.title}" 
                        class="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:scale-105"
                        onload="this.classList.remove('opacity-0')"
                        onerror="this.src='https://via.placeholder.com/570x570?text=Image+Not+Found';this.classList.remove('opacity-0')"
                    >
                </div>
                <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
                    <div class="flex gap-2">
                        <a 
                            href="${product.etsyUrl}" 
                            target="_blank" 
                            class="flex-1 bg-white text-primary text-center py-2 text-sm font-medium hover-button"
                        >
                            Buy on Etsy
                        </a>
                        <button 
                            onclick="alert('Bulk buy feature coming soon!')" 
                            class="flex-1 bg-white text-primary text-center py-2 text-sm font-medium hover-button"
                        >
                            Bulk Buy
                        </button>
                    </div>
                </div>
            </div>
            <div class="product-info space-y-1">
                <h2 class="text-sm text-primary line-clamp-2 font-light">${product.title}</h2>
                <p class="text-sm font-normal text-primary">${product.currency} ${product.price.toFixed(2)}</p>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', createProductCards);
