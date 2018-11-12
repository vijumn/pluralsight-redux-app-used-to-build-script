import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  state = {
    displaySavedMessage: false,
    redirectToAddCoursePage: false
  };

  componentDidMount() {
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
        {/* TODO: Shouldn't it be called redirectToCoursesPage? */}
        {this.state.redirectToAddCoursePage && <Redirect to="/courses" />}
        <h1>Courses</h1>
        {this.state.displaySavedMessage && (
          <div className="alert alert-success" role="alert">
            Course saved.
          </div>
        )}
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        />

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

// TODO: withRouter necessary?
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoursesPage)
);
