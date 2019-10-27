import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Paper,
  Typography,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}))

const BlogForm = (props) => {
  const classes = useStyles()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const localTitle = {
    ...title,
    reset: undefined,
  }

  const localAuthor = {
    ...author,
    reset: undefined,
  }

  const localUrl = {
    ...url,
    reset: undefined,
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    await props.addBlog(blog)

    title.reset()
    author.reset()
    url.reset()

    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">
        create new
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField
          {...localTitle}
          label="Title"
          fullWidth
          name="title"
        />
        <TextField
          {...localAuthor}
          label="Author"
          fullWidth
          name="author"
        />
        <TextField
          {...localUrl}
          label="Url"
          fullWidth
          name="url"
        />
        <Button type="submit">create</Button>
      </form>
    </Paper>
  )
}

BlogForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification,
  addBlog,
}

export default connect(null, mapDispatchToProps)(BlogForm)
