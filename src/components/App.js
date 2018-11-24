// This component handles the App template used on every page.
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import ManageCoursePage from "./course/ManageCoursePage.Hooks"; //eslint-disable-line import/no-named-as-default
import AboutPage from "./about/AboutPage";
import { connect } from "react-redux";

// Lazy load the courses page
const CoursesPage = React.lazy(() => import("./course/CoursesPage"));

const App = ({ loading }) => (
  <div className="container-fluid">
    <Suspense fallback="Loading...">
      <Header loading={loading} />
      <Route exact path="/" component={HomePage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:id" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} exact />
      <Route path="/about" component={AboutPage} />
    </Suspense>
  </div>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
