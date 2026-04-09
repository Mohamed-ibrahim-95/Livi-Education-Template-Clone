const navElements = {
  header: document.querySelector(".header-section"),
  headerNav: document.querySelector(".header-navigation"),
  root: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav .link"),
  primaryMenu: document.querySelector(".mainMenu"),
  menuItems: document.querySelectorAll(".mainMenu > .menuItem"),
  hamburgerBtn: document.querySelector(".toggleBox"),
  expandButtons: document.querySelectorAll(".openSubmenu"),
  backButtons: document.querySelectorAll(".goBack"),
  dismissButtons: document.querySelectorAll(".closeNav"),
  menuWrappers: document.querySelectorAll(".menu-container"),
  support: document.querySelector(".support"),
  supportSection: document.querySelector(".support-promo-section"),
  supportCloseBtn: document.querySelector(".close-button"),
};

// Media query configuration object - controls responsive behavior thresholds
const viewportConfig = {
  mobileBreakpoint: 1399, // Breakpoint for mobile/desktop views (in px)
  isInitialized: false, // Tracks if navigation has been initialized
  get mediaQueryMatcher() {
    return window.matchMedia(`(max-width: ${this.mobileBreakpoint}px)`); // Dynamic media query generator
  },
  get breakpointValue() {
    return parseInt(this.mediaQueryMatcher.media.replace(/\D/g, ""), 10); // Extracts numeric value from media query string
  },
};

function headerHeightHandler() {
  const getHeight = navElements.headerNav.clientHeight;
  headerHeight(getHeight);
}

function headerHeight(height) {
  navElements.header.style.cssText = `height: ${height}px`;
}

// Creates and adds the underline element to the main menu
function createMenuUnderline() {
  const underlineElement = document.createElement("li");
  underlineElement.classList.add("underline");
  navElements.primaryMenu.appendChild(underlineElement);
}

// Sets up the underline element with default position and width
function setupUnderlineIndicator() {
  // Add the underline element to DOM
  createMenuUnderline();

  // Set initial underline width to match first menu item
  const firstItemWidth = navElements.menuItems[0].clientWidth;
  const underlineIndicator = document.querySelector(".underline");
  underlineIndicator.style.cssText = `width: ${firstItemWidth}px`;

  // Enable underline movement on hover
  animateUnderlineOnHover();
}

// Handles the animation of the underline element on menu item hover
function animateUnderlineOnHover() {
  const underlineIndicator = document.querySelector(".underline");
  navElements.menuItems.forEach((item) => {
    // Move underline to hovered item
    item.addEventListener("mouseover", function () {
      underlineIndicator.style.cssText = `width: ${item.offsetWidth}px; left: ${item.offsetLeft}px`;
    });

    // Return underline to default position on mouse leave
    item.addEventListener("mouseleave", () => {
      underlineIndicator.style.cssText = `width: ${navElements.menuItems[0].clientWidth}px; left: 0`;
    });
  });
}

// Shows the main navigation menu
function showMainNavigation() {
  navElements.root.classList.add("show-menu");
}

// Opens the submenu when a parent menu item is clicked
function expandSubmenu(event) {
  event.preventDefault();
  const submenu = this.nextElementSibling;

  if (submenu) {
    submenu.classList.add("show-menu");
  }
}

// Handles the back button functionality in submenus
function navigateBack() {
  const submenu = this.parentElement.parentElement;
  if (submenu) {
    submenu.classList.remove("show-menu");
  }
}

// Closes all open menus and submenus
function collapseAllMenus() {
  const visibleMenus = document.querySelectorAll(".show-menu");
  visibleMenus.forEach((menu) => {
    menu.classList.remove("show-menu");
  });
}

// Shows the contact/support section
function showSupportSection() {
  navElements.support.classList.add("section-blur");
  navElements.supportSection.classList.add("open");
}

// Attaches event listener for opening contact section
function bindSupportSectionOpen() {
  navElements.hamburgerBtn.addEventListener("click", showSupportSection);
}

// Hides the contact/support section
function hideSupportSection() {
  navElements.support.classList.remove("section-blur");
  navElements.supportSection.classList.remove("open");
}

// Attaches event listener for closing contact section
function bindSupportSectionClose() {
  navElements.supportCloseBtn.addEventListener("click", hideSupportSection);
}

