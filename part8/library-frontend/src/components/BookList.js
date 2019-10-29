import React from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'

const BookList = ({ books, selectedGenre }) => (
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
)

export default BookList
