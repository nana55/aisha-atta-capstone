import React from 'react'
import './SideBar.scss'
import CreateGoal from '../CreateGoal/CreateGoal'
import Quote from '../Quote/Quote'

function SideBar() {
  return (
    <div className='sidebar'>

      <div className="sidebar__container">

        <div className="sidebar__item">
          <h1 className='sidebar__title'>Make a Commitment</h1>
          <CreateGoal />
        </div>

        <div className="sidebar__item">
          <h1 className='sidebar__title'>Dashboard</h1>
        </div>

        <div className="sidebar__item">
          <h1 className='sidebar__title'>Motivational Quote</h1>
          <Quote />
        </div>

      </div>
    </div>
  )
}

export default SideBar