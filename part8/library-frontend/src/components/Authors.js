import React from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'

const Authors = ({ show, result }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  let authors = []

  if (result.data.allAuthors) {
    authors = result.data.allAuthors
  }

  return (
    <div>
      <Typography variant="h5">
        authors
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              born
            </TableCell>
            <TableCell>
              books
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map(a =>
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  )
}

export default Authors
