import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({
  handleLogin,
  username,
  password,
}) => {
  const localUsername = {
    ...username,
    reset: undefined,
  }

  const localPassword = {
    ...password,
    reset: undefined,
  }

  return (
    <form onSubmit={handleLogin}>
      <TextField
        {...localUsername}
        autoComplete="username"
        autoFocus
        fullWidth
        label="Username"
        name="Username"
      />
      <TextField
        {...localPassword}
        autoComplete="current-password"
        fullWidth
        label="Password"
        name="Password"
      />
      <Button type="submit">login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm
