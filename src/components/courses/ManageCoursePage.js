import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export class ManageCoursePage extends React.Component {
  state = {
    course: { ...this.props.course },
    errors: {},
    saving: false
  };

  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Courses failed to load. " + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Authors failed to load. " + error);
      });
    }
  }

  // Populate form when an existing course is loaded directly.
  static getDerivedStateFromProps(props, state) {
    if (props.course.id !== state.course.id) return { course: props.course };
    return null;
  }

  formIsValid() {
    const { title, authorId, category } = this.state.course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSave = event => {
    event.preventDefault();
    if (!this.formIsValid()) return;
    this.setState({ saving: true });
    this.props
      .saveCourse(this.state.course)
      .then(() => {
        toast.success("Course saved.");
        this.props.history.push("/courses");
      })
      .catch(error => {
        this.setState({
          saving: false,
          errors: { onSave: error.message }
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => {
      return {
        course: {
          ...prevState.course,
          [name]: name === "authorId" ? parseInt(value, 10) : value
        }
      };
    });
  };

  render() {
    return this.props.authors.length === 0 ||
      this.props.courses.length === 0 ? (
      <Spinner />
    ) : (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        authors={this.props.authors}
        onChange={this.handleChange}
        onSave={this.handleSave}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug);
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug; // from the path `/course/:slug`

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

// Using object form, so actions are automatically wrapped in dispatch.
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
