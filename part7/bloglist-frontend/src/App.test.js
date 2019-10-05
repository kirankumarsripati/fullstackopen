import React from 'react'
import {
  render,
  waitForElement,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    await waitForElement(
      () => component.getByText('login'),
    )

    expect(component.container).toHaveTextContent('username')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('after login, show blogs', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    await waitForElement(
      () => component.container.querySelector('.blog'),
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent('this is my blog in windows')
    expect(component.container).toHaveTextContent('test new note')
    expect(component.container).toHaveTextContent('post by dear 2')
  })
})
