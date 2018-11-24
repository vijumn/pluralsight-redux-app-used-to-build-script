import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "react-big-picture",
    title: "React: The Big Picture",
    authorId: "cory-house",
    length: "1:11",
    category: "JavaScript"
  },
  {
    id: "react-creating-reusable-components",
    title: "Creating Reusable React Components",
    authorId: "cory-house",
    length: "1:11",
    category: "JavaScript"
  },
  {
    id: "javascript-development-environment",
    title: "Building a JavaScript Development Environment",
    authorId: "cory-house",
    length: "5:19",
    category: "JavaScript"
  },
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    authorId: "cory-house",
    length: "6:20",
    category: "JavaScript"
  },
  {
    id: "react-redux-react-router-es6",
    title: "Building Applications with React and Redux in ES6",
    authorId: "cory-house",
    length: "6:13",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

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
