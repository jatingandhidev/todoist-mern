import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import Item from '../models/item.js'
import mongoose from 'mongoose'

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })

    // const token = jwt.sign(
    //   { email: existingUser.email, id: existingUser._id },
    //   'todo',
    //   { expiresIn: '1h' }
    // )

    return res.status(200).json(existingUser)
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, columns } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      if (existingUser.email.includes('.google')) {
        return res.status(200).json(existingUser)
      } else {
        return res.status(404).json({ message: 'User already exist.' })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      columns,
    })

    // const token = jwt.sign({ email: result.email, id: result._id }, 'todo', {
    //   expiresIn: '1h',
    // })

    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const user = req.body
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No User with that id')

  const currentUser = await User.findById(id)
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...user, id },
    {
      new: true,
    }
  )

  // deleting the respective items
  if (currentUser.columns.length > updatedUser.columns.length) {
    currentUser.columns.forEach(async (value) => {
      if (!updatedUser.columns.includes(value)) {
        await Item.deleteMany({
          creator: id,
          state: value,
        })

        return
      }
    })
  }

  // updating the respective items
  if (currentUser.columns.length === updatedUser.columns.length) {
    updatedUser.columns.forEach((updatedValue) => {
      if (!currentUser.columns.includes(updatedValue)) {
        currentUser.columns.forEach(async (currentValue) => {
          if (!updatedUser.columns.includes(currentValue)) {
            await Item.updateMany(
              { creator: id, state: currentValue },
              { $set: { state: updatedValue } }
            )

            return
          }
        })
      }
    })
  }

  res.json(updatedUser)
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No User with that id')

  await User.findByIdAndDelete(id)

  await Item.deleteMany({
    creator: id,
  })

  res.json({ message: 'User deleted successfully ' })
}
