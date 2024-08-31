import Course from "./components/Course";
import { useState, useEffect } from "react";

const Part = ({ part }) => (
  <p>
    {part.name}&nbsp;
    {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const CourseComponent = ({ course }) => (
  <div>
    <h2>{course.name}</h2>
    <Content parts={course.parts} />
    <b>
      Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
      exercises
    </b>
  </div>
);

const App = () => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {Course.map((course) => (
        <CourseComponent key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
