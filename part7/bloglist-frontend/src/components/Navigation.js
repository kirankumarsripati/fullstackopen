import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const useStyles = makeStyles({
  appBar: {
    marginBottom: 20,
  },
  title: {
    marginRight: 20,
  },
  link: {
    color: 'white',
    marginRight: 20,
  },
})

const Navigation = (props) => {
  const classes = useStyles()

  const {
    user,
  } = props
  const handleLogout = async (event) => {
    event.preventDefault()
    props.logOut()
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Bloglist
        </Typography>
        <Typography>
          <Link to="/" className={classes.link}>blogs</Link>
          <Link to="/users" className={classes.link}>users</Link>
          { user.token ? user.name : '' } logged in
          <Button onClick={handleLogout} id="logout">Logout</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
