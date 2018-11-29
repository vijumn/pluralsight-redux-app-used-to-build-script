// This component handles the App template used on every page.
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import ManageCoursePage from "./course/ManageCoursePage"; //eslint-disable-line import/no-named-as-default
import AboutPage from "./about/AboutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./common/Spinner";
import { connect } from "react-redux";

// Lazy load the courses page
const CoursesPage = React.lazy(() => import("./course/CoursesPage"));

const App = ({ loading }) => (
  <div className="container-fluid">
    <Header loading={loading} />
    <Suspense fallback={<Spinner />}>
      <Route exact path="/" component={HomePage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:id" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} exact />
      <Route path="/about" component={AboutPage} />
    </Suspense>
    <ToastContainer autoClose={3000} hideProgressBar />
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
