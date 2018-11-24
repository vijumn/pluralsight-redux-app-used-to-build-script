import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm";
import { authorsFormattedForDropdown } from "../../reducers/authorReducer";

function ManageCoursePage(props) {
  const { history, actions, authors } = props;
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function saveCourse(event) {
    event.preventDefault();

    if (!courseFormIsValid()) {
      return;
    }

    setSaving(true);
    actions
      .saveCourse(course)
      // TODO: Note that this uses an alternative style of redirect. See CoursesPage for <Redirect/>
      // More: https://tylermcginnis.com/react-router-programmatically-navigate/
      // The 2nd param passes state so toast shows.
      // Perhaps I should use a React component like react-toast instead of my homemade notification.
      .then(() => history.push("/courses", { saved: true }))
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error });
      });
  }

  function courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (course.title.length < 2) {
      errors.title = "Title must be at least 2 characters.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  }

  return (
    <CourseForm
      course={course}
      onChange={event => {
        setCourse({
          ...course,
          [event.target.name]: event.target.value
        });
      }}
      onSave={saveCourse}
      errors={errors}
      allAuthors={authors}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

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
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
