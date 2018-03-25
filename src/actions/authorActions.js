import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";

export function loadAuthors() {
  return { type: types.LOAD_AUTHORS };
}

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}
