import blogService from '../services/blogs'

const SET_TOKEN = 'SET_TOKEN'
const GET_BLOGS = 'GET_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'


export const setToken = (token) => (dispatch) => {
  blogService.setToken(token)
  dispatch({
    type: SET_TOKEN,
    payload: token,
  })
}

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: GET_BLOGS,
    payload: blogs,
  })
}

export const addBlog = (blog) => async (dispatch) => {
  const addedBlog = await blogService.create(blog)
  dispatch({
    type: ADD_BLOG,
    payload: addedBlog,
  })
}

export const deleteBlog = (blogId) => async (dispatch) => {
  await blogService.remove(blogId)
  dispatch({
    type: DELETE_BLOG,
    payload: blogId,
  })
}

export const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogService
    .update(blog.id, blog)
  dispatch({
    type: LIKE_BLOG,
    payload: updatedBlog,
  })
  return updatedBlog
}

const initialState = {
  blogs: [],
  token: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      }
    case ADD_BLOG:
      return {
        ...state,
        blogs: state.blogs.concat(action.payload),
      }
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs
          .filter((b) => b.id !== action.payload),
      }
    case LIKE_BLOG: {
      const blog = action.payload
      return {
        ...state,
        blogs: state.blogs
          .map((b) => (b.id !== blog.id ? b : blog)),
      }
    }
    default:
      return state
  }
}

export default reducer
