import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import * as authorActions from "../../actions/authorActions";
import CourseList from "./CourseList";
import { coursePropType, authorPropType } from "../propTypes";
import Spinner from "../common/Spinner";
import { getCoursesSorted } from "../../reducers/courseReducer";
import { toast } from "react-toastify";

function CoursesPage({ dispatch, loading, courses, authors }) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) dispatch(courseActions.loadCourses());
    if (authors.length === 0) dispatch(authorActions.loadAuthors());
  }, []);

  async function handleDeleteCourse(course) {
    // Since optimistically deleting, showing success message immediately.
    // There's a tradeoff here though. If the delete ultimately fails, then the user will see a subsequent error message a moment later.
    // toast.success("Course deleted");
    try {
      await dispatch(courseActions.deleteCourse(course));
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Delete failed: " + error.message, { autoClose: false });
    }
  }

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

          {courses.length > 0 ? (
            <CourseList
              courses={courses}
              authors={authors}
              onDeleteClick={handleDeleteCourse}
            />
          ) : (
            <p>No courses.</p>
          )}
        </>
      )}
    </>
  );
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  authors: PropTypes.arrayOf(authorPropType).isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses: getCoursesSorted(state.courses),
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(CoursesPage);
