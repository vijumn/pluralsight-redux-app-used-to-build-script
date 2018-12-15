import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { mount } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage";
import { authors } from "../../../tools/mockData";

describe("Manage Course Page", () => {
  it("sets error message upon blur of empty title field", () => {
    const props = {
      authors: authors.map(author => ({
        value: author.id,
        text: `${author.firstName} ${author.lastName}`
      })),
      courses: [],
      saveCourse: jest.fn(),
      loadAuthors: jest.fn(),
      loadCourses: jest.fn(),
      course: {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        length: "",
        category: ""
      },
      match: {}
    };
    const wrapper = mount(
      <Router>
        <Route
          render={routerProps => (
            <ManageCoursePage {...routerProps} {...props} />
          )}
        />
      </Router>
    );

    const saveButton = wrapper.find("button");
    // uncomment to debug
    // console.log(wrapper.debug());
    expect(saveButton.prop("type")).toBe("submit"); //assure we found the submit.
    saveButton.simulate("click");
    const errors = wrapper.find(".alert");
    expect(errors.text()).toBe("Title must be at least 2 characters.");
  });
});
