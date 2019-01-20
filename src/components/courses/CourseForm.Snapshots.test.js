import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("sets submit button label to 'Saving...' when saving is true", () => {
  const tree = renderer
    .create(
      <CourseForm
        course={courses[0]}
        onSave={jest.fn()}
        onChange={jest.fn()}
        authors={authors}
        saving
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("sets submit button label to 'Save' when saving is false", () => {
  const tree = renderer
    .create(
      <CourseForm
        course={courses[0]}
        onSave={jest.fn()}
        onChange={jest.fn()}
        authors={authors}
        saving={false}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
