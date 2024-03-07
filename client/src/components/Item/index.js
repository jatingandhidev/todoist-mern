import React, { useState, useEffect } from 'react'
import './styles.css'
import { HiDotsVertical } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../actions/items'
import ItemDetails from '../ItemDetails'
import Modal from '../Modal'
import ItemForm from '../ItemForm'
import { Draggable } from 'react-beautiful-dnd'

const Item = ({ item, index, activeItem, setActiveItem }) => {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const dispatch = useDispatch()
  const closeModal = () => {
    setIsItemModalOpen(false)
    setIsEditModalOpen(false)
  }

  const handleDotsClick = (e) => {
    e.stopPropagation()
    activeItem === item._id ? setActiveItem('') : setActiveItem(item._id)
  }

  const handleDocumentClick = () => {
    setActiveItem('')
  }
  useEffect(() => {
    if (activeItem === item._id) {
      window.addEventListener('click', handleDocumentClick)
      return () => {
        window.removeEventListener('click', handleDocumentClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem])
  return (
    <>
      <Draggable draggableId={item._id} index={index} key={item._id}>
        {(provided) => (
          <div
            onClick={() => {
              setIsItemModalOpen(true)
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div id={item._id} className="item-container">
              {item.title}
              <HiDotsVertical
                id="options"
                className="options"
                onClick={handleDotsClick}
              />
              <div
                className={`options-list ${activeItem === item._id && 'show'}`}
              >
                <div
                  className="option"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditModalOpen(true)
                    setActiveItem('')
                  }}
                >
                  Edit
                </div>
                <div
                  className="option"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(deleteItem(item._id))
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
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
    </>
  )
}

export default Item
