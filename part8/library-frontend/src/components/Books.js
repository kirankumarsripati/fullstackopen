import React from 'react'
import {
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import BookList from './BookList'

const Books = ({ show, result, userResult, updateGenre }) => {
  const buttonActive = {
    backgroundColor: "#acbaba",
  }

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const saveGenre = async (genre) => {
    await updateGenre({
      variables: {
        genre
      }
    })
  }

  let books = []
  let existingGenres
  let selectedGenre;

  if (result.data.allBooks && userResult) {
    books = result.data.allBooks
    selectedGenre = userResult.data.me.favoriteGenre

    existingGenres = new Set()
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        existingGenres.add(genre)
      })
    })
  }

  return (
    <div>
      <Typography variant="h5">
        Books
      </Typography>
      { selectedGenre && (
        <span>
          in <strong>{selectedGenre}</strong>
        </span>
      )}
      <BookList books={books} selectedGenre={selectedGenre} />
      <Typography variant="h5">
        Genres
      </Typography>
      <ButtonGroup>
        {[...existingGenres]
          .map((genre) => <Button style={genre === selectedGenre ? buttonActive : null} key={genre} onClick={() => saveGenre(genre)}>{genre}</Button>)}
      </ButtonGroup>
    </div>
  )
}

export default Books
