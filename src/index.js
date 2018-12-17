import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/styles.css"; //Webpack can import CSS files too!
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

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
