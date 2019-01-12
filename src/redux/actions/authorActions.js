import * as authorApi from "../../api/authorApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// To handle this without using thunks/sagas, etc, could pass dispatch.
export function loadAuthors() {
  return dispatch => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// Async / await example to show the difference.
// export function loadAuthors() {
//   return async dispatch => {
//     dispatch(beginApiCall());
//     try {
//       const authors = await authorApi.getAuthors();
//       dispatch(loadAuthorsSuccess(authors));
//     } catch (error) {
//       dispatch(apiCallError(error));
//       throw error;
//     }
//   };
// }
