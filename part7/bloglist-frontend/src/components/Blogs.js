import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import {
  setNotification,
} from '../reducers/notificationReducer'
import {
  getBlogs,
} from '../reducers/blogReducer'

const Blogs = (props) => {
  const {
    blogs,
    getBlogs: dispatchGetBlogs,
  } = props
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  useEffect(() => {
    dispatchGetBlogs()
  }, [dispatchGetBlogs])

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={() => setCreateBlogVisible(true)}>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <button type="button" onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
      <ul>
        { blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  getBlogs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
})

const mapDispatchToProps = {
  setNotification,
  getBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
