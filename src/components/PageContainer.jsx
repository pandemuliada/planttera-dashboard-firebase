import React from 'react'
import SideNav from './SideNav'

import background from '../static/images/main-background.svg'

const PageContainer = ({ children }) => {
  return (<div className='flex row w-screen bg-gray-100 bg-no-repeat bg-top' style={{ backgroundImage: `url(${background})` }}>
  <div className='bg-white border-r border-gray-300' style={{ width: 400 }}>
    <SideNav />
  </div>
  <div className='p-6 w-full min-h-screen'>
    {children}
  </div>
</div>)
}

export default PageContainer