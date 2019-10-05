import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useField } from './hooks'
import {
  setNotification,
} from './reducers/notificationReducer'
import {
  getBlogs,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'
import {
  getUser,
  logIn,
  logOut,
} from './reducers/userReducer'

const App = (props) => {
  const {
    blogs,
    user,
    getUser: dispatchGetUser,
    getBlogs: dispatchGetBlogs,
  } = props
  const username = useField('text')
  const password = useField('password')

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    dispatchGetUser()
  }, [dispatchGetUser])

  useEffect(() => {
    dispatchGetBlogs()
  }, [dispatchGetBlogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.logIn({
        username: username.value,
        password: password.value,
      })

      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    props.logOut()
  }

  const handleLike = (blog) => async (event) => {
    event.preventDefault()

    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    await props.likeBlog(blogToUpdate)

    props.setNotification(`blog ${blogToUpdate.title} by ${blogToUpdate.author} liked!`)
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    await props.deleteBlog(blog.id)

    props.setNotification(`blog ${blog.title} by ${blog.author} deleted!`)
  }

  return (
    <div>
      { !user
        ? (
          <div>
            <h2>login to application</h2>
            <Notification />
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
            />
          </div>
        )
        : (
          <div>
            <h2>blogs</h2>
            <Notification />
            <p>
              {user.name}
              logged in
            </p>
            <button type="button" onClick={handleLogout}>Logout</button>
            <div style={hideWhenVisible}>
              <button type="button" onClick={() => setCreateBlogVisible(true)}>add blog</button>
            </div>
            <div style={showWhenVisible}>
              <BlogForm />
              <button type="button" onClick={() => setCreateBlogVisible(false)}>cancel</button>
            </div>
            <h2>blogs</h2>
            { blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike(blog)}
                handleDelete={handleDelete(blog)}
                username={user.username}
              />
            )) }
          </div>
        )}
    </div>
  )
}

App.propTypes = {
  setNotification: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
})

const mapDispatchToProps = {
  setNotification,
  logIn,
  logOut,
  getUser,
  getBlogs,
  likeBlog,
  deleteBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
