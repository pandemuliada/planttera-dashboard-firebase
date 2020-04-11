import React from 'react'
import SkeletonLoader from './SkeletonLoader'

const Table = (props) => {
  const { 
    tableData: { data=[], meta={} },
    columns,
    loading
  } = props
  
  return (<div className='rounded relative'>
    <table className='table-auto rounded w-full'>
      <thead className='bg-gray-200'>
        <tr className='text-left border-b border-gray-200'>
          {columns.map(({ key, label }) => (
            <th key={key} className='p-3 text-gray-600'>{label}</th>
            ))}
        </tr>
      </thead>
      {!loading && <tbody>
        {!loading && data.map((datum, index) => (
          <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
            {columns.map(({key, render}) => (
              <td key={key} className='p-3 text-gray-600'>{render ? render(datum) : datum[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>}
    </table>
    
    {loading && <SkeletonLoader  count={3} height={30} />}
    
    {!loading && data.length < 1 && <p className='text-center text-gray-600 italic mt-4'>There's no data</p>}
    {!loading && data.length > 0 && <p className='ml-3 mt-5 text-gray-600 text-sm'>Total data : {meta.count}</p>}
  </div>)
}

export default Table