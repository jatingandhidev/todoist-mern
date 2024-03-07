import { useState, useEffect } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../actions/auth'
import { toast } from 'react-toastify'

const StateForm = ({ closeModal, column, index }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [state, setState] = useState('')
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const columns = user.columns
  const handleSubmit = (e) => {
    e.preventDefault()

    if (state === '') return toast('State can not be empty')

    if (state.length > 20)
      return toast('Maximum words for state is 20 characters')

    if (user.columns[index] === state || user.columns.includes(state))
      return toast('This state already exist try a different one')

    isEdit
      ? (user.columns[index] = state)
      : (user.columns = [...columns, state])

    if (user.columns.length > 7)
      return toast('Reached the maximum limit(7) for adding state')

    dispatch(updateUser(user._id, user))
    closeModal()
  }

  useEffect(() => {
    if (column) {
      setIsEdit(true)
      setState(column)
    } else {
      setIsEdit(false)
    }
  }, [column])
  return (
    <>
      {isEdit && <div className="edit-modal-header">UPDATE</div>}
      <form className="stateForm" onSubmit={handleSubmit}>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>
    </>
  )
}
export default StateForm
