/**
 * Global JavaScript - Converted from React components to vanilla JS
 * Handles mobile menu, search, cart, product interactions, etc.
 */

(function() {
  'use strict';

  // Mobile Menu Toggle
  function initMobileMenu() {
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menuClose = document.querySelector('[data-menu-close]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const menuMask = document.querySelector('[data-menu-mask]');
    const menuLinks = document.querySelectorAll('[data-menu-close]');

    if (!menuToggle || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('o-sidebar-nav--open');
      menuMask.style.display = 'block';
      document.body.style.overflow = 'hidden';
      menuToggle.setAttribute('aria-pressed', 'true');
    }

    function closeMenu() {
      mobileMenu.classList.remove('o-sidebar-nav--open');
      menuMask.style.display = 'none';
      document.body.style.overflow = '';
      menuToggle.setAttribute('aria-pressed', 'false');
    }

    menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuMask) menuMask.addEventListener('click', closeMenu);
    
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Search Toggle
  function initSearch() {
    const searchToggle = document.querySelector('[data-search-toggle]');
    const searchMobile = document.querySelector('[data-search-mobile]');
    const searchInput = document.querySelector('[data-search-input]');
    let isScrolled = false;

    if (!searchToggle) return;

    // Handle scroll for mobile search visibility
    window.addEventListener('scroll', () => {
      isScrolled = window.scrollY > 50;
      const mobileSearchBtn = document.querySelector('.a-search--mobile-scrolled');
      if (mobileSearchBtn) {
        mobileSearchBtn.style.display = isScrolled ? 'flex' : 'none';
        if (searchMobile) {
          searchMobile.classList.toggle('g-header-search-mobile--hidden', isScrolled);
        }
      }
    });

    searchToggle.addEventListener('click', () => {
      // Implement search functionality
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  // Product Tile Slider
  function initProductTileSlider() {
    const tileSliders = document.querySelectorAll('[data-tile-slider]');
    
    tileSliders.forEach(slider => {
      const slides = slider.querySelectorAll('[data-tile-slide]');
      const indicator = slider.closest('.m-tile-slider').querySelector('[data-tile-indicator-bar]');
      let currentIndex = 0;

      if (slides.length <= 1) return;

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.toggle('m-tile-slider__slide--active', i === index);
        });
        if (indicator) {
          indicator.style.left = `${(index / slides.length) * 100}%`;
        }
        currentIndex = index;
      }

      // Auto-advance slides on hover
      slider.addEventListener('mouseenter', () => {
        const interval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % slides.length;
          showSlide(nextIndex);
        }, 3000);

        slider.addEventListener('mouseleave', () => {
          clearInterval(interval);
        }, { once: true });
      });
    });
  }

  // Product Gallery
  function initProductGallery() {
    const mainImage = document.querySelector('[data-main-image]');
    const thumbnails = document.querySelectorAll('[data-thumbnail]');
    const zoomModal = document.querySelector('[data-zoom-modal]');
    const zoomImg = document.querySelector('[data-zoom-img]');
    const zoomToggle = document.querySelector('[data-zoom-toggle]');
    const zoomClose = document.querySelector('[data-zoom-close]');
    const zoomPrev = document.querySelector('[data-zoom-prev]');
    const zoomNext = document.querySelector('[data-zoom-next]');
    let currentImageIndex = 0;
    const productImages = Array.from(document.querySelectorAll('.o-product__gallery-main-img img, .o-product__gallery-thumbnail img')).map(img => img.src);

    if (!mainImage || thumbnails.length === 0) return;

    function updateMainImage(index) {
      const newSrc = productImages[index];
      if (mainImage) {
        mainImage.src = newSrc;
      }
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('s-selected', i === index - 1);
      });
      currentImageIndex = index;
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        updateMainImage(index + 1);
      });
    });

    // Zoom functionality
    if (zoomToggle && zoomModal && zoomImg) {
      zoomToggle.addEventListener('click', () => {
        zoomModal.style.display = 'flex';
        zoomImg.src = mainImage.src;
        document.body.style.overflow = 'hidden';
      });

      zoomClose.addEventListener('click', () => {
        zoomModal.style.display = 'none';
        document.body.style.overflow = '';
      });

      zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) {
          zoomModal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });

      if (zoomPrev) {
        zoomPrev.addEventListener('click', () => {
          currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
          zoomImg.src = productImages[currentImageIndex];
        });
      }

      if (zoomNext) {
        zoomNext.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex + 1) % productImages.length;
          zoomImg.src = productImages[currentImageIndex];
        });
      }
    }
  }

  // Product Info Sections (Accordion)
  function initProductInfoSections() {
    const infoToggles = document.querySelectorAll('[data-info-toggle]');
    
    infoToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('[data-info-icon]');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
        if (icon) {
          icon.textContent = isExpanded ? '+' : '−';
        }
      });
    });
  }

  // Sort Dropdown
  function initSortDropdown() {
    const sortToggle = document.querySelector('[data-sort-toggle]');
    const sortMenu = document.querySelector('[data-sort-menu]');
    const sortOptions = document.querySelectorAll('[data-sort-value]');

    if (!sortToggle || !sortMenu) return;

    sortToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sortMenu.style.display === 'block';
      sortMenu.style.display = isOpen ? 'none' : 'block';
      sortToggle.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!sortToggle.contains(e.target) && !sortMenu.contains(e.target)) {
        sortMenu.style.display = 'none';
        sortToggle.setAttribute('aria-expanded', 'false');
      }
    });

    sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        const sortValue = option.getAttribute('data-sort-value');
        // Update URL with sort parameter
        const url = new URL(window.location);
        url.searchParams.set('sort_by', sortValue);
        window.location.href = url.toString();
      });
    });
  }

  // Product Drawer Overlay (Mobile)
  function initProductDrawer() {
    const puller = document.querySelector('[data-puller]');
    const drawerOverlay = document.querySelector('[data-drawer-overlay]');
    const drawerBackdrop = document.querySelector('[data-drawer-backdrop]');
    
    if (!puller || !drawerOverlay) return;

    let isDragging = false;
    let dragStartY = 0;
    let dragCurrentY = 0;
    let drawerPosition = 0;

    function updateDrawerPosition(position) {
      drawerPosition = Math.max(0, Math.min(1, position));
      drawerOverlay.style.transform = `translateY(${100 - (drawerPosition * 100)}%)`;
      drawerBackdrop.style.opacity = drawerPosition * 0.5;
      drawerBackdrop.style.pointerEvents = drawerPosition > 0.5 ? 'all' : 'none';
    }

    function openDrawer() {
      drawerOverlay.style.display = 'block';
      drawerBackdrop.style.display = 'block';
      updateDrawerPosition(1);
    }

    function closeDrawer() {
      updateDrawerPosition(0);
      setTimeout(() => {
        drawerOverlay.style.display = 'none';
        drawerBackdrop.style.display = 'none';
      }, 300);
    }

    // Touch events
    puller.addEventListener('touchstart', (e) => {
      isDragging = true;
      dragStartY = e.touches[0].clientY;
      drawerOverlay.style.transition = 'none';
    });

    puller.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      dragCurrentY = e.touches[0].clientY;
      const dragDistance = dragStartY - dragCurrentY;
      const maxDrag = 300;
      const position = Math.max(0, Math.min(dragDistance / maxDrag, 1));
      updateDrawerPosition(position);
    });

    puller.addEventListener('touchend', () => {
      if (!isDragging) return;
      const dragDistance = dragStartY - dragCurrentY;
      if (dragDistance > 100) {
        openDrawer();
      } else {
        closeDrawer();
      }
      isDragging = false;
      drawerOverlay.style.transition = 'transform 0.3s ease-out';
    });

    // Mouse events
    puller.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartY = e.clientY;
      drawerOverlay.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      dragCurrentY = e.clientY;
      const dragDistance = dragStartY - dragCurrentY;
      const maxDrag = 300;
      const position = Math.max(0, Math.min(dragDistance / maxDrag, 1));
      updateDrawerPosition(position);
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      const dragDistance = dragStartY - dragCurrentY;
      if (dragDistance > 100) {
        openDrawer();
      } else {
        closeDrawer();
      }
      isDragging = false;
      drawerOverlay.style.transition = 'transform 0.3s ease-out';
    });

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }
  }

  // Update variant ID when size/color changes
  function initVariantSelection() {
    const sizeInputs = document.querySelectorAll('[data-size-input]');
    const variantIdInput = document.querySelector('[data-variant-id]');
    const colorLinks = document.querySelectorAll('[data-color-value]');
    const form = document.querySelector('[data-product-form]');

    if (!form || !variantIdInput) return;

    // Helper function to update variant ID and UI
    function updateVariantId(newVariantId) {
      if (!variantIdInput) return;
      
      variantIdInput.value = newVariantId;
      
      // Find and check the matching size input
      const matchingSizeInput = form.querySelector(`[data-variant-id="${newVariantId}"]`);
      if (matchingSizeInput) {
        matchingSizeInput.checked = true;
        
        // Update visual state of size labels
        sizeInputs.forEach(input => {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (label) {
            label.classList.toggle('s-selected', input.checked);
            label.setAttribute('aria-selected', input.checked ? 'true' : 'false');
          }
        });
      }
    }

    // Update variant ID when size is selected
    sizeInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked && variantIdInput) {
          updateVariantId(input.value);
        }
      });
    });

    // Handle color selection - extract variant from URL
    colorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = new URL(link.href, window.location.origin);
        const variantId = url.searchParams.get('variant');
        
        if (variantId) {
          updateVariantId(variantId);
          
          // Update color selector visual state
          colorLinks.forEach(l => {
            l.closest('li')?.setAttribute('aria-selected', 'false');
            l.classList.remove('s-selected');
          });
          link.closest('li')?.setAttribute('aria-selected', 'true');
          link.classList.add('s-selected');
          
          // Update color title if it exists
          const colorTitle = document.querySelector('[data-color-title]');
          if (colorTitle) {
            colorTitle.textContent = link.getAttribute('data-color-value') || '';
          }
        }
      });
    });

    // Set initial variant ID from checked size input or URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariantId = urlParams.get('variant');
    
    if (urlVariantId) {
      updateVariantId(urlVariantId);
    } else {
      const checkedSize = form.querySelector('[data-size-input]:checked');
      if (checkedSize && variantIdInput) {
        updateVariantId(checkedSize.value);
      } else if (sizeInputs.length > 0) {
        // If no size is checked, check the first available one
        const firstAvailable = Array.from(sizeInputs).find(input => !input.disabled);
        if (firstAvailable) {
          firstAvailable.checked = true;
          updateVariantId(firstAvailable.value);
        }
      }
    }
  }

  // Add to Cart
  function initAddToCart() {
    const addToCartBtn = document.querySelector('[data-add-to-cart]');
    const form = document.querySelector('[data-product-form]');
    const liveRegion = document.getElementById('add-to-cart-live');

    if (!form) return;

    let isSubmitting = false;

    // Helper function to show error message
    function showError(message) {
      if (liveRegion) {
        liveRegion.textContent = message;
        liveRegion.setAttribute('role', 'alert');
      } else {
        alert(message);
      }
    }

    // Helper function to add item to cart
    async function addItemToCart(variantId, quantity = 1) {
      if (isSubmitting) return false;

      isSubmitting = true;

      // Disable buttons and show loading state
      if (addToCartBtn) {
        addToCartBtn.disabled = true;
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'ADDING...';
      }
      
      // Disable dynamic checkout buttons
      const dynamicCheckoutButtons = form.querySelectorAll('.shopify-payment-button button, [data-shopify-buttoncontainer] button');
      dynamicCheckoutButtons.forEach(btn => {
        btn.disabled = true;
      });

      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', quantity.toString());

      try {
        const response = await fetch(window.routes.cart_add_url, {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        const contentType = response.headers.get('content-type');
        let data;

        // Check if response is JSON
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          // Try to parse as JSON anyway, fallback to text
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch {
            throw new Error('Invalid response format');
          }
        }

        if (response.ok && !data.errors) {
          // Success
          if (addToCartBtn) {
            const originalText = addToCartBtn.getAttribute('data-default-text') || 'ADD TO BAG';
            const resultText = addToCartBtn.getAttribute('data-result-text') || 'ADDED';
            addToCartBtn.textContent = resultText;
            
            setTimeout(() => {
              addToCartBtn.textContent = originalText;
              addToCartBtn.disabled = false;
            }, 2000);
          }
          
          // Update cart count
          await updateCartCount();
          
          isSubmitting = false;
          return true;
        } else {
          // Error from Shopify
          const errorMessage = data.description || data.message || 'Error adding to cart. Please try again.';
          showError(errorMessage);
          
          if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = addToCartBtn.getAttribute('data-default-text') || 'ADD TO BAG';
          }
          
          // Re-enable dynamic checkout buttons
          const dynamicCheckoutButtons = form.querySelectorAll('.shopify-payment-button button, [data-shopify-buttoncontainer] button');
          dynamicCheckoutButtons.forEach(btn => {
            btn.disabled = false;
          });
          
          isSubmitting = false;
          return false;
        }
      } catch (error) {
        console.error('Add to cart error:', error);
        showError('Error adding to cart. Please check your connection and try again.');
        
        if (addToCartBtn) {
          addToCartBtn.disabled = false;
          addToCartBtn.textContent = addToCartBtn.getAttribute('data-default-text') || 'ADD TO BAG';
        }
        
        // Re-enable dynamic checkout buttons
        const dynamicCheckoutButtons = form.querySelectorAll('.shopify-payment-button button, [data-shopify-buttoncontainer] button');
        dynamicCheckoutButtons.forEach(btn => {
          btn.disabled = false;
        });
        
        isSubmitting = false;
        return false;
      }
    }

    // Handle form submission for Add to Cart
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const variantIdInput = form.querySelector('[data-variant-id]');
      const selectedVariantId = variantIdInput ? variantIdInput.value : null;

      if (!selectedVariantId) {
        showError('Please select a size');
        return;
      }

      // Check if variant is available (check disabled state of size input)
      const selectedSizeInput = form.querySelector('[data-size-input]:checked');
      if (selectedSizeInput && selectedSizeInput.disabled) {
        showError('This size is currently unavailable');
        return;
      }

      await addItemToCart(selectedVariantId, 1);
    });
  }

  // Update cart count in header
  async function updateCartCount() {
    try {
      const response = await fetch(window.routes.cart_url + '.js', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      const totalItems = data.item_count || 0;
      
      // Update cart count displays
      const cartCounts = document.querySelectorAll('.minicart-quantity, [data-cart-count]');
      cartCounts.forEach(count => {
        count.textContent = totalItems;
        count.setAttribute('aria-label', `${totalItems} items in cart`);
      });
      
      // Update cart link visibility (always show, but update count)
      const cartLinks = document.querySelectorAll('.minicart, [data-cart-link]');
      cartLinks.forEach(link => {
        // Always show cart link, but update styling if empty
        link.style.display = 'flex';
        link.classList.remove('hidden');
        if (totalItems === 0) {
          link.classList.add('cart-empty');
        } else {
          link.classList.remove('cart-empty');
        }
      });

      // Dispatch custom event for other scripts
      document.dispatchEvent(new CustomEvent('cart:updated', {
        detail: { itemCount: totalItems, cart: data }
      }));
    } catch (error) {
      console.error('Error updating cart count:', error);
      // Don't show error to user, just log it
    }
  }

  // Cart Page Functionality
  function initCartPage() {
    const cartForm = document.getElementById('cart-form');
    if (!cartForm) return;

    const updateBtn = cartForm.querySelector('[data-update-cart]');
    const checkoutBtn = cartForm.querySelector('[data-checkout-btn]');
    const quantityInputs = cartForm.querySelectorAll('[data-quantity-input]');
    const removeLinks = cartForm.querySelectorAll('[data-remove-item]');
    let isUpdating = false;

    // Helper function to show message
    function showCartMessage(message, type = 'success') {
      let messageEl = document.querySelector('.o-cart__message');
      if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = `o-cart__message o-cart__message--${type}`;
        const totals = cartForm.querySelector('.o-cart__totals');
        if (totals) {
          totals.insertBefore(messageEl, totals.firstChild);
        }
      }
      messageEl.textContent = message;
      messageEl.style.display = 'block';
      
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 3000);
    }

    // Helper function to format money (Shopify returns price in cents)
    function formatMoney(cents, currency = 'USD') {
      const amount = (cents / 100).toFixed(2);
      // Get currency symbol from Shopify's format or use default
      const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'CAD': 'C$',
        'AUD': 'A$'
      };
      const symbol = currencySymbols[currency] || '$';
      return `${symbol}${amount}`;
    }

    // Helper function to update cart totals
    function updateCartTotals(cartData) {
      const subtotalEl = cartForm.querySelector('.o-cart__subtotal span:last-child');
      if (subtotalEl && cartData.total_price !== undefined) {
        const currency = cartData.currency || 'USD';
        subtotalEl.textContent = formatMoney(cartData.total_price, currency);
      }

      // Update item prices
      if (cartData.items) {
        cartData.items.forEach((item) => {
          const itemEl = cartForm.querySelector(`[data-key="${item.key}"]`);
          if (itemEl) {
            const priceEl = itemEl.querySelector('.o-cart__item-price');
            if (priceEl && item.final_line_price !== undefined) {
              const currency = cartData.currency || 'USD';
              priceEl.textContent = formatMoney(item.final_line_price, currency);
            }
          }
        });
      }
    }

    // AJAX Cart Update
    async function updateCartAjax() {
      if (isUpdating) return;
      isUpdating = true;

      // Disable buttons and show loading
      if (updateBtn) {
        updateBtn.disabled = true;
        updateBtn.textContent = 'UPDATING...';
      }
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
      }

      // Collect quantity updates - Shopify expects updates[] array indexed by line number (1-based)
      // Match line numbers with cart items order
      const formData = new FormData();
      const cartItems = Array.from(cartForm.querySelectorAll('[data-cart-item]'));
      
      cartItems.forEach((itemEl, index) => {
        const input = itemEl.querySelector('[data-quantity-input]');
        if (input) {
          const quantity = parseInt(input.value) || 0;
          // Shopify uses 1-based line indexing
          formData.append(`updates[${index + 1}]`, quantity.toString());
        }
      });

      try {
        const response = await fetch(window.routes.cart_update_url + '.js', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch {
            throw new Error('Invalid response format');
          }
        }

        if (response.ok && !data.errors) {
          // Success - update cart display
          updateCartTotals(data);
          showCartMessage('Cart updated successfully', 'success');
          
          // Update cart count in header
          await updateCartCount();

          // Remove items with quantity 0
          quantityInputs.forEach(input => {
            if (parseInt(input.value) === 0) {
              const itemEl = input.closest('[data-cart-item]');
              if (itemEl) {
                itemEl.style.opacity = '0';
                setTimeout(() => {
                  itemEl.remove();
                  // Check if cart is empty
                  const remainingItems = cartForm.querySelectorAll('[data-cart-item]');
                  if (remainingItems.length === 0) {
                    window.location.reload();
                  }
                }, 300);
              }
            }
          });
        } else {
          // Error
          const errorMsg = data.description || data.message || 'Error updating cart';
          showCartMessage(errorMsg, 'error');
        }
      } catch (error) {
        console.error('Cart update error:', error);
        showCartMessage('Error updating cart. Please try again.', 'error');
      } finally {
        isUpdating = false;
        if (updateBtn) {
          updateBtn.disabled = false;
          updateBtn.textContent = 'UPDATE CART';
        }
        if (checkoutBtn) {
          checkoutBtn.disabled = false;
        }
      }
    }

    // AJAX Item Removal
    async function removeItemAjax(lineIndex, itemKey) {
      if (isUpdating) return;
      isUpdating = true;

      const itemEl = document.querySelector(`[data-key="${itemKey}"]`);
      if (itemEl) {
        itemEl.style.opacity = '0.5';
      }

      try {
        const response = await fetch(`${window.routes.cart_change_url}?line=${lineIndex}&quantity=0`, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          try {
            data = JSON.parse(text);
          } catch {
            throw new Error('Invalid response format');
          }
        }

        if (response.ok && !data.errors) {
          // Success - remove item from DOM
          if (itemEl) {
            itemEl.style.transition = 'opacity 0.3s';
            itemEl.style.opacity = '0';
            setTimeout(() => {
              itemEl.remove();
              
              // Check if cart is empty
              const remainingItems = cartForm.querySelectorAll('[data-cart-item]');
              if (remainingItems.length === 0) {
                window.location.reload();
              } else {
                // Update totals
                updateCartTotals(data);
                await updateCartCount();
                showCartMessage('Item removed', 'success');
              }
            }, 300);
          }
        } else {
          // Error
          if (itemEl) {
            itemEl.style.opacity = '1';
          }
          const errorMsg = data.description || data.message || 'Error removing item';
          showCartMessage(errorMsg, 'error');
        }
      } catch (error) {
        console.error('Remove item error:', error);
        if (itemEl) {
          itemEl.style.opacity = '1';
        }
        showCartMessage('Error removing item. Please try again.', 'error');
      } finally {
        isUpdating = false;
      }
    }

    // Handle form submission for update
    cartForm.addEventListener('submit', async (e) => {
      const submitBtn = e.submitter;
      
      // If checkout button clicked, let form submit normally
      if (submitBtn && submitBtn.name === 'checkout') {
        return; // Let Shopify handle checkout redirect
      }

      // If update button clicked, use AJAX
      if (submitBtn && submitBtn.name === 'update') {
        e.preventDefault();
        await updateCartAjax();
      }
    });

    // Handle remove links
    removeLinks.forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (!confirm('Remove this item from cart?')) {
          return;
        }

        const itemEl = link.closest('[data-cart-item]');
        const itemKey = itemEl ? itemEl.getAttribute('data-key') : null;
        // Get line index from data attribute (Shopify uses 1-based indexing)
        const lineIndex = link.getAttribute('data-line-index') || 
                         (Array.from(removeLinks).indexOf(link) + 1);

        if (itemKey) {
          await removeItemAjax(parseInt(lineIndex), itemKey);
        }
      });
    });
  }

  // Initialize all functionality when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMobileMenu();
      initSearch();
      initProductTileSlider();
      initProductGallery();
      initProductInfoSections();
      initSortDropdown();
      initProductDrawer();
      initVariantSelection();
      initAddToCart();
      initCartPage(); // Initialize cart page functionality
      updateCartCount(); // Load initial cart count
    });
  } else {
    initMobileMenu();
    initSearch();
    initProductTileSlider();
    initProductGallery();
    initProductInfoSections();
    initSortDropdown();
    initProductDrawer();
    initVariantSelection();
    initAddToCart();
    initCartPage(); // Initialize cart page functionality
    updateCartCount(); // Load initial cart count
  }
})();
