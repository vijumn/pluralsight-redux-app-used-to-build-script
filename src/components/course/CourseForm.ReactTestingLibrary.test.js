import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    allAuthors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

describe("CourseForm via React Test Utils", () => {
  it("should render h1", () => {
    const { getByText } = renderCourseForm();
    getByText("Manage Course");
  });

  it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText("Save");
  });

  it('should label save button as "Saving..." when saving', () => {
    const { getByText } = renderCourseForm({ saving: true });
    getByText("Saving...");
  });
});
