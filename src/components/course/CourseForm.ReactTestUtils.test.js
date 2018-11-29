import expect from "expect";
import React from "react";
import TestRenderer from "react-test-renderer";
import CourseForm from "./CourseForm";

function getCourseForm(args) {
  const defaultProps = {
    allAuthors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return TestRenderer.create(<CourseForm {...props} />).root;
}

describe("CourseForm via React Test Utils", () => {
  it("renders form and header", () => {
    const root = getCourseForm();
    expect(root.findAllByType("form").length).toEqual(1);
    expect(root.findAllByType("h2").length).toEqual(1);
  });

  it('save button is labeled "Save" when not saving', () => {
    const root = getCourseForm();
    const submitButton = root.findByProps({ type: "submit" });
    expect(submitButton.props.children).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving', () => {
    // To debug:
    // console.log(TestRenderer.create(<CourseForm {...props} />).toJSON());
    const root = getCourseForm({ saving: true });
    const submitButton = root.findByProps({ type: "submit" });
    expect(submitButton.props.children).toBe("Saving...");
  });
});
