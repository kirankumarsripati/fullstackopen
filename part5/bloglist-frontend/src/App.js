import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [user, setUser] = useState(null)


  // create new blog
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs.sort((a, b) => (a.likes - b.likes)).reverse())
      })
  }, [])

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
      blogService.setToken(userInfo.token)

      setUser(userInfo)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    const savedBlog = await blogService.create(blog)

    setBlogs(blogs.concat(savedBlog))
    title.reset()
    author.reset()
    url.reset()

    setBlogMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setBlogMessage(null)
    }, 5000)
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

    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))

    setBlogMessage(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
    setTimeout(() => {
      setBlogMessage(null)
    }, 5000)
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    await blogService.remove(blog.id)

    setBlogs(blogs.filter((b) => b.id !== blog.id))

    setBlogMessage(`blog ${blog.title} by ${blog.author} deleted!`)
    setTimeout(() => {
      setBlogMessage(null)
    }, 5000)
  }

  return (
    <div>
      { user === null
        ? (
          <div>
            <h2>login to application</h2>
            {errorMessage && <div className="error">{errorMessage}</div>}
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
            {blogMessage && <div className="success">{blogMessage}</div>}
            <p>
              {user.name}
              logged in
            </p>
            <button type="button" onClick={handleLogout}>Logout</button>
            <div style={hideWhenVisible}>
              <button type="button" onClick={() => setCreateBlogVisible(true)}>add bote</button>
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

export default App