// Cleanup function - removes all navigation-related event listeners
function unbindNavListeners() {
  if (navElements.hamburgerBtn) {
    navElements.hamburgerBtn.removeEventListener("click", showMainNavigation);
  }

  navElements.expandButtons.forEach((button) => {
    button.removeEventListener("click", expandSubmenu);
  });

  navElements.backButtons.forEach((button) => {
    button.removeEventListener("click", navigateBack);
  });

  navElements.dismissButtons.forEach((button) => {
    button.removeEventListener("click", collapseAllMenus);
  });

  navElements.menuItems.forEach((item) => {
    item.removeEventListener("mouseover", animateUnderlineOnHover);
  });

  navElements.menuItems.forEach((item) => {
    item.removeEventListener("mouseleave", animateUnderlineOnHover);
  });

  navElements.hamburgerBtn.removeEventListener("click", showSupportSection);
  navElements.supportCloseBtn.removeEventListener("click", hideSupportSection);
}

// Simple handler to prevent default link behavior
function preventNavigation(event) {
  event.preventDefault();
}

// Apply preventDefaultLink to all navigation links
navElements.navLinks.forEach((link) => {
  link.addEventListener("click", preventNavigation);
});

// Sets up mobile navigation with appropriate event listeners
function initMobileNavigation() {
  // Safety check - ensure required DOM elements exist
  if (!navElements.root || !navElements.hamburgerBtn) {
    return;
  }

  // Setup main menu toggle
  navElements.hamburgerBtn.addEventListener("click", showMainNavigation);

  // Setup submenu toggles
  navElements.expandButtons.forEach((button) => {
    button.addEventListener("click", expandSubmenu);
  });

  // Setup back buttons in submenus
  navElements.backButtons.forEach((button) => {
    button.addEventListener("click", navigateBack);
  });

  // Setup close buttons
  navElements.dismissButtons.forEach((button) => {
    button.addEventListener("click", collapseAllMenus);
  });
}

// Main responsive behavior handler - runs when viewport width changes
viewportConfig.mediaQueryMatcher.addEventListener("change", (media) => {
  // Clean up existing event listeners to prevent duplicates
  unbindNavListeners();

  // Reset UI state - close any open menus
  navElements.menuWrappers.forEach((menu) => {
    if (menu.classList.contains("show-menu")) {
      menu.classList.remove("show-menu");
    }
  });

  if (navElements.support.classList.contains("section-blur")) {
    navElements.support.classList.remove("section-blur");
  }

  // Reset contact section if open
  if (navElements.supportSection.classList.contains("open")) {
    navElements.supportSection.classList.remove("open");
  }

  if (media.matches) {
    headerHeightHandler();

    // Mobile view setup
    initMobileNavigation();

    // Remove underline element in mobile view
    const underline = document.querySelector(".underline");
    if (underline) {
      underline.remove();
    }
  } else {
    // Desktop view setup
    headerHeightHandler();
    setupUnderlineIndicator();
    bindSupportSectionOpen();
    bindSupportSectionClose();
  }
});

// Initial setup on page load
window.addEventListener("load", () => {
  headerHeightHandler();
  // Check viewport size and initialize appropriate navigation
  if (viewportConfig.mediaQueryMatcher.matches) {
    // Mobile view
    initMobileNavigation();
  }

  if (window.innerWidth > viewportConfig.breakpointValue) {
    // Desktop view
    setupUnderlineIndicator();
    bindSupportSectionOpen();
    bindSupportSectionClose();
  }
});

/*
 * How this navigation code works:
 * 1. We start by gathering all navigation elements in the navElements object for easy access
 * 2. We set up viewport configuration with viewportConfig object to track screen size changes
 * 3. Header handling:
 *    - headerHeightHandler() gets the height of the navigation header
 *    - headerHeight() applies that height to the header section for proper spacing
 * 4. Desktop navigation features:
 *    - createMenuUnderline() adds an animated underline element to the main menu
 *    - setupUnderlineIndicator() configures its initial position and width
 *    - animateUnderlineOnHover() handles movement of the underline based on mouse position
 * 5. Mobile navigation features:
 *    - showMainNavigation() displays the mobile menu when hamburger button is clicked
 *    - expandSubmenu() opens nested submenus when parent items are selected
 *    - navigateBack() handles the "back" button functionality in submenus
 *    - collapseAllMenus() closes all open menus when dismiss button is clicked
 * 6. Support section handling:
 *    - showSupportSection() and hideSupportSection() toggle the support/contact panel
 *    - bindSupportSectionOpen() and bindSupportSectionClose() attach event listeners
 * 7. Event listener management:
 *    - unbindNavListeners() cleans up all event listeners to prevent duplicates
 *    - preventNavigation() stops default link behavior where needed
 * 8. Responsive behavior:
 *    - initMobileNavigation() sets up all mobile-specific event listeners
 *    - The media query listener handles switching between mobile and desktop layouts
 *    - Appropriate features are initialized based on current viewport width
 *
 * This navigation system provides a smooth, responsive experience that adapts to different
 * screen sizes, with proper event handling and cleanup to prevent memory leaks.
 */
