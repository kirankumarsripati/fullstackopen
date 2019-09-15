const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogs = []

  const listWithOneBlog = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
  ]

  const listWithMultipleBlogs = [
    {
      id: 1,
      title: 'Even Money',
      author: 'Marita Dawdary',
      url: 'http://dummyimage.com/104x168.png/ff4444/ffffff',
      likes: 47,
    }, {
      id: 2,
      title: '13 Lakes',
      author: 'Brynna Bellelli',
      url: 'http://dummyimage.com/189x165.png/5fa2dd/ffffff',
      likes: 4,
    }, {
      id: 3,
      title: 'Story of My Life, The (Mensonges et trahisons et plus si affinités...)',
      author: 'Roxane Spears',
      url: 'http://dummyimage.com/141x239.bmp/dddddd/000000',
      likes: 84,
    }, {
      id: 4,
      title: 'Conman (Du Xia 1999)',
      author: 'Brynna Bellelli',
      url: 'http://dummyimage.com/166x211.bmp/cc0000/ffffff',
      likes: 31,
    }, {
      id: 5,
      title: 'Reef, The',
      author: 'Merrile Caff',
      url: 'http://dummyimage.com/229x145.png/5fa2dd/ffffff',
      likes: 37,
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(203)
  })
})
