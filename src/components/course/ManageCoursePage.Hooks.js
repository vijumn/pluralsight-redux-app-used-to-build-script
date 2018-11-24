import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveCourse } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import { authorsFormattedForDropdown } from "../../reducers/authorReducer";

function ManageCoursePage(props) {
  const { history, loadAuthors, saveCourse, authors } = props;
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) loadAuthors();
  }, []);

  function handleSaveCourse(event) {
    event.preventDefault();

    if (!courseFormIsValid()) {
      return;
    }

    setSaving(true);

    saveCourse(course)
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
      onSave={handleSaveCourse}
      errors={errors}
      allAuthors={authors}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
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

// More explicit:
// function mapDispatchToProps(dispatch) {
// return {
//   saveCourse: dispatch(saveCourse),
//   loadAuthors: dispatch(loadAuthors)
// };
// }

const mapDispatchToProps = {
  saveCourse,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
