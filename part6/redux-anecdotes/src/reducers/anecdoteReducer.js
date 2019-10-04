import anecdoteService from '../services/anecdotes'

const sortAnecdotes = function (state) {
  return state.sort((a, b) => b.votes - a.votes)
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
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
      const updatedAnecdote = action.data
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
