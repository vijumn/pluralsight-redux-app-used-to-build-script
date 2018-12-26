import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...course, slug: createSlug(course.title) })
  })
    .then(handleResponse)
    .catch(handleError);
}

function createSlug(value) {
  return value == undefined
    ? ""
    : value
        .replace(/[^a-z0-9_]+/gi, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

// Async await version
// export async function deleteCourse(courseId) {
//   try {
//     const response = await fetch(baseUrl + courseId, { method: "DELET" });
//     handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// }
