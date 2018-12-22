const baseUrl = process.env.API_URL + "/courses/";

export function getCourses() {
  return fetch(baseUrl).then(response => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST is for create, so if an id already exists, PUT to signify update.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  }).then(response => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, {
    method: "DELETE"
  }).then(response => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  });
}
