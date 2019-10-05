import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = ({
  content,
  type,
}) => {
  if (!content) {
    return null
  }

  return <div className={type}>{content}</div>
}

Notification.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const mapStateToProps = ({ notification }) => ({
  content: notification.content,
  type: notification.type,
})

export default connect(mapStateToProps)(Notification)
