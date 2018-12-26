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
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        const author = authors.find(a => a.id === course.authorId);
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-default"
                href={"http://pluralsight.com/courses/" + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/course/" + course.slug}>{course.title}</Link>
            </td>
            <td>{author.name}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(course)}
              >
                Delete
              </button>
            </td>
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
