import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm";
import { authorsFormattedForDropdown } from "../../reducers/authorReducer";
import { getCourseById } from "../../reducers/courseReducer";

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { ...this.props.course },
      errors: {},
      saving: false
    };
  }

  // TODO: Eliminate by using a key instead.
  static getDerivedStateFromProps(props, state) {
    if (props.course.id != state.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      return props.course;
    }
    return null;
  }

  updateCourseState = event => {
    let course = {
      ...this.state.course,
      [event.target.name]: event.target.value
    };
    return this.setState({ course });
  };

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = "Title must be at least 5 characters.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse = event => {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions
      .saveCourse(this.state.course)
      // TODO: Note that this uses an alternative style of redirect. See CoursesPage for <Redirect/>
      // More: https://tylermcginnis.com/react-router-programmatically-navigate/
      // The 2nd param passes state so toast shows.
      // Perhaps I should use a React component like react-toast instead of my homemade notification.
      .then(() => this.props.history.push("/courses", { saved: true }))
      .catch(error => {
        this.setState({ saving: false, errors: { onSave: error } });
      });
  };

  render() {
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
