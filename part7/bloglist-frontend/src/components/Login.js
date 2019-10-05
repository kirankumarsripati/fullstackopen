import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { useField } from '../hooks'
import {
  setNotification,
} from '../reducers/notificationReducer'
import {
  logIn,
} from '../reducers/userReducer'

const Login = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.logIn({
        username: username.value,
        password: password.value,
      })

      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong username or password', 'error')
    }
  }

  return (
    <div>
      <h2>login to application</h2>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </div>
  )
}

Login.propTypes = {
  setNotification: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification,
  logIn,
}

export default connect(null, mapDispatchToProps)(Login)
