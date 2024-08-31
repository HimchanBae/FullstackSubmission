import Course from "./components/Course";
import { useState, useEffect } from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name}&nbsp;
    {part.exercises}
  </p>
);

const App = () => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // 합계를 계산하고 상태로 설정
    const total = Course.parts.reduce((acc, part) => acc + part.exercises, 0);
    setSum(total);
  }, []);

  return (
    <div>
      <Header course={Course.name} />

      {Course.parts.map(
        (part) => (console.log(part), (<Part key={part.id} part={part} />))
      )}
      <b>Total of {sum} exercises</b>
    </div>
  );
};

export default App;
