import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadCourses, deleteCourse } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseList from "./CourseList";
import { coursePropType, authorPropType } from "../propTypes";
import Spinner from "../common/Spinner";
import { getCoursesSortedByTitle } from "../../reducers/courseReducer";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, dispatch } = this.props;

    if (courses.length === 0) {
      dispatch(loadCourses()).catch(error => {
        toast.error("Courses failed to load. " + error.message, {
          autoClose: false
        });
      });
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch(error => {
        toast.error("Authors failed to load. " + error.message, {
          autoClose: false
        });
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
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            {courses.length > 0 && authors.length > 0 ? (
              <CourseList
                authors={authors}
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
  return {
    authors: state.authors,
    courses: getCoursesSortedByTitle(state),
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(CoursesPage);
