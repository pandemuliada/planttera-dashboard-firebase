import React from 'react'
import SideNav from './SideNav'

const PageContainer = ({ children }) => {
  return (<div className='flex row'>
  <div className='w-1/5 bg-white'>
    <SideNav />
  </div>
  <div className='p-4 bg-gray-100 w-4/5 min-h-screen'>
    {children}
  </div>
</div>)
}

export default PageContainer