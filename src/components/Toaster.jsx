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
  small: 300,
  normal: 400,
  large: 500,
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
  info: {
    border: 'border-l-4 border-blue-400',
    title: 'text-blue-500'
  },
  danger: {
    border: 'border-l-4 border-red-400',
    title: 'text-red-500'
  },
  warning: {
    border: 'border-l-4 border-yellow-400',
    title: 'text-yellow-500'
  },
}

const Toast = (props) => {
  const {
    duration,
    title='Title',
    message='Message',
    isShow,
    onClose,
    size='small',
    type='default',
  } = props

  useEffect(() => {
    if (isShow && duration) {
      let timeout = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isShow])

  const styles = {
    posedContainer: 'absolute left-0 top-0 mt-16 w-full',
    container: `relative bg-white rounded shadow-lg mb-5 mx-auto py-2 px-3 ${toastTypes[type].border}`,
    title: `font-medium mb-1 ${toastTypes[type].title}`,
    message: 'text-sm text-gray-600',
    closeButton: 'absolute -mt-2 mr-2 right-0 text-gray-600 hover:text-gray-800',
  }

  return (<PosedToastContainer pose={isShow ? 'open': 'closed'} className={styles.posedContainer}>
    <div className={styles.container} style={{ width: toastSizes[size]}} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>
        <IoIosClose size={27} />
      </button>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.message}>{message}</p>
    </div>
  </PosedToastContainer>)
}

export default Toast