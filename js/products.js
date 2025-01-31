const products = [
    // Most viewed - 224,302 views
    {
        title: "3D Printed Bookshelf Suriel / Ghost / Grim Reaper Figurine",
        price: 13.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/4fc942/6603775734/il_570xN.6603775734_oqxp.jpg",
        imageUrlFull: "https://i.etsystatic.com/53821259/r/il/4fc942/6603775734/il_fullxfull.6603775734_oqxp.jpg",
        additionalImages: [
            {
                small: "https://i.etsystatic.com/53821259/r/il/90c517/6651875439/il_570xN.6651875439_fzyp.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/90c517/6651875439/il_fullxfull.6651875439_fzyp.jpg"
            },
            {
                small: "https://i.etsystatic.com/53821259/r/il/568091/6596765396/il_570xN.6596765396_kjjo.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/568091/6596765396/il_fullxfull.6596765396_kjjo.jpg"
            },
            {
                small: "https://i.etsystatic.com/53821259/r/il/ac4554/6603774210/il_570xN.6603774210_qqdt.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/ac4554/6603774210/il_fullxfull.6603774210_qqdt.jpg"
            },
            {
                small: "https://i.etsystatic.com/53821259/r/il/b05fb1/6290507777/il_570xN.6290507777_5hlx.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/b05fb1/6290507777/il_fullxfull.6290507777_5hlx.jpg"
            }
        ],
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1769501037",
        description: "🌟 Bring the mystical world of ACOTAR to life with this stunning 3D printed Suriel figurine! 🌟\n\nThis meticulously crafted Suriel figure is inspired by Sarah J. Maas's bestselling A Court of Thorns and Roses series. Perfect for fans and collectors alike, this unique piece captures the eerie beauty and ancient wisdom of the enigmatic Suriel.\n\nProduct Details:\n• Material: High-quality PLA plastic\n• Height: 2.6\" (7.6 cm)\n• Width: 2\" (5.0 cm)\n• Depth: 1.5\"(4 cm)\n• Color: figurine is black, tea cup is pink\n\nFeatures:\n✨ Intricate detailing showcasing the Suriel's cloak\n✨ Sturdy base for easy display\n✨ Includes miniature cup with a little heart inside of it that comes attached to figurine 🤎\n\nThis 3D printed Suriel makes an excellent:\n• Bookshelf or desk decoration\n• Gift for ACOTAR fans\n• Addition to your ACOTAR collection\n• Conversation starter for fellow fantasy enthusiasts\n\n🌙 Embrace the magic of Prythian and order your Suriel figurine today! 🌙\n\nNote: This is a fan-made item and is not officially licensed merchandise.",
        views: 224302,
        favorites: 19743
    },
    {
        title: "Bluey Inspired Gnomes",
        price: 10.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/244bc9/6356481810/il_570xN.6356481810_cauv.jpg",
        imageUrlFull: "https://i.etsystatic.com/53821259/r/il/244bc9/6356481810/il_fullxfull.6356481810_cauv.jpg",
        additionalImages: [
            {
                small: "https://i.etsystatic.com/53821259/r/il/658ec3/6253632753/il_570xN.6253632753_g6ek.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/658ec3/6253632753/il_fullxfull.6253632753_g6ek.jpg"
            },
            {
                small: "https://i.etsystatic.com/53821259/r/il/4bbcef/6353763672/il_570xN.6353763672_2vjr.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/4bbcef/6353763672/il_fullxfull.6353763672_2vjr.jpg"
            },
            {
                small: "https://i.etsystatic.com/53821259/r/il/213fb3/6353764120/il_570xN.6353764120_tn5d.jpg",
                full: "https://i.etsystatic.com/53821259/r/il/213fb3/6353764120/il_fullxfull.6353764120_tn5d.jpg"
            }
        ],
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1754000188",
        description: "Bring a piece of Bluey's world to your garden or home with these sweet mini 3D printed version of Bluey's garden gnomes! \n\nProduct Details:\n\nMaterial: High-quality PLA plastic\nHeight: 3.5 inches (8.9 cm)\nWidth: 1.4 inches (3.6 cm)\nWeight: Approximately 1 oz (30 g)\nColours are part of the 3D printing process\n\nFeatures:\n\nEntirely 3D printed (including colours)\nDurable and long-lasting\nPerfect for Bluey fans of all ages\nGreat for flower pots, plant pots, or indoor display\n\nThe colours are integrated into the 3D printing process, ensuring a consistent and durable finish without the need for painting.\n\nNote: This is a fan-made product and is not officially licensed merchandise.",
        views: 8865,
        favorites: 596
    }
];

// Initialize product grid when the page loads (only on index page)
window.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.product-grid');
    if (productsGrid) {
        createProductCards();
    }
});

function createProductCards() {
    const productsGrid = document.querySelector('.product-grid');
    productsGrid.innerHTML = ''; // Clear any existing content

    products.forEach((product, index) => {
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
                            Buy
                        </a>
                        <a 
                            href="product.html?id=${index}" 
                            class="flex-1 bg-white text-primary text-center py-2 text-sm font-medium hover-button"
                        >
                            View
                        </a>
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
