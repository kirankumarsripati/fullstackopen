import React from 'react'
import BookList from './BookList'
import { Typography } from '@material-ui/core'

const Recommendations = ({ show, result, userResult }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.data.allBooks && userResult) {
    const books = result.data.allBooks
    const genre = userResult.data.me.favoriteGenre
    return (
      <div>
        <Typography variant="h5">
          Recommendations
        </Typography>
        {genre && <div>books in your favorite genre <strong>{genre}</strong></div>}
        <BookList books={books} selectedGenre={genre} />
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h5">
        Recommendations
      </Typography>
      <div>No books</div>
    </div>
  )
}

export default Recommendations
