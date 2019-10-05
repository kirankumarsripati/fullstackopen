let token = null

const blogs = [
  {
    likes: 6,
    title: 'this is my blog in windows',
    author: 'Kirankumar',
    url: 'aabb.com',
    user: {
      username: 'root',
      name: 'Kirankumar Sripati',
      id: '5d90bf42a9709c20cc4d6ff4',
    },
    id: '5d90bf89a9709c20cc4d6ff5',
  },
  {
    likes: 7,
    title: 'test new note',
    author: 'Kirankumar Sripati',
    url: 'aabb.com',
    user: {
      username: 'root',
      name: 'Kirankumar Sripati',
      id: '5d90bf42a9709c20cc4d6ff4',
    },
    id: '5d90da0aa9709c20cc4d6ff6',
  },
  {
    likes: 0,
    title: 'post by dear 2',
    author: 'Root 2 author',
    url: 'some.com',
    user: {
      username: 'root2',
      name: 'Kirankumar2',
      id: '5d90e935a9709c20cc4d6ff8',
    },
    id: '5d90e97ea9709c20cc4d6ff9',
  },
]

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default {
  getAll,
  setToken,
}