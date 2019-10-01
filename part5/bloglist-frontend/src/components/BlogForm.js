import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreate, title, author, url,
}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          {...title}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          {...author}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          {...url}
          name="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm
