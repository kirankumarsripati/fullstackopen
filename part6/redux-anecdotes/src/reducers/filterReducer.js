export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      state = action.filter
      return state
    default:
      return state
  }
}

export default reducer
