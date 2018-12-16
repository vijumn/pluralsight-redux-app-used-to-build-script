import expect from "expect";
import React from "react";
import TestRenderer from "react-test-renderer";
import CourseForm from "./CourseForm";

function render(args) {
  const defaultProps = {
    authors: [],
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
    const root = render();
    expect(root.findAllByType("form").length).toEqual(1);
    expect(root.findAllByType("h2").length).toEqual(1);
  });

  it('save button is labeled "Save" when not saving', () => {
    const root = render();
    const submitButton = root.findByProps({ type: "submit" });
    expect(submitButton.props.children).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving', () => {
    // To debug:
    // console.log(TestRenderer.create(<CourseForm {...props} />).toJSON());
    const root = render({ saving: true });
    const submitButton = root.findByProps({ type: "submit" });
    expect(submitButton.props.children).toBe("Saving...");
  });
});
