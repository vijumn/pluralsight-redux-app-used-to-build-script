// This component handles the App template used on every page.
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import ManageCoursePage from "./course/ManageCoursePage"; //eslint-disable-line import/no-named-as-default
import AboutPage from "./about/AboutPage";
import NotFoundPage from "./NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./common/Spinner";
import { connect } from "react-redux";
import { coursePropType } from "./propTypes";

// Lazy load the courses page. Just an example. Could do the same for others.
const CoursesPage = React.lazy(() => import("./course/CoursesPage.Hooks"));

const App = ({ loading, courses }) => (
  <div className="container-fluid">
    {/* Note: Could choose to connect the header. But a good reminder that you should NOT connect all components.
    Pass props when components are close (yes, this app using Redux at all is overkill) */}
    <Header loading={loading} numCourses={Object.keys(courses).length} />
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        {/* Key is required so that ManageCoursePage is remounted when courses are loaded. Thus, cdm re-runs */}
        <Route
          path="/course/:slug"
          render={props => (
            <ManageCoursePage {...props} key={Object.keys(courses).length} />
          )}
        />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/about" component={AboutPage} />
        <Route render={NotFoundPage} />
      </Switch>
    </Suspense>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

App.propTypes = {
  courses: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  return {
    courses: state.courses,
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
