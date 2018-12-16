import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { coursePropType } from "../propTypes";

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <tr key={course.id}>
          <td>
            <a
              href={`http://www.pluralsight.com/courses/${course.id}`}
              className="btn btn-light btn-sm"
            >
              Watch
            </a>
          </td>
          <td>
            <Link to={"/course/" + course.id}>{course.title}</Link>
          </td>
          <td>{course.authorId}</td>
          <td>{course.category}</td>
          <td>{course.length}</td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDeleteClick(course)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
