const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
  .reduce((count, blog) => count + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const favorite = blogs
    .reduce((prev, cur) => (prev.likes > cur.likes ? prev : cur))
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  const blogCounts = _.groupBy(blogs, 'author')
  const maxBlogAuthor = Object.keys(blogCounts)
    .reduce((prev, cur) => (blogCounts[prev] > blogCounts[cur] ? prev : cur))
  const maxBlogCount = blogCounts[maxBlogAuthor].length
  return {
    author: maxBlogAuthor,
    blogs: maxBlogCount,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
