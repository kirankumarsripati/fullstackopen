import React from 'react'

const BlogForm = ({
  handleCreate, title, setTitle, author, setAuthor, url, setUrl,
}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={(({ target }) => setTitle(target.value))}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
