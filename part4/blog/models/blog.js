const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
