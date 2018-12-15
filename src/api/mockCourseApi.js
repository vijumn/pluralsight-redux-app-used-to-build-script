import delay from "./delay";
import { courses } from "../../tools/mockData";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
function generateId(course) {
  return replaceAll(course.title, " ", "-");
}

export function getAllCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...courses]), delay);
  });
}

export function saveCourse(course) {
  // clone to avoid mutating reference passed in.
  course = { ...course };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minCourseTitleLength = 2;
      if (course.title.length < minCourseTitleLength) {
        reject(`Title must be at least ${minCourseTitleLength} characters.`);
      }

      if (course.id) {
        const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        courses.splice(existingCourseIndex, 1, course);
      } else {
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        course.id = generateId(course);
        course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        courses.push(course);
      }

      // Just return here, since cloning at the beginning of the function instead.
      resolve(course);
    }, delay);
  });
}

export function deleteCourse(courseId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const indexOfCourseToDelete = courses.findIndex(
        course => course.courseId == courseId
      );
      courses.splice(indexOfCourseToDelete, 1);
      resolve();
    }, delay);
  });
}
