import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { saveCourse, loadCourses } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import { getCourseById, getCoursesSorted } from "../../reducers/courseReducer";
import Spinner from "../common/Spinner";
import { coursePropType, authorPropType } from "../propTypes";
import { newCourse } from "../../../tools/mockData";
import { produce } from "immer";

function ManageCoursePage(props) {
  const {
    history,
    loadAuthors,
    saveCourse,
    authors,
    courses,
    loadCourses
  } = props;
  const [course, setCourse] = useState({
    ...props.course
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // This effect replaces both componentDidMount and getDerivedStateFromProps.
  useEffect(
    () => {
      if (authors.length === 0) loadAuthors();
      if (courses.length === 0) {
        loadCourses();
      } else {
        setCourse({
          ...props.course
        });
      }
    },
    [props.courses]
  );

  function handleChange(event) {
    // Destructure for two reasons:
    // 1. To shorten calls below
    // 2. To store the value of event. If we don't, it won't be available in the calls to functional setState below:
    // This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property `target` on a released/nullified synthetic event.
    // Why? Because the synthetic event is no longer defined within the async function.
    // Two fixes:
    // 1. Call event.persist(). This which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    // 2. Create a reference to the event so we retain a local reference. I prefer this approach since destructuring has other benefits such as shortening the calls below.

    const { name, value } = event.target;
    // Using functional setState since setting state based on existing state.
    // Using computed property syntax (added in ES6) below (square braces).
    // setCourse(prevCourse => ({ ...prevCourse, [name]: value: name === "authorId" ? parseInt(value, 10) : value }));

    // Or, with immer. Pass produce to setState and mutate the draft.
    setCourse(
      produce(draft => {
        draft[name] = name === "authorId" ? parseInt(value, 10) : value;
      })
    );
  }

  function formIsValid() {
    let errors = {};
    if (course.title.length < 2) errors.title = "Title must be 2+ characters.";
    if (!course.authorId) errors.author = "Author is required.";
    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({
          onSave: error
        });
      });
  }

  // async / await
  // async function handleSave(event) {
  //   event.preventDefault();
  //   if (!formIsValid()) return;
  //   setSaving(true);

  //   try {
  //     await saveCourse(course);
  //     toast.success("Course saved.");
  //     history.push("/courses");
  //   } catch (error) {
  //     setSaving(false);
  //     setErrors({
  //       onSave: error
  //     });
  //   }
  // }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
      authors={authors}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: coursePropType.isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  authors: PropTypes.arrayOf(authorPropType).isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id; // from the path `/course/:id`

  const course =
    courseId && state.courses.length > 0
      ? getCourseById(state.courses, courseId)
      : newCourse;

  return {
    course,
    courses: getCoursesSorted(state.courses),
    authors: state.authors
  };
}

// See https://react-redux.js.org/using-react-redux/connect-mapdispatch#connect-dispatching-actions-with-mapdispatchtoprops
const mapDispatchToProps = {
  saveCourse,
  loadAuthors,
  loadCourses
};

// Or, more explicit:
// function mapDispatchToProps(dispatch) {
// return {
//   saveCourse: dispatch(saveCourse),
//   loadAuthors: dispatch(loadAuthors)
// };
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
