import Content from "./Content";

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

export default CourseComponent;
