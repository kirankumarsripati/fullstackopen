import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import { Button } from '@material-ui/core'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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

const App = () => {
  const [page, setPage] = useState('authors')

  const authorResult = useQuery(ALL_AUTHORS)

  return (
    <div>
      <div>
        <Button onClick={() => setPage('authors')}>authors</Button>
        <Button onClick={() => setPage('books')}>books</Button>
        <Button onClick={() => setPage('add')}>add book</Button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorResult}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
