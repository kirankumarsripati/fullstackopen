import blogService from '../services/blogs'

const GET_BLOGS = 'GET_BLOGS'
const GET_BLOG = 'GET_BLOG'
const ADD_BLOG = 'ADD_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: GET_BLOGS,
    payload: blogs,
  })
}

export const getBlog = (id) => async (dispatch, getState) => {
  const { blogs } = getState()
  const found = blogs.find((b) => b.id === id)
  if (found) {
    return
  }
  const blog = await blogService.get(id)
  dispatch({
    type: GET_BLOG,
    payload: blog,
  })
}

export const addBlog = (blog) => async (dispatch, getState) => {
  blogService.setToken(getState().user.token)
  const addedBlog = await blogService.create(blog)
  dispatch({
    type: ADD_BLOG,
    payload: addedBlog,
  })
}

export const deleteBlog = (blogId) => async (dispatch, getState) => {
  blogService.setToken(getState().user.token)
  await blogService.remove(blogId)
  dispatch({
    type: DELETE_BLOG,
    payload: blogId,
  })
}

export const likeBlog = (blog) => async (dispatch, getState) => {
  blogService.setToken(getState().user.token)
  const updatedBlog = await blogService
    .update(blog.id, blog)
  dispatch({
    type: LIKE_BLOG,
    payload: updatedBlog,
  })
  return updatedBlog
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return [...action.payload]
    case GET_BLOG:
      return state.concat(action.payload)
    case ADD_BLOG:
      return state.concat(action.payload)
    case DELETE_BLOG:
      return state
        .filter((b) => b.id !== action.payload)
    case LIKE_BLOG: {
      const blog = action.payload
      return state
        .map((b) => (b.id !== blog.id ? b : blog))
    }
    default:
      return state
  }
}

export default reducer
