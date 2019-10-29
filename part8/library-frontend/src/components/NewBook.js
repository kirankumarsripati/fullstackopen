import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'

const NewBook = ({ show, addBook }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    console.log('add book...')

    await addBook({
      variables: {
        title,
        author,
        published: +published,
        genres,
      }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Typography variant="h5">
        Add Book
      </Typography>
      <form onSubmit={submit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Published"
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button">add genre</Button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <Button type='submit'>create book</Button>
      </form>
    </div>
  )
}

export default NewBook
