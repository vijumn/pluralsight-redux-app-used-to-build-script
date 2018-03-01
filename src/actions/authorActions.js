import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";
import { beginAjaxCall } from "./ajaxStatusActions";

export function* loadAuthors() {
  yield put(beginAjaxCall);
  const authors = yield call(AuthorApi.getAllAuthors);
  yield put({ type: types.LOAD_AUTHORS_SUCCESS, authors });
}
