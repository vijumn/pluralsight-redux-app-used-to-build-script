import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object spread to create a copy of current state
// and update values on the copy.
export default function courses(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];

    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );

    default:
      return state;
  }
}

// Selectors
export function getCourseById(courses, id) {
  const course = courses.find(course => course.id == id);
  if (course) return course;
  return null;
}
