// Centralized validator. Used by both client and server.
// Returns an errors object with keys associated to the item that fail validation.
function validateCourse(course) {
  const errors = {};
  if (!course.title) errors.title = "Title is required.";
  if (!course.authorId) errors.author = "Author is required";
  if (!course.category) errors.category = "Category is required";
  return errors;
}

// Using CommonJS style export so we can call this from both Node and the UI.
module.exports = {
  validateCourse
};
