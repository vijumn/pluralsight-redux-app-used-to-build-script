import React, {PropTypes} from 'react';
import CourseApi from "../../api/mockCourseApi";
import AuthorApi from "../../api/mockAuthorApi";
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}),
      authors: [],
      errors: {},
      saving: false,
      loading: true
    };

    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
  }

  componentDidMount() {
    CourseApi.getCourseById(this.props.params.id).then(course => {
      this.setState({course: course, loading: false});
    });

    AuthorApi.getAllAuthors().then(response => {
      const authors = response.map(author => ({value: author.id, text: author.firstName + ' ' + author.lastName}));
      this.setState({authors: authors});
    });
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    CourseApi.saveCourse(this.state.course).then(course => {
      this.setState({saving: false});
      this.redirect()
    }).catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved.');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        allAuthors={this.state.authors}
        saving={this.state.saving}
      />
    );
  }
}

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

export default ManageCoursePage;
