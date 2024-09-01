import React from 'react'
import { Link } from 'react-router-dom';
import "./AdminDashboard.css"

function AdminDashboard() {
  return (
    <div className='container'>
      <h1>Admin Dashboard</h1>
      <ul className='row'>
        <li className='dashboard-item col-sm-5'>
          <Link to="users" relative='path' className='normal-text'>
            Users
          </Link>
        </li>

        <li className='dashboard-item col-sm-5'>
          <Link to="topics" relative="path" className='normal-text'>
            Topics
          </Link>
        </li>
      </ul>
    </div>

  )
}

export default AdminDashboard