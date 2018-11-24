import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  state = {
    displaySavedMessage: false,
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    if (this.props.courses.length === 0) this.props.actions.loadCourses();
    const saved = this.props.location.state && this.props.location.state.saved;
    if (saved)
      this.setState({ displaySavedMessage: true }, this.hideAlertAfterDelay());
  }

  hideAlertAfterDelay = () => {
    setTimeout(() => {
      this.setState({ displaySavedMessage: false });
    }, 2000);
  };

  render() {
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses</h1>
        {this.state.displaySavedMessage && (
          <div className="alert alert-success" role="alert">
            Course saved.
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>

        <CourseList courses={this.props.courses} />
      </div>
    );
  }
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
