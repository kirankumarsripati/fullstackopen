import React from 'react'
import PropTypes from 'prop-types'

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
      <div>
        username
        <input
          {...localUsername}
          name="Username"
        />
      </div>
      <div>
        password
        <input
          {...localPassword}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm
