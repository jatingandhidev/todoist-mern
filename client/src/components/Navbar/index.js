import './styles.css'
import { FaRegPlusSquare } from 'react-icons/fa'
import { useState } from 'react'
import AddTabs from '../AddTabs'
import Modal from '../Modal'
import { MdOutlineLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import ProfileTabs from '../ProfileTabs'
import { LOGOUT } from '../../constants'
const Navbar = ({ user, setUser }) => {
  const [isTabsModalOpen, setIsTabsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const dispatch = useDispatch()

  const closeModal = () => {
    setIsTabsModalOpen(false)
    setIsProfileModalOpen(false)
  }

  return (
    <div className="navbar-container">
      <div className="navbar-logo" onClick={() => window.location.reload()}>
        Todoist
      </div>

      {user && (
        <div className="nav-right">
          <FaRegPlusSquare
            className="button"
            onClick={() => setIsTabsModalOpen(true)}
          />
          <div className="user" onClick={() => setIsProfileModalOpen(true)}>
            {user?.name.charAt(0)}
          </div>
          <div
            className="logout"
            onClick={() => {
              dispatch({ type: LOGOUT })
              setUser('')
            }}
          >
            <MdOutlineLogout />
          </div>
        </div>
      )}

      {isTabsModalOpen && (
        <Modal closeModal={closeModal}>
          <AddTabs closeModal={closeModal} />
        </Modal>
      )}
      {isProfileModalOpen && (
        <Modal closeModal={closeModal}>
          <ProfileTabs closeModal={closeModal} />
        </Modal>
      )}
    </div>
  )
}
export default Navbar
