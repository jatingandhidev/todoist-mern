import './styles.css'
import Item from '../Item'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, updateItem } from '../../actions/items'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from '../Column'
import DotsLoading from '../DotsLoading'
import themes from '../../Data/Themes'

const Home = ({ user }) => {
  const dispatch = useDispatch()
  const { items, isLoading } = useSelector((state) => state.items)
  const columns = user.columns

  const [activeItem, setActiveItem] = useState('')
  const handleDragEnd = (results) => {
    const { draggableId, destination } = results
    const updatingItem = items.find((item) => item._id === draggableId)
    updatingItem.state = destination?.droppableId
    dispatch(updateItem(draggableId, updatingItem))
  }
  useEffect(() => {
    dispatch(getItems(user._id))
    const root = document.documentElement

    root.style.setProperty(
      '--primary-color',
      themes[user.theme - 1].primaryColor
    )
    root.style.setProperty(
      '--secondary-color',
      themes[user.theme - 1].secondaryColor
    )
    root.style.setProperty('--action-color', themes[user.theme - 1].actionColor)
    root.style.setProperty(
      '--background-url',
      themes[user.theme - 1].backgroundUrl
    )
  }, [user])

  if (isLoading)
    return (
      <div className="dotsLoading">
        <DotsLoading />
      </div>
    )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="home-container">
        {columns.map((column, index) => {
          return (
            <Droppable droppableId={column} key={index}>
              {(provided) => (
                <div>
                  <Column
                    column={column}
                    index={index}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                  <div
                    className="items"
                    style={{
                      minHeight: `calc(${
                        items.filter((item) => item.state === column).length + 1
                      }*90px)`,
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {items?.map((item, index) => {
                      return (
                        column === item.state && (
                          <Item
                            key={item._id}
                            item={item}
                            index={index}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                          />
                        )
                      )
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}
export default Home
