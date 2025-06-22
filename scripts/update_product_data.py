import psycopg2
import json
from datetime import datetime
import html

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
        COALESCE(l.wholesale_item_title, l.title) as final_title,
        l.price_amount,
        l.price_currency_code,
        COALESCE(l.wholesale_item_description, l.description) as final_description,
        l.views,
        l.num_favorers,
        l.url,
        l.available_for_wholesale,
        l.wholesale_discout_perc,
        COALESCE(
            json_agg(ri.image_data ORDER BY ri.rank),
            '[]'::json
        ) as images
    FROM listings l
    LEFT JOIN RankedImages ri ON l.listing_id = ri.listing_id
    WHERE (l.state = 'active' OR l.state IS NULL)
    GROUP BY 
        l.listing_id, final_title, l.price_amount, l.price_currency_code,
        final_description, l.views, l.num_favorers, l.url, l.available_for_wholesale,
        l.wholesale_discout_perc
    ORDER BY l.views DESC;
    """
    
    cur.execute(query)
    rows = cur.fetchall()
    
    # Format data for products.js
    products_data = []
    product_data_simple = []
    
    for row in rows:
        listing_id, title, price, currency, desc, views, favorites, url, available_for_wholesale, wholesale_discout_perc, images = row
        
        # Decode HTML entities
        title = html.unescape(title) if title else ""
        desc = html.unescape(desc) if desc else ""

        # Format for products.js
        product = {
            "listing_id": str(listing_id),
            "title": title,
            "price": float(price) if price is not None else 0.0,
            "currency": currency or "CAD",
            "imageUrl": images[0]['small'] if images and len(images) > 0 and images[0] is not None and 'small' in images[0] else "https://via.placeholder.com/570x570?text=Image+Not+Found",
            "imageUrlFull": images[0]['full'] if images and len(images) > 0 and images[0] is not None and 'full' in images[0] else "https://via.placeholder.com/570x570?text=Image+Not+Found",
            "additionalImages": images[1:] if images and len(images) > 1 else [],
            "etsyUrl": url or "",
            "description": desc,
            "views": views or 0,
            "favorites": favorites or 0,
            "available_for_wholesale": available_for_wholesale,
            "wholesale_price": float(price) * float(wholesale_discout_perc) if price is not None and wholesale_discout_perc is not None else None
        }
        products_data.append(product)
        
        # Format for product-data.js
        simple_product = {
            "listing_id": str(listing_id),
            "description": desc,
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

    products
        .filter(product => product.available_for_wholesale)
        .forEach((product, index) => {
            const card = document.createElement('a');
            card.href = `product.html?id=${product.listing_id}`;
            card.className = 'product-card group block bg-custom-pink';
            card.innerHTML = `
                <div class="relative overflow-hidden mb-2">
                    <div class="relative pb-[125%] bg-gray-100">
                        <img
                            src="${product.imageUrl}"
                            alt="${product.title}"
                            class="absolute inset-0 w-full h-full object-cover"
                        >
                    </div>
                </div>
                <div class="product-info text-center space-y-1">
                    <h2 class="text-base text-primary font-light">${product.title}</h2>
                    <p class="text-xs text-gray-700">Wholesale: ${product.currency} ${product.wholesale_price.toFixed(2)}</p>
                    <p class="text-xs text-gray-700">MSRP: ${product.currency} ${product.price.toFixed(2)}</p>
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
        write_js_file(products_data, 'js/products.js', 'products')
        
        # Write to product-data.js
        write_js_file(product_data_simple, 'js/product-data.js', 'productsData')
        
        print(f"Successfully updated product data at {datetime.now()}")
        print(f"Wrote {len(products_data)} products to files")
        
    except Exception as e:
        print(f"Error updating product data: {str(e)}")
        raise  # Re-raise the exception to see the full traceback

if __name__ == "__main__":
    main()