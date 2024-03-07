import { useSelector } from 'react-redux'
import './styles.css'
import DotsLoading from '../DotsLoading'

import ProfileTasksRow from '../ProfileTasksRow'
import { useEffect, useState } from 'react'

const ProfileTasks = () => {
  const { items, isLoading } = useSelector((state) => state.items)
  const [finalItems, setFinalItems] = useState([])
  const currentDate = Date.now()

  useEffect(() => {
    setFinalItems(
      items
        ?.map((item, index) => {
          const givenDate = new Date(item.date).getTime()
          const timeDifference = givenDate - currentDate - 19800000
          if (timeDifference < 24 * 60 * 60 * 1000 && item.date) {
            if (timeDifference < -24 * 60 * 60 * 1000) {
              return { ...item, deadline: true }
            } else {
              return { ...item, deadline: false }
            }
          } else {
            return null
          }
        })
        .filter(Boolean)
    )
  }, [items])

  if (isLoading) {
    return <DotsLoading />
  }

  if (finalItems?.length < 1 || !finalItems) {
    return 'No deadline for today. Wo hoo!'
  }

  return (
    <div className="task-container">
      <div className="task-header">
        <div>Title</div>
        <div>State</div>
        <div>Created On</div>
        <div></div>
      </div>
      {finalItems?.map((item, index) => {
        return (
          <ProfileTasksRow
            key={item._id}
            item={item}
            deadline={item.deadline}
          />
        )
      })}
    </div>
  )
}
export default ProfileTasks
