import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import { useField, useResource } from './hooks'
import {
  setNotification,
} from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, blogService] = useResource('/api/blogs')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  // create new blog
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      setUser(userInfo)
      blogService.setToken(userInfo.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userInfo))

      setUser(userInfo)
      blogService.setToken(userInfo.token)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    await blogService.create(blog)

    title.reset()
    author.reset()
    url.reset()

    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`)
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

    const updatedBlog = await blogService.update(blog.id, blogToUpdate)

    props.setNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    await blogService.remove(blog.id)

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
              <BlogForm
                handleCreate={handleCreate}
                title={title}
                author={author}
                url={url}
              />
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
}

const mapDispatchToProps = {
  setNotification,
}

export default connect(null, mapDispatchToProps)(App)
