import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";
import { coursePropType } from "../propTypes";
import Spinner from "../common/Spinner";
import { getCoursesSorted } from "../../reducers/courseReducer";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    if (this.props.courses.length === 0) this.props.actions.loadCourses();
  }

  handleDeleteCourse = course => {
    // Since optimistically deleting, show success message immediately.
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course, response => {
      if (response.error) toast.error(response);
    });
  };

  render() {
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

            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses: getCoursesSorted(state.courses),
    loading: state.ajaxCallsInProgress > 0
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
