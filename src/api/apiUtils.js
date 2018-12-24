export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // In a real app, would likely call an error logging service.
  // For now, putting here so viewers are notified if any API call fails.
  alert("API call failed. " + error);
  throw error;
}
