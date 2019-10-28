import React, { useState } from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
} from '@material-ui/core'

const Authors = ({ show, result, editAuthor }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const updateBorn = async (e) => {
    e.preventDefault()

    await editAuthor({
      variables: {
        name: author,
        born: +born,
      }
    })

    setBorn('')
    setAuthor('')
  }

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
      <form onSubmit={updateBorn}>
        <Typography variant="h5">
          Set birth year
        </Typography>
        <FormControl>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            inputProps={{
              name: 'author',
              id: 'author',
            }}>
            {authors.map(a =>
              <MenuItem key={a.id} value={a.name}>{a.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <br />
        <TextField
          onChange={({ target }) => setBorn(target.value)}
          type="number"
          label="Birth Year"
        />
        <Button type='submit'>update author</Button>
      </form>
    </div>
  )
}

export default Authors
