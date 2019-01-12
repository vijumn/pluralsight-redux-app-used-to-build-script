import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { coursePropType, authorPropType } from "../propTypes";
import Spinner from "../common/Spinner";
import { getCoursesSorted } from "../../redux/reducers/courseReducer";
import { toast } from "react-toastify";
import { toastError } from "../../utils/errors";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, dispatch } = this.props;

    if (courses.length === 0) {
      dispatch(loadCourses()).catch(error => {
        toastError("Courses failed to load. " + error);
      });
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch(error => {
        toastError("Authors failed to load. " + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    // Since optimistically deleting, can consider showing success message immediately.
    // There's a tradeoff here though. If the delete ultimately fails, the user will see a subsequent error message a moment later.
    toast.success("Course deleted");
    try {
      await this.props.dispatch(deleteCourse(course));
    } catch (error) {
      toast.error("Delete failed: " + error.message, { autoClose: false });
    }
  };

  render() {
    const { courses, authors } = this.props;
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <h2>Courses</h2>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            {courses.length > 0 && authors.length > 0 ? (
              <CourseList
                courses={courses}
                onDeleteClick={this.handleDeleteCourse}
              />
            ) : (
              <p>No courses.</p>
            )}
          </>
        )}
      </>
    );
  }
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

export default connect(mapStateToProps)(CoursesPage);
