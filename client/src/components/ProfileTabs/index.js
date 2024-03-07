import React from 'react'
import './styles.css'
import { useState } from 'react'
import Profile from '../Profile'
import ProfileTasks from '../ProfileTasks'

const ProfileTabs = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }
  return (
    <>
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={activeTab === 1 ? 'active-tab tab' : 'tab'}
            onClick={() => handleTabClick(1)}
          >
            Profile
          </div>
          <div
            className={activeTab === 2 ? 'active-tab tab' : 'tab'}
            onClick={() => handleTabClick(2)}
          >
            Tasks
          </div>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 1 && <Profile closeModal={closeModal} />}
        {activeTab === 2 && <ProfileTasks />}
      </div>
    </>
  )
}
export default ProfileTabs
