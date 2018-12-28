import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import ErrorBoundary from "./components/ErrorBoundary";
// import { loadCourses } from "./actions/courseActions";
// import { loadAuthors } from "./actions/authorActions";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

// Dispatch actions to load initial state.
// store.dispatch(loadCourses());
// store.dispatch(loadAuthors());

render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("app")
);
