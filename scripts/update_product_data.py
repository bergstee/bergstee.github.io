import psycopg2
import json
from datetime import datetime

# Database connection parameters
DB_PARAMS = {
    "dbname": "familyRewardDb",
    "user": "postgres",
    "password": "Oct$2023",
    "host": "192.168.7.23",
    "port": "5432"
}

def get_product_data():
    conn = psycopg2.connect(**DB_PARAMS)
    cur = conn.cursor()
    
    # Get listings with their images
    query = """
    WITH RankedImages AS (
        SELECT 
            listing_id,
            json_build_object(
                'small', url_570xn,
                'full', url_fullxfull
            ) as image_data,
            rank
        FROM listing_images
        ORDER BY rank
    )
    SELECT 
        l.listing_id,
        l.title,
        l.price_amount,
        l.price_currency_code,
        l.description,
        l.views,
        l.num_favorers,
        l.url,
        COALESCE(
            json_agg(ri.image_data ORDER BY ri.rank),
            '[]'::json
        ) as images
    FROM listings l
    LEFT JOIN RankedImages ri ON l.listing_id = ri.listing_id
    WHERE l.state = 'active'
    GROUP BY 
        l.listing_id, l.title, l.price_amount, l.price_currency_code,
        l.description, l.views, l.num_favorers, l.url
    ORDER BY l.views DESC;
    """
    
    cur.execute(query)
    rows = cur.fetchall()
    
    # Format data for products.js
    products_data = []
    product_data_simple = []
    
    for row in rows:
        listing_id, title, price, currency, desc, views, favorites, url, images = row
        
        # Format for products.js
        product = {
            "title": title,
            "price": float(price) if price is not None else 0.0,
            "currency": currency or "CAD",
            "imageUrl": images[0]['small'] if images and len(images) > 0 else "",
            "imageUrlFull": images[0]['full'] if images and len(images) > 0 else "",
            "additionalImages": images[1:] if images and len(images) > 1 else [],
            "etsyUrl": url or "",
            "description": desc or "",
            "views": views or 0,
            "favorites": favorites or 0
        }
        products_data.append(product)
        
        # Format for product-data.js
        simple_product = {
            "listing_id": str(listing_id),
            "description": desc or "",
            "views": views or 0,
            "num_favorers": favorites or 0
        }
        product_data_simple.append(simple_product)
    
    cur.close()
    conn.close()
    
    return products_data, product_data_simple

def write_js_file(data, filename, variable_name):
    js_content = f"const {variable_name} = {json.dumps(data, indent=4, ensure_ascii=False)};\n"
    
    # Add the createProductCards function to products.js
    if variable_name == 'products':
        js_content += """
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
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(js_content)

def main():
    try:
        products_data, product_data_simple = get_product_data()
        
        # Write to products.js
        write_js_file(products_data, '../js/products.js', 'products')
        
        # Write to product-data.js
        write_js_file(product_data_simple, '../js/product-data.js', 'productsData')
        
        print(f"Successfully updated product data at {datetime.now()}")
        print(f"Wrote {len(products_data)} products to files")
        
    except Exception as e:
        print(f"Error updating product data: {str(e)}")
        raise  # Re-raise the exception to see the full traceback

if __name__ == "__main__":
    main()