export function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}
