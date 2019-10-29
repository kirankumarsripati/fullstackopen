import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from 'react-apollo'
import { Button } from '@material-ui/core'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

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

const CURRENT_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const UPDATE_FAV_GENRE = gql`
mutation changeGenre(
  $genre: String!,
) {
  updateGenre(
    favoriteGenre: $genre,
  ) {
    favoriteGenre,
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

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  published
  author {
    name
  }
  genres
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)


    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore,
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      console.log(`Book added`, addedBook)
    }
  })

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
  const userResult = useQuery(CURRENT_USER)
  const [addBook,] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })
  const [editAuthor,] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    refetchQueries: [
      { query: ALL_AUTHORS },
    ]
  })
  const [updateGenre,] = useMutation(UPDATE_FAV_GENRE, {
    onError: handleError,
    refetchQueries: [
      { query: CURRENT_USER },
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
            <Button onClick={() => setPage('recommended')}>Recommended</Button>
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
        userResult={userResult}
        updateGenre={updateGenre}
      />

      <Recommendations
        show={page === 'recommended'}
        result={bookResult}
        userResult={userResult}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
