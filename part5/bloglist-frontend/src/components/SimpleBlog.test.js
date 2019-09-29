import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'A simple blog with MEAR',
      author: 'Kirankumar',
      likes: 7,
    }
    component = render(
      <SimpleBlog blog={blog} />,
    )
  })

  afterEach(cleanup)

  test('renders blog header', () => {
    const blogHeader = component.container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent('A simple blog with MEAR')
    expect(blogHeader).toHaveTextContent('Kirankumar')
  })

  test('renders blog likes', () => {
    const blogFooter = component.container.querySelector('.blog-footer')
    expect(blogFooter).toHaveTextContent('7')
  })
})
