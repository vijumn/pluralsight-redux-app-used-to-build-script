import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
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
  return shallow(<CourseForm {...props} />);
}

describe("CourseForm via Enzyme", () => {
  it("renders form and header", () => {
    const wrapper = render();
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Add Course");
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = render();
    expect(wrapper.find("button").text()).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = render({ saving: true });
    expect(wrapper.find("button").text()).toBe("Saving...");
  });
});
