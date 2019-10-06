import usersService from '../services/users'

const GET_USERS = 'GET_USERS'
const GET_USER_BLOGS = 'GET_USER_BLOGS'

export const getUsers = () => async (dispatch) => {
  const users = await usersService.getUsers()
  dispatch({
    type: GET_USERS,
    payload: users,
  })
}

export const getUserBlogs = (userId) => async (dispatch) => {
  const user = await usersService.getUser(userId)
  dispatch({
    type: GET_USER_BLOGS,
    payload: user,
  })
}

const initialState = {
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
      }
    case GET_USER_BLOGS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    default:
      return state
  }
}

export default reducer
