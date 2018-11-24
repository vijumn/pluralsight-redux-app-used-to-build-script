import React from "react";
import { render } from "react-dom";
import Root from "./components/Root";
import configureStore from "./store/configureStore";
import { loadCourses } from "./actions/courseActions";
import { loadAuthors } from "./actions/authorActions";
import "./styles/styles.css"; //Webpack can import CSS files too!

const store = configureStore();

// Dispatch actions to load initial state.
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Root store={store} history={history} />,
  document.getElementById("app")
);
