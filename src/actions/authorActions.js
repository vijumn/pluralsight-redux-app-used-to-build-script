import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";

export function loadAuthors(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}
