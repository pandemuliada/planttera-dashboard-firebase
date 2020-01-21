import React from 'react'

const Tabs = (props) => {
  const {
    items=[],
    activeTab,
    onChangeTab,
  } = props 
  
  return (<>
    <div className='flex'>
      {items.map((item, index) => (
        <span onClick={() => onChangeTab(item.key)} className={`cursor-pointer py-2 px-3 text-gray-700 mr-2 rounded-sm ${activeTab === item.key ? 'bg-blue-100 text-blue-400' : 'bg-white'}`}>{item.label}</span>
      ))}
    </div>
  </>)
}

export default Tabs