import React from 'react'
import './styles.css'
import { useState } from 'react'
import ItemForm from '../ItemForm'
import StateForm from '../StateForm'

const AddTabs = ({ closeModal }) => {
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
            Add Item
          </div>
          <div
            className={activeTab === 2 ? 'active-tab tab' : 'tab'}
            onClick={() => handleTabClick(2)}
          >
            Add State
          </div>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 1 && <ItemForm closeModal={closeModal} />}
        {activeTab === 2 && <StateForm closeModal={closeModal} />}
      </div>
    </>
  )
}
export default AddTabs
