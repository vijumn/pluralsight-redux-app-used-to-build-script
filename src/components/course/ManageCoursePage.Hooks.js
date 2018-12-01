import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { saveCourse, loadCourses } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import { authorsFormattedForDropdown } from "../../reducers/authorReducer";
import { getCourseById } from "../../reducers/courseReducer";
import Spinner from "../common/Spinner";

function ManageCoursePage(props) {
  const {
    history,
    loadAuthors,
    saveCourse,
    authors,
    courses,
    loadCourses
  } = props;
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(
    () => {
      if (courses.length === 0) {
        loadCourses();
      } else {
        setCourse({ ...props.course });
      }
      if (authors.length === 0) loadAuthors();
    },
    [props.courses]
  );

  function handleChange(event) {
    setCourse({
      ...course,
      [event.target.name]: event.target.value
    });
  }

  function formIsValid() {
    let formIsValid = true;
    let errors = {};

    if (course.title.length < 2) {
      errors.title = "Title must be at least 2 characters.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    setSaving(true);

    saveCourse(course)
      // TODO: Note that this uses an alternative style of redirect. See CoursesPage for <Redirect/>
      // More: https://tylermcginnis.com/react-router-programmatically-navigate/
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
      allAuthors={authors}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id; // from the path `/course/:id`

  let course = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    courses: state.courses,
    loading: state.ajaxCallsInProgress > 0,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

// More explicit:
// function mapDispatchToProps(dispatch) {
// return {
//   saveCourse: dispatch(saveCourse),
//   loadAuthors: dispatch(loadAuthors)
// };
// }

const mapDispatchToProps = {
  saveCourse,
  loadAuthors,
  loadCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
