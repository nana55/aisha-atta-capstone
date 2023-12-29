import React from 'react'
import './SideBar.scss'

function SideBar() {
  return (
    <div className='sidebar'>

      <div className="sidebar__container">
        <div className="sidebar__item">
          <h1>Motivational Quote</h1>
          <h4 className='sidebar__quote'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate deserunt optio nostrum non ipsum aliquid dolorum eligendi, perferendis aspernatur unde pariatur quaerat culpa excepturi vel molestias omnis ut neque mollitia.</h4>
          <p className='sidebar__author'>Author</p>
        </div>

        <div className="sidebar__item">
          <h1>Goals</h1>
        </div>

        <div className="sidebar__item">
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  )
}

export default SideBar