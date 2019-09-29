import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      { expanded
      ? (
        <div>
          <div onClick={toggleExpand}>{blog.title} {blog.author}</div>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} <button>like</button> <br />
          added by {blog.user.name}
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
