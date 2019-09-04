import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (((good * 1) + (bad * -1)) / all) || 0;
  const positive = (good / all * 100) || 0;
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementByOne = (setter, variable) => {
    return () => { setter(variable + 1) };
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementByOne(setGood, good)} text="good" />
      <Button onClick={incrementByOne(setNeutral, neutral)} text="neutral" />
      <Button onClick={incrementByOne(setBad, bad)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)