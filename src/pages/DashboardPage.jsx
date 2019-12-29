import React from 'react'
import { withRouter } from 'react-router-dom'

const DashboardPage = (props) => {
  return(<div>
    <div className='rounded w-full bg-white py-4 px-6 border border-gray-300 mb-8'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold text-blue-500'>Dashboard</h1>
        <span className='ml-auto'>December 17 2019</span>
      </div>
    </div>
  </div>)
}

export default withRouter(DashboardPage)