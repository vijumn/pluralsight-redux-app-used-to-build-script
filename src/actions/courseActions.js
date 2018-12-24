import * as courseApi from "../api/courseApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import { createAction } from "redux-starter-kit";

export const loadCoursesSuccess = createAction("loadCoursesSuccess");
export const createCourseSuccess = createAction("createCourseSuccess");
export const updateCourseSuccess = createAction("updateCourseSuccess");
export const deleteCourseOptimistic = createAction("deleteCourseOptimistic");

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
      });
  };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end Ajax call actions since we don't want to show loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id).catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
  };
}

// Async / await example
// export function deleteCourse(course) {
//   return async function (dispatch) {
//     // Doing optimistic delete, so not dispatching begin/end Ajax call actions since we don't want to show loading status for this.
//     dispatch(deleteCourseOptimistic(course));
//     try {
//       await courseApi.deleteCourse(course.id);
//     } catch (error) {
//       dispatch(ajaxCallError(error));
//       throw new Error(error);
//     }
//   };
// }
