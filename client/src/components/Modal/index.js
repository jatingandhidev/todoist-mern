import React from 'react'
import './styles.css'
import { FaXmark } from 'react-icons/fa6'
const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          <FaXmark />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
