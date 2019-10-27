import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
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
    <>
      <div style={hideWhenVisible}>
        <Button type="button" onClick={() => setCreateBlogVisible(true)}>add blog</Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <Button type="Button" onClick={() => setCreateBlogVisible(false)}>cancel</Button>
      </div>
      <List>
        { blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Typography>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
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
