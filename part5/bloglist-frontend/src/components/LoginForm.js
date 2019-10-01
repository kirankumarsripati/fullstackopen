import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        {...username}
        name="Username"
      />
    </div>
    <div>
      password
      <input
        {...password}
        name="Password"
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm
