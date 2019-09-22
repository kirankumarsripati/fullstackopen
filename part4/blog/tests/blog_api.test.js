const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))
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

      expect(resultBlog.body).toEqual(blogToView)
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
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Should you buy One Plus?',
    author: 'Ruth Irlekar',
    url: 'https://psychx86.com/ruthsworld/',
    likes: 121,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain('Should you buy One Plus?')
})

test('likes should be default to zero if not provided', async () => {
  const newBlog = {
    title: 'A blog without likes',
    author: 'Swami Bhairi',
    url: 'https://sbs.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect((res) => {
      delete res.body.id
    })
    .expect(201, {
      title: 'A blog without likes',
      author: 'Swami Bhairi',
      url: 'https://sbs.com',
      likes: 0,
    })
})

test('blog save should give error if title or url missing', async () => {
  const blogWithoutTitle = {
    author: 'Swami Bhairi',
    url: 'https://sbs.com',
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogWithoutUrl = {
    title: 'A blog without title',
    author: 'Swami Bhairi',
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
