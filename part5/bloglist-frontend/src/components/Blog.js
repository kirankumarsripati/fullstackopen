import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const confirmDelete = (event) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(event)
    } else {
      console.log('User not confirmed, so not deleting')
    }
  }

  return (
    <div style={blogStyle}>
      { expanded
      ? (
        <div>
          <div onClick={toggleExpand}>{blog.title} {blog.author}</div>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} <button type="button" onClick={handleLike}>like</button> <br />
          added by {blog.user.name} <br />
          { username === blog.user.username && <button type="button" onClick={confirmDelete}>remove</button>}
        </div>
      )
      : (
        <div onClick={toggleExpand}>
          {blog.title} {blog.author}
        </div>
      )}
    </div>
  )
}

export default Blog
