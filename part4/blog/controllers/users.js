const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
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
