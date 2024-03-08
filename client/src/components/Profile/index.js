import './styles.css'
import { FaEdit } from 'react-icons/fa'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'
import './styles.css'
import { useDispatch } from 'react-redux'
import { deleteUser, updateUser } from '../../actions/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const Profile = ({ closeModal }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [name, setName] = useState(user?.name)
  const [isNameDisable, setIsNameDisable] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState(user?.theme)
  const columns = user?.columns
  const animationWidth = `calc(${columns?.length} * 150px)`
  const dispatch = useDispatch()

  const handleSave = () => {
    user.name = name
    if (name.length === 0) {
      toast('Please enter a valid name.')
      return
    }
    dispatch(updateUser(user?._id, user))

    setIsNameDisable(true)
  }

  const handleTheme = (e) => {
    const themeId = e.target.id
    setSelectedTheme(themeId)
    user.theme = themeId
    dispatch(updateUser(user?._id, user))
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting the user will delete all the items for this user permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        closeModal()
        dispatch(deleteUser(user._id))
      }
    })
  }

  return (
    <div className="profile-container">
      <div className="detail-field">
        <div className="field-name">Name:</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          disabled={isNameDisable}
          style={{ width: '100%' }}
        />
        <div className="field-name buttons">
          <FaEdit
            className="edit-button"
            onClick={() => setIsNameDisable(!isNameDisable)}
          />
          {!isNameDisable && (
            <FaSave className="save-button" onClick={handleSave} />
          )}
        </div>
      </div>
      <div className="detail-field">
        <div className="field-name">Email:</div>
        <input
          className="email-field"
          value={
            user?.email.endsWith(process.env.REACT_APP_SECRET_GOOGLE_KEY)
              ? user?.email.slice(
                  0,
                  -process.env.REACT_APP_SECRET_GOOGLE_KEY.length - 1
                )
              : user?.email
          }
          type="text"
          disabled={true}
        />
      </div>
      <div className="detail-field">
        <div className="field-name">States:</div>
        <div className="field-content">
          <div className="scroller" style={{ maxWidth: animationWidth }}>
            <div className="profile-states scroller-inner">
              {columns?.map((column) => (
                <div key={column}>{column}</div>
              ))}
              {columns?.map((column) => (
                <div key={column} aria-hidden={true}>
                  {column}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="detail-field">
        <div className="field-name">Notify(Email):</div>
        <input className="notify-checkbox" type="checkbox" checked={false} />
      </div> */}
      <div className="themes-container">
        <div className="field-name">Themes:</div>
        <div className="themes">
          <div
            id="1"
            onClick={handleTheme}
            className={
              selectedTheme === '1' ? 'theme theme1 selected' : 'theme theme1'
            }
          ></div>
          <div
            id="2"
            onClick={handleTheme}
            className={
              selectedTheme === '2' ? 'theme theme2 selected' : 'theme theme2'
            }
          ></div>
          <div
            id="3"
            onClick={handleTheme}
            className={
              selectedTheme === '3' ? 'theme theme3 selected' : 'theme theme3'
            }
          ></div>
          <div
            id="4"
            onClick={handleTheme}
            className={
              selectedTheme === '4' ? 'theme theme4 selected' : 'theme theme4'
            }
          ></div>
        </div>
      </div>
      <div className="delete-button" onClick={handleDelete}>
        <FaTrash />
      </div>
    </div>
  )
}

export default Profile
