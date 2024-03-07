import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  state: {
    type: String,
    set: (value) => value.toLowerCase(),
  },
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

var Item = mongoose.model('Item', itemSchema)

export default Item
