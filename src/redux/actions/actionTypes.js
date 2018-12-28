export const BEGIN_AJAX_CALL = "BEGIN_AJAX_CALL";
export const AJAX_CALL_ERROR = "AJAX_CALL_ERROR";

export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// AJAX call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our ajaxCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of ajaxCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
