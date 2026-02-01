# Livdon Shopify Theme

A premium, CELINE-inspired Shopify theme for luxury fashion brands.

## Features

- Modern, minimalist design
- Fully responsive (mobile, tablet, desktop)
- Fast and optimized
- Easy to customize via Shopify theme editor
- Native Shopify cart and checkout integration

## Theme Structure

```
livdon-shopify-theme/
├── assets/          # CSS, JavaScript, images
├── config/          # Theme settings and configuration
├── layout/          # Theme layout files
├── locales/         # Translation files
├── sections/        # Reusable sections
├── snippets/        # Reusable code snippets
└── templates/       # Page templates
```

## Getting Started

### Prerequisites

- Shopify store (development or production)
- Shopify CLI installed: `npm install -g @shopify/cli @shopify/theme`
- Git (for version control)

### Installation

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url>
   cd livdon-shopify-theme
   ```

2. **Initialize Git (if starting fresh):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Livdon Shopify theme"
   ```

3. **Connect to your Shopify store:**
   ```bash
   shopify theme dev --store=your-store.myshopify.com
   ```

4. **Or upload directly:**
   ```bash
   shopify theme push --store=your-store.myshopify.com
   ```

### GitHub Setup

1. **Create a new repository on GitHub**
2. **Add remote and push:**
   ```bash
   git remote add origin https://github.com/yourusername/livdon-shopify-theme.git
   git branch -M main
   git push -u origin main
   ```

## Development

### Local Development

Start a local development server that syncs with your store:

```bash
shopify theme dev --store=your-store.myshopify.com
```

This will:
- Start a local server at `http://127.0.0.1:9292`
- Watch for file changes
- Sync changes to your Shopify store in real-time

### Upload Theme

Upload theme to your store:

```bash
shopify theme push --store=your-store.myshopify.com
```

Upload as unpublished theme:

```bash
shopify theme push --store=your-store.myshopify.com --unpublished
```

## Customization

### Theme Settings

Customize the theme via:
- Shopify Admin → Online Store → Themes → Customize
- Or edit `config/settings_schema.json`

### Sections

All sections are customizable via the theme editor:
- Header
- Footer
- Hero Section
- Image Slider
- Product Grid

### Styling

Main stylesheet: `assets/theme.css`

## Pages Included

- Homepage (`templates/index.liquid`)
- Collection/Product Listing (`templates/collection.liquid`)
- Product Detail (`templates/product.liquid`)
- Contact Page (`templates/page.contact.liquid`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - All rights reserved

## Support

For theme support, contact: support@livdon.com
