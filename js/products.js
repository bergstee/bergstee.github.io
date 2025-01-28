const products = [
    {
        title: "3D Printed Bookshelf Suriel / Ghost / Grim Reaper Figurine - with Teacup Attached!",
        price: 13.50,
        currency: "CAD",
        imageUrl: "", // Will be provided by user
        etsyUrl: "https://www.etsy.com/listing/your-listing-id-1" // Will be provided by user
    },
    {
        title: "Andarna / Fourth Wing Articulated Dragon Figurine",
        price: 19.99,
        currency: "CAD",
        imageUrl: "", // Will be provided by user
        etsyUrl: "https://www.etsy.com/listing/your-listing-id-2" // Will be provided by user
    },
    {
        title: "ACOTAR Dresser | 3D Printed Archeron Sisters Mini Dresser",
        price: 28.00,
        currency: "CAD",
        imageUrl: "", // Will be provided by user
        etsyUrl: "https://www.etsy.com/listing/your-listing-id-3" // Will be provided by user
    }
    // More products will be added
];

function createProductCards() {
    const productsGrid = document.querySelector('.product-grid');
    productsGrid.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card group p-4';
        card.innerHTML = `
            <div class="relative overflow-hidden mb-4">
                <div class="relative pb-[125%]">
                    <img 
                        src="${product.imageUrl || 'https://via.placeholder.com/600'}" 
                        alt="${product.title}" 
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                </div>
                <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="flex gap-2">
                        <a 
                            href="${product.etsyUrl}" 
                            target="_blank" 
                            class="flex-1 bg-white text-primary text-center py-2 text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                            Buy on Etsy
                        </a>
                        <button 
                            onclick="alert('Bulk buy feature coming soon!')" 
                            class="flex-1 bg-white text-primary text-center py-2 text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
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
