import * as authorApi from "../api/authorApi";
import * as types from "./actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

// Async / await example to show the difference.
// export function loadAuthors() {
//   return async dispatch => {
//     dispatch(beginAjaxCall());
//     try {
//       const authors = await authorApi.getAuthors();
//       dispatch(loadAuthorsSuccess(authors));
//     } catch (error) {
//       dispatch(ajaxCallError(error));
//       throw error;
//     }
//   };
// }
