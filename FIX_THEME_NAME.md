# Fix Theme Name Showing as "Horizon"

If your Shopify store shows "Horizon" instead of "Livdon", here's how to fix it:

## Why This Happens

"Horizon" is likely a default Shopify theme name. This means:
1. You might be looking at a different theme (not your custom one)
2. The theme wasn't properly uploaded/published
3. Shopify assigned a default name

## Solution: Rename Theme in Shopify Admin

### Step 1: Go to Your Themes
1. Shopify Admin → **Online Store** → **Themes**
2. Find your uploaded theme (it might be called "Development" or have a generic name)

### Step 2: Rename the Theme
1. Click the **"..."** (three dots) next to your theme
2. Click **"Rename"**
3. Change the name to **"Livdon"**
4. Click **"Save"**

### Step 3: Publish Your Theme
1. Make sure your custom theme is selected
2. Click **"Actions"** → **"Publish"**
3. Confirm you want to make it live

## Verify It's Working

After renaming and publishing:
1. Go to your storefront
2. Check the theme name in Shopify Admin → Themes
3. It should now show "Livdon"

## If Theme Still Shows Wrong Name

If it still shows "Horizon" after renaming:
1. Make sure you're looking at the correct theme
2. Check if there are multiple themes uploaded
3. The theme uploaded via `shopify theme dev` might be a "Development" theme
4. Try uploading with `shopify theme push` to create a proper theme

## Alternative: Upload as Named Theme

To upload with a specific name:
```bash
cd theme
shopify theme push --store=5g8ryy-gj.myshopify.com --theme=livdon
```

This will create/update a theme named "livdon" in your store.
