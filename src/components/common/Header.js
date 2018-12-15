import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Header = ({ numCourses }) => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses {numCourses > 0 && `(${numCourses})`}
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

Header.propTypes = {
  numCourses: PropTypes.number.isRequired
};

export default Header;
