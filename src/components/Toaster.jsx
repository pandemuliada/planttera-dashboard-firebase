import React, { useEffect } from 'react'
import posed from 'react-pose'
import { IoIosClose } from 'react-icons/io'

const PosedToastContainer = posed.div({
  open: {
    opacity: 1,
    applyAtStart: { 
      display: 'block' 
    },
    y: -20,
    delay: 200
  },
  closed: {
    opacity: 0,
    applyAtEnd: { 
      display: 'none' 
    },
    y: 0,
  }
})

const toastSizes = {
  small: 'w-2/3 py-3 px-4',
  normal: 'w-3/4 py-4 px-5',
  large: 'w-4/5 py-4 px-5',
}

const toastTypes = {
  default: {
    border: 'border-l-4 border-gray-400',
    title: 'text-gray-700'
  },
  primary: {
    border: 'border-l-4 border-teal-400',
    title: 'text-teal-500'
  },
  danger: {
    border: 'border-l-4 border-red-400',
    title: 'text-red-500'
  },
}

const Toast = (props) => {
  const {  
    duration=500,
    title='Error',
    description='Something went wrong',
    isShow,
    onClose,
    size='normal',
    type='default',
  } = props

  useEffect(() => {
    console.log('yuhuu')
  }, [isShow])

  const containerClass = `relative bg-white rounded shadow-lg mb-5 mx-auto ${toastSizes[size]} ${toastTypes[type].border}`
  const titleClass = `text-lg font-medium mb-2 ${toastTypes[type].title}`

  return (<>
    <PosedToastContainer pose={isShow ? 'open': 'closed'} className='absolute left-0 top-0 mt-20 w-full'>
      <div className={containerClass} style={{ width: '600px'}} onClick={onClose}>
        <button className='absolute -mt-2 mr-2 right-0 text-gray-600 hover:text-gray-800' onClick={onClose}>
          <IoIosClose size={27} />
        </button>
        <h4 className={titleClass}>{title}</h4>
        <p className='text-sm text-gray-600'>{description}</p>
      </div>
    </PosedToastContainer>
  </>)
}

export default Toast