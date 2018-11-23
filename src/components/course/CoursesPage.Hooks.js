import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";

function CoursesPage({ courses, location }) {
  const [displaySavedMessage, setDisplaySavedMessage] = useState(false);
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    const saved = location.state && location.state.saved;
    if (saved) setDisplaySavedMessage(true);
  });

  return (
    <div>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h1>Courses</h1>
      {displaySavedMessage && (
        <div className="alert alert-success" role="alert">
          Course saved.
        </div>
      )}
      <button
        className="btn btn-primary"
        onClick={() => setRedirectToAddCoursePage(true)}
      >
        Add Course
      </button>

      <CourseList courses={courses} />
    </div>
  );
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
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
)(CoursesPage);
