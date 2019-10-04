import anecdoteService from '../services/anecdotes'

const sortAnecdotes = function (state) {
  return state.sort((a, b) => b.votes - a.votes)
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_NEW',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
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
