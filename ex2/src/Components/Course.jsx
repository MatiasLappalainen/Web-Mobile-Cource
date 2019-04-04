import React from 'react';

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(el => (
          <li key={el.id}>
            {el.name} {el.exercises}
          </li>
        ))}
        <li>
          Total:{' '}
          {course.parts.map(el => el.exercises).reduce((el, next) => el + next)}
        </li>
      </ul>
    </>
  );
};

export default Course;
