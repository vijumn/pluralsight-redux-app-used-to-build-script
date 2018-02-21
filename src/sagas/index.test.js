import "babel-polyfill";
import expect from "expect";
import { loadCourses } from "./index";
import { call } from "redux-saga/effects";
import CourseApi from "../api/mockCourseApi";
import { LOAD_COURSES_SUCCESS } from "../actions/actionTypes";

const iterator = loadCourses();

describe("loadCourses Saga", () => {
  it("yields call(CourseApi.getAllCourses) and put(LOAD_COURSES_SUCCESS, courses)", () => {
    expect(iterator.next().value).toEqual(call(CourseApi.getAllCourses));
    expect(iterator.next().value).toEqual(put(LOAD_COURSES_SUCCESS));
  });
});
