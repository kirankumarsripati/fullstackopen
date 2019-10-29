import React from 'react'
import {
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import BookList from './BookList'

const Books = ({ show, result, selectedGenre, setGenre }) => {
  const buttonActive = {
    backgroundColor: "#acbaba",
  }

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  let books = []
  let existingGenres = []

  if (result.data.allBooks) {
    books = result.data.allBooks

    existingGenres = new Set()
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        existingGenres.add(genre)
      })
    })
  }

  const selectGenre = (genre) => {
    setGenre(selectedGenre === genre ? null : genre)
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
          .map((genre) => <Button style={genre === selectedGenre ? buttonActive : null} key={genre} onClick={() => selectGenre(genre)}>{genre}</Button>)}
      </ButtonGroup>
    </div>
  )
}

export default Books
