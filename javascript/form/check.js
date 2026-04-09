/**
 * Course Selection and Checkbox Management System
 * This script handles the course selection functionality through clickable course names
 * and direct checkbox interactions. It provides visual feedback for selected courses.
 */

// Object to store DOM elements for course selection functionality
const courseSelectionElements = {
  checkboxElements: document.querySelectorAll(".courses-boxes .box .check"),
  courseNameElements: document.querySelectorAll(
    ".courses-boxes .box .name-course"
  ),
};

// Initialize the course selection system only if DOM elements exist
if (
  courseSelectionElements.courseNameElements.length &&
  courseSelectionElements.checkboxElements.length
) {
  // Add click event listeners to course name elements
  courseSelectionElements.courseNameElements.forEach((courseName) => {
    courseName.addEventListener("click", () => {
      // Find the associated checkbox (previous sibling element)
      const associatedCheckbox = courseName.previousElementSibling;

      // Toggle the checkbox selection if it exists and has the correct class
      if (
        associatedCheckbox &&
        associatedCheckbox.classList.contains("check")
      ) {
        associatedCheckbox.classList.toggle("active");
      }
    });
  });

  // Add click event listeners to checkbox elements for direct interaction
  courseSelectionElements.checkboxElements.forEach((checkboxElement) => {
    checkboxElement.addEventListener("click", () => {
      // Toggle the checkbox selection when clicked directly
      checkboxElement.classList.toggle("active");
    });
  });
}

/*
 * How this course selection code works:
 * 1. We start by selecting all checkbox elements (.check) and course name elements (.name-course)
 *    from the DOM structure: .courses-boxes .box .check and .courses-boxes .box .name-course
 * 2. We validate that both element collections exist and contain elements before proceeding
 * 3. When a user clicks on a course name:
 *    - We find the associated checkbox using previousElementSibling (assumes checkbox comes before name)
 *    - We verify the found element is actually a checkbox by checking for "check" class
 *    - We toggle the "active" class on the checkbox to provide visual feedback
 * 4. When a user clicks directly on a checkbox:
 *    - We directly toggle the "active" class for immediate visual feedback
 * 5. The "active" class is used to style the selected state of checkboxes
 *
 * This approach provides intuitive course selection where users can click either the checkbox
 * directly or the course name to select/deselect courses, with proper validation to prevent errors.
 */
