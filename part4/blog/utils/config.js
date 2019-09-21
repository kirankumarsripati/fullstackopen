require('dotenv').config()

const { PORT, TEST_MONGODB_URI } = process.env
let { MONGODB_URI } = process.env

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
}
