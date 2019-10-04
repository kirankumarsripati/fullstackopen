const sortAnecdotes = function (state) {
  return state.sort((a, b) => b.votes - a.votes)
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_NEW',
    data: anecdote,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      return sortAnecdotes(state.map(a => a.id !== id ? a : updatedAnecdote))
    case 'CREATE_NEW':
      return sortAnecdotes(state.concat(action.data))
    case 'INIT':
      return sortAnecdotes(state.concat(action.data))
    default:
      return state
  }
}

export default reducer
