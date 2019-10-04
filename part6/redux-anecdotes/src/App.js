import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    anecdotesService
      .getAll()
      .then(anecdotes => initializeAnecdotes(anecdotes))
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes,
}

export default connect(null, mapDispatchToProps)(App)