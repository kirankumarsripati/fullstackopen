import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'
import BlogForm from './BlogForm'
import {
  setNotification,
} from '../reducers/notificationReducer'
import {
  getBlogs,
  deleteBlog,
  likeBlog,
} from '../reducers/blogReducer'

const Blogs = (props) => {
  const {
    user,
    blogs,
    getBlogs: dispatchGetBlogs,
  } = props
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    dispatchGetBlogs()
  }, [dispatchGetBlogs])

  const handleLike = (blog) => async (event) => {
    event.preventDefault()

    const blogToUpdate = {
      id: blog.id,
      likes: blog.likes + 1,
    }

    const updatedBlog = await props.likeBlog(blogToUpdate)

    props.setNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const handleDelete = (blog) => async (event) => {
    event.preventDefault()
    await props.deleteBlog(blog.id)

    props.setNotification(`blog ${blog.title} by ${blog.author} deleted!`)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setCreateBlogVisible(true)}>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <button type="button" onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
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
  )
}

Blogs.propTypes = {
  setNotification: PropTypes.func.isRequired,
  getBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
})

const mapDispatchToProps = {
  setNotification,
  getBlogs,
  likeBlog,
  deleteBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
