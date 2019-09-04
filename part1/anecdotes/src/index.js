import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({text, votes}) => {
  return (
    <div>
      {text}<br />
      has {votes} votes
    </div>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVoted, setMaxVoted] = useState(0)

  const nextAnecdote = () => {
    let next = getRandomAnecdote();
    // sometimes random number is same as previous
    // to avoid duplication get a random number again
    while(next === selected) {
      next = getRandomAnecdote()
    }
    setSelected(next);
  }

  const voteAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected]++;
    setVotes(updatedVotes);

    // votes variable is one step behind
    // so passing updatedVotes
    updateMaxVoted(updatedVotes)
  }

  const updateMaxVoted = (updatedVotes) => {
    const max = Math.max(...updatedVotes)
    setMaxVoted(updatedVotes.indexOf(max))
  }

  const getRandomAnecdote = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[maxVoted]} votes={votes[maxVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)