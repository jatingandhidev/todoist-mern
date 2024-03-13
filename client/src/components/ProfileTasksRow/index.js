import './styles.css'
import Modal from '../Modal'
import ItemDetails from '../ItemDetails'
import ItemForm from '../ItemForm'
import { deleteItem } from '../../actions/items'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const ProfileTasksRow = ({ item }) => {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const dispatch = useDispatch()
  const closeModal = () => {
    setIsItemModalOpen(false)
    setIsEditModalOpen(false)
  }
  return (
    <>
      <div
        className="task-row"
        key={item._id}
        onClick={() => {
          setIsItemModalOpen(true)
        }}
        style={item.deadline ? { background: 'red', color: 'black' } : {}}
      >
        <div className="task-title">{item.title}</div>
        <div className="task-state">{item.state}</div>
        <div className="task-createdAt">
          {moment(item.createdAt).format('YYYY-MM-DD')}
        </div>
        <div className="task-action-btn">
          <div
            className="task-edit"
            onClick={(e) => {
              e.stopPropagation()
              setIsEditModalOpen(true)
            }}
          >
            <FaEdit />
          </div>
          <div
            className="task-delete"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteItem(item._id))
            }}
          >
            <FaTrash />
          </div>
        </div>
      </div>
      <div className="modal-on-top">
        {isItemModalOpen && (
          <Modal closeModal={closeModal}>
            <ItemDetails item={item} />
          </Modal>
        )}
        {isEditModalOpen && (
          <Modal closeModal={closeModal}>
            <ItemForm item={item} closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  )
}
export default ProfileTasksRow
