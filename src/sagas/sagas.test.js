import "babel-polyfill";
import expect from "expect";
import { loadCourses } from "./index";
import { call, put } from "redux-saga/effects";
import CourseApi from "../api/mockCourseApi";
import { LOAD_COURSES_SUCCESS, AJAX_CALL_ERROR } from "../actions/actionTypes";

describe("loadCourses Saga", () => {
  it("yields call(CourseApi.getAllCourses) and put(LOAD_COURSES_SUCCESS, courses)", () => {
    const iterator = loadCourses();
    expect(iterator.next().value).toEqual(call(CourseApi.getAllCourses));
    expect(iterator.next().value).toEqual(put(LOAD_COURSES_SUCCESS));
  });

  it("yields AJAX_CALL_ERROR when API throws error", () => {
    const iterator = loadCourses();
    expect(iterator.next().value).toEqual(call(CourseApi.getAllCourses));

    // create fake error
    const error = {};

    expect(iterator.throw(error).value).toEqual(
      put({ type: AJAX_CALL_ERROR, error })
    );
  });
});
