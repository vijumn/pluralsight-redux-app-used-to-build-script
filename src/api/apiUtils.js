export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // In a real app, would likely call an error logging service.
  alert("Oops! " + error);
  throw error;
}
