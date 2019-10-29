import React, { useState } from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
} from '@material-ui/core'

const Books = ({ show, result }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

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

  const setGenre = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre)
  }

  return (
    <div>
      <Typography variant="h5">
        books
      </Typography>
      { selectedGenre && (
        <span>
          in <strong>{selectedGenre}</strong>
        </span>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              author
            </TableCell>
            <TableCell>
              published
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(a => {
            let isSelectedGenre = (selectedGenre === null)
            if (!isSelectedGenre) {
              isSelectedGenre = a.genres.includes(selectedGenre)
            }
            if (isSelectedGenre) {
              return (
                <TableRow key={a.id}>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.author.name}</TableCell>
                  <TableCell>{a.published}</TableCell>
                </TableRow>
              )
            } else {
              return null
            }
          })}
        </TableBody>
      </Table>
      <Typography variant="h5">
        Genres
      </Typography>
      <ButtonGroup>
        {[...existingGenres]
          .map((genre) => <Button style={genre === selectedGenre ? buttonActive : null} key={genre} onClick={() => setGenre(genre)}>{genre}</Button>)}
      </ButtonGroup>
    </div>
  )
}

export default Books
