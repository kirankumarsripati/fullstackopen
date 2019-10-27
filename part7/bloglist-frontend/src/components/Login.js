import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Paper, makeStyles, Typography } from '@material-ui/core'
import LoginForm from './LoginForm'
import { useField } from '../hooks'
import {
  setNotification,
} from '../reducers/notificationReducer'
import {
  logIn,
} from '../reducers/userReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}))

const Login = (props) => {
  const classes = useStyles()

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
    <Paper className={classes.root}>
      <Typography variant="h5">
        Login to application
      </Typography>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </Paper>
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
