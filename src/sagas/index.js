import { takeLatest, put, call, select, take } from "redux-saga/effects";
import CourseApi from "../api/mockCourseApi";
import {
  LOAD_COURSES_SUCCESS,
  SAVE_COURSE,
  AJAX_CALL_ERROR
} from "../actions/actionTypes";

export function* loadCourses() {
  try {
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
  yield put({ type: SAVE_COURSE, course });
}

// Spawn a new loadCourse task on each SAVE_COURSE
export function* watchLoadCourses() {
  yield take(LOAD_COURSES);
}

// Spawn a new saveCourse task on each SAVE_COURSE
export function* watchSaveCourse() {
  yield take(SAVE_COURSE);
}

function* watchAndLog() {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action", action);
    console.log("state after", state);
  }
}

export default function* root() {
  // This will start all the sagas in paralell.
  yield all([loadCourses(), watchSaveCourse(), watchAndLog()]);
}
