import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'

const LoginForm = ({ show, login, loginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      loginSuccess(token)
      localStorage.setItem('library-user-token', token)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <Typography variant="h5">
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm
