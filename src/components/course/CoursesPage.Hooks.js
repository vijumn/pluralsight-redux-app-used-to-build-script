import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { coursePropType } from "../propTypes";

function CoursesPage({ courses, actions, loading }) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) actions.loadCourses();
  }, []);

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>Courses</h2>

          <button
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>

          <CourseList courses={courses} />
        </>
      )}
    </>
  );
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { courses: state.courses, loading: state.ajaxCallsInProgress > 0 };
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
