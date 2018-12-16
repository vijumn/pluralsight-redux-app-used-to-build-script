import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { createSelector } from "reselect";
import { produce } from "immer";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object spread to create a copy of current state
// and update values on the copy.
export default function courses(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    // case types.CREATE_COURSE_SUCCESS:
    //   return [...state, { ...action.course }];

    // case types.UPDATE_COURSE_SUCCESS:
    //   return state.map(course =>
    //     course.id === action.course.id ? action.course : course
    //   );

    // Immer examples below
    case types.CREATE_COURSE_SUCCESS:
      return produce(state, draft => {
        draft.push(action.course);
      });

    case types.UPDATE_COURSE_SUCCESS:
      return produce(state, draft => {
        const courseIndex = draft.findIndex(
          course => course.id === action.course.id
        );
        draft[courseIndex] = action.course;
      });

    default:
      return state;
  }
}

// Plain input selectors. Not memoized since these don't transform the data they select.
// These merely select a relevant piece of state from this reducer.
const getAllCoursesSelector = state => state;
// const getCategorySelector = state => state.selectedCategory;

export function getCourseById(courses, id) {
  return courses.find(course => course.id == id) || null;
}

// Memoized selectors
// Pass an array of input selectors as first arg.
export const getCoursesSorted = createSelector(
  getAllCoursesSelector,
  courses => {
    // Since sort is an in place algorithm, cloning the array before sorting.
    // debugger;
    // Via https://stackoverflow.com/a/9645447/26180
    return [...courses].sort((a, b) =>
      a.title.localeCompare(b.title, "en", {
        sensitivity: "base"
      })
    );
  }
);

// export const getCoursesByCategory = createSelector(
//   [getCoursesSorted, getCategorySelector],
//   (courses, category) => {
//     return courses.filter(course => course.category === category);
//   }
// );
