import React, { useState, useEffect } from 'react'
import './styles.css'
import { addItem, updateItem } from '../../actions/items'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ItemForm = ({ closeModal, item }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const columns = user.columns
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    state: columns[0],
    creator: user._id,
  })

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'title':
        setFormData({ ...formData, title: e.target.value })
        break
      case 'description':
        setFormData({ ...formData, description: e.target.value })
        break
      case 'state':
        setFormData({ ...formData, state: e.target.value })
        break
      case 'date':
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        const selectedDate = new Date(e.target.value)
        selectedDate.setHours(0, 0, 0, 0)
        if (selectedDate < currentDate) {
          toast('Please select a date equal to or after the current date.')
        } else {
          setFormData({ ...formData, date: e.target.value })
        }
        break

      default:
        break
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title === '') return toast('Please fill the title')

    if (formData.title.length > 20)
      return toast('Maximum words for title is 20 characters')
    !isEdit
      ? dispatch(addItem(formData))
      : dispatch(updateItem(item._id, formData))

    closeModal()
    setFormData({
      title: '',
      description: '',
      state: columns[0],
      date: '',
    })
  }
  useEffect(() => {
    if (item) {
      setIsEdit(true)
      setFormData({
        title: item.title,
        description: item.description,
        state: item.state,
        date: item.date?.substring(0, 10),
      })
    } else {
      setIsEdit(false)
    }
  }, [item])
  return (
    <>
      {isEdit && <div className="edit-modal-header">UPDATE</div>}

      <form className="addItemForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <label>End date (optional):</label>
        <input
          id="date"
          type="date"
          name="selectedDate"
          value={formData.date ? formData.date : ''}
          onChange={handleChange}
        />

        <label htmlFor="state">State:</label>

        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>

        <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
      </form>
    </>
  )
}

export default ItemForm
