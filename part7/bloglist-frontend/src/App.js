import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'
import {
  getUser,
  logOut,
} from './reducers/userReducer'

const App = (props) => {
  const {
    user,
    getUser: dispatchGetUser,
  } = props

  useEffect(() => {
    dispatchGetUser()
  }, [dispatchGetUser])

  return (
    <Container>
      <Notification />
      { !user.token
        ? <Login />
        : (
          <Router>
            <Navigation />
            <h2>blog app</h2>
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => (
                <User userId={match.params.id} />
              )}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <Blog blogId={match.params.id} />
              )}
            />
          </Router>
        )}
    </Container>
  )
}

App.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  getUser,
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
