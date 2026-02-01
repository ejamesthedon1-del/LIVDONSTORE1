# React to Shopify Theme Conversion Guide

## What Was Converted

### Layout Files
- ✅ `layout/theme.liquid` - Main theme layout with header/footer structure

### Templates
- ✅ `templates/index.liquid` - Homepage (from LandingPage.jsx)
- ✅ `templates/collection.liquid` - Product listing page (from ProductListingPage.jsx)
- ✅ `templates/product.liquid` - Product detail page (from ProductDetailPage.jsx)
- ✅ `templates/page.contact.liquid` - Contact page (from ContactPage.jsx)

### Sections
- ✅ `sections/header.liquid` - Header with logo, search, cart, mobile menu
- ✅ `sections/footer.liquid` - Footer with links
- ✅ `sections/hero-section.liquid` - Hero section (from HeroSection.jsx)
- ✅ `sections/image-slider.liquid` - Image slider (from ImageSlider.jsx)

### Snippets
- ✅ `snippets/mobile-menu.liquid` - Mobile navigation menu
- ✅ `snippets/product-tile.liquid` - Product card (from ProductTile.jsx)
- ✅ `snippets/product-gallery.liquid` - Product image gallery (from ProductGallery.jsx)
- ✅ `snippets/product-selectors.liquid` - Color/size selectors (from ProductSelectors.jsx)
- ✅ `snippets/product-info-section.liquid` - Accordion sections (from ProductInfoSection.jsx)
- ✅ `snippets/related-product.liquid` - Related product card (from RelatedProduct.jsx)
- ✅ `snippets/product-drawer-overlay.liquid` - Mobile drawer overlay
- ✅ `snippets/meta-tags.liquid` - Meta tags helper

### Assets
- ✅ `assets/theme.css` - All CSS styles (copied from src/index.css)
- ✅ `assets/global.js` - JavaScript functionality (converted from React)

### Config
- ✅ `config/settings_schema.json` - Theme customization settings

## Key Conversions

### React → Liquid

**React:**
```jsx
const products = [...]
{products.map(product => <ProductTile product={product} />)}
```

**Liquid:**
```liquid
{% for product in collection.products %}
  {% render 'product-tile', product: product %}
{% endfor %}
```

### State Management

**React:**
```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false)
```

**Liquid/JS:**
```javascript
let isMenuOpen = false;
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
}
```

### Event Handlers

React event handlers converted to vanilla JavaScript event listeners in `global.js`.

## How to Use

1. **Install Shopify CLI:**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Navigate to theme directory:**
   ```bash
   cd theme
   ```

3. **Start development:**
   ```bash
   shopify theme dev
   ```

4. **Upload to Shopify:**
   ```bash
   shopify theme push
   ```

## Features Preserved

- ✅ CELINE-inspired design
- ✅ Mobile-responsive layout
- ✅ Mobile menu with backdrop
- ✅ Product image slider/gallery
- ✅ Product filters and sorting
- ✅ Add to cart functionality
- ✅ Mobile drawer overlay for product details
- ✅ Accordion product info sections
- ✅ All CSS styling maintained

## Notes

- **Cart functionality** uses Shopify's native cart API
- **Product data** comes from Shopify admin (no hardcoded products)
- **Images** should be uploaded to Shopify and referenced via Liquid filters
- **JavaScript** handles all interactive features (menu, gallery, drawer, etc.)

## Next Steps

1. Upload theme to Shopify store
2. Configure theme settings in Shopify admin
3. Add products and collections
4. Customize sections via Shopify theme editor
5. Test all functionality
