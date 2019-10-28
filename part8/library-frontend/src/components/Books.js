import React from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

const Books = ({ show, result }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  let books = []

  if (result.data.allBooks) {
    books = result.data.allBooks
  }

  return (
    <div>
      <Typography variant="h5">
        books
      </Typography>
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
          {books.map(a =>
            <TableRow key={a.id}>
              <TableCell>{a.title}</TableCell>
              <TableCell>{a.author.name}</TableCell>
              <TableCell>{a.published}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Books
