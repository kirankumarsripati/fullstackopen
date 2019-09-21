const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'my first blog',
    author: 'Kirankumar Sripati',
    url: 'https://kirankumarsripati.appspot.com',
    likes: 12,
    id: '5d7e16854e43f4567d3e966c',
  },
  {
    title: 'I am doing B.Tech as usual in Telangana',
    author: 'Praveen Sripati',
    url: 'https://awsomepraveens.com',
    likes: 43,
    id: '5d7e2005d16ed0661c537844',
  },
  {
    title: 'Doing engineering in distance learning and fullstackopen along with job is very difficult!',
    author: 'Kirankumar Sripati',
    likes: 76,
    id: '6d7e2005d16ed0661c537844',
  },
  {
    title: 'After working for 10 years in HTML/CSS, learning JavaScript is really challenging',
    author: 'Dharam Dhoke',
    likes: 27,
    id: '5d7e2005d16ed0661c537843',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
