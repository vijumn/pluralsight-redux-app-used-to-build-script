import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import Header from "./common/Header";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
