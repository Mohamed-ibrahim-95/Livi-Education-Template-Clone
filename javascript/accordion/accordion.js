/**
 * Accordion Interactive System
 * This script handles the accordion expand/collapse functionality.
 * It manages the active states of accordion items and their content visibility.
 */

// Object to store DOM elements for accordion sections
const accordionSystem = {
  sections: document.querySelectorAll(".accordion-section"),
};

// Process each accordion section independently
accordionSystem.sections.forEach((currentSection) => {
  const accordionItems = Array.from(
    currentSection.getElementsByClassName("accordion-item")
  );
  const accordionContentElements = Array.from(
    currentSection.getElementsByClassName("accordion-content")
  );

  /**
   * Removes the "active" class from all accordion content elements
   * Used to reset all content visibility before applying new active states
   */
  function clearActiveContentStates() {
    accordionContentElements.forEach((contentElement) =>
      contentElement.classList.remove("active")
    );
  }

  /**
   * Adds the "active" class to content elements whose parent items are active
   * This function synchronizes content visibility with their parent item states
   */
  function applyActiveContentStates() {
    accordionContentElements.forEach((contentElement) => {
      if (contentElement.parentElement.classList.contains("active")) {
        contentElement.classList.add("active");
      }
    });
  }

  // Add click event listeners to all accordion items in this section
  accordionItems.forEach((accordionItem) => {
    accordionItem.addEventListener("click", () => {
      // Remove "active" class from all accordion items in this section
      accordionItems.forEach((itemElement) =>
        itemElement.classList.remove("active")
      );

      // Add "active" class to the clicked accordion item
      accordionItem.classList.add("active");

      // Reset all content states and apply new active states
      clearActiveContentStates();
      applyActiveContentStates();
    });
  });
});

/*
 * How this accordion code works:
 * 1. We start by selecting all accordion sections and storing them in the accordionSystem object
 * 2. For each accordion section, we:
 *    - Get all accordion items and content elements within that section
 *    - Define helper functions to manage content visibility states
 * 3. When a user clicks on an accordion item:
 *    - We remove the active state from all items in the same section
 *    - We set the clicked item as active
 *    - We clear all content active states
 *    - We apply active states to content elements whose parent items are active
 * 4. The clearActiveContentStates function removes visibility from all content
 * 5. The applyActiveContentStates function shows content for items marked as active
 *
 * This approach ensures only one accordion item is active per section at a time,
 * and the corresponding content is properly shown/hidden based on the item's state.
 */
