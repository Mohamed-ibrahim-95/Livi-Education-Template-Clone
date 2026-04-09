/**
 * Course Tabs and Filtering System
 * This script handles the tab selection and course filtering functionality.
 * It enables users to filter courses by category and adds visual transitions.
 */

// Object to store DOM elements and current selection state
const courseTabsSystem = {
  tabButtons: document.querySelectorAll(".tab-courses-container .data"),
  courseCards: document.querySelectorAll(".course-box"),
  selectedCategory: null,
};

/**
 * Removes the "active" class from all tab buttons
 * Used to reset the active state before setting a new active tab
 */
function clearActiveTabState() {
  courseTabsSystem.tabButtons.forEach((tabButton) => {
    if (tabButton.classList.contains("active")) {
      tabButton.classList.remove("active");
    }
  });
}

// Add click event listeners to all tab buttons
courseTabsSystem.tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    // Remove "active" class from all tabs
    clearActiveTabState();

    // Add "active" class to the clicked tab
    tabButton.classList.add("active");

    // Store the selected category from data-type attribute
    courseTabsSystem.selectedCategory = tabButton.getAttribute("data-type");

    // Filter the course cards based on the selected category
    filterCoursesByCategory();
  });
});

/**
 * Filters course cards based on the selected category
 * Adds animation classes and handles display property changes
 */
function filterCoursesByCategory() {
  // Exit if no category is selected
  if (courseTabsSystem.selectedCategory === null) return;

  // Show all cards if "all" category is selected
  if (courseTabsSystem.selectedCategory === "all") {
    courseTabsSystem.courseCards.forEach((courseCard) => {
      if (courseCard.classList.contains("hidden-box")) {
        courseCard.classList.remove("hidden-box");
      }
      courseCard.style.display = "block";
    });
  } else {
    // Filter cards based on selected category
    courseTabsSystem.courseCards.forEach((courseCard) => {
      if (!courseCard.classList.contains(courseTabsSystem.selectedCategory)) {
        // Hide cards that don't match the selected category
        courseCard.classList.add("hidden-box");

        // Wait for transition to complete before changing display property
        courseCard.addEventListener("transitionend", () => {
          if (courseCard.classList.contains("hidden-box")) {
            courseCard.style.display = "none";
          }
        });
      } else {
        // Show cards that match the selected category
        courseCard.classList.remove("hidden-box");
        courseCard.style.display = "";
      }
    });
  }
}

/*
 * How this tab code works:
 * 1. We start by selecting all tab buttons and course cards and storing them in the courseTabsSystem object
 * 2. When a user clicks on a tab button:
 *    - We clear the active state from all tabs
 *    - We set the clicked tab as active
 *    - We store the category value from the data-type attribute
 *    - We call the filterCoursesByCategory function
 * 3. The filterCoursesByCategory function:
 *    - If "all" is selected, it shows all course cards
 *    - Otherwise, it only shows cards that match the selected category
 *    - It adds/removes the "hidden-box" class to create a transition effect
 *    - It uses the transitionend event to change the display property after animation completes
 *
 * This approach creates a smooth filtering experience with fade-out transitions when switching categories.
 */
