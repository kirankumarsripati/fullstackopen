import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserBlogs } from '../reducers/usersReducer'

const User = (props) => {
  const {
    userId,
    user,
    getUserBlogs: dispatchGetUserBlogs,
  } = props

  useEffect(() => {
    dispatchGetUserBlogs(userId)
  }, [dispatchGetUserBlogs, userId])

  if (!user.id) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs && user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  getUserBlogs: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.userId] || {},
})

const mapDispatchToProps = {
  getUserBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
