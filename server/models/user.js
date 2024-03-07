import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  theme: { type: String, default: '1' },
  columns: {
    type: [String],
    set: (values) => values.map((value) => value.toLowerCase()),
    default: ['new', 'in progress', 'completed'],
  },
})

var User = mongoose.model('User', userSchema)

export default User
