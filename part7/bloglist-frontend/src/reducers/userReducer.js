import loginService from '../services/login'

const SET_USER = 'SET_USER'
const GET_USER = 'GET_USER'
const LOG_OUT = 'LOG_OUT'

export const logIn = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  dispatch({
    type: SET_USER,
    payload: user,
  })
  return user
}

export const getUser = () => async (dispatch) => {
  dispatch({
    type: GET_USER,
  })
}

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  })
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER: {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : {}
      return user
    }
    case SET_USER:
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(action.payload))
      return action.payload
    case LOG_OUT:
      window.localStorage.removeItem('loggedBlogAppUser')
      return {}
    default:
      return state
  }
}

export default reducer
