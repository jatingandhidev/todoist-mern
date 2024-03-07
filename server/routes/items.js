import express from 'express'
import {
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items.js'

const router = express.Router()

router.get('/:id', getItem)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router
