import Course from "./components/Course";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name}&nbsp;
    {part.exercises}
  </p>
);

const App = () => {
  return (
    <div>
      <Header course={Course.name} />

      {Course.parts.map(
        (part) => (console.log(part), (<Part key={part.id} part={part} />))
      )}
    </div>
  );
};

export default App;
