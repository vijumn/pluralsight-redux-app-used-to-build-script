import React from "react";
import PropTypes from "prop-types";

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success"]).isRequired,
  message: PropTypes.string.isRequired
};

export default Alert;
