import PropTypes from "prop-types";
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
