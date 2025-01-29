const products = [
    // 3048 sales
    {
        title: "3D Printed Bookshelf Suriel / Ghost / Grim Reaper Figurine",
        price: 13.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/4fc942/6603775734/il_570xN.6603775734_oqxp.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1769501037"
    },
    // 168 sales
    {
        title: "Bluey Inspired Gnomes",
        price: 10.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/244bc9/6356481810/il_570xN.6356481810_cauv.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1754000188"
    },
    // 143 sales
    {
        title: "Rhysand / High Lord of the Night Court",
        price: 17.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/3c4b11/6356682605/il_570xN.6356682605_avam.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1787614902"
    },
    // 141 sales
    {
        title: "ACOTAR Dresser | Archeron Sisters Mini Dresser",
        price: 28.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/c678ea/6271444608/il_570xN.6271444608_pja1.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1765716672"
    },
    // 55 sales
    {
        title: "TBR Mini Bookshelf with Suriel",
        price: 39.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/029ac3/6603790000/il_570xN.6603790000_kogr.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1777366994"
    },
    // 34 sales
    {
        title: "Bookshelf Dragon / Wyvern / Abraxos",
        price: 19.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/c07a27/6435966748/il_570xN.6435966748_kbcc.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1827247265"
    },
    // 27 sales
    {
        title: "Jelly Jubilee Figurine / Starlight Fancy",
        price: 16.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/64f44c/6375537225/il_570xN.6375537225_ozff.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1791383902"
    },
    // 26 sales
    {
        title: "Mail Otter with Letter / Crescent City Otter",
        price: 14.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/5ac5c9/6632542575/il_570xN.6632542575_gwhn.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1777372492"
    },
    // 23 sales
    {
        title: "Andarna / Fourth Wing Articulated Dragon Figurine",
        price: 19.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/8e5d6b/6522961677/il_570xN.6522961677_sed4.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1821004084"
    },
    // 16 sales
    {
        title: "Book Straightener Sign | Fourth Wing Shelf Sign",
        price: 17.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/6966d5/6601833369/il_570xN.6601833369_n4nn.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1841546048"
    },
    // 16 sales
    {
        title: "Suriel / Ghost / Grim Reaper Figurine",
        price: 14.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/ba4dac/6651885839/il_570xN.6651885839_30ok.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1847220462"
    },
    // 14 sales
    {
        title: "Tamlin's Tears To Go Cup / Keychain",
        price: 11.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/474eed/6465276812/il_570xN.6465276812_gtr2.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1832403145"
    },
    // 5 sales
    {
        title: "Book Straightener Sign | Throne of Glass",
        price: 17.50,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/6054bb/6601969347/il_570xN.6601969347_qy1g.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1841569890"
    },
    // 5 sales
    {
        title: "Dragon Flexi Toy | Articulated 3D Print",
        price: 9.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/6b994a/6631164911/il_570xN.6631164911_cktm.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1847269646"
    },
    // 2 sales
    {
        title: "Dragon Wings Reading Ring",
        price: 12.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/40a75d/6631064127/il_570xN.6631064127_amtu.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1861610053"
    },
    // 1 sale
    {
        title: "Snake Flexi Toy | Lunar New Year Snake",
        price: 19.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/9b651b/6619525335/il_570xN.6619525335_sf2q.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1859417541"
    },
    // 1 sale
    {
        title: "Book Blanks for TBR Mini Bookshelf",
        price: 13.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/b88f8a/6637627913/il_570xN.6637627913_idkv.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1863114133"
    },
    // 1 sale
    {
        title: "Fourth Wing Bundle | Dragon & Reading Ring",
        price: 49.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/c0b672/6594953325/il_570xN.6594953325_kd11.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1852267941"
    },
    // 0 sales
    {
        title: "Mountain Range Reading Ring | Velaris",
        price: 12.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/b0dd83/6590098436/il_570xN.6590098436_bot8.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1863235779"
    },
    // 0 sales
    {
        title: "Bluey Inspired Gnome Keychain",
        price: 15.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/b4fabf/6592475662/il_570xN.6592475662_nqwr.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1849381980"
    },
    // 0 sales
    {
        title: "Just One More Chapter Reading Ring",
        price: 14.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/663d7c/6532227840/il_570xN.6532227840_hssz.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1836729930"
    },
    // 0 sales
    {
        title: "Magical Train Reading Ring | Reading is Magic",
        price: 9.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/e12174/6583039852/il_570xN.6583039852_6j46.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1847407058"
    },
    // 0 sales
    {
        title: "Wingleader To Go Cup / Keychain",
        price: 11.99,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/6f7d54/6602008291/il_570xN.6602008291_t71v.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1855783227"
    },
    // 0 sales
    {
        title: "Library Sign | Personalized Library Street Sign",
        price: 13.00,
        currency: "CAD",
        imageUrl: "https://i.etsystatic.com/53821259/r/il/a48cb4/6597325874/il_570xN.6597325874_sdbd.jpg",
        etsyUrl: "http://www.sidequestcoshop.etsy.com/listing/1850504444"
    }
];

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

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', createProductCards);
