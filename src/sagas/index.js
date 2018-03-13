import { takeLatest, put, call, all, select, take } from "redux-saga/effects";
import * as authorActions from "../actions/authorActions";
import * as courseActions from "../actions/courseActions";
import * as ajaxActions from "../actions/ajaxStatusActions";
import CourseApi from "../api/mockCourseApi";
import AuthorApi from "../api/mockAuthorApi";
import {
  LOAD_COURSES_SUCCESS,
  SAVE_COURSE_SUCCESS,
  AJAX_CALL_ERROR
} from "../actions/actionTypes";

export function* loadAuthors() {
  yield put(ajaxActions.beginAjaxCall);
  const authors = yield call(AuthorApi.getAllAuthors);
  yield put(authorActions.loadAuthors, authors);
}

export function* loadCourses() {
  try {
    yield put(ajaxActions.beginAjaxCall);
    const courses = yield call(CourseApi.getAllCourses); // call a func. Can optionally pass additional params to call to args to the func
    yield put({ type: LOAD_COURSES_SUCCESS, courses }); // dispatch an action
  } catch (error) {
    yield put({ type: AJAX_CALL_ERROR, error }); // dispatch an action
  }
}

export function* saveCourse(course) {
  // yield will suspend the saga until it comples.
  const savedCourse = yield call(CourseApi.saveCourse(course));
  // Put is an effect. Effects are just JS objects that contain instructions that are handled by middleware.
  // Sagas are paused while the middlware is processing a yielded effect.
  const action = course.id
    ? courseActions.createCourseSuccess
    : courseActions.updateCourseSuccess;
  yield put(action);
}

// Spawn a new loadCourse task on each SAVE_COURSE
export function* watchLoadCourses() {
  yield take(LOAD_COURSES, loadCourses);
}

// Spawn a new saveCourse task on each SAVE_COURSE
export function* watchSaveCourse() {
  yield take(SAVE_COURSE, saveCourse);
}

function* watchAndLog() {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action", action); //eslint-disable-line no-console
    console.log("state after", state); //eslint-disable-line no-console
  }
}

export default function* root() {
  // This will start all the sagas in paralell.
  yield all([loadCourses(), loadAuthors(), watchSaveCourse(), watchAndLog()]);
}
