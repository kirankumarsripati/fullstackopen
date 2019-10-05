const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

export const setNotification = (content, type = 'success', time = 5) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: {
      content,
      type,
    },
  })

  setTimeout(() => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    })
  }, time * 1000)
}

const reducer = (state = {
  content: '',
  type: '',
}, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.payload
    case CLEAR_NOTIFICATION:
      return {
        content: '',
        type: '',
      }
    default:
      return state
  }
}

export default reducer
