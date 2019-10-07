import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const Navigation = (props) => {
  const {
    user,
  } = props
  const handleLogout = async (event) => {
    event.preventDefault()
    props.logOut()
  }

  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      { user.token ? user.name : '' } logged in <button type="button" onClick={handleLogout}>Logout</button>
    </div>
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
