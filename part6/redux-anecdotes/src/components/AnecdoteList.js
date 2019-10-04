import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = ({
  anecdotes,
  voteAnecdote,
  setNotification,
 }) => {
  const vote = (anecdote) => {
    voteAnecdote(anecdote)

    setNotification(`you voted '${anecdote.content}'`)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(
        anecdote => anecdote.content.toLowerCase()
          .includes(state.filter.toLowerCase())
      ),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

