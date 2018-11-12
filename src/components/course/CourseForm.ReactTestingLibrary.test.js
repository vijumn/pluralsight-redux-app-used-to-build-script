// import expect from 'expect';
// import React from 'react';
// import { cleanup, render } from 'react-testing-library';
// import CourseForm from './CourseForm';

// afterEach(cleanup);

// function getCourseForm(args) {
//   let defaultProps = {
//     allAuthors: [],
//     course: {},
//     saving: false,
//     errors: {},
//     onSave: () => {},
//     onChange: () => {}
//   };

//   const props = {...defaultProps, args};
//   return <CourseForm {...props}/>;
// }

// describe('CourseForm via React Test Utils', () => {
//   it('should render h1', () => {
//     const { getByText } = render(getCourseForm());
//     const header = getByText('Course Form');
//     expect(header).toExist();
//   });

//   it('should label save button as "Save" when not saving', () => {
//     const { getByText } = render(getCourseForm());
//     expect(getByText('Save')).toExist();
//   });

//   it('should label save button as "Saving..." when saving', () => {
//     const { getByText } = render(getCourseForm({saving: true}));
//     expect(getByText('Saving...')).toExist();
//   });
// });
