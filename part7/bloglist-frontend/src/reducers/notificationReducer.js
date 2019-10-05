export const setNotification = (content, time = 5) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: content,
  })

  setTimeout(() => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: null,
    })
  }, time * 1000)
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer
