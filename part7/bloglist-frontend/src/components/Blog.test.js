import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      id: '5d90bf89a9709c20cc4d6ff5',
      title: 'A simple blog with MEAR',
      author: 'Kirankumar',
      likes: 7,
      user: {
        username: 'kirankumar',
        name: 'Kirankumar Sripati',
        id: '5d90bf42a9709c20cc4d6ff4',
      },
    }
    const username = 'kirankumar'
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={jest.fn()}
        handleDelete={jest.fn()}
        username={username}
      />,
    )
  })

  test('only the name and author of the blog post are shown by default', () => {
    const blog = component.container.querySelector('.blog')
    expect(blog).toHaveTextContent('A simple blog with MEAR')
    expect(blog).toHaveTextContent('Kirankumar')
    expect(blog).not.toHaveTextContent('7')
    expect(blog).not.toHaveTextContent('added by')
  })

  test('blog click show more details', () => {
    const blog = component.container.querySelector('.blog')
    fireEvent.click(blog)
    expect(blog).toHaveTextContent('A simple blog with MEAR')
    expect(blog).toHaveTextContent('Kirankumar')
    expect(blog).toHaveTextContent('7')
    expect(blog).toHaveTextContent('added by')
  })
})
