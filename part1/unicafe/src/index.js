import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)