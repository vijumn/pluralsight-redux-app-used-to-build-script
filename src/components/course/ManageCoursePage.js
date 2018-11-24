import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveCourse } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
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

  componentDidMount() {
    if (this.props.authors.length === 0) this.props.loadAuthors();
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

    if (this.state.course.title.length < 2) {
      errors.title = "Title must be at least 2 characters.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSaveCourse = event => {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props
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
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
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

// More explicit:
// function mapDispatchToProps(dispatch) {
// return {
//   saveCourse: dispatch(saveCourse),
//   loadAuthors: dispatch(loadAuthors)
// };
// }

// via https://daveceddia.com/redux-mapdispatchtoprops-object-form/
const mapDispatchToProps = {
  saveCourse,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
