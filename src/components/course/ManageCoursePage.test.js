import React from "react";
import { mount } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage";
import { authors, newCourse, courses } from "../../../tools/mockData";

function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {}, // passed from React Router in real app, so just stubbing in for test. Could also choose to use MemoryRouter as shown in Header.test.js, or even wrap with React Router, depending on whether I need to test React Router related behavior.
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />);
}

describe("Manage Course Page", () => {
  it("sets error when attempting to save an empty title field", () => {
    const wrapper = render();
    const saveButton = wrapper.find("button");
    // uncomment to debug
    // console.log(wrapper.debug());
    expect(saveButton.prop("type")).toBe("submit"); //assure we found the submit.
    saveButton.simulate("click");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title must be 2+ characters.");
  });
});
