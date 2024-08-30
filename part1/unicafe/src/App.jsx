import { useState } from "react";

const Header = (props) => {
  return <h1>{props.value}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const totalFeedback =
    props.statistics.good + props.statistics.neutral + props.statistics.bad;

  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }

  const averageScore = (
    (props.statistics.good - props.statistics.bad) /
    totalFeedback
  ).toFixed(1);
  const positivePercentage = (
    (props.statistics.good / totalFeedback) *
    100
  ).toFixed(1);

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.statistics.good} />
        <StatisticLine text="neutral" value={props.statistics.neutral} />
        <StatisticLine text="bad" value={props.statistics.bad} />
        <StatisticLine text="all" value={totalFeedback} />
        <StatisticLine text="average" value={averageScore} />
        <StatisticLine text="positive" value={positivePercentage + " %"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const feedbackHeader = "give feedback";
  const statisticsHeader = "statistics";
  const anecdoteHeader = "Anecdote of the Day";
  const anecdoteKingHeader = "Anecdote with the most votes";
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // 각 버튼의 클릭 수를 자신의 상태로 저장
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  // trick to generate a array with zeros that has the size of anecdotes
  const [votes, setVotes] = useState(anecdotes.map((_) => 0));

  const pickRandom = () => {
    while (true) {
      const possibleNext = Math.floor(Math.random() * anecdotes.length);
      if (possibleNext !== selected) return possibleNext;
    }
  };

  const voteSelected = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    if (newVotes[selected] > votes[mostVotes]) {
      setMostVotes(selected);
    }
  };

  const maxVotes = Math.max(...votes);
  const maxVotesIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <Header value={anecdoteHeader} />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={voteSelected}>vote</button>
        <button onClick={() => setSelected(pickRandom())}>next anecdote</button>
      </div>
      <Button handleClick={() => setSelected(0)} text="reset anectdote" />
      <Header value={anecdoteKingHeader} />
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
      <Header value={feedbackHeader} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header value={statisticsHeader} />{" "}
      <Statistics statistics={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
