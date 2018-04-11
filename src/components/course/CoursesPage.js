import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import CourseApi from '../../api/mockCourseApi';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      courses: []
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentDidMount() {
    CourseApi.getAllCourses().then(courses => {
      this.setState({courses: courses});
    })
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>

        <CourseList courses={this.state.courses}/>
      </div>
    );
  }
}

export default CoursesPage;
