import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
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
  return shallow(<CourseForm {...props} />);
}

describe("CourseForm via Enzyme", () => {
  it("renders form and h1", () => {
    const wrapper = getCourseForm();
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h1").text()).toEqual("Manage Course");
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = getCourseForm();
    expect(wrapper.find("button").text()).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = getCourseForm({ saving: true });
    expect(wrapper.find("button").text()).toBe("Saving...");
  });
});
