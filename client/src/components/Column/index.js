import { HiDotsVertical } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import './styles.css'
import Modal from '../Modal'
import StateForm from '../StateForm'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../actions/auth'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Column = ({ column, index, activeItem, setActiveItem }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const closeModal = () => {
    setIsEditModalOpen(false)
  }
  const handleEditClick = (e) => {
    e.stopPropagation()
    setIsEditModalOpen(true)
    setActiveItem('')
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    Swal.fire({
      title: 'Are you sure?',
      text: 'Removing the state will delete all the items under that state',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        user.columns = user.columns.filter(
          (column) => column !== user.columns[index]
        )
        if (user.columns.length < 2)
          return toast('Reached the minimum limit(2) for removing state')
        dispatch(updateUser(user._id, user))
      }
    })
  }
  const handleDotsClick = (e) => {
    e.stopPropagation()
    activeItem === column ? setActiveItem('') : setActiveItem(column)
  }

  const handleDocumentClick = () => {
    setActiveItem('')
  }
  useEffect(() => {
    if (activeItem === column) {
      window.addEventListener('click', handleDocumentClick)
      return () => {
        window.removeEventListener('click', handleDocumentClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem])
  return (
    <>
      <div className="column-container">
        {column}
        <HiDotsVertical
          id="options"
          className="options"
          onClick={handleDotsClick}
        />
        <div className={`options-list ${activeItem === column && 'show'}`}>
          <div className="option" onClick={handleEditClick}>
            Edit
          </div>
          <div className="option" onClick={handleRemoveClick}>
            Remove
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal closeModal={closeModal}>
          <StateForm column={column} index={index} closeModal={closeModal} />
        </Modal>
      )}
    </>
  )
}
export default Column
