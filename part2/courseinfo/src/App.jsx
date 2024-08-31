import CourseComponent from "./components/course/CourseComponent";
import Course from "./components/course/CourseData";
// import { useState, useEffect } from "react";

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
