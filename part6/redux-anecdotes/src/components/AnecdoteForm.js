import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'

const AnecdoteForm = ({ createAnecdote }) => {

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    createAnecdote(content)
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
