const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
