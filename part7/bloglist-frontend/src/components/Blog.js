import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Typography,
  Link,
  Button,
  TextField,
  Grid,
} from '@material-ui/core'
import {
  getBlog,
  likeBlog,
  deleteBlog,
  addComment,
} from '../reducers/blogReducer'
import {
  setNotification,
} from '../reducers/notificationReducer'
import { useField } from '../hooks'

const Blog = (props) => {
  const {
    getBlog: dispatchGetBlog,
    blogId,
    blog,
    user,
  } = props

  useEffect(() => {
    dispatchGetBlog(blogId)
  }, [dispatchGetBlog, blogId])

  const commentField = useField('text')

  const localComment = {
    ...commentField,
    reset: undefined,
  }

  const handleDelete = (cBlog) => async (event) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      event.preventDefault()
      await props.deleteBlog(cBlog.id)

      props.setNotification(`blog ${cBlog.title} by ${cBlog.author} deleted!`)
    } else {
      console.log('User not confirmed, so not deleting')
    }
  }

  const handleLike = (cBlog) => async (event) => {
    event.preventDefault()

    const blogToUpdate = {
      id: cBlog.id,
      likes: cBlog.likes + 1,
    }

    const updatedBlog = await props.likeBlog(blogToUpdate)

    props.setNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  if (!blog.id) {
    return null
  }

  const handleAddComment = async (event) => {
    event.preventDefault()

    try {
      const commentResp = await props
        .addComment(commentField.value, blogId)

      props.setNotification(`Added comment ${commentResp.comment}!`)
      commentField.reset()
    } catch (exception) {
      props.setNotification(`Comment add failed ${exception}`, 'error')
    }
  }

  return (
    <div className="blog">
      <Typography variant="h5">
        {blog.title} {blog.author}
      </Typography>
      <Typography>
        <Link href={blog.url}>{blog.url}</Link>
        <br />
        <span id="blogLikes">{blog.likes}</span>
        <Button id="likeButton" type="button" onClick={handleLike(blog)}>like</Button>
        <br />
        added by {blog.user.name}
        <br />
        { user.username === blog.user.username && <Button type="button" onClick={handleDelete(blog)}>remove</Button>}
      </Typography>
      <Typography variant="h5">
        comments
      </Typography>
      <form onSubmit={handleAddComment}>
        <Grid container>
          <TextField
            {...localComment}
            label="Comment"
            name="comment"
            id="comment"
          />
          <Button type="submit" id="addComment">add comment</Button>
        </Grid>
      </form>
      {blog.comments && (
      <ul>
        {blog.comments
          .map((comment) => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
      )}
    </div>
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  getBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  blogId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs
    .find((b) => b.id === ownProps.blogId) || {},
  user: state.user,
})

const mapDispatchToProps = {
  setNotification,
  getBlog,
  likeBlog,
  deleteBlog,
  addComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
