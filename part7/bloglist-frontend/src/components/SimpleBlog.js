import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog">
    <div className="blog-header">
      {blog.title}
      {blog.author}
    </div>
    <div className="blog-footer">
      blog has
      {blog.likes}
      likes
      <button className="like-button" type="button" onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SimpleBlog
