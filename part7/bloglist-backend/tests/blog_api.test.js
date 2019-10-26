const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let loggedInToken = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({ username: 'root', name: 'Admin', passwordHash: '$2b$10$kvVcNpLUksRbwO8kl9sOxOHpwzN5pmYcD7UUhi0tYaHnjLjK0dTWO' })
  await user.save()

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog({
      ...blog,
      user: user._id,
    }))

  const auth = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret123',
    })

  loggedInToken = `Bearer ${auth.body.token}`

  const promiseArray = blogObjects
    .map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is inititially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blog id should be defined', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((b) => b.title)
    expect(contents).toContain('my first blog')
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body.title).toEqual(blogToView.title)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNoneExistingId = await helper.nonExistingId()

      console.log(validNoneExistingId)

      await api
        .get(`/api/blogs/${validNoneExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5d871fb536462e45b8b25a'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with a valid data', async () => {
      const users = await helper.usersInDb()

      const newBlog = {
        title: 'Should you buy One Plus?',
        author: 'Ruth Irlekar',
        url: 'https://psychx86.com/ruthsworld/',
        likes: 121,
        user: users[0].id,
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: loggedInToken })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      expect(titles).toContain('Should you buy One Plus?')
    })

    test('likes should be default to zero if not provided', async () => {
      const users = await helper.usersInDb()

      const newBlog = {
        title: 'A blog without likes',
        author: 'Swami Bhairi',
        url: 'https://sbs.com',
        user: users[0].id,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: loggedInToken })
        .expect((res) => {
          delete res.body.id
        })
        .expect(201, {
          title: 'A blog without likes',
          author: 'Swami Bhairi',
          url: 'https://sbs.com',
          likes: 0,
          user: users[0].id,
        })
    })

    test('blog save should give error if title or url missing', async () => {
      const blogWithoutTitle = {
        author: 'Swami Bhairi',
        url: 'https://sbs.com',
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: loggedInToken })
        .send(blogWithoutTitle)
        .expect(400)

      const blogWithoutUrl = {
        title: 'A blog without title',
        author: 'Swami Bhairi',
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: loggedInToken })
        .send(blogWithoutUrl)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: loggedInToken })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((b) => b.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('update a blog', () => {
    test('should update likes + 1', async () => {
      const blogsInDb = await helper.blogsInDb()

      const blogToUpdate = blogsInDb[0]

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({
          likes: blogToUpdate.likes + 1,
        })
        .expect(200)

      expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1)

      const updatedBlog2 = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
      expect(updatedBlog2.body.likes).toBe(blogToUpdate.likes + 1)
    })

    test('should update title, link and author', async () => {
      const blogsInDb = await helper.blogsInDb()

      const blogToUpdate = blogsInDb[0]
      const valuesToUpdate = {
        author: 'New Author',
        title: 'Updated Blog',
        url: 'https://example.blog',
      }

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(valuesToUpdate)
        .expect(200)

      expect(updatedBlog.body.author).toBe(valuesToUpdate.author)
      expect(updatedBlog.body.title).toBe(valuesToUpdate.title)
      expect(updatedBlog.body.url).toBe(valuesToUpdate.url)

      const updatedBlog2 = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)

      expect(updatedBlog2.body.author).toBe(valuesToUpdate.author)
      expect(updatedBlog2.body.title).toBe(valuesToUpdate.title)
      expect(updatedBlog2.body.url).toBe(valuesToUpdate.url)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
