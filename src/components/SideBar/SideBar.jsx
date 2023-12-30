import React from 'react'
import './SideBar.scss'
import CreateGoal from '../CreateGoal/CreateGoal'

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
          <h4 className='sidebar__quote'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate deserunt optio nostrum non ipsum aliquid dolorum eligendi, perferendis aspernatur unde pariatur quaerat culpa excepturi vel molestias omnis ut neque mollitia.</h4>
          <p className='sidebar__author'>Author</p>
        </div>

      </div>
    </div>
  )
}

export default SideBar