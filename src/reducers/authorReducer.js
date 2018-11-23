import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authors(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}

// Selectors
export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + " " + author.lastName
    };
  });
}
