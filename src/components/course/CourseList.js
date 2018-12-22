import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { coursePropType, authorPropType } from "../propTypes";

const CourseList = ({ authors, courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        const author = authors.find(a => a.id === course.authorId);
        return (
          <tr key={course.id}>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(course)}
              >
                Delete
              </button>
            </td>
            <td>
              <Link to={"/course/" + course.id}>{course.title}</Link>
            </td>
            <td>{author.name}</td>
            <td>{course.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  authors: PropTypes.arrayOf(authorPropType).isRequired,
  courses: PropTypes.arrayOf(coursePropType).isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
