/**
 * Responsive Team Slider System
 * This script handles horizontal sliding functionality for team member boxes.
 * It automatically adjusts to screen size changes and provides smooth navigation.
 */

// Object to store DOM elements and dynamic calculation methods
const teamSliderSystem = {
  boxContainer: document.querySelector(".the-line-box"),
  btnPrev: document.querySelector(".control-container .controls .prev"),
  btnNext: document.querySelector(".control-container .controls .next"),

  /**
   * Gets the current width of the container element
   * @returns {number} Container width in pixels
   */
  getContainerWidth() {
    return this.boxContainer.clientWidth;
  },

  /**
   * Gets the width of a single box element
   * @returns {number} Box width in pixels, or 0 if no box found
   */
  getBoxWidth() {
    const box = document.querySelector(".the-line-box .box");
    return box ? box.clientWidth : 0;
  },

  /**
   * Counts the total number of boxes in the container
   * @returns {number} Total number of boxes
   */
  getTotalBoxes() {
    return document.querySelectorAll(".the-line-box .box").length;
  },

  /**
   * Calculates how many boxes can fit in the visible area
   * @returns {number} Number of visible boxes
   */
  getVisibleBoxes() {
    const containerWidth = this.getContainerWidth();
    const boxWidth = this.getBoxWidth();
    const gap = 30;

    if (boxWidth === 0) return 1;

    return Math.floor((containerWidth + gap) / (boxWidth + gap));
  },

  /**
   * Calculates the maximum distance the slider can move
   * @returns {number} Maximum move distance in pixels
   */
  getMaxMoveSize() {
    const totalBoxes = this.getTotalBoxes();
    const visibleBoxes = this.getVisibleBoxes();
    const boxWidth = this.getBoxWidth();
    const gap = 30;

    if (visibleBoxes >= totalBoxes) return 0;

    const hiddenBoxes = totalBoxes - visibleBoxes;
    return hiddenBoxes * (boxWidth + gap);
  },
};

// Variable to track current position
let moveSize = 0;

/**
 * Handles the movement of boxes in the specified direction
 * @param {string} move - Direction to move ('next' or 'prev')
 */
function boxMoveHandler(move) {
  const boxWidth = teamSliderSystem.getBoxWidth();
  const gap = 30;
  const stepSize = boxWidth + gap;

  if (move === "next") {
    moveSize += stepSize;
  } else if (move === "prev") {
    moveSize -= stepSize;
  }

  const maxMove = teamSliderSystem.getMaxMoveSize();
  moveSize = Math.max(0, Math.min(moveSize, maxMove));

  teamSliderSystem.boxContainer.style.transform = `translateX(-${moveSize}px)`;
}

/**
 * Updates slider position when screen size changes
 * Ensures the slider stays within valid bounds after resize
 */
function updateSliderOnResize() {
  const maxMove = teamSliderSystem.getMaxMoveSize();

  if (moveSize > maxMove) {
    moveSize = maxMove;
    teamSliderSystem.boxContainer.style.transform = `translateX(-${moveSize}px)`;
  }

  if (maxMove === 0) {
    moveSize = 0;
    teamSliderSystem.boxContainer.style.transform = `translateX(0px)`;
  }
}

// Add click event listener to next button
teamSliderSystem.btnNext.addEventListener("click", () => {
  const maxMove = teamSliderSystem.getMaxMoveSize();

  if (maxMove === 0 || moveSize >= maxMove) {
    return;
  }

  boxMoveHandler("next");
});

// Add click event listener to previous button
teamSliderSystem.btnPrev.addEventListener("click", () => {
  if (moveSize <= 0) {
    return;
  }

  boxMoveHandler("prev");
});

// Handle window resize events with debouncing
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // console.log("Container width:", teamSliderSystem.getContainerWidth());
    // console.log("Visible boxes:", teamSliderSystem.getVisibleBoxes());
    // console.log("Max move size:", teamSliderSystem.getMaxMoveSize());

    updateSliderOnResize();
  }, 100);
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    teamSliderSystem.btnPrev.click();
  } else if (e.key === "ArrowRight") {
    teamSliderSystem.btnNext.click();
  }
});

/*
 * How this slider system works:
 * 1. We store all DOM elements and calculation methods in the teamSliderSystem object
 * 2. The system dynamically calculates:
 *    - Container width and box dimensions
 *    - Number of visible boxes based on screen size
 *    - Maximum movement distance to prevent over-scrolling
 * 3. Navigation functionality:
 *    - Next/Previous buttons move the slider by one box width + gap
 *    - Movement is constrained within valid bounds (0 to maxMoveSize)
 *    - Keyboard arrow keys provide additional navigation
 * 4. Responsive behavior:
 *    - Window resize events trigger recalculation of dimensions
 *    - Slider position is adjusted if it exceeds new bounds
 *    - Debouncing prevents excessive calculations during resize
 * 5. The transform property is used for smooth hardware-accelerated movement
 *
 * This approach ensures the slider works perfectly across all screen sizes
 * and provides a smooth, responsive user experience.
 */
