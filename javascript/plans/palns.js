/**
 * Pricing Plan Toggle System
 * This script handles the pricing plan toggle functionality between monthly and annual plans.
 * It manages button states, background animation, and plan visibility with smooth transitions.
 */

// Object to store DOM elements for pricing plan toggle functionality
const pricingToggleElements = {
  allToggleButtons: document.querySelectorAll(".controls .button"),
  monthlyToggleButton: document.querySelector(".controls .monthly"),
  annualToggleButton: document.querySelector(".controls .annual"),
  toggleBackground: document.querySelector(".controls .background"),
};

// Select all pricing plan boxes that need to be toggled
const pricingPlanBoxes = document.querySelectorAll(
  ".plans-container .plan-box.face"
);

// Add click event listeners to all toggle buttons for active state management
pricingToggleElements.allToggleButtons.forEach((toggleButton) => {
  toggleButton.addEventListener("click", () => {
    // Only proceed if the clicked button is not already active
    if (!toggleButton.classList.contains("active")) {
      // Remove active class from all toggle buttons
      pricingToggleElements.allToggleButtons.forEach((buttonElement) => {
        buttonElement.classList.remove("active");
      });
    }

    // Add active class to the clicked button
    toggleButton.classList.add("active");
  });
});

// Add click event listener to annual toggle button for plan switching
pricingToggleElements.annualToggleButton.addEventListener("click", () => {
  // Move the background element to indicate annual plan selection
  pricingToggleElements.toggleBackground.classList.add("move");

  // Hide all pricing plan boxes with animation
  pricingPlanBoxes.forEach((planBox) => planBox.classList.add("hiddeng"));
});

// Add click event listener to monthly toggle button for plan switching
pricingToggleElements.monthlyToggleButton.addEventListener("click", () => {
  // Reset background position if it was moved for annual plans
  if (pricingToggleElements.toggleBackground.classList.contains("move")) {
    pricingToggleElements.toggleBackground.classList.remove("move");
  }

  // Show all pricing plan boxes by removing hidden class
  pricingPlanBoxes.forEach((planBox) => {
    if (planBox.classList.contains("hiddeng")) {
      planBox.classList.remove("hiddeng");
    }
  });
});

/*
 * How this pricing plan toggle code works:
 * 1. We start by selecting all toggle buttons (.button), specific monthly/annual buttons,
 *    background element, and all pricing plan boxes from the DOM
 * 2. For the general toggle button functionality:
 *    - We add click listeners to all toggle buttons
 *    - When a button is clicked, we first check if it's not already active
 *    - We remove the "active" class from all buttons to reset the state
 *    - We add the "active" class to the clicked button for visual feedback
 * 3. For the annual plan button:
 *    - We add the "move" class to the background element for visual transition
 *    - We add the "hiddeng" class to all plan boxes to hide monthly pricing
 * 4. For the monthly plan button:
 *    - We remove the "move" class from background to reset its position
 *    - We remove the "hiddeng" class from all plan boxes to show monthly pricing
 * 5. The system uses CSS classes for animations and transitions:
 *    - "active" class for button state indication
 *    - "move" class for background sliding animation
 *    - "hiddeng" class for hiding/showing pricing plans with transitions
 *
 * This approach creates a smooth pricing plan toggle experience with proper state management
 * and visual feedback for both button states and plan visibility.
 */
