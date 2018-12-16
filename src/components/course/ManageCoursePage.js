import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { saveCourse, loadCourses } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import { getCourseById } from "../../reducers/courseReducer";
import Spinner from "../common/Spinner";
import { coursePropType, authorPropType } from "../propTypes";
import { newCourse } from "../../../tools/mockData";
import { produce } from "immer";

export class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: { ...this.props.course },
      errors: {},
      saving: false
    };
  }

  componentDidMount() {
    if (this.props.courses.length === 0) this.props.loadCourses();
    if (this.props.authors.length === 0) this.props.loadAuthors();
  }

  // TODO: Eliminate by using a key instead.
  // Populate form when an existing course is loaded directly.
  static getDerivedStateFromProps(props, state) {
    if (props.course.id !== state.course.id) {
      return { course: props.course };
    }
    return null;
  }

  handleChange = event => {
    // Destructure for two reasons:
    // 1. To shorten calls below
    // 2. To store the value of event. If we don't, it won't be available in the calls to functional setState below:
    // This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property `target` on a released/nullified synthetic event.
    // Why? Because the synthetic event is no longer defined within the async function.
    // Two fixes:
    // 1. Call event.persist(). This which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    // 2. Create a reference to the event so we retain a local reference. I prefer this approach since destructuring has other benefits such as shortening the calls below.
    const { name, value } = event.target;

    // Using functional setState since setting state based on existing state.
    // this.setState(prevState => {
    //   const course = {
    //     ...prevState.course,
    //     [name]: value
    //   };
    //   return { course };
    // });

    // Or, with immer. Pass produce to setState and mutate the draft.
    this.setState(
      produce(draft => {
        draft[name] = value;
      })
    );
  };

  formIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 2) {
      errors.title = "Title must be at least 2 characters.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSave = event => {
    event.preventDefault();

    if (!this.formIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props
      .saveCourse(this.state.course)
      // TODO: Note that this uses an alternative style of redirect. See CoursesPage for <Redirect/>
      // More: https://tylermcginnis.com/react-router-programmatically-navigate/
      .then(() => {
        toast.success("Course saved.");
        this.props.history.push("/courses");
      })
      .catch(error => {
        this.setState({ saving: false, errors: { onSave: error } });
      });
  };

  render() {
    return this.props.authors.length === 0 ? (
      <Spinner />
    ) : (
      <CourseForm
        course={this.state.course}
        onChange={this.handleChange}
        onSave={this.handleSave}
        errors={this.state.errors}
        authors={this.props.authors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: coursePropType.isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  authors: PropTypes.arrayOf(authorPropType).isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id; // from the path `/course/:id`
  const course =
    courseId && state.courses.length > 0
      ? getCourseById(state.courses, courseId)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

// See https://daveceddia.com/redux-mapdispatchtoprops-object-form/
const mapDispatchToProps = {
  saveCourse,
  loadAuthors,
  loadCourses
};

// Or, more explicit:
// function mapDispatchToProps(dispatch) {
// return {
//   saveCourse: dispatch(saveCourse),
//   loadAuthors: dispatch(loadAuthors)
// };
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
