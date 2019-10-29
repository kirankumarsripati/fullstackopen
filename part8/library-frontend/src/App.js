import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo'
import { Button } from '@material-ui/core'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const LOGIN = gql`
mutation login(
  $username: String!,
  $password: String!,
) {
  login(
    username: $username,
    password: $password,
  ) {
    value
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    id
    title
    published
    author {
      id
      name
      born
      bookCount
    }
  }
}
`

const CREATE_BOOK = gql`
mutation createBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String!]!
) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
  }
}
`

const UPDATE_AUTHOR = gql`
mutation updateAuthor(
  $name: String!
  $born: Int!
) {
  editAuthor(
    name: $name,
    setBornTo: $born,
  ) {
    id,
    name,
    born,
  }
}
`

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const handleError = (e) => {
    if (e.graphQLErrors) {
      setErrorMessage(e.graphQLErrors[0].message)
    } else {
      setErrorMessage(e.errors[0].message)
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const [login,] = useMutation(LOGIN, {
    onError: handleError,
  })
  const loginSuccess = (token) => {
    setToken(token)
    setPage('authors')
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const [addBook,] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ]
  })
  const [editAuthor,] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    refetchQueries: [
      { query: ALL_AUTHORS },
    ]
  })

  return (
    <div>
      <div>
        <Button onClick={() => setPage('authors')}>authors</Button>
        <Button onClick={() => setPage('books')}>books</Button>
        {token ? (
          <>
            <Button onClick={() => setPage('add')}>add book</Button>
            <Button onClick={() => logout()}>Logout</Button>
          </>
        ) : <Button onClick={() => setPage('login')}>Login</Button>}
      </div>

      <div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>

      <LoginForm
        show={page === 'login'}
        login={login}
        loginSuccess={(token) => loginSuccess(token)}
      />

      <Authors
        show={page === 'authors'}
        result={authorResult}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={bookResult}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
