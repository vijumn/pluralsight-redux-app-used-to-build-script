import { handleResponse } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

export function getCourses() {
  return fetch(baseUrl).then(handleResponse);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  }).then(handleResponse);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" }).then(handleResponse);
}
