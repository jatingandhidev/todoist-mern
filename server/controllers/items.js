import mongoose from 'mongoose'
import Item from '../models/item.js'

export const getItem = async (req, res) => {
  const { id } = req.params
  try {
    const item = await Item.find({ creator: id })

    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const createItem = async (req, res) => {
  const item = req.body
  const newItem = new Item({
    ...item,
    createdAt: new Date().toISOString(),
  })

  try {
    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const updateItem = async (req, res) => {
  const { id } = req.params
  const item = req.body
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No item with that id')

  const updatedItem = await Item.findByIdAndUpdate(
    id,
    { ...item, id },
    {
      new: true,
    }
  )
  res.json(updatedItem)
}

export const deleteItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id')

  await Item.findByIdAndDelete(id)

  res.json({ message: 'Post deleted successfully ' })
}
