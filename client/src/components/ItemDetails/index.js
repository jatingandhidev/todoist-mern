import './styles.css'
import moment from 'moment'

const ItemDetails = ({ item }) => {
  return (
    <>
      <div className="item-details-header"></div>
      <div className="item-details">
        <div className="item-title">
          <div className="uppercase">Title:</div>
          {item.title}
        </div>
        <div className="item-state">
          <div className="uppercase">State:</div> {item.state}
        </div>
        <div className="item-moment">{moment(item.createdAt).fromNow()}</div>
        <div className="item-description">
          <div className="uppercase">Description:</div> {item.description}
        </div>
      </div>
    </>
  )
}
export default ItemDetails
