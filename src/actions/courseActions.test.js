import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import { courses } from "../../tools/mockData";

// Test a sync action
describe("Course Actions", () => {
  describe("createCourseSuccess", () => {
    it("should create a CREATE_COURSE_SUCCESS action", () => {
      //arrange
      const course = courses[0];
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Course Actions Thunk", () => {
    it("should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      fetchMock.getOnce("http://localhost:3000/courses", {
        body: { courses },
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
