import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = (props) => {
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
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            {...localTitle}
            name="title"
          />
        </div>
        <div>
          author:
          <input
            {...localAuthor}
            name="author"
          />
        </div>
        <div>
          url:
          <input
            {...localUrl}
            name="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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
