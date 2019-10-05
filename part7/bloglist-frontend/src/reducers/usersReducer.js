import usersService from '../services/users'

const GET_USERS = 'GET_USERS'

export const getUsers = () => async (dispatch) => {
  const users = await usersService.getUsers()
  dispatch({
    type: GET_USERS,
    payload: users,
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.payload]
    default:
      return state
  }
}

export default reducer
