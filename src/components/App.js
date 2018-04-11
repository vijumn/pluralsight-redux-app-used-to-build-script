// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import CourseApi from '../api/mockCourseApi';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={false}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
