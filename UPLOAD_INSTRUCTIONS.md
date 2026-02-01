# Upload Theme to Shopify - Instructions

## Quick Start

Your React theme has been successfully converted to a Shopify theme! Here's how to upload it:

### Step 1: Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### Step 2: Navigate to Theme Directory

```bash
cd theme
```

### Step 3: Login to Shopify

**Option A: Specify store in command**
```bash
shopify theme dev --store=5g8ryy-gj.myshopify.com
```

**Option B: Set environment variable**
```bash
export SHOPIFY_FLAG_STORE=5g8ryy-gj.myshopify.com
shopify theme dev
```

This will:
- Prompt you to login to Shopify (if not already logged in)
- Start a local development server
- Sync changes to your store in real-time

### Step 4: Upload Theme (Alternative)

If you prefer to upload directly without dev server:

```bash
shopify theme push --store=5g8ryy-gj.myshopify.com
```

Or with environment variable:
```bash
export SHOPIFY_FLAG_STORE=5g8ryy-gj.myshopify.com
shopify theme push
```

## Theme Structure

```
theme/
├── assets/          # CSS, JS, images
├── config/         # Theme settings
├── layout/         # Main layout file
├── sections/       # Reusable sections
├── snippets/        # Small reusable components
└── templates/      # Page templates
```

## What's Included

✅ **Layout** - Main theme wrapper with header/footer
✅ **Templates** - Homepage, Collection, Product, Contact
✅ **Sections** - Header, Footer, Hero, Image Slider
✅ **Snippets** - Product tiles, gallery, selectors, mobile menu
✅ **Assets** - All CSS and JavaScript
✅ **Config** - Theme customization settings

## Next Steps After Upload

1. **Go to Shopify Admin** → Online Store → Themes
2. **Click "Customize"** on your new theme
3. **Configure sections:**
   - Upload logo in Header section
   - Add hero images in Hero Section
   - Configure Image Slider items
4. **Add products** via Products → Add product
5. **Create collections** via Products → Collections
6. **Test functionality:**
   - Mobile menu
   - Product gallery
   - Add to cart
   - Filters and sorting

## Features

- ✅ CELINE-inspired design preserved
- ✅ Mobile-responsive
- ✅ Native Shopify cart/checkout
- ✅ Product management via Shopify admin
- ✅ All interactive features working

## Troubleshooting

**Theme not showing in Shopify:**
- Make sure you're in the `theme` directory
- Check that all required files are present
- Try `shopify theme push --unpublished` first

**Styles not loading:**
- Check that `assets/theme.css` exists
- Verify CSS is linked in `layout/theme.liquid`

**JavaScript not working:**
- Check browser console for errors
- Verify `assets/global.js` is loaded
- Make sure data attributes match between Liquid and JS

## Support

See `CONVERSION_GUIDE.md` for detailed conversion notes.
