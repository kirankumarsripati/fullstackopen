import React from 'react';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
  }

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    store.dispatch(createAnecdote(content))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
