import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { saveCourse, loadCourses } from "../../actions/courseActions";
import { loadAuthors } from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import {
  getCourseBySlug,
  getCoursesSorted
} from "../../reducers/courseReducer";
import Spinner from "../common/Spinner";
import { coursePropType, authorPropType } from "../propTypes";
import { newCourse } from "../../../tools/mockData";
import { produce } from "immer";

export class ManageCoursePage extends React.Component {
  state = { course: { ...this.props.course }, errors: {}, saving: false };

  componentDidMount() {
    if (this.props.courses.length === 0) this.props.loadCourses();
    if (this.props.authors.length === 0) this.props.loadAuthors();
  }

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
    // Using computed property syntax (added in ES6) below (square braces).
    // this.setState(prevState => {
    //   const course = {
    //     ...prevState.course,
    //     [name]: name === "authorId" ? parseInt(value, 10) : value
    //   };
    //   return { course };
    // });

    // Or, with immer. Pass produce to setState and mutate the draft.
    this.setState(
      produce(draft => {
        // Numeric values are converted to strings when set as values, so must parse string back into an int when setting.
        draft.course[name] = name === "authorId" ? parseInt(value, 10) : value;
      })
    );
  };

  formIsValid() {
    let errors = {};
    const { course } = this.state;

    if (course.title.length < 2) errors.title = "Title must be 2+ characters.";
    if (!course.authorId) errors.author = "Author is required.";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSave = event => {
    event.preventDefault();

    if (!this.formIsValid()) return;

    this.setState({ saving: true });
    this.props
      .saveCourse(this.state.course)
      // Note that this uses an alternative style of redirect. See CoursesPage for <Redirect/>
      .then(() => {
        toast.success("Course saved.");
        this.props.history.push("/courses");
      })
      .catch(error => {
        this.setState({
          saving: false,
          errors: { onSave: error }
        });
      });
  };

  // async/await
  // handleSave = async event => {
  //   event.preventDefault();

  //   if (!this.formIsValid()) return;

  //   try {
  //     this.setState({ saving: true });
  //     await this.props.saveCourse(this.state.course);
  //     toast.success("Course saved.");
  //     this.props.history.push("/courses");
  //   } catch (error) {
  //     this.setState({
  //       saving: false,
  //       errors: { onSave: error }
  //     });
  //   }
  // };

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
  const slug = ownProps.match.params.slug; // from the path `/course/:slug`
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: getCoursesSorted(state.courses),
    authors: state.authors
  };
}

// See https://react-redux.js.org/using-react-redux/connect-mapdispatch#connect-dispatching-actions-with-mapdispatchtoprops
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
