const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User
      .findById(request.params.id)
      .populate('blogs', { url: 1, title: 1, author: 1 })
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request

    // password is mandatory
    if (!body.password) {
      response
        .status(400)
        .json({ error: '`password` is required' })
      return
    }

    // password should be minimum of 8 characters
    if (body.password.length < 8) {
      response
        .status(400)
        .json({ error: '`password` must be minimum of 8 characters' })
      return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
