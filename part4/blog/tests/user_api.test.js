const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'secret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kirankumar',
      name: 'Kirankumar Sripati',
      password: 'mysecret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user save should give error if username length below 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithSmallUsername = {
      username: 'kk',
      name: 'Kirankumar',
      password: 'helloworld',
    }

    const result = await api
      .post('/api/users')
      .send(userWithSmallUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user save should give error if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithoutUsername = {
      name: 'Kirankumar',
      password: 'helloworld',
    }

    const result = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user save should give error if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithoutPass = {
      username: 'kirankumar',
      name: 'Kirankumar',
    }

    const result = await api
      .post('/api/users')
      .send(userWithoutPass)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user save should give error if password length below 8', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithSmallPass = {
      username: 'kirankumar',
      name: 'Kirankumar',
      password: 'mypass',
    }

    const result = await api
      .post('/api/users')
      .send(userWithSmallPass)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` must be minimum of 8 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})
