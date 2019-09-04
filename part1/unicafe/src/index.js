import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
    <p>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {all}<br />
      average {average}<br />
      positive {positive}
    </p>
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
      <button onClick={incrementByOne(setGood, good)}>good</button>
      <button onClick={incrementByOne(setNeutral, neutral)}>neutral</button>
      <button onClick={incrementByOne(setBad, bad)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)