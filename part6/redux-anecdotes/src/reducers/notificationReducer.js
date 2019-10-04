export const setNotification = (content, time = 5) => {
  return (dispatch) => {
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
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      state = action.data
      return state
    default:
      return state
  }
}

export default reducer
