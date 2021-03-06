const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { comment: 1 })
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const { body, token } = request

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
  return response
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { token } = request
  const { id } = request.params

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response
        .status(401)
        .json({ error: 'unauthorized user' })
    }

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
  return response
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { token } = request

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, request.body, { new: true })
      .populate('user', { username: 1, name: 1 })
    response.status(200).json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
  return response
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { body, token } = request

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    if (!body.comment) {
      response.status(400).end()
    }

    const comment = new Comment({
      comment: body.comment,
      blog: request.params.id,
    })

    const savedComment = await comment.save()
    const blog = await Blog.findOne({ _id: request.params.id })
    blog.comments = blog.comments.concat(savedComment.id)
    await blog.save()

    response.status(201).json(savedComment)
  } catch (exception) {
    next(exception)
  }
  return response
})

module.exports = blogsRouter
