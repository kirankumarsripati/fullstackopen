const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject
    object.id = object._id.toString()
    delete object._id
    delete object.__v
    // the passwordHash should not be revealed
    delete object.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
