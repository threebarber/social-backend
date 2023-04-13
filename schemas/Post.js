const mongoose = require('mongoose')
require('dotenv').config()


const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postTitle:{
    type: String,
    minLength: 5,
    required: true
  },
  postContent:{
    type: String,
    minLength: 5,
    required: true
  }
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', postSchema)