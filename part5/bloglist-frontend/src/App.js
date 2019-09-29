import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [user, setUser] = useState(null)


  // create new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userInfo))
      blogService.setToken(userInfo.token)

      setUser(userInfo)
      setUsername('')
      setPassword('')
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
    const blog = { title, author, url }
    const savedBlog = await blogService.create(blog)

    setBlogs(blogs.concat(savedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

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

    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

    setBlogMessage(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
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
              handleUsernameChange={({ target }) => setUsername(target.value)}
              password={password}
              handlePasswordChange={({ target }) => setPassword(target.value)}
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
              <button onClick={() => setCreateBlogVisible(true)}>add bote</button>
            </div>
            <div style={showWhenVisible}>
              <BlogForm
                handleCreate={handleCreate}
                title={title}
                handleTitleChange={(({ target }) => setTitle(target.value))}
                author={author}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                url={url}
                handleUrlChange={({ target }) => setUrl(target.value)}
              />
              <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
            </div>
            <h2>blogs</h2>
            { blogs.map((blog) => <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike(blog)}
            />) }
          </div>
        )}
    </div>
  )
}

export default App
