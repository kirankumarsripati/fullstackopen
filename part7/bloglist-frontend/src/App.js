import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import { useField } from './hooks'
import {
  setNotification,
} from './reducers/notificationReducer'
import {
  setToken,
  getBlogs,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'

const App = (props) => {
  const {
    blogs,
    setToken: dispatchSetToken,
    getBlogs: dispatchGetBlogs,
  } = props
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      setUser(userInfo)
      dispatchSetToken(userInfo.token)
    }
  }, [dispatchSetToken])

  useEffect(() => {
    dispatchGetBlogs()
  }, [dispatchGetBlogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userInfo))

      setUser(userInfo)
      props.setToken(userInfo.token)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setToken('')
    window.localStorage.clear()
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
      { user === null
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
  setToken: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
})

const mapDispatchToProps = {
  setNotification,
  setToken,
  getBlogs,
  likeBlog,
  deleteBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
