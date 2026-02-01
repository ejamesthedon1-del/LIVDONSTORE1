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

    if (!form) return;

    // Update variant ID when size is selected
    sizeInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked && variantIdInput) {
          variantIdInput.value = input.value;
        }
      });
    });

    // Handle color selection - navigate to variant URL to get correct variant
    colorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = new URL(link.href, window.location.origin);
        const variantId = url.searchParams.get('variant');
        if (variantId && variantIdInput) {
          variantIdInput.value = variantId;
          // Update size selector to match new variant if available
          const matchingSizeInput = document.querySelector(`[data-variant-id="${variantId}"]`);
          if (matchingSizeInput && !matchingSizeInput.disabled) {
            matchingSizeInput.checked = true;
            variantIdInput.value = variantId;
          }
        }
      });
    });

    // Set initial variant ID from checked size input
    const checkedSize = form.querySelector('[data-size-input]:checked');
    if (checkedSize && variantIdInput) {
      variantIdInput.value = checkedSize.value;
    }
  }

  // Add to Cart
  function initAddToCart() {
    const addToCartBtn = document.querySelector('[data-add-to-cart]');
    const buyNowBtn = document.querySelector('[data-buy-now]');
    const form = document.querySelector('[data-product-form]');

    if (!form) return;

    // Handle form submission for Add to Cart
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const variantIdInput = form.querySelector('[data-variant-id]');
      const selectedVariantId = variantIdInput ? variantIdInput.value : null;

      if (!selectedVariantId) {
        alert('Please select a size');
        return;
      }

      const formData = new FormData();
      formData.append('id', selectedVariantId);
      formData.append('quantity', '1');

      try {
        const response = await fetch(window.routes.cart_add_url, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          
          // Update button text
          if (addToCartBtn) {
            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = addToCartBtn.getAttribute('data-result-text') || 'ADDED';
            addToCartBtn.disabled = true;
            
            setTimeout(() => {
              addToCartBtn.textContent = originalText;
              addToCartBtn.disabled = false;
            }, 2000);
          }
          
          // Update cart count in header
          updateCartCount();
        } else {
          const error = await response.json();
          alert(error.description || 'Error adding to cart');
        }
      } catch (error) {
        console.error('Add to cart error:', error);
        alert('Error adding to cart. Please try again.');
      }
    });

    // Handle Buy Now button (Pay button)
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const variantIdInput = form.querySelector('[data-variant-id]');
        const selectedVariantId = variantIdInput ? variantIdInput.value : null;

        if (!selectedVariantId) {
          alert('Please select a size');
          return;
        }

        const formData = new FormData();
        formData.append('id', selectedVariantId);
        formData.append('quantity', '1');

        try {
          const response = await fetch(window.routes.cart_add_url, {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            // Redirect to checkout
            window.location.href = window.routes.cart_url + '?checkout';
          } else {
            const error = await response.json();
            alert(error.description || 'Error adding to cart');
          }
        } catch (error) {
          console.error('Buy now error:', error);
          alert('Error adding to cart. Please try again.');
        }
      });
    }
  }

  // Update cart count in header
  function updateCartCount() {
    fetch(window.routes.cart_url + '.js')
      .then(res => res.json())
      .then(data => {
        const cartCounts = document.querySelectorAll('.minicart-quantity');
        const totalItems = data.item_count || 0;
        cartCounts.forEach(count => {
          count.textContent = totalItems;
        });
        
        // Show/hide cart link based on item count
        const cartLinks = document.querySelectorAll('.minicart');
        cartLinks.forEach(link => {
          if (totalItems > 0) {
            link.style.display = 'flex';
          }
        });
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
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
    updateCartCount(); // Load initial cart count
  }
})();
