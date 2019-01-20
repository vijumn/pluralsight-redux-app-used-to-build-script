import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { coursePropType, authorPropType } from "../propTypes";
import Spinner from "../common/Spinner";
import { getCoursesSorted } from "../../redux/reducers/courseReducer";
import { toast } from "react-toastify";
import { toastError } from "../../utils/errors";

function CoursesPage({ dispatch, loading, courses, authors }) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(courseActions.loadCourses()).catch(error =>
        toastError("Loading courses failed.", error)
      );
    }

    if (authors.length === 0) {
      dispatch(authorActions.loadAuthors()).catch(error =>
        toastError("Loading authors failed.", error)
      );
    }
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
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>

          {/* Render when course and author data is available */}
          {courses.length > 0 && authors.length > 0 ? (
            <CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
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
  const { apiCallsInProgress, authors, courses } = state;

  return {
    courses:
      // Weave author data into courses when both are available.
      authors.length > 0 && courses.length > 0
        ? getCoursesSorted(state).map(course => {
            return {
              ...course,
              authorName: authors.find(a => a.id === course.authorId).name
            };
          })
        : [],
    authors,
    loading: apiCallsInProgress > 0
  };
}

// Omitting mapDispatchToProps, so dispatch is automatically passed on props by connect.
export default connect(mapStateToProps)(CoursesPage);
