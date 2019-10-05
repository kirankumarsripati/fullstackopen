import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let handleLikeClick

  beforeEach(() => {
    const blog = {
      title: 'A simple blog with MEAR',
      author: 'Kirankumar',
      likes: 7,
    }
    handleLikeClick = jest.fn()
    component = render(
      <SimpleBlog blog={blog} onClick={handleLikeClick} />,
    )
  })

  test('renders blog header', () => {
    const blogHeader = component.container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent('A simple blog with MEAR')
    expect(blogHeader).toHaveTextContent('Kirankumar')
  })

  test('renders blog likes', () => {
    const blogFooter = component.container.querySelector('.blog-footer')
    expect(blogFooter).toHaveTextContent('7')
  })

  test('like button of a component is pressed twice', async () => {
    const button = component.container.querySelector('.like-button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(handleLikeClick.mock.calls.length).toBe(2)
  })
})
