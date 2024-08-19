import { useState } from "react";

const Header = (props) => {
  console.log(props);
  return <h1>{props.value}</h1>;
};

const Button = (props) => {
  console.log(props);
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <div>
      {props.text}: {props.value}
    </div>
  );
};

const Statistics = (props) => {
  const totalFeedback =
    props.statistics.good + props.statistics.neutral + props.statistics.bad;

  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }

  const averageScore =
    (props.statistics.good - props.statistics.bad) / totalFeedback;
  const positivePercentage = (props.statistics.good / totalFeedback) * 100;

  return (
    <div>
      <StatisticLine text="good" value={props.statistics.good} />
      <StatisticLine text="neutral" value={props.statistics.neutral} />
      <StatisticLine text="bad" value={props.statistics.bad} />
      <StatisticLine text="all" value={totalFeedback} />
      <StatisticLine text="average score" value={averageScore} />
      <StatisticLine
        text="positive feedback"
        value={positivePercentage + " %"}
      />
    </div>
  );
};

const Display = (props) => {
  console.log(props);
  return (
    <div>
      <Header value={props.header} />
      {props.statistics && <Statistics statistics={props.statistics} />}
    </div>
  );
};

const App = () => {
  const feedbackHeader = "give feedback";
  const statisticsHeader = "statistics";

  // 각 버튼의 클릭 수를 자신의 상태로 저장
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display header={feedbackHeader} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display header={statisticsHeader} statistics={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
