import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreate, title, author, url,
}) => {
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
  handleCreate: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm
