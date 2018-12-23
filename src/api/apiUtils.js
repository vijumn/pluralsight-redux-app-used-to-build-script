export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  alert("Fetch failed: " + error);
}
