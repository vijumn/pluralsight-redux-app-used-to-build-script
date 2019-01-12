import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table">
    <caption className="sr-only">Courses</caption>
    <thead>
      <tr>
        <th scope="col" aria-label="Watch button" />
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Category</th>
        <th scope="col" aria-label="Delete button" />
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                aria-label={`Watch ${course.title}`}
                href={"http://pluralsight.com/courses/" + course.slug}
              >
                Watch
              </a>
            </td>
            <th scope="row" style={{ fontWeight: "normal" }}>
              <Link
                aria-label={`Edit ${course.title}`}
                to={"/course/" + course.slug}
              >
                {course.title}
              </Link>
            </th>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button
                aria-label={`Delete ${course.title}`}
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
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
