const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl).then(response => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
}
