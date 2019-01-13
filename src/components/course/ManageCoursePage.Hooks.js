import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { saveCourse, loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { getCourseBySlug } from "../../redux/reducers/courseReducer";
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
      if (courses.length === 0) {
        loadCourses();
      } else {
        setCourse({
          ...props.course
        });
      }
      if (authors.length === 0) loadAuthors();
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
    const { title, authorId, category } = this.state.course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

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
          onSave: error.message
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
  //       onSave: error.message
  //     });
  //   }
  // }

  return authors.length === 0 || courses.length === 0 ? (
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
  const slug = ownProps.match.params.slug; // from the path `/course/:slug`

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
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
