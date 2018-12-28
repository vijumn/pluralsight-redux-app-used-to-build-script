export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

// Returns array with each element nested under its slug.
// Useful for performance and normalization purposes.
export function nestBySlug(array) {
  return array.reduce((prev, cur) => {
    prev[cur.slug] = cur;
    return prev;
  }, {});
}
